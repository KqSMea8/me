define("ddbridge/ddbridge.js",function(i,e,n){n.exports=window.Didibridge=function(){};var a=["callbackImageLiteratureReviewTakeCamera","callbackImageLiteratureReviewPhotoLibrary","callbackImageLiteratureReview"],r=function(i){var e=function(){o(DidiJSBridge),i(DidiJSBridge)};window.DidiJSBridge?e():document.addEventListener("DidiJSBridgeReady",e,!1)},t=!1,o=function(i){if(t===!1){if(t=!0,navigator.userAgent.match(/iphone/i))return i.init&&i.init({});e.callHandler=function(e,n,r){var t,o=Array.prototype.slice.call(arguments,0);if(a.indexOf(e)>-1){if(t="didibridge"+~~(1e6*Math.random()),window[t]=function(){window[t]=void 0,r.apply(null,arguments)},o[2]=void 0,"string"==typeof o[1]){var n=JSON.parse(o[1]);n.callback=t}o[1]=JSON.stringify(n),i.callHandler(o[0],o[1])}else i.callHandler.apply(i,o)}}};Didibridge.uploadImage=function(i,n,t){if("function"!=typeof n)throw"must supply callback function";if(void 0===i.url)throw"must supply upload url";var o;switch(t){case"camera":o=a[0];break;case"library":o=a[1];break;default:o=a[2]}var d=$.extend({data:{}},i);r(function(i){var a=i;e.callHandler&&(a=e),a.callHandler(o,JSON.stringify(d),function(i){n(i)})})},n.exports.updateDriverAuth=function(i,e){e=e||function(){},r(function(n){return $.isEmptyObject(i)?e("params is empty"):(n.callHandler("hideProgressHUD",null),n.callHandler("callbackDriverAuthFinished",JSON.stringify(i)),void e(null))})};var d=function(){var i="";return navigator.userAgent.match(/(Android)/i)?i="android":navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)&&(i="ios"),i};n.exports.getAppVersion=function(i){r(function(e){var n=d();if("undefined"!=typeof e){if("android"==n){var a=JSON.parse(e.callHandler("getSystemInfo"));i(a.appversion)}"ios"==n&&e.callHandler("getSystemInfo",JSON.stringify(""),function(e){var n=JSON.parse(e);i(n.appversion)})}})},n.exports.getToken=function(i){r(function(e){var n=d();if("undefined"!=typeof e){if("android"==n){var a=JSON.parse(e.callHandler("getUserInfo"));i(a.token)}"ios"==n&&e.callHandler("getUserInfo",JSON.stringify(""),function(e){var n=JSON.parse(e);i(n.token)})}})}});