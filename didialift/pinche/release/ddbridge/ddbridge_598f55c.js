define("ddbridge/ddbridge.js",function(i,e,a){a.exports=window.Didibridge=function(){};var r=["callbackImageLiteratureReviewTakeCamera","callbackImageLiteratureReviewPhotoLibrary","callbackImageLiteratureReview"];Didibridge.uploadImage=function(i,a,t){if("function"!=typeof a)throw"must supply callback function";if(void 0===i.url)throw"must supply upload url";var l;switch(t){case"camera":l=r[0];break;case"library":l=r[1];break;default:l=r[2]}var d=$.extend({data:{}},i);n(function(i){var r=i;e.callHandler&&(r=e),r.callHandler(l,JSON.stringify(d),function(i){a(i)})})},a.exports.updateDriverAuth=function(i,e){e=e||function(){},n(function(a){return $.isEmptyObject(i)?e("params is empty"):(a.callHandler("hideProgressHUD",null),a.callHandler("callbackDriverAuthFinished",JSON.stringify(i)),void e(null))})};var n=function(i){var e=function(){l(DidiJSBridge),i(DidiJSBridge)};window.DidiJSBridge?e():document.addEventListener("DidiJSBridgeReady",e,!1)},t=!1,l=function(i){if(t===!1){if(t=!0,navigator.userAgent.match(/iphone/i))return i.init&&i.init({});e.callHandler=function(e,a,n){var t,l=Array.prototype.slice.call(arguments,0);if(r.indexOf(e)>-1){if(t="didibridge"+~~(1e6*Math.random()),window[t]=function(){window[t]=void 0,n.apply(null,arguments)},l[2]=void 0,"string"==typeof l[1]){var a=JSON.parse(l[1]);a.callback=t}l[1]=JSON.stringify(a),i.callHandler(l[0],l[1])}else i.callHandler.apply(i,l)}}}});