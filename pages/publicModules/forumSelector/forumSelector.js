<<<<<<< HEAD
!function i(s,u,a){function c(t,e){if(!u[t]){if(!s[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(l)return l(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var n=u[t]={exports:{}};s[t][0].call(n.exports,function(e){return c(s[t][1][e]||e)},n,n.exports,i,s,u,a)}return u[t].exports}for(var l="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,t,r){"use strict";function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,n=function(){};return{s:n,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){u=!0,i=e},f:function(){try{s||null==r.return||r.return()}finally{if(u)throw i}}}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function i(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(i){var s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t,r,o,n=f(i);return t=s?(e=f(this).constructor,Reflect.construct(n,arguments,e)):n.apply(this,arguments),r=this,!(o=t)||"object"!==u(o)&&"function"!=typeof o?l(r):o}}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var o=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(n,NKC.modules.DraggablePanel);var e,t,r,o=c(n);function n(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var e,t="#moduleForumSelector",h=l(e=o.call(this,t));return h.dom=$(t),h.app=new Vue({el:t+"App",data:{loading:!0,forums:[],forumCategories:[],subscribeForumsId:[],selectedForumCategory:"",selectedParentForum:"",selectedForum:"",selectedThreadType:"",selectedForumsId:[],disabledForumsId:[],highlightForumId:"",needThreadType:!0,showThreadTypes:!1},computed:{forumData:function(){var e,t=this.forumCategories,r=[],o=[],n=m(this.forums);try{for(n.s();!(e=n.n()).done;){var i=e.value;o[i.categoryId]||(o[i.categoryId]=[]),o[i.categoryId].push(i)}}catch(e){n.e(e)}finally{n.f()}var s,u=m(t);try{for(u.s();!(s=u.n()).done;){var a=s.value,c=o[a._id];c&&(a.forums=c,r.push(a))}}catch(e){u.e(e)}finally{u.f()}return r},subscribeForums:function(){var e=this.forums,t=this.subscribeForumsId;if(!t.length)return[];var r,o=[],n=m(e);try{for(n.s();!(r=n.n()).done;){var i,s=m(r.value.childForums);try{for(s.s();!(i=s.n()).done;){var u=i.value;t.includes(u.fid)&&o.push(u)}}catch(e){s.e(e)}finally{s.f()}}}catch(e){n.e(e)}finally{n.f()}return o},forumsObj:function(){var e,t={},r=m(this.forums);try{for(r.s();!(e=r.n()).done;){var o,n=e.value,i=m((t[n.fid]=n).childForums);try{for(i.s();!(o=i.n()).done;){var s=o.value;t[s.fid]=s}}catch(e){i.e(e)}finally{i.f()}}}catch(e){r.e(e)}finally{r.f()}return t},disabledForumCategoriesId:function(){var e,t=this.selectedForumsId,r=this.forumsObj,o=(this.forumCategoriesId,this.forumCategoriesObj),n=[],i=[],s=m(t);try{for(s.s();!(e=s.n()).done;){var u,a,c=r[e.value];c&&(-1!==n.indexOf(c.categoryId)||(u=o[c.categoryId])&&(a=u.excludedCategoriesId,i=i.concat(a)))}}catch(e){s.e(e)}finally{s.f()}n=[];var l,f=m(i);try{for(f.s();!(l=f.n()).done;){var d=l.value;n.includes(d)||n.push(d)}}catch(e){f.e(e)}finally{f.f()}return n},disabledAllForumsId:function(){return this.disabledForumsId.concat(this.selectedForumsId)},forumCategoriesId:function(){return this.forumCategories.map(function(e){return e._id})},forumCategoriesObj:function(){var e,t={},r=m(this.forumCategories);try{for(r.s();!(e=r.n()).done;){var o=e.value;t[o._id]=o}}catch(e){r.e(e)}finally{r.f()}return t}},mounted:function(){},methods:{getUrl:NKC.methods.tools.getUrl,open:function(e,t){var r=1<arguments.length&&void 0!==t?t:{};h.callback=e;var o=r.disabledForumsId,n=void 0===o?[]:o,i=r.selectedForumsId,s=void 0===i?[]:i,u=r.from,a=void 0===u?"writable":u,c=r.needThreadType,l=void 0===c||c,f=r.highlightForumId,d=void 0===f?"":f;this.disabledForumsId=n,this.selectedForumsId=s,this.needThreadType=l,this.highlightForumId=d,this.resetSelector(),h.showPanel(),nkcAPI("/f?t=selector&f=".concat(a),"GET").then(function(e){h.app.loading=!1,h.app.initForums(e)}).catch(function(e){console.log(e),sweetError(e)})},close:function(){h.hidePanel(),this.resetSelector()},selectForumCategory:function(e){this.disabledForumCategoriesId.includes(e._id)||(this.selectedForumCategory=e,this.selectedForum="",this.selectedParentForum="",this.selectedThreadType="")},initForums:function(e){var t,r=e.forumCategories,o=e.forums,n=e.subscribeForumsId,i=[],s=m(o);try{for(s.s();!(t=s.n()).done;){var u=t.value;i[u.categoryId]||(i[u.categoryId]=[]),i[u.categoryId].push(u)}}catch(e){s.e(e)}finally{s.f()}var a,c=m(r);try{for(c.s();!(a=c.n()).done;){var l=a.value;l.forums=i[l._id]||[]}}catch(e){c.e(e)}finally{c.f()}this.forums=o,this.forumCategories=r,this.subscribeForumsId=n;for(var f=null,d=r.length-1;0<=d;d--){var h=r[d];if(!this.disabledForumCategoriesId.includes(h._id)&&(f=h,this.selectedForumCategory&&this.selectedForumCategory._id===h._id))break}f?this.selectForumCategory(f):this.resetSelector(),this.highlightForum()},highlightForum:function(){var e=this.forumData,t=this.highlightForumId;if(t){var r,o,n=m(e);try{e:for(n.s();!(o=n.n()).done;){var i,s=o.value,u=s,a=m(s.forums);try{for(a.s();!(i=a.n()).done;){var c,l=i.value,f=l,d=m(l.childForums);try{for(d.s();!(c=d.n()).done;){var h=c.value;if(t===h.fid){r=h;break e}}}catch(e){d.e(e)}finally{d.f()}}}catch(e){a.e(e)}finally{a.f()}}}catch(e){n.e(e)}finally{n.f()}r&&(this.selectedForumCategory=u,this.selectedParentForum=f,this.selectedForum=r)}},selectParentForum:function(e){this.disabledAllForumsId.includes(e.fid)||(this.selectedParentForum=e,this.selectedForum="",this.selectedThreadType="",1===this.selectedParentForum.childForums.length?this.selectForum(this.selectedParentForum.childForums[0]):0===this.selectedParentForum.childForums.length&&this.selectForum(this.selectedParentForum))},selectForum:function(e){this.disabledAllForumsId.includes(e.fid)||(this.selectedThreadType="",0===(this.selectedForum=e).threadTypes.length&&this.selectThreadType("none"))},selectThreadType:function(e){this.selectedThreadType=e},next:function(){this.showThreadTypes=!0},previous:function(){this.showThreadTypes=!1,this.selectedThreadType=""},resetSelector:function(){this.selectedForumCategory="",this.selectedForum="",this.selectedParentForum="",this.selectedThreadType="",this.showThreadTypes=!1},submit:function(){var e=this.selectedForum,t=this.selectedThreadType;return e?t?(h.callback({forum:e,threadType:"none"===t?null:t,fid:e.fid,cid:"none"===t?"":t.cid}),void this.close()):sweetError("请选择文章分类"):sweetError("请选择专业")},fastSubmit:function(){var e=this.selectedForum;if(!e)return sweetError("请选择专业");h.callback({forum:e,fid:e.fid}),this.close()}}}),e}return e=n,(t=[{key:"open",value:function(e,t){this.app.open(e,t)}}])&&i(e.prototype,t),r&&i(e,r),n}();NKC.modules.ForumSelector=o},{}]},{},[1]);
=======
!function o(n,i,s){function u(t,e){if(!i[t]){if(!n[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(a)return a(t,!0);throw(r=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",r}r=i[t]={exports:{}},n[t][0].call(r.exports,function(e){return u(n[t][1][e]||e)},r,r.exports,o,n,i,s)}return i[t].exports}for(var a="function"==typeof require&&require,e=0;e<s.length;e++)u(s[e]);return u}({1:[function(e,t,r){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,t=function(){};return{s:t,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){s=!0,n=e},f:function(){try{i||null==r.return||r.return()}finally{if(s)throw n}}}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function i(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(r){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=l(r);return e=o?(e=l(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),t=this,!(e=e)||"object"!==n(e)&&"function"!=typeof e?c(t):e}}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}NKC.modules.ForumSelector=function(){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(n,NKC.modules.DraggablePanel);var e,t,r,o=a(n);function n(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var e,t="#moduleForumSelector",i=c(e=o.call(this,t));return i.dom=$(t),i.app=new Vue({el:t+"App",data:{loading:!0,forums:[],forumCategories:[],subscribeForumsId:[],selectedForumCategory:"",selectedParentForum:"",selectedForum:"",selectedThreadType:"",selectedForumsId:[],disabledForumsId:[],highlightForumId:"",needThreadType:!0,showThreadTypes:!1},computed:{forumData:function(){var e,t=this.forumCategories,r=[],o=[],n=m(this.forums);try{for(n.s();!(e=n.n()).done;){var i=e.value;o[i.categoryId]||(o[i.categoryId]=[]),o[i.categoryId].push(i)}}catch(e){n.e(e)}finally{n.f()}var s,u=m(t);try{for(u.s();!(s=u.n()).done;){var a=s.value,c=o[a._id];c&&(a.forums=c,r.push(a))}}catch(e){u.e(e)}finally{u.f()}return r},subscribeForums:function(){var e=this.forums,t=this.subscribeForumsId;if(!t.length)return[];var r,o=[],n=m(e);try{for(n.s();!(r=n.n()).done;){var i,s=m(r.value.childForums);try{for(s.s();!(i=s.n()).done;){var u=i.value;t.includes(u.fid)&&o.push(u)}}catch(e){s.e(e)}finally{s.f()}}}catch(e){n.e(e)}finally{n.f()}return o},forumsObj:function(){var e,t={},r=m(this.forums);try{for(r.s();!(e=r.n()).done;){var o,n=e.value,i=m((t[n.fid]=n).childForums);try{for(i.s();!(o=i.n()).done;){var s=o.value;t[s.fid]=s}}catch(e){i.e(e)}finally{i.f()}}}catch(e){r.e(e)}finally{r.f()}return t},disabledForumCategoriesId:function(){var e,t=this.selectedForumsId,r=this.forumsObj,o=(this.forumCategoriesId,this.forumCategoriesObj),n=[],i=[],s=m(t);try{for(s.s();!(e=s.n()).done;){var u,a,c=r[e.value];c&&(-1!==n.indexOf(c.categoryId)||(u=o[c.categoryId])&&(a=u.excludedCategoriesId,i=i.concat(a)))}}catch(e){s.e(e)}finally{s.f()}var l,n=[],f=m(i);try{for(f.s();!(l=f.n()).done;){var d=l.value;n.includes(d)||n.push(d)}}catch(e){f.e(e)}finally{f.f()}return n},disabledAllForumsId:function(){return this.disabledForumsId.concat(this.selectedForumsId)},forumCategoriesId:function(){return this.forumCategories.map(function(e){return e._id})},forumCategoriesObj:function(){var e,t={},r=m(this.forumCategories);try{for(r.s();!(e=r.n()).done;){var o=e.value;t[o._id]=o}}catch(e){r.e(e)}finally{r.f()}return t}},mounted:function(){},methods:{getUrl:NKC.methods.tools.getUrl,open:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};i.callback=e;var r=t.disabledForumsId,o=t.selectedForumsId,n=void 0===o?[]:o,e=t.from,o=void 0===e?"writable":e,e=t.needThreadType,e=void 0===e||e,t=t.highlightForumId,t=void 0===t?"":t;this.disabledForumsId=void 0===r?[]:r,this.selectedForumsId=n,this.needThreadType=e,this.highlightForumId=t,this.resetSelector(),i.showPanel(),nkcAPI("/f?t=selector&f=".concat(o),"GET").then(function(e){i.app.loading=!1,i.app.initForums(e)}).catch(function(e){console.log(e),sweetError(e)})},close:function(){i.hidePanel(),this.resetSelector()},selectForumCategory:function(e){this.disabledForumCategoriesId.includes(e._id)||(this.selectedForumCategory=e,this.selectedForum="",this.selectedParentForum="",this.selectedThreadType="")},initForums:function(e){var t,r=e.forumCategories,o=e.forums,e=e.subscribeForumsId,n=[],i=m(o);try{for(i.s();!(t=i.n()).done;){var s=t.value;n[s.categoryId]||(n[s.categoryId]=[]),n[s.categoryId].push(s)}}catch(e){i.e(e)}finally{i.f()}var u,a=m(r);try{for(a.s();!(u=a.n()).done;){var c=u.value;c.forums=n[c._id]||[]}}catch(e){a.e(e)}finally{a.f()}this.forums=o,this.forumCategories=r,this.subscribeForumsId=e;for(var l=null,f=r.length-1;0<=f;f--){var d=r[f];if(!this.disabledForumCategoriesId.includes(d._id)&&(l=d,this.selectedForumCategory&&this.selectedForumCategory._id===d._id))break}l?this.selectForumCategory(l):this.resetSelector(),this.highlightForum()},highlightForum:function(){var e=this.forumData,t=this.highlightForumId;if(t){var r,o,n=m(e);try{e:for(n.s();!(o=n.n()).done;){var i,s=o.value,u=s,a=m(s.forums);try{for(a.s();!(i=a.n()).done;){var c,l=i.value,f=l,d=m(l.childForums);try{for(d.s();!(c=d.n()).done;){var h=c.value;if(t===h.fid){r=h;break e}}}catch(e){d.e(e)}finally{d.f()}}}catch(e){a.e(e)}finally{a.f()}}}catch(e){n.e(e)}finally{n.f()}r&&(this.selectedForumCategory=u,this.selectedParentForum=f,this.selectedForum=r)}},selectParentForum:function(e){this.disabledAllForumsId.includes(e.fid)||(this.selectedParentForum=e,this.selectedForum="",this.selectedThreadType="",1===this.selectedParentForum.childForums.length?this.selectForum(this.selectedParentForum.childForums[0]):0===this.selectedParentForum.childForums.length&&this.selectForum(this.selectedParentForum))},selectForum:function(e){this.disabledAllForumsId.includes(e.fid)||(this.selectedThreadType="",0===(this.selectedForum=e).threadTypes.length&&this.selectThreadType("none"))},selectThreadType:function(e){this.selectedThreadType=e},next:function(){this.showThreadTypes=!0},previous:function(){this.showThreadTypes=!1,this.selectedThreadType=""},resetSelector:function(){this.selectedForumCategory="",this.selectedForum="",this.selectedParentForum="",this.selectedThreadType="",this.showThreadTypes=!1},submit:function(){var e=this.selectedForum,t=this.selectedThreadType;return e?t?(i.callback({forum:e,threadType:"none"===t?null:t,fid:e.fid,cid:"none"===t?"":t.cid}),void this.close()):sweetError("请选择文章分类"):sweetError("请选择专业")},fastSubmit:function(){var e=this.selectedForum;if(!e)return sweetError("请选择专业");i.callback({forum:e,fid:e.fid}),this.close()}}}),e}return e=n,(t=[{key:"open",value:function(e,t){this.app.open(e,t)}}])&&i(e.prototype,t),r&&i(e,r),n}()},{}]},{},[1]);
>>>>>>> 95e272bf9bee146c3b52cab46ffa81d7a7eef1bc
