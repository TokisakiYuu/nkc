!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";var e=NKC.methods.getDataById("data");console.log(e),new Vue({el:"#app",data:{orderId:"",userType:"username",userContent:"",tUserType:"username",tUserContent:""},mounted:function(){if(e.c){var t=JSON.parse(NKC.methods.base64ToStr(e.c));this.orderId=t.orderId,this.userType=t.userType,this.userContent=t.userContent,this.tUserType=t.tUserType,this.tUserContent=t.tUserContent}},methods:{submit:function(){var e=NKC.methods.strToBase64(JSON.stringify({orderId:this.orderId,userType:this.userType,userContent:this.userContent,tUserType:this.tUserType,tUserContent:this.tUserContent}));NKC.methods.visitUrl("/e/log/shop?c="+e)},reset:function(){NKC.methods.visitUrl("/e/log/shop")}}}),window.showOrderInfo=function(e){$(".product-info[data-order-id="+e+"]").toggle()}}));