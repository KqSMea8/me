!function(e){if(e.isArray=Array.isArray||function(e){return e instanceof Array},console||(console={}),!console.overlay_check){console.overlay_check=!0,console.log||(console.log=function(){}),console.trace||(console.trace=function(){}),old_console_log=console.log,old_console_trace=console.trace;var t=document.createElement("DIV"),n=["position: fixed","top: 60px","bottom: 20px","right: 30px","left: 30px","padding: 10px","overflow: auto","-webkit-overflow-scrolling: touch","color: #FAFAFA","background-color: #444","opacity: 0.9","z-index: 1000000"];t.style.cssText=n.join(";");var o=!0;t.addEventListener("click",function(){o?(o=!1,this.style.opacity="0.65"):(o=!0,this.style.opacity="1")},!1);var i=document.createElement("DIV");n=["position:fixed","top: 60px","height: 25px","right: 30px","width: 25px","text-align: center","color: #FAFAFA","background-color: #444","opacity: 1","z-index: 1000001"],i.style.cssText=n.join(";");var c=!1;i.addEventListener("click",function(){c?(c=!1,i.style.opacity="1",i.innerHTML="—",t.style.display="block"):(c=!0,i.style.opacity="0.65",i.innerHTML="+",t.style.display="none")},!1);var r=document.createElement("DIV");n=["position: fixed","right: 0px","left: 0px"],r.style.cssText=n.join(";");var a=1,s=0,l=[],d=document.createElement("DIV"),p="-----ERROR-----",f=120,x="rgb(253, 251, 240)",u="#fff",h="#ccc",v="#bfb",y="#bbf",g="#bff",b=g,m=function(t,n){if(e.isArray(t))return"[object Array] ("+t.length+")";var o=String(t),i=!1;return n&&(o=o.substr(0,n),o.length===n&&(i=!0)),o=d.innerHTML=o,i&&(o+="...(Click)"),o},w=function(e,t){e.addEventListener("click",function(n){n.stopPropagation(),e.text_expanded?(e.innerHTML=m(t,f),e.text_expanded=!1):(e.innerHTML=m(t,!1),e.text_expanded=!0)},!1)},_=function(e,t){e.addEventListener("click",function(n){if(n.stopPropagation(),e.$expandable_contents)e.$expandable_contents.parentNode.removeChild(e.$expandable_contents),delete e.$expandable_contents;else{e.$expandable_contents=document.createElement("DIV"),e.$expandable_contents.appendChild(E(t));var o=e.parentNode;e.nextElementSibling?o.insertBefore(e.$expandable_contents,e.nextElementSibling):o.appendChild(e.$expandable_contents)}},!1)},A=function(t){var n=document.createElement("SPAN"),o="#fff";return null===t?(n.text("null"),o=h):void 0===t?(n.text("undefined"),o=h):t===!0?(n.text("true"),o=h):t===!1?(n.text("false"),o=h):"function"==typeof t?(n.text(m(t,f)),w(n,t),o=v):"number"==typeof t?(n.text(m(t,f)),w(n,t),o=y):"string"==typeof t?(n.text(m(t,f)),w(n,t),o=t===p?"#f33":u):"object"==typeof t?(e.isArray(t)&&0==t.length?n.text("[]"):e.isEmptyObject(t)?n.text("{}"):(n.text(m(t,f)),_(n,t)),o=g):(n.text(m(t,f)),w(n,t)),n.css("color",o),n=[n,e("<br>")]},E=function(t,n){if(n||0===n||(n=a),s>=n)return A(t);if(t&&"object"==typeof t){var o="{}";e.isArray(t)&&(o="[]");var i=e("<div>"+o[0]+"<br></div>").css("color",b);(s||n)&&i.css("padding-left","10px");var c=e("<div/>").css("padding-left","10px").css("color",x);i.appendChild(c);var r=0;for(var d in t)if(t.hasOwnProperty(d)){r+=1;var p=t[d];c.appendChild(d+" : "),e.inArray(p,l)>-1?c.appendChild(A(p)):(l.push(p),s+=1,c.appendChild(E(p)),s-=1,l.pop())}return r?i.appendChild(o[1]):o+"<br>"}return A(t)};console.log=function(){old_console_log.apply(console,arguments),t.appendChild(E(arguments[0],0))};var C=function(){try{throw new Error}catch(e){var t=e.stack,n=[],o=/console-log-phone.js/i;if(t&&t.split){t=t.split("\n");for(var i=0;i<t.length;i++)o.test(t[i])||"Error"===t[i]||n.push(t[i].replace(/^[ \t]*(at)?[ \t]*/,""))}return n}};console.trace=function(){old_console_trace.apply(console,arguments);var e=C();t.appendChild(E("Trace:",0)),t.appendChild(E(e,1))},window.onerror=function(e,t,n){console.log(p),console.log(e),console.log(t),console.log("    Line "+n)};var k=!1,T=function(){k=!1;var e=1;if(window.matchMedia){var n=[240,320,360,375,384,412,414,427,480,533,568,600,604,640,667,690,720,736,768,800,960,966,1024,1280,1366];for(var o in n){var c=n[o];if(window.matchMedia("(orientation: portrait) and (max-device-width: "+c+"px)").matches||window.matchMedia("(orientation: landscape) and (max-device-height: "+c+"px)").matches){var a=r.width();if(a&&c){var s=c/a;e=s}break}}}var l=Math.round(2/(1+e)*100);l>200&&(l=200),t.css("top",60/e+"px").css("bottom",20/e+"px").css("right",30/e+"px").css("left",30/e+"px").css("font-size",l+"%").find().css("font-size",l+"%"),i.css("top",60/e+"px").css("height",25/e+"px").css("right",30/e+"px").css("width",25/e+"px").css("font-size",l+"%")};e(window).on("touchend",function(){setTimeout(function(){k||(k=!0,T())},40)}),e(window).resize(function(){setTimeout(function(){k||(k=!0,T())},100)}),e(function(){setTimeout(function(){e("body").appendChild(r),T(),e("body").appendChild(t),e("body").appendChild(i)},0)})}}({});