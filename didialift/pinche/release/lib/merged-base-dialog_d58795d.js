!function(window,undefined){var dd=window.dd||{};if(!dd||!dd.base){window.dd=dd,dd.ready=function(t){window.addEventListener("DOMContentLoaded",t,!1)};var base={};base.diffPlatform=function(t){var e=navigator.userAgent,n=function(t){"function"==typeof t&&t()};n(e.match(/(Android)/i)?t.android:e.match(/(iPhone|iPod|ios|iPad)/i)?t.ios:e.match(/(Windows phone)/i)?t.wp:t.others)},base.loadJS=function(t,e){var n=document.createElement("script");n.type="text/javascript",n.src=t,document.getElementsByTagName("head")[0].appendChild(n),n.onload=n.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||"function"==typeof e&&e()}},base.jsonp=function(t,e){var n=document.createElement("scfript");n.type="text/javascript",n.src=t+(t.indexOf("?")>-1?"&":"?")+"callback=dd.jsonp."+e,document.getElementsByTagName("head")[0].appendChild(n)},base.touch=function(t,e,n,i){t&&"function"==typeof e&&(t.addEventListener("touchstart",function(t){t.target.focus(),t.stopPropagation(),i&&t.preventDefault()},!1),t.addEventListener("touchmove",function(t){t.target.setAttribute("moved","true")},!1),t.addEventListener("touchend",function(t){t.target.blur(),"true"!==t.target.getAttribute("moved")?e(t):t.target.setAttribute("moved","false")},!1))},base.getQueryStr=function(){var t,e,n,i={},o=location.search.length?location.search.substring(1):"";if(!o)return i;if(-1===o.indexOf("&")&&o.indexOf("=")>-1)return t=o.split("="),e=decodeURIComponent(t[0]),n=decodeURIComponent(t[1]),e&&(i[e]=n||""),i;if(o.indexOf("&")>-1){items=o.split("&");for(var r=0,a=items.length;a>r;r++)t=items[r].split("="),e=decodeURIComponent(t[0]),n=decodeURIComponent(t[1]),e&&(i[e]=n);return i}},base.txtToJson=function(txt){if(txt){var j={};try{j=JSON.parse(txt)}catch(e){try{j=eval("("+txt+")")}catch(ee){}}return j}};var _singleton=function(t){var e=null;return function(){return e||(e=t.apply(this,arguments))}},createXhr=function(){if(window.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}},_XHR=_singleton(createXhr);base.ajax=function(t){var e=function(t){if(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+="&"+n+"="+t[n]);return e.replace(/^\&/,"")}};if(t){var n=t.isSequenceReq===!0?new _XHR:createXhr();t.isSequenceReq===!0&&0!==n.readyState&&n.abort();var i=0,o=t.timeout;if(t.async!==!1&&(t.async=!0),n.open(t.method,t.url,t.async),n.onreadystatechange=function(){4===n.readyState&&(i&&clearTimeout(i),200===n.status?t.succFunc(n.responseText):t.failFunc(n.responseText))},"GET"===t.method.toUpperCase())n.send(null);else if("POST"===t.method.toUpperCase()){var r=t.data?e(t.data):"";n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send(r)}if(o){var a=o.millisecond||1e4;i=setTimeout(function(){n.abort(),o.callback&&o.callback()},a)}}},base.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},base.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},base.isFunc=function(t){return"[object Function]"===Object.prototype.toString.call(t)},Function.prototype.method=function(t,e){return this.prototype[t]||(this.prototype[t]=e),this},String.method("trim",function(){return this.replace(/^\s+|\s$/g,"")}),Array.method("contain",function(t){for(var e in this)if(this[e]===t)return!0;return!1}),dd.base=base}}(window),function(t,e){var n=t.dd||{};if(n.dialog)return n.dialog;n.dialog={};var i=document.documentElement,o=null,r=null,a=null,c={isArray:function(t){return Array.isArray(t)},insertDom:function(t){document.body.appendChild(t)},genDom:function(t,e,n){if(t)if("[object Object]"===Object.prototype.toString.call(t,null)){t.type=t.type||"loading",e.style.cssText=t.wallCss,n.style.cssText=t.wrapCss;var i="<div class='"+t.type+"'>";i+=this.genIcon(t.icon),i+=this.genTitle(t.title),i+=this.genTip(t),i+=this.genButtons(t.btns,t.ext)+"</div>",i+=this.genClose(t.close),n.innerHTML=i}else"[object String]"===Object.prototype.toString.call(t,null)?n.innerHTML=t:"[object HTMLDivElement]"===Object.prototype.toString.call(t,null)&&(t.style.display="inline-block",n.appendChild(t))},genIcon:function(t){if(!t)return"";var e=t.width||"8px",n=t.height||"36px",i=t.url||"/static/pinche/src/images/i-plaint.png",o=t.cssText||"",r="<img src="+i+' style="width:'+e+";height:"+n+";vertical-align:middle;"+o+'"/>';return'<p class="icon">'+r+"</p>"},genTitle:function(t){t=t||{};var e=t.cssText||"";return'<p class="title" style="'+e+'">'+(t.txt||"")+"</p>"},genTip:function(t){var e=t.tip||{},n=t.title||{};n.txt?(e.color=e.color||"#666",e.size=e.size||"1.4rem"):(e.color=e.color||"#333",e.size=e.size||"1.6rem");var i="color:"+e.color+";font-size:"+e.size+";";return e.txt?'<div class="tip" style="'+i+'">'+e.txt+"</div>":""},genClose:function(t){return t?'<a class="close" href="javascript:void(0);"></a>':""},genButtons:function(t,e){var n="";if(t&&this.isArray(t)){n+='<div class="btns clearfix">';for(var i=0,o=null,r=t.length;r>i;i++)o=t[i],n+='<a class="'+o.kls+'" id="'+o.id+'">'+o.val+"</a>";n+="</div>"}return e&&"string"==typeof e&&(n+=e),n},addEvents:function(t){if(t.close){var e=r.getElementsByClassName("close")[0];e.addEventListener("touchstart",function(){a.hide()},!1)}if(this.isArray(t.btns)&&t.btns.length)for(var n=0,i=null,o=t.btns.length;o>n;n++)if(i=t.btns[n]){var c=i.event||"click",s=document.getElementById(i.id);s&&(s.removeEventListener(c,i.handler,!1),s.addEventListener(c,i.handler,!1))}}},s=function(t){return this instanceof s?void new s.fn.init(t):a=new s(t)};s.fn=s.prototype={constructor:s,init:function(e){if(e){var n=document.createElement("div"),i=document.createElement("div");n.id="d-wall",i.id="d-wrap",c.genDom(e,n,i),o&&document.body.removeChild(o),r&&document.body.removeChild(r),c.insertDom(n),c.insertDom(i),o=n,r=i,"[object Object]"===Object.prototype.toString.call(e,null)&&t.setTimeout(function(){c.addEvents(e)},400)}},show:function(){function e(i){t.removeEventListener(i.type,e,!1),n.reset.call(n)}var n=this;o&&r&&(n.reset(),o.style.display="block",r.style.display="inline-block",t.addEventListener("resize",e,!1),t.addEventListener("scroll",e,!1))},hide:function(){o&&r&&(o.style.display="none",r.style.display="none")},reset:function(){if(o&&r){r.style.top=(i.clientHeight-r.clientHeight-20)/2+"px",r.style.left=(i.clientWidth-r.clientWidth)/2+"px";var t=document.body.scrollHeight||document.documentElement.scrollHeight;o.style.width=i.clientWidth+"px",o.style.height=t+"px"}}},n.dialog.alert=function(t){var e={};return"string"==typeof arguments[0]&&arguments[0]?(e.title=arguments[1]||"",e.tip=arguments[0],e.btn={val:arguments[2]||"我知道了"}):t&&"object"==typeof t&&(e=t),a=s({type:"alert",icon:e.icon||{url:"http://static.xiaojukeji.com/pinche/images/i-plaint.png",width:"8px",height:"36px"},wrapCss:"background: #fff;width: 280px;text-align: center;",title:{txt:e.title},tip:{txt:e.tip},btns:[{id:"btn-close",kls:"btn-orange",event:"click",val:e.btn&&e.btn.val||"我知道了",handler:function(t){a.hide(),"function"==typeof e.btn.handler&&e.btn.handler(t)}}]}),a.show(),a},n.dialog.confirm=function(t){var e={};"string"==typeof arguments[0]&&arguments[0]?(e.text=arguments[0]||"",e.confirm={},e.confirm.handler=arguments[1]):t&&"object"==typeof t&&(e=t);var n=e.cancel||{},i=e.confirm||{};return a=s({type:"confirm",tip:{txt:e.text},icon:e.icon||{url:"/static/pinche/src/images/i-plaint.png",width:"8px",height:"36px"},wrapCss:"background: #fff;width: 280px;text-align: center;",btns:[{id:n.id||"btn-cancel",val:n.val||"取消",kls:n.kls||"btn-white",event:n.event||"click",handler:function(t){a.hide(),"function"==typeof n.handler&&n.handler(t)}},{id:i.id||"btn-ok",val:i.val||"确定",kls:i.kls||"btn-orange",event:i.event||"click",handler:function(t){a.hide(),"function"==typeof i.handler&&i.handler(t)}}],ext:e.ext}),a.show(),a},n.dialog.loading=function(i){function o(){clearTimeout(n.dialog.loading._timer),a.hide(),"function"==typeof r.hideCB&&r.hideCB()}var r={};return"object"!=typeof arguments[0]?(r.text=arguments[0],r.time=arguments[1]||0):r=i,a=s({type:"loading",wallCss:"",wrapCss:"background:#0c0d0d;opacity:0.7;width:140px;height:140px;",icon:i&&i.icon||{width:"30px",height:"30px",url:"/static/pinche/src/images/loading_2.gif"},tip:{txt:r.text||"正在加载",color:"#fff",size:"14px"}}),a.show(),r.time===e&&(r.time=5e3),0===r.time?o():n.dialog.loading._timer=t.setTimeout(o,r.time),a},n.dialog.flatLoading=function(e){var n={};return"object"!=typeof arguments[0]?(n.text=arguments[0],n.time=arguments[1]||0):n=e,a=s({type:"loading",wallCss:"",wrapCss:"background:#fff;width:140px;height:140px;",icon:e&&e.icon||{width:"30px",height:"30px",url:"/static/pinche/src/images/loading_2.gif"},tip:{txt:n.text||"",color:"#666",size:"14px"}}),a.show(),n.time||(n.time=5e3),t.setTimeout(function(){a.hide(),"function"==typeof n.hideCB&&n.hideCB()},n.time),a},n.dialog.logoLoading=function(t,e){return a=s('<div class="loading-car"><div class="bg"></div><div class="loading-car-icon"></div></div>'),a.show(),t||(t=5e3),setTimeout(function(){a.hide(),"function"==typeof e&&e()},t),a},n.dialog.tip=function(e){var n={};"object"!=typeof arguments[0]?(n.text=arguments[0],n.time=arguments[1]||0):n=e,n.time=parseInt(n.time)||600,a=s({type:"tip",wallCss:"",wrapCss:"background:#0c0d0d;width:140px;height:140px;opacity:0.7;",icon:n.icon||{url:"/static/pinche/src/images/i-plaint.png",width:"8px",height:"36px"},tip:{txt:n.text||"温馨提醒",color:"#fff",size:"14px"}}),a.show(),t.setTimeout(function(){a.hide()},n.time)},n.dialog.Fn=s,t.dd=n}(window);