!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";$((function(){var e=NKC.methods.getDataById("userSummaryData").userPostSummary;if(e){for(var t=[],a=[],o=[],r=0;r<e.length;r++){var s=e[r];t.push(s.forumName),o.push(s.color),a.push({value:s.count,name:s.forumName+"("+s.count+"条)"})}var n={title:{text:"活跃领域",subtext:"根据用户发表的文章和回复统计",x:"left"},tooltip:{trigger:"item",formatter:"{b} : {d}%"},legend:{show:!1,x:"center",y:"bottom",data:t},color:o,toolbox:{show:!1,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["pie","funnel"]},restore:{show:!0},saveAsImage:{show:!0}}},calculable:!0,series:[{name:"访问来源",type:"pie",radius:"50%",center:["50%","60%"],data:a,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};echarts.init(document.getElementById("user_summary")).setOption(n)}}))}));