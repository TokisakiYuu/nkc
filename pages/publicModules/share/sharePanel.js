<<<<<<< HEAD
!function i(c,a,u){function s(e,t){if(!a[e]){if(!c[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(p)return p(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var o=a[e]={exports:{}};c[e][0].call(o.exports,function(t){return s(c[e][1][t]||t)},o,o.exports,i,c,a,u)}return a[e].exports}for(var p="function"==typeof require&&require,t=0;t<u.length;t++)s(u[t]);return s}({1:[function(t,e,n){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(i){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e,n,r,o=p(i);return e=c?(t=p(this).constructor,Reflect.construct(o,arguments,t)):o.apply(this,arguments),n=this,!(r=e)||"object"!==a(r)&&"function"!=typeof r?s(n):r}}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var r=new(function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(o,NKC.modules.DraggablePanel);var t,e,n,r=u(o);function o(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o);var t,e="#moduleSharePanel",a=s(t=r.call(this,e));return a.dom=$(e),a.app=new Vue({el:e+"App",data:{loading:!0,shareType:"",shareId:"",url:"",cover:"",title:"",description:"",platforms:[{type:"wechat"},{type:"QQ"},{type:"qzone"},{type:"weibo"}],showQR:!1,clipboard:null},computed:{},mounted:function(){},methods:{getUrl:NKC.methods.tools.getUrl,open:function(t){var e=0<arguments.length&&void 0!==t?t:{};a.showPanel();var n=e.shareType,r=e.shareId;a.app.shareType=n,a.app.shareId=r;var o="/s?type=".concat(n,"&id=").concat(r);nkcAPI(o,"GET").then(function(t){var e=t.result,n=e.url,r=e.cover,o=e.title,i=e.description;a.app.url=window.location.origin+n,a.app.cover=r,a.app.title=o,a.app.description=i,a.app.loading=!1,$(".wechat-container.qrcode-canvas").attr("data-init","false"),setTimeout(function(){NKC.methods.initQrcodeCanvas()},500)}).catch(sweetError)},close:function(){this.showQR=!1,a.app.loading=!0,a.hidePanel()},share:function(t){if("wechat"===t)return this.showQR=!this.showQR;var e=this.url,n=this.title,r=this.description,o=this.cover;if("copy"===t){if(console.log(this.clipboard),this.clipboard)return;return this.clipboard=new ClipboardJS("#sharePanelButton",{text:function(){return a.app.url}}),this.clipboard.on("success",function(){screenTopAlert("链接已复制到粘贴板")})}var i=window.open(),c=window.location.origin+o;i.location="QQ"===t?"http://connect.qq.com/widget/shareqq/index.html?url=".concat(e,"&title=").concat(n,"&pics=").concat(c,"&summary=").concat(r):"qzone"===t?"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=".concat(e,"&title=").concat(n,"&pics=").concat(c,"&summary=").concat(r):"http://v.t.sina.com.cn/share/share.php?url=".concat(e,"&title=").concat(n,"&pic=").concat(c)}}}),t}return t=o,(e=[{key:"open",value:function(t,e){this.app.open(t,e)}}])&&i(t.prototype,e),n&&i(t,n),o}());NKC.methods.initSharePanel=function(){for(var e=$('[data-type="share"]'),t=0;t<e.length;t++)(function(t){var n=e.eq(t);if("true"===n.attr("data-init"))return;n.on("click",function(){var t=n.attr("data-share-type"),e=n.attr("data-share-id");r.open({shareType:t,shareId:e})}),n.attr("data-init","true")})(t)},$(function(){NKC.methods.initSharePanel()})},{}]},{},[1]);
=======
!function o(r,i,c){function a(e,t){if(!i[e]){if(!r[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(u)return u(e,!0);throw(n=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",n}n=i[e]={exports:{}},r[e][0].call(n.exports,function(t){return a(r[e][1][t]||t)},n,n.exports,o,r,i,c)}return i[e].exports}for(var u="function"==typeof require&&require,t=0;t<c.length;t++)a(c[t]);return a}({1:[function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=s(n);return t=o?(t=s(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),e=this,!(t=t)||"object"!==r(t)&&"function"!=typeof t?u(e):t}}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var o=new(function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(r,NKC.modules.DraggablePanel);var t,e,n,o=a(r);function r(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);var t,e="#moduleSharePanel",c=u(t=o.call(this,e));return c.dom=$(e),c.app=new Vue({el:e+"App",data:{loading:!0,shareType:"",shareId:"",url:"",cover:"",title:"",description:"",platforms:[{type:"wechat"},{type:"QQ"},{type:"qzone"},{type:"weibo"}],showQR:!1,clipboard:null},computed:{},mounted:function(){},methods:{getUrl:NKC.methods.tools.getUrl,open:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};c.showPanel();var e=t.shareType,t=t.shareId;c.app.shareType=e,c.app.shareId=t;t="/s?type=".concat(e,"&id=").concat(t);nkcAPI(t,"GET").then(function(t){var e=t.result,n=e.url,o=e.cover,t=e.title,e=e.description;c.app.url=window.location.origin+n,c.app.cover=o,c.app.title=t,c.app.description=e,c.app.loading=!1,$(".wechat-container.qrcode-canvas").attr("data-init","false"),setTimeout(function(){NKC.methods.initQrcodeCanvas()},500)}).catch(sweetError)},close:function(){this.showQR=!1,c.app.loading=!0,c.hidePanel()},share:function(t){if("wechat"===t)return this.showQR=!this.showQR;var e=this.url,n=this.title,o=this.description,r=this.cover;if("copy"===t)return console.log(this.clipboard),this.clipboard?void 0:(this.clipboard=new ClipboardJS("#sharePanelButton",{text:function(t){return c.app.url}}),this.clipboard.on("success",function(){screenTopAlert("链接已复制到粘贴板")}));var i=window.open(),r=window.location.origin+r;i.location="QQ"===t?"http://connect.qq.com/widget/shareqq/index.html?url=".concat(e,"&title=").concat(n,"&pics=").concat(r,"&summary=").concat(o):"qzone"===t?"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=".concat(e,"&title=").concat(n,"&pics=").concat(r,"&summary=").concat(o):"http://v.t.sina.com.cn/share/share.php?url=".concat(e,"&title=").concat(n,"&pic=").concat(r)}}}),t}return t=r,(e=[{key:"open",value:function(t,e){this.app.open(t,e)}}])&&i(t.prototype,e),n&&i(t,n),r}());NKC.methods.initSharePanel=function(){for(var e=$('[data-type="share"]'),t=0;t<e.length;t++)(function(t){var n=e.eq(t);if("true"===n.attr("data-init"))return;n.on("click",function(){var t=n.attr("data-share-type"),e=n.attr("data-share-id");o.open({shareType:t,shareId:e})}),n.attr("data-init","true")})(t)},$(function(){NKC.methods.initSharePanel()})},{}]},{},[1]);
>>>>>>> 95e272bf9bee146c3b52cab46ffa81d7a7eef1bc
