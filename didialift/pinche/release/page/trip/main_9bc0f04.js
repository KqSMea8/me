define("page/trip/main.js",function(e){"use strict";var n=e("ddplayer"),i=e("didibridge"),a=n.vars,t=e("didimonitor"),r=function(){n.ready(function(e){var n=location.href.replace(/[?#].*/g,""),r={param:{playerConId:"playerWrap",playerConfig:{data:window.videoData||{},autoplay:!1},clsBodyBg:"js_body_bg",clsBodyBgPlayed:"js_body_bg_played",clsBtnGet:"js_power_get",idBtnShare:"btnShare",isPlayed:!1,idWrongLayer:"wrongLayer",wxShareConfig:{link:n,img_url:"http://static.xiaojukeji.com/pinche/release/page/trip/img/share_ed5cb12.jpg",title:"最sexy的城市出行方式！新技能get",desc:"最经济，最有趣！城市出行sexy秘籍！",weibo_desc:"最经济，最有趣！城市出行sexy秘籍！-滴滴 (来自@滴滴顺风车) http://t.cn/RyVFtQ4"},shareConfig:{share_url:n,share_img_url:"http://static.xiaojukeji.com/pinche/release/page/trip/img/share_ed5cb12.jpg",share_icon_url:"http://static.xiaojukeji.com/pinche/release/page/trip/img/share_ed5cb12.jpg",share_title:"最sexy的城市出行方式！新技能get",share_content:"最经济，最有趣！城市出行sexy秘籍！",weibo_desc:"最经济，最有趣！城市出行sexy秘籍！-滴滴 (来自@滴滴顺风车) http://t.cn/RyVFtQ4"}},model:{player:null},view:{},ctrl:{}},o=r.param,s=r.model,c=(r.view,r.ctrl);o.init=function(){return $.isFunction(e)?0===$("#"+o.playerConId).length?!1:!0:!1},s.initEntranceConfig=function(){o.entranceConfig={entrance:{icon:"http://static.xiaojukeji.com/api/img/i-webview-entrance.png"},buttons:[{type:"share_weixin_timeline",name:"分享到微信朋友圈",data:o.shareConfig,callback:function(){}},{type:"share_weixin_appmsg",name:"分享给微信好友",data:o.shareConfig,callback:function(){}},{type:"share_sina_weibo",name:"分享到新浪微博",data:$.extend({},o.shareConfig,{share_content:o.shareConfig.weibo_desc||o.shareConfig.desc}),callback:function(){}},{type:"share_qq_appmsg",name:"分享给QQ好友",data:o.shareConfig,callback:function(){}},{type:"share_qzone",name:"分享到QQ空间",data:o.shareConfig,callback:function(){}},{type:"page_refresh",name:"刷新"}]}},c.init=function(){if(o.init()){window.ddplayer=s.player=new e(o.playerConfig),o.$btnGet=$("."+o.clsBtnGet),o.$btnShare=$("#"+o.idBtnShare),o.$wrongLayer=$("#"+o.idWrongLayer),c.eventInit(),s.player.htmlTo($("#"+o.playerConId)),a.IsDiDiBrowser&&(s.initEntranceConfig(),i.initEntrance(o.entranceConfig),i.showEntrance(),o.$btnShare.show()),$("body").css("height",$(window).height());var n=t.sendBeatles;n("sfc-video-150922_index_sw",null,!0)}},c.eventInit=function(){var e=c.process;s.player.on("play",function(){o.isPlayed||($("body").addClass("played"),o.$btnGet.hide(),o.isPlayed=!0)}),o.$btnGet.on(a.END_EVENT,function(){s.player&&s.player.$midPlay.trigger(a.END_EVENT)}),s.player.on("ended",function(){return e.ended(),!1}),e.share(),e.orient()},c.process={},c.process.ended=function(){},c.process.share=function(){o.$btnShare.on(a.END_EVENT,function(){i&&i.invokeEntrance()}),initWxShare(o.wxShareConfig)},c.process.orient=function(){$(window).bind("orientationchange",function(){0==window.orientation||180==window.orientation?(o.$wrongLayer.hide(),$("html").removeClass("orientation")):90!=window.orientation&&-90!=window.orientation||o.isPlayed?(s.player.$ctrlFullScreen.trigger(a.END_EVENT),$("html").addClass("orientation")):o.$wrongLayer.show()})},c.init()})};r()});