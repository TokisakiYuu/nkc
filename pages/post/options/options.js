!function s(r,d,u){function l(o,t){if(!d[o]){if(!r[o]){var i="function"==typeof require&&require;if(!t&&i)return i(o,!0);if(c)return c(o,!0);var n=new Error("Cannot find module '"+o+"'");throw n.code="MODULE_NOT_FOUND",n}var e=d[o]={exports:{}};r[o][0].call(e.exports,function(t){return l(r[o][1][t]||t)},e,e.exports,s,r,d,u)}return d[o].exports}for(var c="function"==typeof require&&require,t=0;t<u.length;t++)l(u[t]);return l}({1:[function(t,o,i){"use strict";var n,e;function s(){return e.apply(this,arguments)}window.PostOption=new Vue({el:"#modulePostOptions",data:{show:!1,loading:!0,jqDOM:null,uid:NKC.configs.uid,pid:"",postType:"",isComment:!1,postUserId:"",tid:"",toc:"",author:{username:"",uid:""},top:300,left:300,domHeight:0,domWidth:0,anonymous:null,anonymousUser:null,blacklist:null,collection:null,complaint:null,digest:null,disable:null,edit:null,hidePost:null,history:null,inColumn:null,kcb:null,subscribe:null,topped:null,violation:null,warningPost:null,xsf:null,ipInfo:null,reviewed:null,commentControl:null},computed:{position:function(){var t=this.direction,o=this.jqDOM,i=this.domHeight,n=this.domWidth;if(null===o)return{left:0,top:0};var e=o.offset(),s=e.top,r=e.left;return"up"===t?{top:s-i,left:r-n+o.width()}:{top:s+o.height(),left:r+o.width()-n}}},mounted:function(){var o=this;document.addEventListener("click",function(t){o.show=!1})},updated:function(){var t=$(this.$el);this.domHeight=t.height(),this.domWidth=t.width()},methods:{getUrl:NKC.methods.tools.getUrl,format:NKC.methods.format,visitUrl:NKC.methods.visitUrl,clickElement:function(t){t.stopPropagation()},close:function(){this.show=!1},open:function(t){var o=t.pid,i=t.direction,n=t.jqDOM;this.jqDOM=n,this.direction=i;var l=this;l.show=!0,l.loading=!0,nkcAPI("/p/".concat(o,"/option"),"GET").then(function(t){var o=t.tid,i=t.pid,n=t.toc,e=t.options,s=t.userColumnId,r=t.postType,d=t.postUserId,u=t.isComment;l.isComment=u,l.anonymous=e.anonymous,l.anonymousUser=e.anonymousUser,l.blacklist=e.blacklist,l.collection=e.collection,l.complaint=e.complaint,l.digest=e.digest,l.disable=e.disable,l.edit=e.edit,l.hidePost=e.hidePost,l.history=e.history,l.inColumn=e.inColumn,l.kcb=e.kcb,l.subscribe=e.subscribe,l.topped=e.topped,l.violation=e.violation,l.warningPost=e.warningPost,l.xsf=e.xsf,l.ipInfo=e.ipInfo,l.reviewed=e.reviewed,l.commentControl=e.commentControl,l.userColumnId=s,l.postType=r,l.tid=o,l.pid=i,l.toc=n,l.postUserId=d,l.loading=!1}).catch(function(t){sweetError(t)})},toColumn:function(){var t=this.inColumn,o=this.pid,i=this.userColumnId;(t?removeToColumn:addToColumn)(o,i)},setAnonymous:function(){var o=this,t=this.anonymous,i=this.pid;nkcAPI("/p/"+i+"/anonymous","POST",{anonymous:!t}).then(function(t){o.anonymous=t.anonymous,o.anonymous?sweetSuccess("内容已匿名"):sweetSuccess("内容已取消匿名")}).catch(function(t){sweetError(t)})},viewAuthorInfo:function(){(n=n||new NKC.modules.UserInfo).open({type:"showUserByPid",pid:this.pid})},collectionThread:function(){var t=this.tid,o=this.collection,i=this;SubscribeTypes.collectionThreadPromise(t,!o).then(function(){i.collection=!o,o?sweetSuccess("已取消收藏"):sweetSuccess("已加入收藏")}).catch(sweetError)},subscribeThread:function(){var t=this.tid,o=this.subscribe;SubscribeTypes.subscribeThread(t,!o)},replyPost:function(){window.quotePost(this.pid)},hidePostContent:function(){var t=this.pid,o=this.hidePost;window.hidePostPanel||(window.hidePostPanel=new NKC.modules.HidePost),window.hidePostPanel.open(function(){sweetSuccess("执行成功")},{pid:t,hide:o})},postTopped:function(){var t=this.pid,o=this.topped,i=this;nkcAPI("/p/"+t+"/topped","POST",{topped:!o}).then(function(){sweetSuccess("操作成功"),i.topped=!o}).catch(function(t){sweetError(t)})},addXSF:function(){var t=this.pid;credit(t,"xsf")},addKCB:function(){var t=this.pid;credit(t,"kcb")},postDigest:function(){var t=this.pid;(this.digest?unDigestPost:digestPost)(t)},postWarning:function(){openPostWarningDom(this.pid)},disablePost:function(){disabledThreadPost(this.pid)},viewViolationRecord:function(){NKC.modules.violationRecord.open({uid:this.postUserId})},complaintPost:function(){"thread"===this.postType?moduleComplaint.open("thread",this.tid):moduleComplaint.open("post",this.pid)},userBlacklist:function(){var t=this.blacklist,o=this.postUserId;t?NKC.methods.removeUserFromBlacklist(o):NKC.methods.addUserToBlacklist(o,"post",this.pid)},displayIpInfo:function(){NKC.methods.getIpInfo(this.ipInfo)},reviewPost:(e=function(){var t=this.pid;reviewPost(t)},s.toString=function(){return e.toString()},s),toCommentControl:function(){var t=this.pid;window.commentControl||(window.commentControl=new NKC.modules.CommentControl),window.commentControl.open(t)}}}),NKC.methods.initPostOption=function(){for(var o=$('[data-type="postOption"]'),t=0;t<o.length;t++)(function(t){var e=o.eq(t);if("true"===e.attr("data-init"))return;e.on("click",function(t){var o=e.offset(),i=(o.left,o.top,e.attr("data-pid")),n=e.attr("data-direction")||"up";PostOption.open({pid:i,direction:n,jqDOM:e}),t.stopPropagation()}),e.attr("data-init","true")})(t)},$(function(){NKC.methods.initPostOption()})},{}]},{},[1]);