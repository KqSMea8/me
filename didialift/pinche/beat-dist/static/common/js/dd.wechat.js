function wx_connect(n){"undefined"==typeof wx?wx_funcs.push(n):n(wx)}function wx_share(n){var e={title:wxShare.title||"顺风出行，期待每一次的不期而遇。",desc:wxShare.desc||"滴滴顺风车车主有奖招募中，有车即可参与",link:wxShare.link||location.href,imgUrl:wxShare.imgUrl||"http://static.xiaojukeji.com/pinche/images/share.jpg"};n.onMenuShareAppMessage({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(){},success:function(){},cancel:function(){},fail:function(){}}),n.onMenuShareTimeline({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(){},success:function(){},cancel:function(){},fail:function(){}}),n.onMenuShareQQ({title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,trigger:function(){},complete:function(){},success:function(){},cancel:function(){},fail:function(){}})
}var wx_funcs=[];!function(){function n(){var n=navigator.userAgent.toLowerCase();return"micromessenger"==n.match(/MicroMessenger/i)?!0:!1}if(n()){var e=dd.base||{};e.loadJS("http://res.wx.qq.com/open/js/jweixin-1.0.0.js",function(){function n(n){e.ajax({method:"POST",data:{url:encodeURIComponent(location.href)},url:"/pinche/wxApi/getJsSdkConfig",succFunc:function(i){var t=e.txtToJson(i);if("0"==t.errno){var c={debug:!1,appId:"wxab524d83299d6c83",timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]};
wx.config(c),wx.ready(function(){for(var e=0,i=n.length;i>e;e++)n[e](wx)})}},failFunc:function(){}})}n(wx_funcs)})}}(),wx_connect(wx_share);