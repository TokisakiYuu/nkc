!function(n){"function"==typeof define&&define.amd?define(n):n()}((function(){"use strict";function n(){return(n=Object.assign||function(n){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n}).apply(this,arguments)}n(window,{cancelOrder:function(n){var o=prompt("【临时理由输入框】请输入取消订单的理由（取消后不可恢复）：","");if(null!==o)return""===o?screenTopWarning("理由不能为空"):void nkcAPI("/shop/order/"+n+"/cancel","PUT",{reason:o}).then((function(n){screenTopAlert("已取消订单"),window.location.reload()})).catch((function(n){screenTopWarning(n||n.error)}))},visitLogisticsInfo:function(n){openToNewLocation("/shop/order/"+n+"/logistics")},comfirmReceipt:function(n){confirm("确认收货后，货款将打入卖家账户")&&nkcAPI("/shop/order/"+n+"/receipt","PUT",{}).then((function(n){screenTopAlert("已确认收货"),window.location.reload()})).catch((function(n){screenTopWarning(n||n.error)}))},payNow:function(n){openToNewLocation("/shop/pay?ordersId="+n)},joinToDiscuss:function(n){openToNewLocation("/t/"+n)}})}));