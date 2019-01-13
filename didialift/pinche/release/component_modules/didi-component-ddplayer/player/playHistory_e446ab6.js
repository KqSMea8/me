define("didi-component-ddplayer/player/playHistory.js",function(t,i,e){"use strict";var r=t("store"),a={param:{localHistoryName:"dd_video_history",maxSize:20,checkArr:["sid","vid","site","playTime","duration"],paramArr:["sid","vid","site","cid","playTime","duration","sysTime","title"]},model:{localDataStr:""},view:{},ctrl:{}},o=a.param,n=a.model,s=(a.view,a.ctrl);n.historyCheck=function(t){var i=!0;return $.each(o.checkArr,function(e,r){return"undefiend"==typeof t[r]?(i=!1,!1):void 0}),i},n.objToStr=function(t){var i=[],e=!1;try{var r=parseInt(t.duration,10),a=parseInt(t.playTime,10);a/r>.97&&(e=!0)}catch(n){}return e?"finished":(t.sysTime=Date.now(),$.each(o.paramArr,function(e,r){if("playTime"===r)try{t[r]=parseInt(t[r],10)}catch(a){}t[r]=t[r]?t[r]:"",i.push(encodeURIComponent(t[r]))}),i.join(","))},n.strToObj=function(t){var i=null;if("string"==typeof t&&"null"!==t&&""!==t){var e=t.split(",");i={},$.each(o.paramArr,function(t,r){i[r]="playTime"===r||"duration"===r||"sysTime"===r||"flag"===r||"sid"===r?parseInt(e[t],10):decodeURIComponent(e[t])})}return i},n.strToArr=function(t){var i=[];if("string"==typeof t&&""!==t&&"null"!==t){0===t.indexOf("|")&&(t=t.substr(1));var e=t.split("|");$.each(e,function(t,e){i.push(n.strToObj(e))})}return i},s.setHistory=function(t){if(n.historyCheck(t)){var i=n.objToStr(t);""===n.localDataStr&&(n.localDataStr=r.get(o.localHistoryName)||"");var e=""!==n.localDataStr?n.localDataStr.split("|"):[],a=","+t.vid+","+t.site+",";if("finished"!==i&&-1===n.localDataStr.indexOf(a))e.unshift(i);else{var s=[];"finished"!==i&&s.push(i),$.each(e,function(t,i){-1===i.indexOf(a)&&s.push(i)}),e=s}e.length>o.maxSize&&(e.length=o.maxSize),n.localDataStr=e.join("|"),r.set(o.localHistoryName,n.localDataStr)}},s.getHistory=function(t){var i=[],e=n.localDataStr&&""!==n.localDataStr?n.localDataStr:r.get(o.localHistoryName);if(e&&"undefined"!=typeof t){if("undefined"!=typeof t.vid&&"undefined"!=typeof t.site){var a=new RegExp("(^|\\|)\\d+,"+t.vid+","+t.site+"(,[\\w\\.\\W]*){6}","ig"),s=e.match(a)+"";i=n.strToObj(s),i=null===i?[]:[i]}else if("undefined"!=typeof t.sid){var d=n.strToArr(e);$.each(d,function(e,r){r.sid+""==t.sid+""&&i.push(r)}),("undefiend"==typeof t.type||0===t.type||1!==t.type)&&(i.length=1)}}else i=n.strToArr(e);return i},window.DiDiVideoJSBridge=window.DiDiVideoJSBridge||{},window.DiDiVideoJSBridge.setHistory=s.setHistory,window.DiDiVideoJSBridge.getHistory=s.getHistory,e.exports={setHistory:s.setHistory,getHistory:s.getHistory}});