define("page/driver_register_edition/foot/foot.js",function(){var e=!1,o="";$(".bt_foot").on("click",function(){var a=dd.dialog,r=dd.base;if(e===!0)return void(o&&a.alert(o));e=!0;var t={token:pageParams.upload_data.token,url:encodeURIComponent(location.href.replace(/#.+$/g,""))};r.ajax({method:"POST",url:pageParams.sendurltophone,data:t,succFunc:function(e){var t=r.txtToJson(e);0==t.errno?(o=t.errmsg,a.alert(t.errmsg)):a.alert("请重试")},failFunc:function(){e=!1,a.alert("网络有点不给力，请稍后再试哦~")}})})});