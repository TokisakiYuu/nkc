!function(o){"function"==typeof define&&define.amd?define(o):o()}((function(){"use strict";NKC.modules.UserInfo=function(){var o=this;o.dom=$("#moduleUserInfo"),o.dom.modal({show:!1}),o.app=new Vue({el:"#moduleUserInfoApp",data:{user:"",loading:!0},methods:{getUrl:NKC.methods.tools.getUrl}}),o.open=function(e){e=e||{type:"showUserByUid"},o.app.loading=!0;var n=e.type;"showUserByPid"===n?nkcAPI("/p/"+e.pid+"/author","GET").then((function(e){o.app.user=e.author,o.app.loading=!1})).catch((function(o){sweetError(o)})):"showUserByUid"===n&&nkcAPI("/u/"+e.uid+"?from=panel","GET").then((function(e){o.app.user=e.targetUser,o.app.loading=!1})).catch((function(o){sweetError(o)})),o.dom.modal("show")}}}));