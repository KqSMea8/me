/**
 * file: mod.js
 * ver: 1.0.7
 * update: 2014/4/14
 *
 * https://github.com/zjcqoo/mod
 */
var require, define;

(function(global) {
    var head = document.getElementsByTagName('head')[0],
        loadingMap = {},
        factoryMap = {},
        modulesMap = {},
        scriptsMap = {},
        resMap = {},
        pkgMap = {};



    function createScript(url, onerror) {
        if (url in scriptsMap) return;
        scriptsMap[url] = true;

        var script = document.createElement('script');
        if (onerror) {
            var tid = setTimeout(onerror, require.timeout);

            script.onerror = function() {
                clearTimeout(tid);
                onerror();
            };

            function onload() {
                clearTimeout(tid);
            }

            if ('onload' in script) {
                script.onload = onload;
            }
            else {
                script.onreadystatechange = function() {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        onload();
                    }
                }
            }
        }
        script.type = 'text/javascript';
        script.src = url;
        head.appendChild(script);
        return script;
    }

    function loadScript(id, callback, onerror) {
        var queue = loadingMap[id] || (loadingMap[id] = []);
        queue.push(callback);

        //
        // resource map query
        //
        var res = resMap[id] || {};
        var pkg = res.pkg;
        var url;

        if (pkg) {
            url = pkgMap[pkg].url;
        } else {
            url = res.url || id;
        }

        createScript(url, onerror && function() {
            onerror(id);
        });
    }

    define = function(id, factory) {
        factoryMap[id] = factory;

        var queue = loadingMap[id];
        if (queue) {
            for(var i = 0, n = queue.length; i < n; i++) {
                queue[i]();
            }
            delete loadingMap[id];
        }
    };

    require = function(id) {
        id = require.alias(id);

        var mod = modulesMap[id];
        if (mod) {
            return mod.exports;
        }

        //
        // init module
        //
        var factory = factoryMap[id];
        if (!factory) {
            throw '[ModJS] Cannot find module `' + id + '`';
        }

        mod = modulesMap[id] = {
            exports: {}
        };

        //
        // factory: function OR value
        //
        var ret = (typeof factory == 'function')
                ? factory.apply(mod, [require, mod.exports, mod])
                : factory;

        if (ret) {
            mod.exports = ret;
        }
        return mod.exports;
    };

    require.async = function(names, onload, onerror) {
        if (typeof names == 'string') {
            names = [names];
        }
        
        for(var i = 0, n = names.length; i < n; i++) {
            names[i] = require.alias(names[i]);
        }

        var needMap = {};
        var needNum = 0;

        function findNeed(depArr) {
            for(var i = 0, n = depArr.length; i < n; i++) {
                //
                // skip loading or loaded
                //
                var dep = depArr[i];
                if (dep in factoryMap || dep in needMap) {
                    continue;
                }

                needMap[dep] = true;
                needNum++;
                loadScript(dep, updateNeed, onerror);

                var child = resMap[dep];
                if (child && 'deps' in child) {
                    findNeed(child.deps);
                }
            }
        }

        function updateNeed() {
            if (0 == needNum--) {
                var args = [];
                for(var i = 0, n = names.length; i < n; i++) {
                    args[i] = require(names[i]);
                }

                onload && onload.apply(global, args);
            }
        }
        
        findNeed(names);
        updateNeed();
    };

    require.resourceMap = function(obj) {
        var k, col;

        // merge `res` & `pkg` fields
        col = obj.res;
        for(k in col) {
            if (col.hasOwnProperty(k)) {
                resMap[k] = col[k];
            }
        }

        col = obj.pkg;
        for(k in col) {
            if (col.hasOwnProperty(k)) {
                pkgMap[k] = col[k];
            }
        }
    };

    require.loadJs = function(url) {
        createScript(url);
    };

    require.loadCss = function(cfg) {
        if (cfg.content) {
            var sty = document.createElement('style');
            sty.type = 'text/css';
            
            if (sty.styleSheet) {       // IE
                sty.styleSheet.cssText = cfg.content;
            } else {
                sty.innerHTML = cfg.content;
            }
            head.appendChild(sty);
        }
        else if (cfg.url) {
            var link = document.createElement('link');
            link.href = cfg.url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        }
    };


    require.alias = function(id) {return id};

    require.timeout = 5000;
    
})(this);;
/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (isDocument(element) && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        isSimple && !maybeID ?
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this[0].textContent : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (!this.length || this[0].nodeType !== 1 ? undefined :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return 0 in arguments ?
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        }) :
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        )
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var computedStyle, element = this[0]
        if(!element) return
        computedStyle = getComputedStyle(element, '')
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var name, type, result = [],
      add = function(value) {
        if (value.forEach) return value.forEach(add)
        result.push({ name: name, value: value })
      }
    if (this[0]) $.each(this[0].elements, function(_, field){
      type = field.type, name = field.name
      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
        ((type != 'radio' && type != 'checkbox') || field.checked))
          add($(field).val())
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (0 in arguments) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($){
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function(dom, selector){
        dom = dom || []
        $.extend(dom, $.fn)
        dom.selector = selector || ''
        dom.__Z = true
        return dom
      },
      // this is a kludge but works
      isZ: function(object){
        return $.type(object) === 'array' && '__Z' in object
      }
    })
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element){
      try {
        return nativeGetComputedStyle(element)
      } catch(e) {
        return null
      }
    }
  }
})(Zepto);
/**
 * 初始化dd.base对象及dd.ready方法
 */
(function(window, undefined) {

    /**
     * 避免命名空间被污染
     */
    var dd = window.dd || {};
    if (dd && dd.base) return;


    window.dd = dd; //注册dd命名空间到window下

    /**
     * 文档加载完后方法
     * @param  {[type]} opt [description]
     * @return {[type]}      [description]
     */
    dd.ready = function(cb) {
        window.addEventListener('DOMContentLoaded', cb, false);
    }

    var base = {}; // 定义base对象
    /**
     * 判断不同的操作系统平台做不同的事情
     * @param  {[type]} opt [description]
     * @return {[type]}      [description]
     */
    base.diffPlatform = function(opt) {
        var ua = navigator.userAgent
        var callFn = function(fn) {
            if (typeof fn === "function") fn();
        };
        if ((ua.match(/(Android)/i))) {
            callFn(opt.android);
        } else if ((ua.match(/(iPhone|iPod|ios|iPad)/i))) {
            callFn(opt.ios);
        } else if ((ua.match(/(Windows phone)/i))) {
            callFn(opt.wp);
        } else {
            callFn(opt.others);
        }
    };

    /**
     * 加载javascript，加载完成后执行回调函数
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    base.loadJS = function(url, cb) {
        var sc = document.createElement("script");
        sc.type = "text/javascript";
        sc.src = url;
        document.getElementsByTagName("head")[0].appendChild(sc);
        sc.onload = sc.onreadystatechange = function() {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                if (typeof cb === "function") cb();
            }
        };
    };

    /**
     * [jsonp description]
     * @param  {[type]}   url [description]
     * @param  {Function} cb  [description]
     * @return {[type]}       [description]
     */
    base.jsonp = function(url, cb) {
        var sc = document.createElement("scfript");
        sc.type = "text/javascript";
        sc.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=dd.jsonp." + cb;
        document.getElementsByTagName("head")[0].appendChild(sc);
    };


    /**
     * touch事件
     * @param  {[type]}   ele      [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   bubble   [description]
     * @return {[type]}            [description]
     */
    base.touch = function(ele, cb, bubble, prevent) {
        if (!ele || typeof cb !== 'function') return;

        ele.addEventListener('touchstart', function(ev) {
            ev.target.focus();
            ev.stopPropagation(); //阻止冒泡
            if(prevent){
                ev.preventDefault();
            }
        }, false);

        ele.addEventListener('touchmove', function(ev) {
            ev.target.setAttribute("moved", "true");
        }, false);

        ele.addEventListener('touchend', function(ev) {
            ev.target.blur();
            if (ev.target.getAttribute("moved") !== "true") {
                cb(ev);
            } else {
                ev.target.setAttribute("moved", "false");
            }
        }, false);
    };

    /**
     * 获取查询字符串并返回对象
     * @return {[type]} [description]
     */
    base.getQueryStr = function() {
        var item, key, val, res = {};
        var queryStr = (location.search.length) ? location.search.substring(1) : '';

        if (!queryStr) return res;
        if (queryStr.indexOf('&') === -1 && queryStr.indexOf('=') > -1) {
            item = queryStr.split('=');
            key = decodeURIComponent(item[0]);
            val = decodeURIComponent(item[1]);
            if (key) res[key] = val || "";
            return res;
        }
        if (queryStr.indexOf('&') > -1) {
            items = queryStr.split('&');
            for (var i = 0, len = items.length; i < len; i++) {
                item = items[i].split('=');
                key = decodeURIComponent(item[0]);
                val = decodeURIComponent(item[1]);
                if (key) res[key] = val;
            };
            return res;
        }
    };

    /**
     * text convert to json object
     * @param  {[type]} txt [description]
     * @return {[type]}     [description]
     */
    base.txtToJson = function(txt) {
        if (!txt) return;
        var j = {};
        try {
            j = JSON.parse(txt);
        } catch (e) {
            try {
                j = eval("(" + txt + ")");
            } catch (ee) {}
        }
        return j;
    };



    /**
     * 单例模式－－包装盒
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    var _singleton = function(fn) {
        var _ins = null;
        return function() {
            return _ins || (_ins = fn.apply(this, arguments));
        };
    };

    /**
     * 创建XMLHttpRequest对象
     * @return {[type]} [description]
     */
    var createXhr = function() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {}
        }
    };

    var _XHR = _singleton(createXhr);

    /**
     * ajax function
     * @param  {[type]} opt [description]
     * @return {[type]}      [description]
     */
    base.ajax = function(opt) {
        /**
         * 将object转换成body
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        var obj2Body = function(obj) {
            if (!obj) return;
            var res = '';
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) res += '&' + p + '=' + obj[p] + '';
            }
            return res.replace(/^\&/, "");
        };

        if (!opt) return;

        var xhr = opt.isSequenceReq === true ? new _XHR() : createXhr();
        if (opt.isSequenceReq === true && xhr.readyState !== 0) xhr.abort();

        var _time = 0,
            timeObj = opt.timeout;
        if (opt.async !== false) opt.async = true;

        xhr.open(opt.method, opt.url, opt.async); //true表示异步
        /**
         * 监听xhr对象的statechange事件
         * @return {[type]} [description]
         */
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (_time) clearTimeout(_time);
                xhr.status === 200 ? opt.succFunc(xhr.responseText) : opt.failFunc(xhr.responseText);
            } //else if (xhr.readyState === 3) {} else {}
        };

        if (opt.method.toUpperCase() === 'GET') {
            xhr.send(null);
        } else if (opt.method.toUpperCase() === 'POST') {
            var body = opt.data ? obj2Body(opt.data) : "";
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);
        }

        /**
         * 控制timeout操作
         */
        if (timeObj) {
            var millSec = timeObj.millisecond || 10000;
            _time = setTimeout(function() {
                xhr.abort();
                if (timeObj.callback) timeObj.callback();
            }, millSec);
        }
    };

    /**
     * 判断一个对象是否为数组
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    base.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * 是否为对象
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    base.isObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    /**
     * 是否为function
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    base.isFunc = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };
    
   
    /**
     * 为原型对象注册方法
     * @param  {[type]} funcName [description]
     * @param  {[type]} func     [description]
     * @return {[type]}          [description]
     */
    Function.prototype.method = function(funcName, func) {
        if (!this.prototype[funcName]) {
            this.prototype[funcName] = func;
        }
        return this;
    };

    /**
     * 为String添加trim方法
     * @return {[type]} [description]
     */
    String.method('trim', function() {
        return this.replace(/^\s+|\s$/g, '');
    });

    /**
     * 判断某对象是否在数组内
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    Array.method('contain', function(item) {
        for (var i in this) {
            if (this[i] === item) return true;
        }
        return false;
    });

    dd.base = base; //将base对象注册到dd命名空间下
})(window);

/**
 * 生成对话框dd.dialog 不依赖其他库but dd.ui.css
 */
(function(window, undefined) {

    // dd.dialog不依赖于dd.base
    // 需要将dialog注册到dd命名空间下
    var dd = window.dd || {};
    if (dd.dialog) return dd.dialog;

    dd.dialog = {};

    var docElem = document.documentElement,
        dvWall = null,
        dvWrap = null,
        dialog = null;

    /**
     * util
     */
    var util = {
        /**
         * 判断一个对象是否为数组
         */
        isArray: function(obj) {
            return (typeof Array.isArray) ? Array.isArray(obj) : (Object.prototype.toString.call(obj) === '[object Array]');
        },

        /**
         * 往body中插入div
         */
        insertDom: function(newNode) {
            document.body.appendChild(newNode);
        },
        /**
         * 初始化配置及生成dom元素
         */
        genDom: function(opts, div_wall, div_wrap) {
            if (!opts) return;

            if (Object.prototype.toString.call(opts, null) === '[object Object]') { // 传入的object
                opts.type = opts.type || "loading";

                div_wall.style.cssText = opts.wallCss;
                div_wrap.style.cssText = opts.wrapCss;

                //生成弹窗内容
                var html = "<div class='" + opts.type + "'>";
                html += this.genIcon(opts.icon);
                html += this.genTitle(opts.title);
                html += this.genTip(opts);
                html += this.genButtons(opts.btns, opts.ext) + "</div>";
                html += this.genClose(opts.close);

                div_wrap.innerHTML = html;

            } else if (Object.prototype.toString.call(opts, null) === '[object String]') { // 配置为html
                div_wrap.innerHTML = opts;
            } else if (Object.prototype.toString.call(opts, null) === '[object HTMLDivElement]') { // 传入的dom
                opts.style.display = "inline-block";
                div_wrap.appendChild(opts);
            }

        },
        /**
         * 生成icon相关的html
         */
        genIcon: function(icon) {
            //默认无icon,true为默认icon
            if (!icon) return "";

            var w = icon.width || "8px",
                h = icon.height || "36px",
                url = icon.url || "http://static.xiaojukeji.com/pinche/images/i-plaint.png",
                cssText = icon.cssText || "";

            var html = '<img src=' + url + ' style="width:' + w + ';height:' + h + ';vertical-align:middle;' + cssText + '"/>';

            return '<p class="icon">' + html + '</p>';
        },

        /**
         * Title的样式和HTML
         */
        genTitle: function(title) {
            title = title || {};
            var cssText = title.cssText || "";

            return '<p class="title" style="' + cssText + '">' + (title.txt || "") + '</p>';
        },

        /**
         * 生成提示信息
         */
        genTip: function(opts) {
            var tip = opts.tip || {},
                title = opts.title || {};

            if (title.txt) {
                tip.color = tip.color || "#666";
                tip.size = tip.size || '1.4rem'
            } else {
                tip.color = tip.color || "#333";
                tip.size = tip.size || '1.6rem';
            }

            var cssText = 'color:' + tip.color + ';font-size:' + tip.size + ';';
            
            return tip.txt ? '<div class="tip" style="' + cssText + '">' + tip.txt + '</div>' : "";
        },
        /**
         * 右上角关闭按钮
         */
        genClose: function(close) {
            return close ? '<a class="close" href="javascript:void(0);"></a>' : '';
        },
        /**
         * 尾部红包
         */
        genButtons: function(btns, ext) {
            var res = "";
            if (btns && this.isArray(btns)) {
                res += '<div class="btns clearfix">';

                for (var i = 0, btn = null, l = btns.length; i < l; i++) {
                    btn = btns[i];
                    res += '<a class="' + btn.kls + '" id="' + btn.id + '">' + btn.val + '</a>';
                }
                res += '</div>';
            }
            //按钮下面附加内容
            if (ext && typeof ext === 'string') {
                res += ext;
            }
            return res;
        },

        /**
         * 为按钮注册事件
         */
        addEvents: function(opts) {
            if (opts.close) {
                var close = dvWrap.getElementsByClassName("close")[0];
                close.addEventListener("touchstart", function() {
                    dialog.hide();
                }, false);
            }

            if (!this.isArray(opts.btns) || !opts.btns.length) return;

            for (var i = 0, btn = null, l = opts.btns.length; i < l; i++) {
                btn = opts.btns[i];
                if (btn) {
                    var ev = btn.event || "click",
                        ele = document.getElementById(btn.id);
                    if (ele) {
                        ele.removeEventListener(ev, btn.handler, false);
                        ele.addEventListener(ev, btn.handler, false);
                    }
                }
            }
        }
    };

    /**
     * Dialog对象应该使用强制使用new模式
     */
    var Dialog = function(opts) {
        if (!(this instanceof Dialog)) {
            dialog = new Dialog(opts);
            return dialog; // 当不使用new的时候，会走到前一句，然后再走到dialog.fn.init,然后再执行return
        } else {
            new Dialog.fn.init(opts);
        }
    };

    /**
     * Dialog prototype
     * @type {Function}
     */
    Dialog.fn = Dialog.prototype = {
        constructor: Dialog,
        init: function(opts) {
            if (!opts) return;

            var div_wall = document.createElement('div');
            var div_wrap = document.createElement("div");
            div_wall.id = "d-wall";
            div_wrap.id = "d-wrap";

            //初始化配置 生成内容HTML
            util.genDom(opts, div_wall, div_wrap);

            //删除已存在的弹窗
            dvWall && document.body.removeChild(dvWall);
            dvWrap && document.body.removeChild(dvWrap);

            //插入dom
            util.insertDom(div_wall);
            util.insertDom(div_wrap);

            dvWall = div_wall;
            dvWrap = div_wrap;

            if (Object.prototype.toString.call(opts, null) === '[object Object]') {
                window.setTimeout(function() {
                    util.addEvents(opts);
                }, 400);
            }
        },
        show: function() {
            var that = this;
            if (dvWall && dvWrap) {
                that.reset();
                dvWall.style.display = "block";
                dvWrap.style.display = "inline-block";

                window.addEventListener("resize", reset, false);
                window.addEventListener("scroll", reset, false);

                function reset(event) {
                    window.removeEventListener(event.type, reset, false); //先remove event
                    that.reset.call(that);
                }
            }
        },
        hide: function() {
            if (dvWall && dvWrap) {
                dvWall.style.display = "none";
                dvWrap.style.display = "none";
            }
        },
        reset: function() {
            if (dvWall && dvWrap) {
                dvWrap.style.top = (docElem.clientHeight - dvWrap.clientHeight - 20) / 2 + "px";
                dvWrap.style.left = (docElem.clientWidth - dvWrap.clientWidth) / 2 + "px";
                var scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //考虑到页面滚动和窗体重置
                dvWall.style.width = docElem.clientWidth + "px";
                dvWall.style.height = scrollH + "px";
            }
        }
    };


    /**
     * alert弹出框
     */
    dd.dialog.alert = function(cfg) {
        var opts = {};
        if (typeof arguments[0] === "string" && arguments[0]) {
            opts.title = arguments[1] || "";
            opts.tip = arguments[0];
            opts.btn = {
                val: arguments[2] || "我知道了"
            };
        } else if (cfg && typeof cfg === 'object') {
            opts = cfg;
        }

        dialog = Dialog({
            type: "alert",
            icon: opts.icon || {
                url: "http://static.xiaojukeji.com/pinche/images/i-plaint.png",
                width: "8px",
                height: "36px"
            },
            wrapCss: "background: #fff;width: 280px;text-align: center;",
            title: {
                txt: opts.title
            },
            tip: {
                txt: opts.tip
            },
            btns: [{
                id: "btn-close",
                kls: 'btn-orange',
                event: "click",
                val: (opts.btn && opts.btn.val) || "我知道了",
                handler: function(ev) {
                    dialog.hide();
                    if (typeof opts.btn.handler === 'function') {
                        opts.btn.handler(ev);
                    }
                }
            }]
        });
        dialog.show();
        return dialog;
    };

    /**
     * confirm dialog
     */
    dd.dialog.confirm = function(cfg) {
        var opts = {};

        if (typeof arguments[0] === 'string' && arguments[0]) {
            opts.text = arguments[0] || "";
            opts.confirm = {};
            opts.confirm.handler = arguments[1];

        } else if (cfg && typeof cfg === 'object') {
            opts = cfg;
        }

        var cancel = opts.cancel || {};
        var confirm = opts.confirm || {};

        dialog = Dialog({
            type: "confirm",
            tip: {
                txt: opts.text
            },
            icon: opts.icon || {
                url: "http://static.xiaojukeji.com/pinche/images/i-plaint.png",
                width: "8px",
                height: "36px"
            },
            wrapCss: "background: #fff;width: 280px;text-align: center;",
            btns: [{
                id: cancel.id || "btn-cancel",
                val: cancel.val || "取消",
                kls: cancel.kls || "btn-white",
                event: cancel.event || "click",
                handler: function(e) {
                    dialog.hide();
                    if (typeof cancel.handler === 'function') {
                        cancel.handler(e);
                    }
                }
            }, {
                id: confirm.id || "btn-ok",
                val: confirm.val || "确定",
                kls: confirm.kls || "btn-orange",
                event: confirm.event || "click",
                handler: function(e) {
                    dialog.hide();
                    if (typeof confirm.handler === 'function') {
                        confirm.handler(e);
                    }
                }
            }],
            ext: opts.ext
        });
        dialog.show();
        return dialog;
    };

    /**
     * Loading Dialog
     */
    dd.dialog.loading = function(cfg) {
        var opts = {};
        if (typeof arguments[0] !== "object") {
            opts.text = arguments[0];
            opts.time = arguments[1] || 0
        } else {
            opts = cfg;
        }
        dialog = Dialog({
            type: "loading",
            wallCss: "",
            wrapCss: "background:#0c0d0d;opacity:0.7;width:140px;height:140px;",
            icon: (cfg && cfg.icon) || {
                width: "30px",
                height: "30px",
                url: "http://static.xiaojukeji.com/pinche/images/loading_2.gif"
            },
            tip: {
                txt: opts.text || "正在加载",
                color: "#fff",
                size: "14px"
            }
        });

        dialog.show();

        if (opts.time === undefined) {
            opts.time = 5000;
        }
        function closeLoad() {
            clearTimeout(dd.dialog.loading._timer);
            dialog.hide();
            // console.log(typeof opts.hideCB === 'function')
            if (typeof opts.hideCB === 'function') {
                opts.hideCB();
            }
        }
        if(opts.time === 0){
            closeLoad();
        }else{
            dd.dialog.loading._timer = window.setTimeout(closeLoad, opts.time);
        }
        return dialog;
    };

    /**
     * 扁平化的loading
     */
    dd.dialog.flatLoading = function(cfg) {
        var opts = {};
        if (typeof arguments[0] !== "object") {
            opts.text = arguments[0];
            opts.time = arguments[1] || 0
        } else {
            opts = cfg;
        }
        dialog = Dialog({
            type: "loading",
            wallCss: "",
            wrapCss: "background:#fff;width:140px;height:140px;",
            icon: (cfg && cfg.icon) || {
                width: "30px",
                height: "30px",
                url: "http://static.xiaojukeji.com/pinche/images/loading_2.gif"
            },
            tip: {
                txt: opts.text || "",
                color: "#666",
                size: "14px"
            }
        });

        dialog.show();

        if (!opts.time) {
            opts.time = 5000;
        }
        window.setTimeout(function() {
            dialog.hide();
            if (typeof opts.hideCB === 'function') {
                opts.hideCB();
            }
        }, opts.time);
        return dialog;
    };

    /**
     * 滴滴打车logo的loading
     */
    dd.dialog.logoLoading = function(time, hideCB) {
        dialog = Dialog('<div class="loading-car"><div class="bg"></div><div class="loading-car-icon"></div></div>');
        dialog.show();
        if (!time) {
            time = 5000;
        }
        setTimeout(function() {
            dialog.hide();
            if (typeof hideCB === 'function') {
                hideCB();
            }
        }, time);
        return dialog;
    };



    /**
       //提示
    */
    dd.dialog.tip = function(cfg) {
        var _cfg = {};
        if (typeof arguments[0] !== "object") {
            _cfg.text = arguments[0];
            _cfg.time = arguments[1] || 0
        } else {
            _cfg = cfg;
        }
        _cfg.time = parseInt(_cfg.time) || 600;

        dialog = Dialog({
            type: "tip",
            wallCss: "",
            wrapCss: "background:#0c0d0d;width:140px;height:140px;opacity:0.7;",
            icon: _cfg.icon || {
                url: "http://static.xiaojukeji.com/pinche/images/i-plaint.png",
                width: "8px",
                height: "36px"
            },
            tip: {
                txt: _cfg.text || "温馨提醒",
                color: "#fff",
                size: "14px"
            }
        });

        dialog.show();

        window.setTimeout(function() {
            dialog.hide();
        }, _cfg.time);
    };

    dd.dialog.Fn = Dialog;

    window.dd = dd; // 注册dd对象到window下

})(window);
;


;define('ddbridge/ddbridge.js', function(require, exports, module){

module.exports = window.Didibridge = function(){

};

var takePhotoIncantation = [
	'callbackImageLiteratureReviewTakeCamera',
	'callbackImageLiteratureReviewPhotoLibrary',
	'callbackImageLiteratureReview'
]

Didibridge.uploadImage = function(data, cb, take, url){
	if(typeof cb !== 'function') {
		throw 'must supply callback function';
	}
	if(url === undefined){
		throw 'must supply upload url';
	}
	var fnName;
	switch(take){
		case 'camera':
			fnName = takePhotoIncantation[0];
			break;
		case 'library':
			fnName = takePhotoIncantation[1];
			break;
		default:
			fnName = takePhotoIncantation[2];
	}
	var params = {
		data: data,	
		//上传地址
		url: url
	};	

	connectDidiJSBridge(function(DidiJSBridge){
        var bridge = DidiJSBridge;
        if( exports.callHandler ){
        	bridge = exports;
        }
		bridge.callHandler(
		    fnName,
			JSON.stringify(params),
			function(data){
				cb(data);
			}
		);	

	});
}


// 连接DidiJSBridge
var connectDidiJSBridge = function(callback) {

	var onDidiJSBridgeReady = function(){
		initDidiJSBridge(DidiJSBridge);
        callback(DidiJSBridge);
	}

    if (window.DidiJSBridge) {
    	onDidiJSBridgeReady();
    } else {
        document.addEventListener('DidiJSBridgeReady', onDidiJSBridgeReady, false);
    }
};

var isIninted = false;
var initDidiJSBridge = function(DidiJSBridge){
	if(isIninted === false){
		isIninted = true;

		// iPhone 
		if( navigator.userAgent.match(/iphone/i) ){
			return DidiJSBridge.init && DidiJSBridge.init({});
		}
		// Android
		//overwrite callHandler
		exports.callHandler = function(fnName, opt, callback){
			var callbackName;
			var args = Array.prototype.slice.call(arguments, 0);
			if( 
				takePhotoIncantation.indexOf(fnName) > -1
			){
				callbackName = 'didibridge' + ~~(Math.random() * 1e6);
				window[callbackName] = function(){
					window[callbackName] = undefined;
					callback.apply(null, arguments);
				};
				args[2] = undefined;
				if( typeof args[1] === 'string'){
					var opt = JSON.parse( args[1] );	 
					opt.callback = callbackName;
				}
				args[1] = JSON.stringify(opt);
				opt.callback = callbackName;
				DidiJSBridge.callHandler(args[0], args[1]);
			}else{
				DidiJSBridge.callHandler.apply(DidiJSBridge, args);
			}
		};

	}
}






});