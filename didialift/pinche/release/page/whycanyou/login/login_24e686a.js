define("page/whycanyou/login/login.js",function(n,o,e){var i=n("tool"),l=Zepto(".layer_login"),t=l.find.bind(l);t.__proto__=Zepto;var a,r,d=t("#phone_input"),u=t(".login_confire_btn"),c=t(".lagin_layer_close"),h=i.parseEqual(location.search.slice(1)).channel;o=e.exports=function(n){return r=n,e.exports},o.show=function(n,o){"function"==typeof n&&(o=n,n=null),n&&t(".login_title").html(n),a=o,l.show()},l.on("touchmove",function(n){n.preventDefault()}),u.on("click",function(){return null==i.regular.is_phone_number(d.val().trim())?(l.hide(),void dd.dialog.alert({tip:"请输入正确的手机号码",btn:{val:"确定",handler:function(){l.show()}}})):(dd.dialog.loading("正在提交",5e3),void t.ajax({type:"POST",url:r,data:{phone:d.val(),channel:h},timeout:"5000",success:function(n){var o=JSON.parse(n);0==o.errno?(dd.dialog.loading("正在提交",0),a(),l.hide()):dd.dialog.alert(o.errmsg)},error:function(){l.hide(),dd.dialog.alert({tip:"网络请求失败,请稍后重试",btn:{val:"确定",handler:function(){l.show()}}})}}))}),c.on("click",function(n){d.blur(),l.hide(),n.preventDefault()})});