!function o(r,i,a){function c(t,e){if(!i[t]){if(!r[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(s)return s(t,!0);throw(n=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",n}n=i[t]={exports:{}},r[t][0].call(n.exports,function(e){return c(r[t][1][e]||e)},n,n.exports,o,r,i,a)}return i[t].exports}for(var s="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}NKC.modules.NKCHL=function(){function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);var o=this,t=e.type,n=e.targetId,e=e.notes,e=void 0===e?[]:e;o.type=t,o.id=n;n="".concat(t,"-content-").concat(n);o.rootElement=document.getElementById(n),window.addEventListener("mouseup",function(){setTimeout(function(){o.removeBtn()},50)},!0);var r=new NKCHighlighter({rootElementId:n,clownClass:["MathJax_CHTML","MathJax"],clownAttr:{"data-tag":"nkcsource"}});(o.hl=r).on(r.eventNames.select,function(e){var n;NKC.methods.getLoginStatus()&&(n=e.range,o.sleep(200).then(function(){var e=o.hl.getStartNodeOffset(n);e&&(o.createBtn2(e).onclick=function(){var e=r.getNodes(n),t=r.getNodesContent(e);$(window).width()<768?NKC.methods.visitUrl("/note?content=".concat(t,"&targetId=").concat(o.id,"&type=post&offset=").concat(e.offset,"&length=").concat(e.length),!0):o.newNote({id:"",content:t,targetId:o.id,type:"post",notes:[],node:e}).then(function(e){r.createSource(e._id,e.node)}).catch(sweetError)})}).catch(sweetError))}).on(r.eventNames.create,function(e){}).on(r.eventNames.click,function(e){NKC.methods.getLoginStatus()?768<=$(window).width()?o.showNotePanel(e.id):NKC.methods.visitUrl("/note/".concat(e.id),!0):NKC.methods.toLogin("login")}).on(r.eventNames.hover,function(e){r.addClass(e,"post-node-hover")}).on(r.eventNames.hoverOut,function(e){r.removeClass(e,"post-node-hover")}),r.restoreSources(e)}var e,t,n;return e=i,(t=[{key:"createBtn2",value:function(e){this.removeBtn();var t=e.top,n=e.left,e=$("<span><span>添加笔记</span></span>");return e.addClass("nkc-hl-btn"),768<=$(window).width()?e.css({top:t-2.6*12+"px",left:n-21.6+"px"}):e.css({top:t-$(document).scrollTop()-3+"px"}),$(body).append(e),e[0]}},{key:"createBtn",value:function(e){this.removeBtn();var t=document.createElement("span");t.classList.add("nkc-hl-btn"),t.innerText="记笔记";var n=$(this.rootElement),o=n.offset(),r=o.top,i=o.left,o=$(window).scrollTop(),n=n.width(),o=e.y-r+o,e=e.x-i;return i+n<e+60&&(e=i+n-60),t.style.top=o+"px",t.style.left=e+"px",this.rootElement.appendChild(t),t}},{key:"removeBtn",value:function(){$(".nkc-hl-btn").remove()}},{key:"sleep",value:function(t){return new Promise(function(e){setTimeout(function(){e()},t)})}},{key:"initNotePanel",value:function(){window.notePanel||(window.notePanel=new NKC.modules.NotePanel)}},{key:"newNote",value:function(n){return this.initNotePanel(),new Promise(function(t,e){window.notePanel.open(function(e){t(e)},{note:n})})}},{key:"showNotePanel",value:function(e){this.initNotePanel(),window.notePanel.open(function(e){},{id:e})}}])&&o(e.prototype,t),n&&o(e,n),i}()},{}]},{},[1]);
