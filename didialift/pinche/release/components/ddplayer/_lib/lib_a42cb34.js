!function(){window.ddvp=window.ddvp||{},window.ddvp.debug={};var e=Date.now();ddvp.debug.playerLoadStartTime=e||0,ddvp.debug.playerLoadScriptTime=e||0,ddvp.debug.playerPlayStartTime=0,ddvp.debug.playerLoadDomStartTime=0,ddvp.debug.playerLoadAdDataStartTime=0,ddvp.debug.playerLoadMediaDataStartTime=0,ddvp.debug.isShowPlayerPlayStartTime=!1}(),window.ddvp="undefined"==typeof window.ddvp?{}:window.ddvp,!function(e,t){function n(e){return e.replace($,"").replace(x,",").replace(S,"").replace(T,"").replace(_,"").split(j)}function r(e){return"'"+e.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function i(e,t){function i(e){return f+=e.split(/\n/).length-1,l&&(e=e.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),e&&(e=v[1]+r(e)+v[2]+"\n"),e}function o(e){var r=f;if(s?e=s(e,t):a&&(e=e.replace(/\n/g,function(){return f++,"$line="+f+";"})),0===e.indexOf("=")){var i=d&&!/^=[=#]/.test(e);if(e=e.replace(/^=[=#]?|[\s;]*$/g,""),i){var o=e.replace(/\s*\([^\)]+\)/,"");g[o]||/^(include|print)$/.test(o)||(e="$escape("+e+")")}else e="$string("+e+")";e=v[1]+e+v[2]}return a&&(e="$line="+r+";"+e),y(n(e),function(e){if(e&&!p[e]){var t;t="print"===e?b:"include"===e?$:g[e]?"$utils."+e:m[e]?"$helpers."+e:"$data."+e,x+=e+"="+t+",",p[e]=!0}}),e+"\n"}var a=t.debug,c=t.openTag,u=t.closeTag,s=t.parser,l=t.compress,d=t.escape,f=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},h="".trim,v=h?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],w=h?"$out+=text;return $out;":"$out.push(text);",b="function(){var text=''.concat.apply('',arguments);"+w+"}",$="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+w+"}",x="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(a?"$line=0,":""),S=v[0],T="return new String("+v[3]+");";y(e.split(c),function(e){e=e.split(u);var t=e[0],n=e[1];1===e.length?S+=i(t):(S+=o(t),n&&(S+=i(n)))});var _=x+S+T;a&&(_="try{"+_+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+r(e)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var j=new Function("$data","$filename",_);return j.prototype=g,j}catch(E){throw E.temp="function anonymous($data,$filename) {"+_+"}",E}}var o=function(e,t){return"string"==typeof t?w(t,{filename:e}):u(e,t)};o.version="3.0.0",o.config=function(e,t){a[e]=t};var a=o.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},c=o.cache={};o.render=function(e,t){return w(e,t)};var u=o.renderFile=function(e,t){var n=o.get(e)||v({filename:e,name:"Render Error",message:"Template not found"});return t?n(t):n};o.get=function(e){var t;if(c[e])t=c[e];else if("object"==typeof document){var n=document.getElementById(e);if(n){var r=(n.value||n.innerHTML).replace(/^\s*|\s*$/g,"");t=w(r,{filename:e})}}return t};var s=function(e,t){return"string"!=typeof e&&(t=typeof e,"number"===t?e+="":e="function"===t?s(e.call(e)):""),e},l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},d=function(e){return l[e]},f=function(e){return s(e).replace(/&(?![\w#]+;)|[<>"']/g,d)},p=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},h=function(e,t){var n,r;if(p(e))for(n=0,r=e.length;r>n;n++)t.call(e,e[n],n,e);else for(n in e)t.call(e,e[n],n)},g=o.utils={$helpers:{},$include:u,$string:s,$escape:f,$each:h};o.helper=function(e,t){m[e]=t};var m=o.helpers=g.$helpers;o.onerror=function(e){var t="Template Error\n\n";for(var n in e)t+="<"+n+">\n"+e[n]+"\n\n";console.log(t)};var v=function(e){return o.onerror(e),function(){return"{Template Error}"}},w=o.compile=function(e,n){function r(t){try{return new s(t,u)+""}catch(r){return n.debug?v(r)():(n.debug=!0,w(e,n)(t))}}n=n||{};for(var o in a)n[o]===t&&(n[o]=a[o]);var u=n.filename;try{var s=i(e,n)}catch(l){return l.filename=u||"anonymous",l.name="Syntax Error",v(l)}return r.prototype=s.prototype,r.toString=function(){return s.toString()},u&&n.cache&&(c[u]=r),r},y=g.$each,b="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",$=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,x=/[^\w$]+/g,S=new RegExp(["\\b"+b.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),T=/^\d[^,]*|,\d[^,]*/g,_=/^,+|,+$/g,j=/^$|,+/;o.parseTpl=function(e,t){var n="var __p=[];with(obj||{}){__p.push('"+e.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(e,t){return"',"+t.replace(/\\'/,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(e,t){return"');"+t.replace(/\\'/,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+'\');}return __p.join("");',r=new Function("obj",n);return t?r(t):r};var E;"function"==typeof e.template?E=e.template:e.template=o,"function"==typeof define?define(function(){return o}):"function"==typeof define?define(function(){return o}):"undefined"!=typeof exports&&(module.exports=o)}(ddvp),!function(e){function t(e){var t=this.os={},n=this.browser={},r=e.match(/WebKit\/([\d.]+)/),i=e.match(/(Android)\s+([\d.]+)/),o=e.match(/(iPad).*OS\s([\d_]+)/),a=!o&&e.match(/(iPhone\sOS)\s([\d_]+)/),c=e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),u=c&&e.match(/TouchPad/),s=e.match(/Kindle\/([\d.]+)/),l=e.match(/Silk\/([\d._]+)/),d=e.match(/(BlackBerry).*Version\/([\d.]+)/);(n.webkit=!!r)&&(n.version=r[1]),i&&(t.android=!0,t.version=i[2]),a&&(t.ios=t.iphone=!0,t.version=a[2].replace(/_/g,".")),o&&(t.ios=t.ipad=!0,t.version=o[2].replace(/_/g,".")),c&&(t.webos=!0,t.version=c[2]),u&&(t.touchpad=!0),d&&(t.blackberry=!0,t.version=d[2]),s&&(t.kindle=!0,t.version=s[1]),l&&(n.silk=!0,n.version=l[1]),!l&&t.android&&e.match(/Kindle Fire/)&&(n.silk=!0)}t.call(e,navigator.userAgent),e.__detect=t}(Zepto),!function(e,t){function n(e){return e.toLowerCase()}function r(e){return i?i+e:n(e)}var i,o="",a={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},c=window.document,u=c.createElement("div"),s=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,l={};e.each(a,function(e,r){return u.style[e+"TransitionProperty"]!==t?(o="-"+n(e)+"-",i=r,!1):void 0}),l[o+"transition-property"]=l[o+"transition-duration"]=l[o+"transition-timing-function"]=l[o+"animation-name"]=l[o+"animation-duration"]="",e.fx={off:i===t&&u.style.transitionProperty===t,cssPrefix:o,transitionEnd:r("TransitionEnd"),animationEnd:r("AnimationEnd")},e.fn.animate=function(t,n,r,i){return e.isObject(n)&&(r=n.easing,i=n.complete,n=n.duration),n&&(n/=1e3),this.anim(t,n,r,i)},e.fn.anim=function(n,r,i,a){var c,u,d,f={},p=this,h=e.fx.transitionEnd;if(r===t&&(r=.4),e.fx.off&&(r=0),"string"==typeof n)f[o+"animation-name"]=n,f[o+"animation-duration"]=r+"s",h=e.fx.animationEnd;else{for(u in n)s.test(u)?(c||(c=[]),c.push(u+"("+n[u]+")")):f[u]=n[u];c&&(f[o+"transform"]=c.join(" ")),e.fx.off||"object"!=typeof n||(f[o+"transition-property"]=Object.keys(n).join(", "),f[o+"transition-duration"]=r+"s",f[o+"transition-timing-function"]=i||"linear")}return d=function(t){if("undefined"!=typeof t){if(t.target!==t.currentTarget)return;e(t.target).unbind(h,arguments.callee)}e(this).css(l),a&&a.call(this)},r>0&&this.bind(h,d),setTimeout(function(){p.css(f),0>=r&&setTimeout(function(){p.each(function(){d.call(this)})},0)},0),this},u=null}(Zepto),!function(e,t){var n,r=t.userAgent,i=e.browser,o={wx:/WeixinJSBridge|MicroMessenger\/([\d.]+)/i,qq:/MQQBrowser\/([\d.]+)/i,uc:/UCBrowser\/([\d.]+)/i,miui:/MiuiBrowser\/([\d.]+)/i,baidu:/baidubrowser\/.*?([\d.]+)/i};e.each(o,function(e,t){return(n=r.match(t))?(i[e]=!0,i.version=n[1],!1):void 0}),!i.uc&&/Uc/i.test(t.appVersion)&&(i.uc=!0)}(Zepto,window.navigator),function(e,t){function n(){var e=o.attr("hl-cls");clearTimeout(a),o.removeClass(e).removeAttr("hl-cls"),o=null,c.off("touchend touchmove touchcancel",n)}var r=(window.document,document.documentElement,window),i={fix:function(n){var r=this;if(r.attr("isFixed"))return r;r.css(n).css("position","fixed").attr("isFixed",!0);var i=e('<div style="position:fixed;top:10px;"></div>').appendTo("body"),o=i[0].getBoundingClientRect().top,a=function(){window.pageYOffset>0&&(i[0].getBoundingClientRect().top!==o&&(r.css("position","absolute"),c(),e(window).on("scrollStop",c),e(window).on("ortchange",c)),e(window).off("scrollStop",a),i.remove())},c=function(){r.css({top:window.pageYOffset+(n.bottom!==t?window.innerHeight-r.height()-n.bottom:n.top||0),left:n.right!==t?document.body.offsetWidth-r.width()-n.right:n.left||0}),"100%"==n.width&&r.css("width",document.body.offsetWidth)};return e(window).on("scrollStop",a),r}};e.extend(e.fn,i),e.extend(e,i),e.matchMedia=function(){var t=0,n="media-detect",r=e.fx.transitionEnd,i=e.fx.cssPrefix,o=e("<style></style>").append("."+n+"{"+i+"transition: width 0.001ms; width: 0; position: absolute; clip: rect(1px, 1px, 1px, 1px);}\n").appendTo("head");return function(i){var a,c,u=n+t++,s=[];return o.append("@media "+i+" { #"+u+" { width: 1px; } }\n"),a=e('<div class="'+n+'" id="'+u+'"></div>').appendTo("body").on(r,function(){c.matches=1===a.width(),e.each(s,function(t,n){e.isFunction(n)&&n.call(c,c)})}),c={matches:1===a.width(),media:i,addListener:function(e){return s.push(e),this},removeListener:function(e){var t=s.indexOf(e);return~t&&s.splice(t,1),this}}}}(),e.mediaQuery={ortchange:"screen and (width: "+window.innerWidth+"px)"},e.matchMedia(e.mediaQuery.ortchange).addListener(function(){e(window).trigger("ortchange")});var o,a,c=e(document);e.fn.highlight=function(t,r){return this.each(function(){var i=e(this);i.css("-webkit-tap-highlight-color","rgba(255,255,255,0)").off("touchstart.hl"),t&&i.on("touchstart.hl",function(u){var s;o=r?(s=e(u.target).closest(r,this))&&s.length&&s:i,o&&(o.attr("hl-cls",t),a=setTimeout(function(){o.addClass(t)},100),c.on("touchend touchmove touchcancel",n))})})},e.fn.throttle=function(n,r,i){function o(){function e(){c=Date.now(),r.apply(u,l)}function o(){a=t}var u=this,s=Date.now()-c,l=arguments;i&&!a&&e(),a&&clearTimeout(a),i===t&&s>n?e():a=setTimeout(i?o:e,i===t?n-s:n)}var a,c=0;return"function"!=typeof r&&(i=r,r=n,n=250),o._zid=r._zid=r._zid||e.proxy(r)._zid,o},e.fn.debounce=function(n,r,i){return r===t?e.fn.throttle(250,n,!1):e.fn.throttle(n,r,i===t?!1:i!==!1)},e(r).on("pageshow",function(t){t.persisted&&e(r).off("touchstart",backEventOffHandler).one("touchstart",backEventOffHandler)}),e.fn.parseTpl=function(e,t){var n="var __p=[];with(obj||{}){__p.push('"+e.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(e,t){return"',"+t.replace(/\\'/,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(e,t){return"');"+t.replace(/\\'/,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+'\');}return __p.join("");',r=new Function("obj",n);return t?r(t):r};var u={highlight:e.fn.highlight,throttle:e.fn.throttle,debounce:e.fn.debounce,parseTpl:e.fn.parseTpl,oriShow:function(){return this.css({display:"block"}),this},oriHide:function(){return this.css({display:"none"}),this},htmlLog:function(t,n){0===e("#js_htmlLog").length&&e("body").append(e('<div id="js_htmlLog" style="height: 200px;overflow: scroll;"></div>'));var r=[];e.isUndefined(t)||r.push("<span>"+t+"</span>"),e.isUndefined(n)||r.push("<span>"+n+"</span>"),e("#js_htmlLog").prepend(r.join(" ")+"<br>")},noop:function(){},blankFun:function(){},isString:function(t){return"string"===e.type(t)},isUndefined:function(e){return"undefined"==typeof e},isNumber:function(t){return"number"===e.type(t)},isEmpty:function(e){if(null==e)return!0;if(e.length>0)return!1;if(0===e.length)return!0;for(var t in e)if(hasOwnProperty.call(e,t)||null!==e[t])return!1;return!0},isArray:function(t){return!e.isUndefined(t)&&t instanceof Array},merge:function(t,n){for(var r in t)e.isUndefined(n[r])||(t[r]=n[r]);return t},isScript:function(e){return e=e||"",!!/\.js(?=[\?#]|$)/i.exec(e)},isCss:function(e){return e=e||"",!!/\.css(?=[\?#]|$)/i.exec(e)},isRegExp:function(e){return e&&"[object RegExp]"===Object.prototype.toString.call(e)},now:function(){return(new Date).getTime()},nowDataString:function(){var e=new Date,t=String(e.getMonth()+1>=12?12:e.getMonth()+1);t.length<2&&(t="0"+t);var n=String(e.getDate());n.length<2&&(n="0"+n);var r=String(e.getHours());r.length<2&&(r="0"+r);var i=String(e.getMinutes());i.length<2&&(i="0"+i);var o=String(e.getSeconds());o.length<2&&(o="0"+o);var a=" "+e.getFullYear()+t+n+" "+r+":"+i+":"+o;return a},getISOTimeFormat:function(){var e=new Date,t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),o=e.getMinutes(),a=e.getSeconds();return[[t,10>n?"0"+n:n,10>r?"0"+r:r].join("-"),[10>i?"0"+i:i,10>o?"0"+o:o,10>a?"0"+a:a].join(":")].join(" ")},formatSeconds:function(e){e=parseInt(e);var t=parseInt(e/60),n=t>=60?parseInt(t/60):0,r=e%60,i="";return t>=60&&(t%=60),n>0&&(i+=10>n?"0"+n:n,i+=":"),i+=10>t?"0"+t:t,i+=":",i+=10>r?"0"+r:r},getHost:function(){var e=window.location.hostname||window.location.host,t=location.host.split(".");return t.length>1&&(e=t.slice(t.length-2).join(".")),e},getUrlParam:function(e,t){t=t||document.location.toString();var n=new RegExp("(^|&|\\\\?)"+e+"=([^&]*)(&|$|#)"),r=null;return(r=t.match(n))?r[2]:""},filterXSS:function(t){return e.isString(t)?(t=t.replace(/</g,"&lt;"),t=t.replace(/>/g,"&gt;"),t=t.replace(/\"/g,"&quot;"),t=t.replace(/\'/g,"&apos;")):t},createGUID:function(e){e=e||32;for(var t="",n=1;e>=n;n++){var r=Math.floor(16*Math.random()).toString(16);t+=r}return t},formatSize:function(e){var t=""+e;return t.indexOf("%")>0?t:t.indexOf("px")>0?t:/^\d+$/.test(t)?t+"px":t}};e.extend(e,u),e.extend(e.fn,u)}(Zepto);