define("webcontrol/class.js",function(t,n,r){r.exports=function(){"use strict";var t=!1,n=/conan/.test(function(){})?/\b_super\b/:/.*/,r=function(){},e=function(t,r,e){for(var i in r)t[i]="function"==typeof r[i]&&"function"==typeof e[i]&&n.test(r[i])?function(t,n){return function(){var r=this._super;this._super=e[t];var i=n.apply(this,arguments);return this._super=r,i}}(i,r[i]):r[i]};return r.extend=function(){function n(){!t&&this.init&&this.init.apply(this,arguments)}var i=this.prototype;t=!0;var s=new this;t=!1;for(var o=0;o<arguments.length;o++)e(s,arguments[o],i);return n.prototype=s,n.constructor=n,n.extend=r.extend,n},r}()});