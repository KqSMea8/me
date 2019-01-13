define("ddplayer/player/mediaPlayer.js",function(t,e,o){"use strict";var a=t("ddplayer/base/console.js"),i=t("ddplayer/base/vars.js"),n=function(t){this.videoTag=null,this.$video=null,this.cache=null,this.videoData=null,this.config=null,this.videoList=null,this.currentTime=0,this.duration=0,this._loadedDomFlag=!1,this._timeoutFlag=!1,this._getDataFlag=!1,this._playCheckFlag=!1,this._playCheckTime=6e3,this._init(t)};n.prototype.eventProcess={pause:[],ended:[],userEnded:[],error:[],play:[],playing:[],timeupdate:[]},n.prototype.eventList=["loadedvideodata","loadstart","progress","suspend","abort","error","stalled","play","playing","pause","loadedmetadata","loadeddata","waiting","canplay","canplaythrough","seeking","seeked","timeupdate","ended","ratechange","durationchange","volumechange"],n.prototype.getSrc=function(){return this.$video.attr("src")},n.prototype.setSrc=function(t){this.$video.attr("src",t)},n.prototype.getVolume=function(){return this.videoTag.volume},n.prototype.setVolume=function(t){$.isNumber(t)&&(t=0>t?0:t,t=t>1?1:t,a.log("音量:",t),this.videoTag.volume=t)},n.prototype.getPoster=function(){return this.cache.poster||""},n.prototype.setPoster=function(t){this.changePoster(t)},n.prototype.getPreLoad=function(){return this.$video.attr("preload")},n.prototype.setPreLoad=function(t){this.$video.attr("preload",t)},n.prototype._init=function(){},n.prototype._addEvent=function(){},n.prototype._removeEvent=function(){},n.prototype._fireEvent=function(){},n.prototype._pause=function(){var t=this;this._onDomLoaded(function(){null===t.$video.attr("data-noSupport")&&t.videoTag.pause()})},n.prototype._play=function(){var t=this,e=function(){if(null===t.$video.attr("data-noSupport"))try{if(!this._playCheckFlag&&this.config.autoplay){this._playCheckFlag=!0;var e=0,o=200,a=setInterval(function(){e+=o;var i=e>=t._playCheckTime;(i||t.currentTime>1)&&(i&&(t.pause(),t.$video.trigger("pause")),clearInterval(a))},o)}null!==t.$video.attr("preload")&&t.$video.removeAttr("preload"),t.videoTag.play()}catch(i){t.$video.one("canplay",function(){t.videoTag.paused&&t.videoTag.play()})}};this._onDomLoaded(e)},n.prototype._playOrPause=function(){},n.prototype.pause=function(){var t=this;this._onDomLoaded(function(){t._playOrPause("pause")})},n.prototype.play=function(){var t=this;this._onDomLoaded(function(){t._playOrPause("play")})},n.prototype.seekTo=function(t){var e=this,o=function(t){try{e.videoTag.currentTime=t,e.videoTag.paused&&e.videoTag.play()}catch(o){e.$video.one("canplay",function(){e.videoTag.currentTime=t,e.videoTag.paused&&e.videoTag.play()})}},a=this.cache.srcList[this.cache.modeType];if(/Android\s4\./i.test(i.UA)&&!i.IsBaiduBrowser&&this._showLoading(),1===a.length)o(t);else{var n=0;$.each(a,function(a,i){if(n+i.duration>t){var r=e.cache;if(a!==r.curIndex){r.curIndex=a;var p=i.url;r.curPlayUrl=p,e.setSrc(p)}return t-=n,setTimeout(function(){o(t)},300),!1}n+=i.duration})}},n.prototype.on=function(){},n.prototype.off=function(){},n.prototype.trigger=function(){},n.prototype.one=function(){},n.prototype.htmlTo=function(){},n.prototype.playByMode=function(){},n.prototype.updateMedia=function(){},n.prototype.changePoster=function(){},n.prototype._onDomLoaded=function(t){var e=this;if(this._loadedDomFlag)t.call(this);else var o=setInterval(function(){e._loadedDomFlag&&(clearInterval(o),t.call(e))},100)},o.exports=n});