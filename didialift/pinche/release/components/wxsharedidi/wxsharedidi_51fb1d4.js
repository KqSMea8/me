define("wxsharedidi",function(n,e){!function(n,i){if("function"==typeof define&&define.amd)define(["jquery","exports"],function(n,e){i(n,e)});else if("undefined"!=typeof e)i(window.$,e);else{var t=n.jQuery||n.Zepto||n.$;if(!t)throw Error("WxSharedidi: jQuery or Zepto is needed!");n.WxSharedidi=i(t,{})}}(this,function(n,e){function i(e){return u?void e():(s.push(e),void(a||(a=!0,n.ajax({url:"http://res.wx.qq.com/open/js/jweixin-1.0.0.js",dataType:"jsonp",error:function(){n.ajax({url:"http://wap.didialift.com/pinche/wxApi/getJsSdkConfig?url="+encodeURIComponent(location.href),dataType:"jsonp",success:function(n){var e=n;if(e&&"0"==e.errno){var i={debug:!1,appId:"wxab524d83299d6c83",timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]};/debug=1/.test(location.href)&&(console.log("initWxShare"),console.log(i),console.log(shareConfig)),wx.config(i),wx.ready(function(){u=!0;for(var n;n=s.shift();)n()})}},error:function(){}})}}))))}function t(n){i(function(){o(n)})}function o(n){var e=n||{share_title:"顺风出行，期待每一次的不期而遇。",share_content:"滴滴顺风车车主有奖招募中，有车即可参与",share_url:location.href,share_icon_url:"http://static.xiaojukeji.com/pinche/images/share.jpg"};e.callback=n.callback||function(){},wx.onMenuShareAppMessage({title:e.share_title,desc:e.share_content,link:e.share_url,imgUrl:e.share_icon_url,trigger:function(){},success:function(){e.callback()},cancel:function(){},fail:function(){}}),wx.onMenuShareTimeline({title:e.share_title,desc:e.share_content,link:e.share_url,imgUrl:e.share_icon_url,trigger:function(){},success:function(){e.callback()},cancel:function(){},fail:function(){}}),wx.onMenuShareQQ({title:e.share_title,desc:e.share_content,link:e.share_url,imgUrl:e.share_icon_url,trigger:function(){},complete:function(){},success:function(){e.callback()},cancel:function(){},fail:function(){}}),wx.onMenuShareQZone({title:e.share_title,desc:e.share_content,link:e.share_url,imgUrl:e.share_icon_url,success:function(){e.callback()},cancel:function(){}})}function c(){i(function(){wx.hideOptionMenu()})}function r(){i(function(){wx.showOptionMenu()})}var a=!1,u=!1,s=[];return n.extend(e,{initWxShare:t,hideOptionMenu:c,showOptionMenu:r}),e})});