!function s(a,u,c){function i(e,t){if(!u[e]){if(!a[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(f)return f(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var o=u[e]={exports:{}};a[e][0].call(o.exports,function(t){return i(a[e][1][t]||t)},o,o.exports,s,a,u,c)}return u[e].exports}for(var f="function"==typeof require&&require,t=0;t<c.length;t++)i(c[t]);return i}({1:[function(t,e,n){"use strict";var r=NKC.methods.getDataById("data");new Vue({el:"#app",data:{content:"",users:[],friendsUid:r.friendsUid,page:0,pageCount:999999,end:!1,status:"unSearch"},methods:{getUrl:NKC.methods.tools.getUrl,toast:NKC.methods.appToast,checkContent:function(){var n=this;return new Promise(function(t,e){n.content?t(n.content):e("请输入内容")})},resetStatus:function(){this.status="unSearch"},getUser:function(){var o=this,t=this.page,e=this.content;if("searching"!==o.status)return o.status="searching",Promise.resolve().then(function(){return nkcAPI("/message/search?uid=".concat(e,"&username=").concat(e,"&page=").concat(t,"&t=").concat(Date.now()),"GET")}).then(function(t){var e=t.paging,n=e.page,r=e.pageCount;o.page=n,o.pageCount=r,o.users=o.users.concat(t.users),r<=n+1&&(o.end=!0),o.resetStatus()})},search:function(){var e=this;e.checkContent().then(function(){return e.page=0,e.end=!1,e.users=[],e.pageCount=999999,e.getUser()}).catch(function(t){e.resetStatus(),e.toast(t)})},loadMore:function(){var e=this;e.checkContent().then(function(){if(e.page+1>=e.pageCount)throw"到底了";return e.page+=1,e.getUser()}).catch(function(t){e.resetStatus(),e.toast(t)})},toSendMessage:function(t){NKC.methods.toChat(t.uid)},addFriend:function(t){NKC.methods.visitUrl("/message/addFriend?uid=".concat(t.uid),!0)}}})},{}]},{},[1]);