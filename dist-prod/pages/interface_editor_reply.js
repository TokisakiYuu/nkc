!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function t(e){var t="String"==typeof e?document.getElementById(e):e;if("selectionStart"in t){var r=t.selectionEnd-t.selectionStart;return{start:t.selectionStart,end:t.selectionEnd,length:r,text:t.value.substr(t.selectionStart,r)}}if(document.selection){t.focus();var n=document.selection.createRange(),i=t.createTextRange(),a=i.duplicate();if(a.moveToBookmark(n.getBookmark()),i.setEndPoint("EndToStart",a),null===n||null===i)return{start:t.value.length,end:t.value.length,length:0,text:""};var o=n.text.replace(/[\r\n]/g,"."),c=t.value.replace(/[\r\n]/g,".").indexOf(o,i.text.length);return{start:c,end:c+o.length,length:o.length,text:n.text}}return{start:t.value.length,end:t.value.length,length:0,text:""}}function r(e,r,n){var a="string"==typeof e?document.getElementById(e):e;if("selectionStart"in a)a.focus(),a.selectionStart=r,a.selectionEnd=n;else if(document.selection){a.focus();var o=a.createTextRange(),c=r;for(i=0;i<c;i++)-1!==a.value.charAt(i).search(/[\r\n]/)&&(r-=.5);for(c=n,i=0;i<c;i++)-1!==a.value.charAt(i).search(/[\r\n]/)&&(n-=.5);o.moveEnd("textedit",-1),o.moveStart("character",r),o.moveEnd("character",n-r),o.select()}return t(e)}function n(e){var t=document.createTextNode(e),r=document.createElement("option");return r.appendChild(t),r}$("document").ready((function(){$(".w-e-text-container").resizable({containment:"#body",minHeight:100,minWidth:100,maxWidth:1400}),$("#ReplyContent").on("paste",(function(){setTimeout((function(){$("#text-elem img").each((function(){if(!$(this).attr("srcs"))return!0;var e=$(this).attr("srcs"),t="<img src='"+e+"'>";if(-1!==e.indexOf("kechuang"))return $(this).replaceWith(t),!0;if(1==new RegExp("file:").test(e))return $(this).replaceWith("<img src='/resources/site_specific/picdefault.png'>"),!0;if(e.length>10){var r={loadsrc:e},n=$(this);nkcAPI("/download","POST",r).then((function(e){n.attr("src",""),n.attr("srcs","");var t="<img src='/r/"+e.r.rid+"' style='max-width: 100%'>";n.replaceWith(t),list&&list.refresh()})).catch((function(e){n.attr("src",""),n.attr("srcs",""),n.replaceWith("<img src='/resources/site_specific/picdefault.png'>")}))}}))}),5e3)}))}));var a=!1;e(window,{dataURItoBlob:function(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var r=e.split(",")[0].split(":")[1].split(";")[0],n=new Uint8Array(t.length),i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return new Blob([n],{type:r})},get_selection:t,replace_selection:function(e,n,i){var a="string"==typeof e?document.getElementById(e):e;console.log(a),selection=t(e);var o=selection.start,c=o+n.length;return a.value=a.value.substr(0,o)+n+a.value.substr(selection.end,a.value.length),i&&r(e,c,c),{start:o,end:c,length:n.length,text:n}},set_selection:r,getSearchKV:function(){var e=window.location.search.match(/[\d\w]*=[\d\w\/]*/g),t={};if(e)for(var r=0;r<e.length;r++){var n=e[r].split("="),i=n[0],a=n[1];t[i]=a}return t},blockOnChange:function(e){return function(){var t="block";e.postController.style.display===t?e.postController.style.display="none":e.postController.style.display=t}},threadTypesOnChange:function(e){return function(){var t=e.forumsList,r=e.parents.value,n=e.children.value,i=e.threadTypes.value;for(var a in e.threadTypeID=void 0,t)if(t[a].displayName===r){var o=t[a];for(var c in o.children)if(o.children[c].displayName===n){var s=o.children[c].threadTypes;for(var l in s)s[l].name===i&&(e.threadTypeID=s[l].cid)}}}},childrenOnChange:function(e){return function(){var t=e.forumsList,r=e.parents.value,i=e.children.value;e.childID=void 0;var a=e.threadTypes.childNodes;for(e.threadTypes.value=e.threadTypesDefault;a.length>2;)e.threadTypes.removeChild(a[a.length-1]);for(var o in t)if(t[o].displayName===r){var c=t[o];for(var s in c.children){var l=c.children[s];if(l.displayName===i){e.childID=l.fid,e.query.type="forum";var d=l.threadTypes,h=e.threadTypes.lastChild;for(var u in d)e.threadTypes.insertBefore(n(d[u].name),h);e.threadTypes.insertBefore(h,e.threadTypes[0])}}}e.childID||screenTopWarning("在当前学院下未找到所选专业,请重新选择.")}},parentsOnChange:function(e){return function(){var t=e.parents.value,r=e.forumsList,i=e.children;e.children.value=e.childrenDefault,e.parentID=void 0;for(var a=i.childNodes;a.length>2;)i.removeChild(a[a.length-1]);for(var o in r){var c=r[o];if(c.displayName===t){e.parentID=c.fid;var s=i.lastChild;for(var l in r[o].children)i.insertBefore(n(r[o].children[l].displayName),s);i.insertBefore(i.lastChild,i[0])}}}},onPost:function(e){return function(){var t=e.specialMark;$(".MathJax_Preview").each((function(){if(0!==$(this).next().next().length){if($(this).next().next().attr("type").length>15)var e="$$"+$(this).next().next().html()+"$$";else e="$"+$(this).next().next().html()+"$";$(this).next().next().replaceWith(e),$(this).next().replaceWith(""),$(this).replaceWith("")}else $(this).parent().remove()}));var r=document.getElementById("quoteContent").innerHTML;if("old"==t)var n=e.content.value;else n=r+e.content.innerHTML.trim();var i=e.title.value.trim(),a=e.query.type,o=e.query.cat,c=e.blocked?e.query.id:e.childID,s=e.language.value.toLowerCase().trim();if(""!==n)if("thread"===a||"post"===a||"application"===a||""!==i){geid("parseURL").checked&&("markdown"===s&&(n=common.URLifyMarkdown(n)),"bbcode"!==s&&"pwbb"!==s||(n=common.URLifyBBcode(n)));var l,d,h,u={t:i,c:n,l:s,cat:e.threadTypeID,mid:e.query.mid};if(e.blocked||e.childID)return e.post.disabled=!0,"post"===a?(l="PUT",d="/p/"+c,h={post:u}):"forum"===a?(l="POST",d="/f/"+c,h={post:u}):"thread"===a?(l="POST",d="/t/"+c,h={post:u}):"application"===a&&"p"===o?(l="PUT",d="/fund/a/"+c,h={project:u,s:3}):"application"===a&&"c"===o?(l="POST",d="/fund/a/"+c+"/comment",h={comment:u}):"application"===a&&"r"===o?(l="POST",d="/fund/a/"+c+"/report",h={c:u.c,t:u.t}):"redit"===a?(l="POST",d="/f/"+c,h={post:u}):jwarning("未知的请求类型："+a),nkcAPI(d,l,h).then((function(t){t.redirect?redirect(t.redirect):"post"===e.type&&redirect()})).catch((function(e){jwarning(e.error),geid("post").disabled=!1}));screenTopWarning("未指定正确的发送目标, 请选择正确的学院 -> 专业")}else screenTopWarning("请填写标题。");else screenTopWarning("请填写内容。")}},groupingForums:function(e){for(var t in e.sort((function(e,t){return e.order-t.order})),e)e[t].children&&e[t].children.sort((function(e,t){return e.order-t.order}));return e},createOption:n,mathfresh:function(){MathJax&&MathJax.Hub.PreProcess(geid("parsedcontent"),(function(){MathJax.Hub.Process(geid("parsedcontent"))})),hljs&&ReHighlightEverything()},fitscreen:function(){var e=$(window).height().toString()+"px";geid("content").style.height=a?"300px":e,geid("parsedcontent").style["max-height"]=a?"800px":e,a=!a},extract_resource_from_tag:function(e){if(render&&render.resource_extractor&&window.list&&window.list.rlist){var t=e.match(render.resource_extractor);if(t){var r=[];return t.map((function(e){var t=e.replace(render.resource_extractor,"$1");window.list.rlist.map((function(e){e.rid==t&&r.push(e)}))})),r}}},mathfreshnew:function(){MathJax&&MathJax.Hub.PreProcess(geid("text-elem"),(function(){MathJax.Hub.Process(geid("text-elem"))})),hljs&&ReHighlightEverything()},mathfresha1:function(){$("#editora2").html($("#editora1").val()),MathJax&&MathJax.Hub.PreProcess(geid("editora2"),(function(){MathJax.Hub.Process(geid("editora2"))})),hljs&&ReHighlightEverything()},reedit:function(e){$(".w-e-icon-math").click(),$(e).find("script").attr("type").length<15?$("#editora1").val("$"+$(e).find("script").html()+"$"):$("#editora1").val("$$"+$(e).find("script").html()+"$$"),$(e).addClass("righteditor"),window.localStorage.pMark="1"},fitscreennew:function(){var e=$(window).height().toString()+"px";geid("content").style.height=a?"300px":e,geid("parsedcontent").style["max-height"]=a?"800px":e,a=!a}})}));