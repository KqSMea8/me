define("page/test/main.js",function(o){var e=o("page/test/wgs2mars.js");setTimeout(function(){console.log(1231),navigator.geolocation?(console.log(13231),navigator.geolocation.getCurrentPosition(function(o){console.log({H5Geolocation:{WGS:o,MARS:e.transformFromWGSToGCJ(o.coords.longitude,o.coords.latitude)}})},function(o){var e=o.code+"\n"+o.message;alert(e)})):console.log("no geolocation")},1e3);var n=dd.base;$.ajax({type:"POST",data:{url:encodeURIComponent(location.href)},url:"/pinche/wxApi/getJsSdkConfig",success:function(o){var e=n.txtToJson(o);if("0"==e.errno){var a={debug:!1,appId:"wxab524d83299d6c83",timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]};wx.config(a),wx.ready(function(){t()})}},error:function(){alert(3)}});var t=function(){console.log("log:getLocation");var o="gcj02";wx.getLocation({type:o,success:function(e){var n="wxbridge("+o+")",t={};t[n]=e,console.log(t);e.latitude,e.longitude,e.speed,e.accuracy}})}});