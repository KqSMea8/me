define("page/driver_register_edition/recertification.js",function(e,r){function a(){for(var e=!0,r=0;r<u.length;r++)u[r]||(e=!1);e?g.attr("class","btn-orange recertification_btn"):g.attr("class","btn-gray recertification_btn")}var t,i=(e("page/driver_register_edition/notice/notice.js"),e("page/driver_register_edition/first/first.js")),n=e("page/driver_register_edition/second/second.js"),o=e("page/driver_register_edition/third/third.js"),c=dd.base,s=dd.dialog,d=[i,o,n],l=function(){},u=[0,0,0];d.forEach(function(e,r){e.$container.on("is_full_fill",function(e){clearTimeout(t),u[r]=e._args,t=setTimeout(a,100)}),e.wakeup({},l,l)});var g=$(".recertification_btn");r.check_filed=function(){for(var e,r=0,a=[],t={};e=d[r++];){if(!(a=e.check_filed()))return!1;$.extend(t,a)}return t},$(".recertification_btn").on("click",function(){var e=r.check_filed();0!=e&&($.ajax({method:"GET",url:pageParams.reg_url,data:$.extend({step:pageParams.reg_step,token:pageParams.upload_data.token},e),success:function(e){var r=c.txtToJson(e);"102"==r.errno?location.replace(pageParams.gologinurl):"0"==r.errno?location.replace(pageParams.successurl):"3002"==r.errno?location.replace(pageParams.successurl):s.alert(r.errmsg)},error:function(){s.alert("网络有点不给力，请稍后再试哦~")}}),$.ajax({method:"GET",url:pageParams.inviteurl,data:{plate:txt_carone.value+e.carcardnumber}}))})});