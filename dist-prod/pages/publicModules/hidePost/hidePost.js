!function(o){"function"==typeof define&&define.amd?define(o):o()}((function(){"use strict";NKC.modules.HidePost=function(){return function o(){!function(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o);var e=this;e.dom=$("#moduleHidePost"),e.dom.modal({show:!1}),e.app=new Vue({el:"#moduleHidePostApp",data:{pid:"",hide:""},methods:{open:function(o,i){e.callback=o;var n=i.pid,t=i.hide;this.pid=n,this.hide=t,e.dom.modal("show")},close:function(){e.dom.modal("hide")},submit:function(){nkcAPI("/p/".concat(this.pid,"/hide"),"PUT",{hide:this.hide}).then((function(){e.callback(),e.app.close()})).catch(sweetError)}}}),e.open=e.app.open,e.close=e.app.close}}()}));