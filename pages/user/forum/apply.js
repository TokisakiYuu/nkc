!function s(u,i,a){function c(t,e){if(!i[t]){if(!u[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(f)return f(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=i[t]={exports:{}};u[t][0].call(o.exports,function(e){return c(u[t][1][e]||e)},o,o.exports,s,u,i,a)}return i[t].exports}for(var f="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,t,n){"use strict";function a(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,u=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return u=e.done,e},e:function(e){i=!0,s=e},f:function(){try{u||null==n.return||n.return()}finally{if(i)throw s}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var r=NKC.methods.getDataById("data"),o=new Map([["protocol",function(e){return e.protocol.haveReadProtocol?{passed:!0}:{passed:!1,message:"请先仔细阅读开办指南"}}],["enter_info",function(e){var t=e.enterInfo,n=e.sendInvite;return t.newForumName&&t.reason&&t.youWantToDo?t.reason.length<200?{passed:!1,message:"申请理由至少200个字符"}:n.userId.length<3?{passed:!1,message:"请至少选择3个人作为专业共同创始人"}:void e.commitData():{passed:!1,message:"请先完整填写"}}],["sucess_section",function(e){}]]),s=Array.from(o.keys());new Vue({el:"#app",data:{step:0,protocol:{haveReadProtocol:!1},enterInfo:{newForumName:"",reason:"",youWantToDo:""},sendInvite:{userId:[],users:[]},appliedForums:r.appliedForums,reviewNewForumGuide:r.reviewNewForumGuide,buttonName:"提交",submitting:!1},computed:{stepName:function(){return s[this.step]||s[0]}},methods:{toStep:function(e){var t=(0,this.checker)(this.stepName),n=t.passed,r=t.message;return n?this.step=e:sweetError(r)},checker:function(e){if(o.has(e)){var t=o.get(e);return"function"==typeof t?t(this):{}}return{}},selectUsers:function(){var i=this;u.open(function(e){var t,n=a(e.users);try{for(n.s();!(t=n.n()).done;){var r=t.value,o=r.uid,s=r.username,u=r.avatar;i.sendInvite.userId.includes(o)||(i.sendInvite.users.push({username:s,avatarUrl:NKC.methods.tools.getUrl("userAvatar",u),uid:o}),i.sendInvite.userId.push(o))}}catch(e){n.e(e)}finally{n.f()}},{userCount:99})},deleteFounder:function(e){this.sendInvite.users.splice(e,1),this.sendInvite.userId.splice(e,1)},commitData:function(){var e=this.enterInfo,t=this.sendInvite,n=this;return n.buttonName="提交中...",n.submitting=!0,nkcAPI("/u/".concat(NKC.configs.uid,"/forum/apply"),"POST",{info:e,invites:t.userId}).then(function(){console.log("提交成功"),n.buttonName="提交",n.submitting=!1,n.step=2}).catch(function(e){n.step=1,sweetError(e)}).finally(function(){n.buttonName="提交",n.submitting=!1})}}});var u=new NKC.modules.SelectUser},{}]},{},[1]);