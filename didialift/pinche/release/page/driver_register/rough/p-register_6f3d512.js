dd.ready(function(){function e(){var e=document.getElementById("carnoSelect");ulEl=e.getElementsByClassName("options")[0];var t=function(){s.ajax({method:"POST",url:"/pinche/cartype/getlicensehead",succFunc:function(t){var a=s.txtToJson(t);if("0"==a.errno){for(var n=a.data,r=a.sort,i="",c=0,o=r.length;o>c;c++)i+='<li data-id="'+r[c]+'" data-show="'+n[r[c]]+'">'+n[r[c]]+"</li>";ulEl.innerHTML+=i,slideSelect_carno(txt_carOne,e,[])}},failFunc:function(){}})};t()}function t(){var e=function(e,t){u[e]=t,localStorage.driver_form=JSON.stringify(u)};txt_realname.addEventListener("change",function(){e("txt_realname",this.value)},!1),txt_licence.addEventListener("change",function(){e("txt_licence",this.value)},!1),txt_carower.addEventListener("change",function(){e("txt_carower",this.value)},!1),txt_carOne.addEventListener("change",function(){e("txt_carOne",txt_carOne.value),e("txt_carOne_id",txt_carOne.getAttribute("data-id"))},!1),txt_carOne2.addEventListener("change",function(){e("txt_carOne2",this.value)},!1),u&&(txt_realname.value=u.txt_realname||"",txt_licence.value=u.txt_licence||"",txt_carower.value=u.txt_carower||"",txt_carOne.value=u.txt_carOne||"",txt_carOne.setAttribute("data-id",u.txt_carOne_id||""),txt_carOne2.value=u.txt_carOne2||"")}function a(){txt_realname.addEventListener("focus",function(){this.className=""},!1),txt_realname.addEventListener("blur",function(){d.is_Chinese_name(this.value)||(this.className="error")},!1),txt_licence.addEventListener("focus",function(){this.className=""},!1),txt_licence.addEventListener("blur",function(){d.is_ID_card(this.value)||(this.className="error")},!1),txt_carower.addEventListener("focus",function(){this.className=""},!1),txt_carower.addEventListener("blur",function(){d.is_Chinese_name(this.value)||(this.className="error")},!1),txt_carOne2.addEventListener("focus",function(){this.className=""},!1),txt_carOne2.addEventListener("blur",function(){d.is_carNo(this.value)||(this.className="error")},!1)}function n(e){var t=function(e,t){l.alert({title:"",tip:t,btn:{handler:function(){e.focus()}}})};if("1"===pageParams.drive_license_changeable){if(!d.is_Chinese_name(e.drive_license_name))return t(txt_realname,"请填写真实姓名"),!1;if(!d.is_ID_card(e.drive_license_number))return t(txt_licence,"身份证号填写错误"),!1}if("1"===pageParams.travel_license_changeable){if(!d.is_Chinese_name(e.travel_license_name))return t(txt_carower,"行驶证姓名填写错误"),!1;if(""==txt_carOne.value)return l.alert("请选择车牌归属地"),!1;if(!d.is_carNo(e.car_license_number))return t(txt_carOne2,"车牌号填写错误"),!1}return!0}function r(e){l.loading("正在请求，请稍后~"),s.ajax({method:"POST",url:pageParams.submit_url,data:e,succFunc:function(e){var t=s.txtToJson(e);"0"==t.errno?(localStorage.removeItem("driver_form"),location.replace(t.url)):"3002"==t.errno?(localStorage.removeItem("driver_form"),location.replace(t.url)):c(function(){l.alert(t.errmsg)})},failFunc:function(){l.alert("网络有点不给力，请稍后再试哦~")}})}function i(e){$(".main").attr("class","main animate begin_animate"),setTimeout(function(){$(".main").attr("class","main animate end_animate")},0),setTimeout(function(){$(".main").attr("class","main ended_animate"),e()},350)}function c(e){$(".main").attr("class","main animate end_animate"),setTimeout(function(){$(".main").attr("class","main animate begin_animate")},0),setTimeout(function(){$(".main").attr("class","main"),e()},450)}function o(e){if(o.data_form=e,_!==!0){_=!0;var t=["driveauthpicurl","travelauthpicurl"],a=[".driving_licence_front",".driving_licence_backend"],n={},i=function(e,r){var i=t.indexOf(e);if(-1!==i){var c=$(a[i]);n[e]=r,c.addClass("photo_uploaded"),c.find(".shadow").css("background-image","url("+r+")"),m.set(e,r)}},c=function(e,r){var i=t.indexOf(e);-1!==i&&($pick_node=$(a[i]),$pick_node.find(".shadow").html("error | "+r.message),$pick_node.removeClass("photo_uploaded"),delete n[e])};addEventListener("error",function(e){$(".driving_licence_backend").find(".shadow").html(e.message)},!1),t.forEach(function(e){var t=m.get(e);t&&i(e,t)}),$(".upload_card").on("click",".file_select",function(e){var n=$(e.currentTarget),r=n.attr("class").trim();if(r=r.split(/\s+/)[1],0!=r){var o=a.indexOf("."+r);if(-1!==o){var s=require("didibridge");s.uploadImage({web_token:pageParams.upload_token},function(e){try{e=JSON.parse(e),i(t[o],e.data.data)}catch(a){c(t[o],a)}},null,pageParams.api_upload_url)}}}),s.touch($(".register_submit")[0],function(){var i,c=!0;if($.each(t,function(e,t){return void 0===n[t]?(i=e,c=!1):void 0}),c===!1){var s=$(a[i]).find(".select_tips").text()||"完整资料";return void l.alert({title:"",tip:"请填写"+s,btn:{handler:function(){}}})}e=$.extend(o.data_form,n),r(e)})}}var s=dd.base,l=dd.dialog,u=s.txtToJson(localStorage.driver_form||{}),d={is_Chinese_name:function(e){var t=/^[\u4E00-\u9FA5]{2,}$/;return t.test(e)?!0:!1},is_ID_card:function(e){var t=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;return t.test(e)===!1?!1:!0},is_carNo:function(e){var t=/^[A-Za-z]{1}[A-Za-z0-9]{5}$/;return t.test(e)?!0:!1}};!function(){e(page_driver.car_province_id),"join"==pageParams.type&&t(),a(),$(btnSubmit).on("click",function(){if("btn-gray"!=btnSubmit.className){for(var e=document.getElementsByTagName("input"),t=0,a=e.length;a>t;t++){var r=e[t];r.setAttribute("readOnly","true"),r.blur()}scrollTo(0,0),setTimeout(function(){for(t=0,a=e.length;a>t;t++){var n=e[t];n.removeAttribute("readOnly")}},100);var c={drive_license_name:txt_realname.value,drive_license_number:txt_licence.value.toLocaleUpperCase(),travel_license_name:txt_carower.value,car_province_id:txt_carOne.getAttribute("data-id"),car_license_number:txt_carOne2.value.toLocaleUpperCase(),phone_number:pageParams.phone||"",token:pageParams.token||"",sign:pageParams.sign||""},s=n(c);s&&i(function(){o(c)})}})}();var _=!1,m={set:function(e,t){try{return localStorage.setItem(e,t),!0}catch(a){return!1}},get:function(e){try{return localStorage.getItem(e)}catch(t){return!1}},remove:function(e){try{return localStorage.removeItem(e),!0}catch(t){return!1}}}});