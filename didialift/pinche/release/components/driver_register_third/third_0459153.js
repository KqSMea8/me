define("driver_register_third/third.js",function(a,t){function e(){function a(a){var i=e.txtToJson(a),n=txt_carone.getAttribute("name"),o=pageParams.filed_list[n].value;o=o in i.data?o:"",o=o||g.get(n)||"1",$("#txt_carone").data("id",o);var l=i.data[o];if(txt_carone.value=l||g.get(n+"_zh"),"0"==i.errno){for(var s=i.data,u=i.sort,f="",_=0,p=u.length;p>_;_++)f+='<li data-id="'+u[_]+'" data-show="'+s[u[_]]+'">'+s[u[_]]+"</li>";if(ulEl.innerHTML+=f,c(),!r(txt_carone))return void txt_carone.setAttribute("disabled","");d(txt_carone,t,[])}}var t=document.getElementById("carnoSelect"),e=dd.base;ulEl=t.getElementsByClassName("options")[0];var i=function(){e.ajax({method:"POST",url:"/pinche/cartype/getlicensehead",succFunc:a,failFunc:function(){}})};i()}function r(a){return"string"!=typeof a&&(a=a.getAttribute("name")),1==pageParams.filed_list[a].changeable}function i(a){return"string"!=typeof a&&(a=a.getAttribute("name")),3==pageParams.filed_list[a].verify}function n(){v&&s.show_step_carinfo(),i("carcardnumber")&&r("carcardnumber")&&p.addClass("verify_failed");var n=p.find("#car_type");h.forEach(function(a){n.attr("data-"+a,pageParams.filed_list[a].value||g.get(a))}),n.val((pageParams.filed_list[h[0]].zhvalue||"")+" "+(pageParams.filed_list[h[1]].zhvalue||"")+" "+(pageParams.filed_list[h[2]].zhvalue||g.get(h[0]+"_zh")||""));var d=p.find("#txt_carnumber"),u=d.attr("name");d.val(pageParams.filed_list[u].value||g.get(u)).attr("disabled",r(u)?null:"");var _=p.find("#txt_carone");u=_.attr("name"),_.attr("data-id",pageParams.filed_list[u].value||g.get(u)||"1"),e();var m=car_type.getAttribute("name").split(",")[0];if(r(m)===!1)car_type.setAttribute("disabled","");else{var b=p.find("#car_type").on("click",function(t){function e(a){r.value=a.carInfo;$.each(a.value,function(t,e){var i;switch(t){case"color":i=h[2];break;case"brand":i=h[0];break;case"type":i=h[1]}r.setAttribute("data-"+i,e.id),g.save_cache(i,e.id),g.save_cache(i+"_zh",a.carInfo),c()})}var r=this;t.preventDefault(),t.stopPropagation(),a("carchoose"),$.didiCarChoose({brandsURL:pageParams.getcarbrand,typesURL:pageParams.getcartype,colorsURL:pageParams.getcolor,onselect:e})});b.on("focus",function(){b.blur()})}p.find(".next_btn").on("click",function(){function e(t){var e=n.txtToJson(t);if("102"==e.errno)location.replace(pageParams.gologinurl);else{if("0"!=e.errno&&"3002"!=e.errno)return e.errno in l?void i.confirm({title:l[e.errno].title,text:l[e.errno].text,confirm:{val:l[e.errno].confirm_val,handler:function(){location.href=l[e.errno].confirm_url}}}):i.alert(e.errmsg);a("didibridge").updateDriverAuth({userAuthState:"1",car_auth_state:"1"}),pageParams.flag_showsecondstep||s.click_outappstep02_finishbutton(),setTimeout(function(){g.clean(),o()},100)}f.closeLoading()}var r=t.check_filed();if(0!=r){var i=dd.dialog,n=dd.base,c="车牌：{carbrand} 已注册，请确认车牌是否正确。如仍需注册该车牌，请申诉。";c=c.replace(/\{carbrand\}/,$("#txt_carone").val()+r.carcardnumber);var l={6010:{title:"",text:"该身份证已被注册，如果仍需注册，请进行申诉。",confirm_val:"我要申诉",handler_url:"http://static.xiaojukeji.com/didialift/hybrid/pages/help/help-accountDatumOQ06.html"},6009:{title:"",text:c,confirm_val:"我要申诉",confirm_url:"http://static.xiaojukeji.com/didialift/hybrid/pages/help/help-accountDatumOQ07.html"}};f.showLoading(),$.ajax({type:"GET",url:pageParams.reg_url,data:$.extend({step:2,token:pageParams.upload_data.token,regfrom:pageParams.regfrom},r),success:e,error:function(){i.alert("网络有点不给力，请稍后再试哦~")}}),$.ajax({method:"GET",dataType:"jsonp",url:pageParams.inviteurl,data:{plate:txt_carone.value+r.carcardnumber}})}}),p.find(".previous_btn").on("click",function(){l()}),p.find("#txt_carone").on("change",function(){g.save_cache(this.getAttribute("name"),this.getAttribute("data-id")),g.save_cache(this.getAttribute("name")+"_zh",this.value)}),p.find("#txt_carnumber").on("blur",function(){var a=p.find("#txt_carnumber");f.regular.is_carNo(this.value)===!1?(f.warning("请填写正确的"+this.getAttribute("placeholder")),f.warning_text(a)):(a.val(a.val().toUpperCase()),g.save_cache(this.name,this.value)),c()},!1),p.one("touchstart",function(){p.removeClass("verify_failed")})}function c(){for(var a=0;a<b.length;a++)if(r(b[a].getAttribute("name").split(",")[0])!==!1&&0==("string"==typeof x[a]?b[a].getAttribute(x[a]):x[a]()))return void p.trigger("is_full_fill",!1);p.trigger("is_full_fill",!0)}var o,l,d=a("driver_register_third/select.js"),s=a("log"),u=!1,f=a("driver_register_tool"),_=dd.dialog,g=f.localCache.instance("driver_register_third"),p=t.$container=$(".form_third");t.wakeup=function(a,t,e){o=function(){f.warning.close(),t()},l=function(){f.warning.close(),e()},u===!1&&(u=!0,n(),c())};var v=!1;t.log_when_show=function(a){v=a};var m={carprovinceid:"车省号",carcardnumber:"车牌号",carbrandid:"品牌号",cartypeid:"车型号",carcolorid:"车颜色"},h=["carbrandid","cartypeid","carcolorid"];t.check_filed=function(){var a=p.find("#car_type"),t={carprovinceid:p.find("#txt_carone"),carcardnumber:p.find("#txt_carnumber"),carbrandid:a,cartypeid:a,carcolorid:a},e={carprovinceid:t.carprovinceid.attr("data-id"),carcardnumber:t.carcardnumber.val(),carbrandid:a.attr("data-carbrandid"),cartypeid:a.attr("data-cartypeid"),carcolorid:a.attr("data-carcolorid")};for(var i in e)if(r(t[i][0].getAttribute("name").split(",")[0])!==!1){if("carcardnumber"==i){if(f.regular.is_carNo(e[i])===!1)return _.alert("请填写正确"+m[i]||""),!1}else if(0==e[i])return _.alert("请填写正确"+m[i]||""),!1}else delete e[i];return e};var b=[txt_carone,txt_carnumber,car_type],x=["data-id",function(){return f.regular.is_carNo(txt_carnumber.value)},"data-carbrandid"]});