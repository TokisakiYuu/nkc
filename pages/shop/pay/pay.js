!function i(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var n=s[t]={exports:{}};a[t][0].call(n.exports,function(e){return u(a[t][1][e]||e)},n,n.exports,i,a,s,c)}return s[t].exports}for(var f="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(e,t,r){"use strict";var o=NKC.methods.getDataById("data");new Vue({el:"#app",data:{rechargeSettings:o.rechargeSettings,userMainScore:o.userMainScore,mainScore:o.mainScore,totalMoney:o.totalMoney,ordersId:o.ordersId,payment:"mainScore",password:""},computed:{aliPay:function(){var e=this.rechargeSettings.aliPay,t=this.totalMoney/(1-e.fee),r=t-this.totalMoney;return{enabled:e.enabled,fee:e.fee,_fee:Number((100*e.fee).toFixed(4)),totalPrice:Number(t.toFixed(2)),feePrice:Number(r.toFixed(2))}},weChat:function(){return this.rechargeSettings.weChat},needRecharge:function(){return this.userMainScore/100<this.totalMoney}},methods:{getUrl:NKC.methods.tools.getUrl,selectPayment:function(e){this.payment=e},submit:function(){var e=this.password,t=this.ordersId,r=this.totalMoney,o=this;Promise.resolve().then(function(){if(!e)throw"请输入登录密码";return nkcAPI("/shop/pay","POST",{ordersId:t,password:e,totalPrice:r})}).then(function(){sweetSuccess("支付成功"),o.password="",setTimeout(function(){NKC.methods.visitUrl("/shop/order")},3e3)}).catch(sweetError)},useAliPay:function(){var t,e=this.ordersId,r=this.aliPay,o=r.totalPrice,n=(r.feePrice,"/shop/pay/alipay?ordersId=".concat(e,"&money=").concat(o)),i=NKC.methods.isPhone();if("reactNative"!==NKC.configs.platform){if(i)return n+="&redirect=true",screenTopAlert("正在前往支付宝..."),window.location.href=n;t=window.open()}Promise.resolve().then(function(){return nkcAPI(n,"GET").then(function(e){"reactNative"===NKC.configs.platform?NKC.methods.visitUrl(e.alipayUrl,!0):t.location=e.alipayUrl,sweetInfo("请在浏览器新打开的窗口完成支付！若没有新窗口打开，请检查新窗口是否已被浏览器拦截。")}).catch(function(e){sweetError(e),t&&(t.document.body.innerHTML=e.error||e)})})}}})},{}]},{},[1]);