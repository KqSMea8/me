define("ddbridge",function(e,i,n){var a=["callbackImageLiteratureReviewTakeCamera","callbackImageLiteratureReviewPhotoLibrary","callbackImageLiteratureReview"],r=n.exports=function(e){var i=function(){o(DidiJSBridge),e(DidiJSBridge)};window.DidiJSBridge?i():document.addEventListener("DidiJSBridgeReady",i,!1)},t=!1,o=function(e){if(t===!1){if(t=!0,navigator.userAgent.match(/iphone/i))return e.init&&e.init({});i.callHandler=function(i,n,r){var t,o=Array.prototype.slice.call(arguments,0);if(a.indexOf(i)>-1){if(t="didibridge"+~~(1e6*Math.random()),window[t]=function(){window[t]=void 0,r.apply(null,arguments)},o[2]=void 0,"string"==typeof o[1]){var n=JSON.parse(o[1]);n.callback=t}o[1]=JSON.stringify(n),e.callHandler(o[0],o[1])}else e.callHandler.apply(e,o)}}};n.exports.uploadImage=function(e,n,t){if("function"!=typeof n)throw"must supply callback function";if(void 0===e.url)throw"must supply upload url";var o;switch(t){case"camera":o=a[0];break;case"library":o=a[1];break;default:o=a[2]}var l=$.extend({data:{}},e);r(function(e){var a=e;i.callHandler&&(a=i),a.callHandler(o,JSON.stringify(l),function(e){n(e)})})},n.exports.updateDriverAuth=function(e,i){i=i||function(){},r(function(n){return $.isEmptyObject(e)?i("params is empty"):(n.callHandler("hideProgressHUD",null),n.callHandler("callbackDriverAuthFinished",JSON.stringify(e)),void i(null))})};var l=function(){var e="";return navigator.userAgent.match(/(Android)/i)?e="android":navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)&&(e="ios"),e};n.exports.getAppVersion=function(e){r(function(i){var n=l();if("undefined"!=typeof i){if("android"==n){var a=JSON.parse(i.callHandler("getSystemInfo"));e(a.appversion)}"ios"==n&&i.callHandler("getSystemInfo",JSON.stringify(""),function(i){var n=JSON.parse(i);e(n.appversion)})}})},n.exports.getToken=function(e){console.log(12),r(function(i){var n=l();if("undefined"!=typeof i){if("android"==n){var a=JSON.parse(i.callHandler("getUserInfo"));e(a.token)}"ios"==n&&i.callHandler("getUserInfo",JSON.stringify(""),function(i){var n=JSON.parse(i);e(n.token)})}})}});