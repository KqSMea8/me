define("didibridge",function(require,exports,module){!function(e,i){"function"==typeof define&&define.amd?define(["exports"],function(e){i(e)}):"undefined"!=typeof exports?i(exports):e.DidiBridge=i({})}(this,function(DidiBridge){function findAction(e){var i=syncCallsWithoutParams.concat(syncCallsWithParams,asyncCallsWithParams);if(!e)return null;for(var n=0;n<i.length;n++)if(i[n].method==e||i[n].alia==e)return i[n];return null}function check(e){if("string"==typeof e&&e&&(e=findAction(e)),!e)return!1;for(var i=getAppVersion(),n=e.version.split(/\s*,\s*/),t=[],r=0;r<n.length;r++)t.push(n[r].split(/\s+/));var a=t[0];"*"==a[0]&&3==a.length?(a[0]="ios",t.push(["android",a[1],a[2]])):"*"==a[0]&&1==a.length?(t.length=0,t=[["ios",">","0"],["android",">","0"]]):"*"!=a[0]&&1==a.length?(t.length=0,t=[[a[0],">","0"],["ios"==a[0]?"android":"ios","<","0"]]):1==t.length&&t.push(["ios"==a[0]?"android":"ios","<","0"]);for(var o,s,r=0;r<t.length;r++)if(a=t[r],s="ios"==a[0]?isIOS:"android"==a[0]?isAndroid:!1,o=compareVersion(i,a[1],a[2]),s&&o)return e;return!1}function _extend(e,i){for(var n in i)e[n]=i[n];return e}function getAppVersion(e){var i=ua;if("object"==typeof e)return e;switch("string"==typeof e&&(i="didi.passenger/"+e),e=(/didi\.passenger\/([\d.]+)/.test(i)?RegExp.$1:"0.0.0").split("."),e.length){case 1:e[1]=e[2]=0;break;case 2:e[2]=0}return{main:e[0]-0,sub:e[1]-0,mini:e[2]-0}}function parseVersionToInt(e){var i=0;return e=getAppVersion(e),i+=1e4*e.main,i+=100*e.sub,i+=1*e.mini}function compareVersion(version1,operator,version2){var v1=parseVersionToInt(version1),v2=parseVersionToInt(version2);return eval(v1+operator+v2)}function connectDidiJSBridge(e){window.DidiJSBridge?(isAndroid&&bugfix&&bugfix.init(),e(DidiJSBridge)):document.addEventListener("DidiJSBridgeReady",function(){isAndroid&&bugfix&&bugfix.init(),e(DidiJSBridge)},!1)}function syncCall(e,i,n){connectDidiJSBridge(function(t){var r=findAction(e);if(isIOS)t.callHandler(r.method,JSON.stringify(i||""),function(e){"function"==typeof n&&n(e)}),r.ioscbk||"function"==typeof n&&n();else{var a=t.callHandler(e,i&&JSON.stringify(i));"function"==typeof n&&n(a)}})}function asyncCall(e,i,n){connectDidiJSBridge(function(t){if(isIOS)t.callHandler(e,JSON.stringify(i||""),function(e){"function"==typeof n&&n(e)});else{var r="didibridge_callback_"+(new Date).getTime();window[r]=function(e){"function"==typeof n&&n(e)};var a=_extend(i||{},{callback:r});t.callHandler(e,JSON.stringify(a))}})}var bugfix=function(){function e(){return void 0===t&&(window.DidiJSBridge=t=i(),n()),window.DidiJSBridge=t}function i(){var e={queue:[],callback:function(){var e=Array.prototype.slice.call(arguments,0),i=e.shift(),n=e.shift();this.queue[i].apply(this,e),n||delete this.queue[i]}};return e.callHandler=function(){var i=Array.prototype.slice.call(arguments,0),n=e.queue;i.unshift("callHandler");for(var t=[],r=1;r<i.length;r++){var a=i[r],o=typeof a;if(t.push(o),"function"==o){var s=n.length;n.push(a),i[r]=s}}var d=JSON.stringify({method:i.shift(),types:t,args:i}),c=prompt(d),l=JSON.parse(c);if(200!=l.code)throw"DidiJSBridge call error, code:"+l.code+", message:"+l.result;return l.result},e}function n(){var e=document.createEvent("HTMLEvents");e.initEvent("DidiJSBridgeReady",!1,!1),document.dispatchEvent(e)}var t;return{init:e}}(),ua=navigator.userAgent,isIOS=/(?:iPhone|iPad|iPod).*OS\s[\d_]+/.test(ua),isAndroid=/Android;?[\s\/]+[\d.]+?/.test(ua),syncCallsWithoutParams=[{method:"getUserInfo",version:"*",ioscbk:1},{method:"getSystemInfo",version:"*",ioscbk:1},{method:"getLocationInfo",version:"*",ioscbk:1},{method:"callNativeLogin",version:"*"},{alia:"closePage",method:"page_close",version:"*"},{alia:"refreshPage",method:"page_refresh",version:"*"},{alia:"showEntrance",method:"show_entrance",version:"*"},{alia:"hideEntrance",method:"hide_entrance",version:"*"},{alia:"invokeEntrance",method:"invoke_entrance",version:"*"}],syncCallsWithParams=[{alia:"initEntrance",method:"init_entrance",version:"*"},{alia:"shareWxTimeline",method:"share_weixin_timeline",version:"*"},{alia:"shareWxAppmsg",method:"share_weixin_appmsg",version:"*"},{alia:"shareQQAppmsg",method:"share_qq_appmsg",version:"*"},{alia:"shareQZone",method:"share_qzone",version:"*"},{alia:"shareSinaWeibo",method:"share_sina_weibo",version:"*"},{alia:"openUrl",method:"open_url",version:"ios"},{method:"beatlesCommunicate",version:"*",ioscbk:1}],asyncCallsWithParams=[{alia:"uploadImageBySelect",method:"callbackImageLiteratureReview",version:"ios >= 3.9.5, android >= 3.9.4"},{alia:"uploadImageByCamera",method:"callbackImageLiteratureReviewTakeCamera",version:"ios >= 3.9.5, android >= 3.9.4"},{alia:"uploadImageByPhotoLibrary",method:"callbackImageLiteratureReviewPhotoLibrary",version:"ios >= 3.9.5, android >= 3.9.4"},{method:"resizeImage",version:"ios >= 4.0, android >= 3.9.5"}];return connectDidiJSBridge(function(e){window.DidiBeatlesJSBridge=e,isIOS&&e.init&&e.init(),e._beatlesCommunicate=function(e,i){if(e&&e.header){var n=e.header,t=n.event_key;if(t){var r=document.createEvent("Event");r.initEvent(t),r.data=JSON.parse(e),document.dispatchEvent(r)}}i&&i('{"test": "ok"}')},isIOS&&e.registerHandler("_beatlesCommunicate",e._beatlesCommunicate)}),function(){var e,i;e=syncCallsWithoutParams,i=e.length;for(var n=0;i>n;n++)!function(){var i=e[n];DidiBridge[i.alia||i.method]=function(e){check(i)&&syncCall(i.method,"",e)}}();e=syncCallsWithParams,i=e.length;for(var n=0;i>n;n++)!function(){var i=e[n];DidiBridge[i.alia||i.method]=function(e,n){check(i)&&syncCall(i.method,e,n)}}();e=asyncCallsWithParams,i=e.length;for(var n=0;i>n;n++)!function(){var i=e[n];DidiBridge[i.alia||i.method]=function(e,n){check(i)&&asyncCall(i.method,e,n)}}()}(),_extend(DidiBridge,{appVersion:getAppVersion(),connect:connectDidiJSBridge,check:check,compareVersion:compareVersion}),DidiBridge})});