!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";NKC.modules.insertMathformula=function(){var t=this;t.dom=$("#mathformulaContainer"),t.dom.draggable({scroll:!1,handle:".module-sr-title",drag:function(o,i){i.position.top<0&&(i.position.top=0);var n=$(window).height();i.position.top>n-30&&(i.position.top=n-30);var e=t.dom.width();i.position.left<100-e&&(i.position.left=100-e);var a=$(window).width();i.position.left>a-100&&(i.position.left=a-100)}});var o=$(window).width();t.dom.css("left",.5*(o-t.dom.width())),t.app=new Vue({el:"#mathformulaApp",data:{text:""},methods:{close:function(){t.dom.hide()},rendering:function(){var t=this.text||"$\\sum_{i=0}^N\\int_{a}^{b}g(t,i)\\text{d}t$",o=$("#mathOutput")[0];$(o).html(t),MathJax.typesetPromise([o])},open:function(o){t.dom.show(),o&&"function"==typeof o&&(this.callback=o)},insert:function(){this.callback(this.text),this.close()},callback:function(){}}}),t.open=t.app.open,t.close=t.app.close},Vue.config.ignoredElements=[/^mjx-/]}));