!function(n){"function"==typeof define&&define.amd?define(n):n()}((function(){"use strict";function n(){return(n=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var p in a)Object.prototype.hasOwnProperty.call(a,p)&&(n[p]=a[p])}return n}).apply(this,arguments)}function e(n,e){e.value&&n.focus()}function a(){app.warning.username="",app.warning.password="",app.warning.password1="",app.warning.mobile="",app.warning.code="",app.warning.imgCode="",app.warning.error=""}function p(){setTimeout((function(){0!==app.timeNumber&&(app.timeNumber--,p())}),1e3)}window.app=void 0,$((function(){window.app=new Vue({el:"#app",data:{warning:{error:"",mobile:"",code:"",username:"",password:"",password1:"",imgCode:""},mobile:"",password:"",nationCodes:nationCodes,nationCode:"86",timeNumber:0,code:"",password1:"",imgCode:"",username:"",btnText:"注册",btnText1:"提交",sending:!1,showTerms:!1,svgData:""},mounted:function(){$("#data").length&&this.getSvgData()},methods:{getSvgData:function(){nkcAPI("/register/code?t="+Date.now(),"GET").then((function(n){app.svgData=n.svgData})).catch((function(n){sweetError(n)}))},changeImgCode:function(){this.getSvgData()},changeTermsStatus:function(){app.showTerms=!app.showTerms},clearWarning:a,sendCode:function(){if(!(app.timeNumber>0))if(app.mobile)if("number"==typeof app.mobile)if(app.nationCode)if(app.imgCode){if(!app.sending){app.sending=!0;var n={nationCode:app.nationCode,mobile:app.mobile,imgCode:app.imgCode};nkcAPI("/sendMessage/register","POST",n).then((function(){app.sending=!1,app.timeNumber=120,p()})).catch((function(n){app.sending=!1,app.warning.error=n.error||n,app.changeImgCode()}))}}else app.warning.imgCode="请输入验证码";else app.warning.error="请选择国际区号";else app.warning.mobile="请输入正确的手机号";else app.warning.mobile="请输入手机号"},submit:function(){if("注册"===app.btnText){if(app.btnText="注册中...",!app.nationCode)return app.warning.error="请选择国际区号",void(app.btnText="注册");if(!app.mobile)return app.warning.mobile="请输入手机号码",void(app.btnText="注册");if("number"==typeof app.mobile){if(!app.imgCode)return app.warning.imgCode="请输入验证码",void(app.btnText="注册");if(!app.code)return app.warning.code="请输入验证码",void(app.btnText="注册");var n={nationCode:app.nationCode,mobile:app.mobile,code:app.code,imgCode:app.imgCode};nkcAPI("/register","POST",n).then((function(){window.location.reload()})).catch((function(n){app.warning.error=n.error||n,app.btnText="注册",app.changeImgCode()}))}else app.warning.mobile="请输入正确的手机号"}},submit1:function(){if("提交"===app.btnText1){if(app.btnText1="提交中...",!app.username)return app.warning.username="请输入用户名",void(app.btnText1="提交");if(!app.password)return app.warning.password="请输入密码",void(app.btnText1="提交");if(!app.password1)return app.warning.password1="请输入密码",void(app.btnText1="提交");if(app.password!==app.password1)return app.warning.error="两次输入的密码不一致",void(app.btnText1="提交");var n={username:app.username,password:app.password};nkcAPI("/register/information","POST",n).then((function(n){openToNewLocation("/u/"+n.user.uid+"/subscribe/register?type=register")})).catch((function(n){app.warning.error=n.error||n,app.btnText1="提交"}))}}},directives:{focus:{inserted:e}}})})),n(window,{focus:e,clearWarning:a,timeOut:p})}));