<<<<<<< HEAD
!function o(l,i,u){function c(n,e){if(!i[n]){if(!l[n]){var r="function"==typeof require&&require;if(!e&&r)return r(n,!0);if(f)return f(n,!0);var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}var a=i[n]={exports:{}};l[n][0].call(a.exports,function(e){return c(l[n][1][e]||e)},a,a.exports,o,l,i,u)}return i[n].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,n,r){"use strict";function a(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}NKC.modules.SelectForumPanel=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.domId="forum_".concat(Date.now()),this.app=null,this.layerIndex=null,this.layer=null}var n,r,t;return n=e,(r=[{key:"open",value:function(){var n=this;if(n.layer)return layer.setTop(n.layer);n.layerIndex=layer.open({type:1,shade:0,offset:"100px",maxWidth:"100%",maxmin:!0,zIndex:layer.zIndex,resize:!1,success:function(e){n.layer=e,layer.setTop(e),n.app=new Vue({el:"#"+n.domId,data:{name:"这是一个可以重要也可以不重要的方法，重要的是，它的权利真的很大，尤其是在模块化加载layer时，你会发现你必须要用到它。它不仅可以配置一些诸如路径、加载的模块，甚至还可以决定整个弹层的默认参数。而说它不重要，是因为多数情况下，你会发现，你似乎不是那么十分需要它。但你真的需要认识一下这位伙计。"}})},end:function(){n.app&&n.app.$destroy(),delete n.layer},title:"选择专业",content:'<div id="'.concat(n.domId,'" class="nkc-layer-md">').concat($("#layerSelectForum").html(),"</div>")})}},{key:"close",value:function(){layer.close(this.layerIndex)}}])&&a(n.prototype,r),t&&a(n,t),e}()},{}]},{},[1]);
=======
!function t(o,a,l){function i(n,e){if(!a[n]){if(!o[n]){var r="function"==typeof require&&require;if(!e&&r)return r(n,!0);if(u)return u(n,!0);throw(r=new Error("Cannot find module '"+n+"'")).code="MODULE_NOT_FOUND",r}r=a[n]={exports:{}},o[n][0].call(r.exports,function(e){return i(o[n][1][e]||e)},r,r.exports,t,o,a,l)}return a[n].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)i(l[e]);return i}({1:[function(e,n,r){"use strict";function o(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}NKC.modules.SelectForumPanel=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.domId="forum_".concat(Date.now()),this.app=null,this.layerIndex=null,this.layer=null}var n,r,t;return n=e,(r=[{key:"open",value:function(){var n=this;if(n.layer)return layer.setTop(n.layer);n.layerIndex=layer.open({type:1,shade:0,offset:"100px",maxWidth:"100%",maxmin:!0,zIndex:layer.zIndex,resize:!1,success:function(e){n.layer=e,layer.setTop(e),n.app=new Vue({el:"#"+n.domId,data:{name:"这是一个可以重要也可以不重要的方法，重要的是，它的权利真的很大，尤其是在模块化加载layer时，你会发现你必须要用到它。它不仅可以配置一些诸如路径、加载的模块，甚至还可以决定整个弹层的默认参数。而说它不重要，是因为多数情况下，你会发现，你似乎不是那么十分需要它。但你真的需要认识一下这位伙计。"}})},end:function(){n.app&&n.app.$destroy(),delete n.layer},title:"选择专业",content:'<div id="'.concat(n.domId,'" class="nkc-layer-md">').concat($("#layerSelectForum").html(),"</div>")})}},{key:"close",value:function(){layer.close(this.layerIndex)}}])&&o(n.prototype,r),t&&o(n,t),e}()},{}]},{},[1]);
>>>>>>> 95e272bf9bee146c3b52cab46ffa81d7a7eef1bc
