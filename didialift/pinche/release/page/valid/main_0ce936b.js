define("page/valid/main.js",function(){var e=function(){for(var e=location.search.split(/(\?|&)/),n={},a=0;a<e.length;a++)if(-1!=e[a].indexOf("=")){var t=e[a].split("=");n[t[0]]=t[1]}return n},n=function(){var e="";return navigator.userAgent.match(/(Android)/i)?e="android":navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)&&(e="ios"),e},a=function(e){window.DidiJSBridge?e(DidiJSBridge):document.addEventListener("DidiJSBridgeReady",function(){e(DidiJSBridge)},!1)},t=function(e){a(function(a){var t={},r=n();if("undefined"!=typeof a){if("android"==r){var o=JSON.parse(a.callHandler("getUserInfo")),i=JSON.parse(a.callHandler("getSystemInfo"));t={token:o.token,appversion:i.appversion},e(t)}if("ios"==r){var l=function(){t.token&&t.appversion&&e(t)};a.init&&a.init(),a.callHandler("getUserInfo",JSON.stringify(""),function(e){var n=JSON.parse(e);t.token=n.token,l()}),a.callHandler("getSystemInfo",JSON.stringify(""),function(e){var n=JSON.parse(e);t.appversion=n.appversion,l()})}}})},r=function(){var n=e();return"token"in n?!0:(t(function(e){n.token=e.token;var a="?";for(var t in n)"?"!=a&&(a+="&"),a+=t+"="+n[t];location.search=a}),!1)};dd.ready(function(){r();var e=document,n=dd.base,a=dd.dialog,t=e.getElementById("openid").value,o=e.getElementById("p_getsmscode_url").value,i=e.getElementById("p_login_url").value,l=e.getElementById("type").value,c=e.getElementById("channel").value,s=e.getElementById("phone"),u=e.getElementById("code"),d=e.getElementById("btnSubmit"),f=e.getElementById("btnCheck"),g=60,v=function(e){return/^1[3|4|5|8|7][0-9]\d{8}$/.test(e)?!0:!1};s.addEventListener("input",function(e){var n=s;n.value=n.value.replace(/[^\d]/g,"").slice(0,11),f.className=v(n.value)?"btn-orange fr":"btn-gray fr",m(e)},!1),u.addEventListener("input",function(e){m(e)},!1);var m=function(){var e=u;e.value=e.value.replace(/[^\d]/g,"").slice(0,4),d.className=4==e.value.length&&v(s.value)?"btn-orange":"btn-gray"};n.touch(f,function(){function e(){return 0==g?(f.className="btn-orange fr",f.innerHTML="验证","btn-orange"==d.className,"change"!==l&&(s.disabled=""),void(g=60)):("btn-gray"==d.className,f.className="btn-gray fr",f.innerHTML=g+"s",g--,void setTimeout(function(){e()},1e3))}"btn-gray fr"!=f.className&&(s.disabled="true",f.className="btn-gray fr",e(),n.ajax({method:"GET",url:o+s.value,succFunc:function(e){var t=n.txtToJson(e);0==t.errno?u.focus():1008==t.errno?(a.alert("您将来接到电话通知您验证码，请注意查收"),u.focus()):(f.className="btn-orange fr",s.disabled="false",a.alert(t.errmsg))},failFunc:function(){f.className="btn-orange fr",a.alert("网络请求失败，请稍后重试"),s.disabled="false"}}))}),n.touch(d,function(){if("btn-gray"!=d.className){d.className="btn-gray",u.readOnly="readOnly",u.blur(),setTimeout(function(){u.readOnly="",u.blur()},100);var e=""==c?"":"&channel="+c;e+='<?php echo isset($regfrom) ? "&regfrom=$regfrom" : "" ?>',n.ajax({method:"POST",url:i+"&phone="+s.value+e,data:{lat:"116.30786072065",lng:"40.045781758746",channel:c,regfrom:"<?php echo isset($regfrom) ? $regfrom : '';?>",phone:s.value,code:u.value,openid:t},succFunc:function(e){var t=n.txtToJson(e);0==t.errno?location.replace(t.next_url):9999==t.errno?location.replace(t.url):a.alert(t.errmsg)},failFunc:function(){a.alert("网络请求失败，请稍后重试")}})}}),function(){11==s.value.length&&(f.className="btn-orange fr"),setTimeout(function(){s.focus()},100)}()})});