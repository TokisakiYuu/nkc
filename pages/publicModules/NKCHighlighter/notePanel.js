!function c(r,s,a){function u(e,t){if(!s[e]){if(!r[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(d)return d(e,!0);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}var i=s[e]={exports:{}};r[e][0].call(i.exports,function(t){return u(r[e][1][t]||t)},i,i.exports,c,r,s,a)}return s[e].exports}for(var d="function"==typeof require&&require,t=0;t<a.length;t++)u(a[t]);return u}({1:[function(t,e,n){"use strict";NKC.modules.NotePanel=function(){return function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var r=this;r.app=new Vue({el:"#moduleNotePanel",data:{uid:NKC.configs.uid,disableNoteContent:!1,show:!1,edit:!1,submitting:!1,content:"",note:""},updated:function(){this.resetDom()},methods:{fromNow:NKC.methods.fromNow,getUrl:NKC.methods.tools.getUrl,visitUrl:NKC.methods.visitUrl,setTextareaSize:function(t){this.$el.getElementsByClassName("create-textarea")[0].style.height=t},resetTextarea:function(){this.content="",this.setTextareaSize("2.5rem")},autoResize:function(t){var e=t.target;e.style.height="2.5rem",30<e.scrollHeight&&(e.style.height=e.scrollHeight+"px")},saveNewNote:function(){var i=this.content,c=this.note;Promise.resolve().then(function(){if(!i)throw"请输入笔记内容";var t=c.type,e=c.targetId,n=c.node,o=c._id;return r.app.submitting=!0,nkcAPI("/note","POST",{_id:o,type:t,targetId:e,content:i,node:n})}).then(function(t){r.app.content="",r.app.resetTextarea(),r.app.resetDom(),r.callback(t.note),r.app.extendNoteContent(t.note),r.app.note=t.note,r.app.submitting=!1,setTimeout(function(){r.app.scrollToBottom()},200)}).catch(function(t){sweetError(t),r.app.submitting=!1})},modifyNoteContent:function(t){t.edit?t.edit=!1:(t.edit=!0,t._content||(t._content=t.content))},extendNoteContent:function(t){t.notes.map(function(t){t.edit=!1,t._content=""})},saveNote:function(e){var t,n,o=this.note,i=this.uid,c={};e.uid===i?(t="/note/".concat(o._id,"/c/").concat(e._id),n="PUT"):(t="/nkc/note",n="POST",c.type="modify",c.noteId=o._id,c.noteContentId=e._id),c.content=e._content,nkcAPI(t,n,c).then(function(t){e.content=e._content,e.html=t.noteContentHTML,r.app.modifyNoteContent(e),Vue.set(o.notes,o.notes.indexOf(e),e)}).catch(sweetError)},open:function(i,c){var t=this;new Promise(function(e,t){r.app.resetDom(),r.callback=i;var n=c.id,o=c.note;o?(r.app.note=o,e()):nkcAPI("/note/".concat(n),"GET").then(function(t){r.app.extendNoteContent(t.note),r.app.note=t.note,e()}).catch(t)}).then(function(){t.show=!0,NKC.methods.initUnfixedPanel()}).catch(sweetError)},close:function(){this.show=!1},resetDom:function(){this.$el.style.height="auto"},scrollToBottom:function(){var t=this.$el.getElementsByClassName("note-panel-notes")[0];t.scrollTop=t.scrollHeight+1e4},deleteNoteContent:function(t,e){var n,o,i=this.note,c={};"delete"===e?(n="/note/".concat(i._id,"/c/").concat(t._id),o="DELETE"):(o="POST",n="/nkc/note",t.disabled?c.type="cancelDisable":c.type="disable",c.noteId=i._id,c.noteContentId=t._id),sweetQuestion("确定要执行此操作？").then(function(){return nkcAPI(n,o,c)}).then(function(){"delete"===e?t.deleted=!0:t.disabled=!t.disabled,sweetSuccess("操作成功")}).catch(sweetError)}}}),r.open=r.app.open,r.close=r.app.close,r.isOpen=function(){return!!e.app.show}}}()},{}]},{},[1]);