<<<<<<< HEAD
!function i(a,d,s){function l(e,t){if(!d[e]){if(!a[e]){var o="function"==typeof require&&require;if(!t&&o)return o(e,!0);if(c)return c(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var n=d[e]={exports:{}};a[e][0].call(n.exports,function(t){return l(a[e][1][t]||t)},n,n.exports,i,a,d,s)}return d[e].exports}for(var c="function"==typeof require&&require,t=0;t<s.length;t++)l(s[t]);return l}({1:[function(t,e,o){"use strict";var r=NKC.methods.getDataById("forumInfo"),n=r.fid,d=r.page,s=r.digest,l=r.sort;$(function(){var t=$("#navbar_custom_dom"),e=$("#leftDom");t.html(e.html()),NKC.configs.lid&&(window.Library=new NKC.modules.Library({lid:NKC.configs.lid,folderId:NKC.configs.folderId,tLid:NKC.configs.tLid,closed:NKC.configs.closed,uploadResourcesId:NKC.configs.uploadResourcesId?NKC.configs.uploadResourcesId.split("-"):[]}));var o=$("#threadUrlSwitch");o.length&&(a("true"===localStorage.getItem(i)),o.on("click",function(){a($(this).prop("checked"))})),NKC.configs.uid&&function(){socket.on("connect",function(){c()}),socket.on("forumMessage",function(t){var e=t.html,o=t.tid,r=t.contentType,n=$("div.normal-thread-list"),i=n.find('div[data-tid="'+o+'"]');if(0!==d||!(!s||s&&t.digest)||"thread"!==r&&"tlm"!==l){if(!i)return}else i.length?i.remove():function(){var t=$("div.normal-thread-list>.thread-panel"),e=t.length;if(0===e)return;t.eq(e-1).remove()}(),i=$(e),n.prepend(i);var a=NKC.methods.getThreadListNewPostCount(o);a++,NKC.methods.setThreadListNewPostCount(o,a),u(o),floatUserPanel.initPanel(),floatForumPanel.initPanel()}),socket.connected&&c();(function t(){setTimeout(function(){f(),t()},1e4)})(),document.body.addEventListener("click",function(t){var e,o,r=t.target;"a"===r.tagName.toLowerCase()&&(e=(r=$(r)).attr("href"),/^\/t\/([0-9]+)\??/gi.test(e)&&(o=RegExp.$1,NKC.methods.setThreadListNewPostCount(o,0),u(o)))}),f()}()});var i="forum_thread_a_target";function a(t){var e,o=t?"_blank":"_self";$(".thread-panel-url").attr("target",o),$("#threadUrlSwitch").prop("checked",!!t),e=t,localStorage.setItem(i,e)}function c(){socket.emit("joinRoom",{type:"forum",data:{forumId:n}})}function f(){for(var t=$("div.normal-thread-list").find(".thread-panel"),e=0;e<t.length;e++){var o=t.eq(e).attr("data-tid");u(o,NKC.methods.getThreadListNewPostCount(o))}}function u(t){var e=$("div.normal-thread-list");e.find('div[data-tid="'+t+'"] .thread-panel-author-info').length&&e.find('div[data-tid="'+t+'"] span.thread-panel-point').remove()}window.openEditSite=function(){var t=window.location.origin+"/editor?type=forum&id="+n;"reactNative"===NKC.configs.platform?NKC.methods.rn.emit("openEditorPage",{url:t}):"apiCloud"===NKC.configs.platform?api.openWin({name:t,url:"widget://html/common/editorInfo.html",pageParam:{realUrl:t,shareType:"common"}}):NKC.methods.visitUrl(t,!0)}},{}]},{},[1]);
=======
!function n(r,i,a){function d(e,t){if(!i[e]){if(!r[e]){var o="function"==typeof require&&require;if(!t&&o)return o(e,!0);if(s)return s(e,!0);throw(o=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",o}o=i[e]={exports:{}},r[e][0].call(o.exports,function(t){return d(r[e][1][t]||t)},o,o.exports,n,r,i,a)}return i[e].exports}for(var s="function"==typeof require&&require,t=0;t<a.length;t++)d(a[t]);return d}({1:[function(t,e,o){"use strict";var n=NKC.methods.getDataById("forumInfo"),r=n.fid,a=n.page,d=n.digest,s=n.sort;$(function(){var t=$("#navbar_custom_dom"),e=$("#leftDom");t.html(e.html()),NKC.configs.lid&&(window.Library=new NKC.modules.Library({lid:NKC.configs.lid,folderId:NKC.configs.folderId,tLid:NKC.configs.tLid,closed:NKC.configs.closed,uploadResourcesId:NKC.configs.uploadResourcesId?NKC.configs.uploadResourcesId.split("-"):[]}));e=$("#threadUrlSwitch");e.length&&(l("true"===localStorage.getItem(i)),e.on("click",function(){l($(this).prop("checked"))})),NKC.configs.uid&&function(){socket.on("connect",function(){c()}),socket.on("forumMessage",function(t){var e=t.html,o=t.tid,n=t.contentType,r=$("div.normal-thread-list"),i=r.find('div[data-tid="'+o+'"]');if(0!==a||!(!d||d&&t.digest)||"thread"!==n&&"tlm"!==s){if(!i)return}else i.length?i.remove():(t=$("div.normal-thread-list>.thread-panel"),0!==(n=t.length)&&t.eq(n-1).remove()),i=$(e),r.prepend(i);i=NKC.methods.getThreadListNewPostCount(o);i++,NKC.methods.setThreadListNewPostCount(o,i),u(o),floatUserPanel.initPanel(),floatForumPanel.initPanel()}),socket.connected&&c();(function t(){setTimeout(function(){f(),t()},1e4)})(),document.body.addEventListener("click",function(t){t=t.target;"a"===t.tagName.toLowerCase()&&(t=(t=$(t)).attr("href"),/^\/t\/([0-9]+)\??/gi.test(t)&&(t=RegExp.$1,NKC.methods.setThreadListNewPostCount(t,0),u(t)))}),f()}()});var i="forum_thread_a_target";function l(t){var e=t?"_blank":"_self";$(".thread-panel-url").attr("target",e),$("#threadUrlSwitch").prop("checked",!!t),t=t,localStorage.setItem(i,t)}function c(){socket.emit("joinRoom",{type:"forum",data:{forumId:r}})}function f(){for(var t=$("div.normal-thread-list").find(".thread-panel"),e=0;e<t.length;e++){var o=t.eq(e).attr("data-tid");u(o,NKC.methods.getThreadListNewPostCount(o))}}function u(t){var e=$("div.normal-thread-list");e.find('div[data-tid="'+t+'"] .thread-panel-author-info').length&&e.find('div[data-tid="'+t+'"] span.thread-panel-point').remove()}window.openEditSite=function(){var t=window.location.origin+"/editor?type=forum&id="+r;"reactNative"===NKC.configs.platform?NKC.methods.rn.emit("openEditorPage",{url:t}):"apiCloud"===NKC.configs.platform?api.openWin({name:t,url:"widget://html/common/editorInfo.html",pageParam:{realUrl:t,shareType:"common"}}):NKC.methods.visitUrl(t,!0)}},{}]},{},[1]);
>>>>>>> 95e272bf9bee146c3b52cab46ffa81d7a7eef1bc
