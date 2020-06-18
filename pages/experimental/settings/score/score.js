(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function saveNumberSettings() {
  var coefficients = {
    postToForum: $('#postToForum').val(),
    postToThread: $('#postToThread').val(),
    digest: $('#digest').val(),
    digestPost: $('#digestPost').val(),
    dailyLogin: $('#dailyLogin').val(),
    xsf: $('#xsf').val(),
    thumbsUp: $('#thumbsUp').val(),
    violation: $('#violation').val()
  };
  nkcAPI('/e/settings/number', 'PATCH', {
    coefficients: coefficients
  }).then(function () {
    screenTopAlert('保存成功');
  })["catch"](function (data) {
    screenTopWarning(data.error || data);
  });
}

function updateFormula() {
  var dailyLogin = $('#dailyLogin').val();
  var postToForum = $('#postToForum').val();
  var postToThread = $('#postToThread').val();
  var digest = $('#digest').val();
  var digestPost_ = $('#digestPost').val();
  var thumbsUp = $('#thumbsUp').val();
  var violation = $('#violation').val();
  var xsf = $('#xsf').val();
  var text = '公式：(在线天数 x ' + dailyLogin + ') + ' + '(文章数 x ' + postToForum + ') + (' + '回复数 x ' + postToThread + ') + (' + '精选文章数 x ' + digest + ') + (' + '精选回复数 x ' + digestPost_ + ') + (' + '被点赞数^(1/2) x ' + thumbsUp + ') + (' + '学术分 x ' + xsf + ') + (' + '违规数 x ' + violation + ')';
  $('#formula').text(text);
}

$(function () {
  updateFormula();
  $('.formula input').on('input', function () {
    updateFormula();
  });
});
var data = NKC.methods.getDataById('data');
var app = new Vue({
  el: '#app',
  data: {},
  methods: {}
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInBhZ2VzL2V4cGVyaW1lbnRhbC9zZXR0aW5ncy9zY29yZS9zY29yZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQVMsa0JBQVQsR0FBOEI7QUFDNUIsTUFBSSxZQUFZLEdBQUc7QUFDakIsSUFBQSxXQUFXLEVBQUUsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURJO0FBRWpCLElBQUEsWUFBWSxFQUFFLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUIsR0FBbkIsRUFGRztBQUdqQixJQUFBLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBRCxDQUFELENBQWEsR0FBYixFQUhTO0FBSWpCLElBQUEsVUFBVSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsR0FBakIsRUFKSztBQUtqQixJQUFBLFVBQVUsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEdBQWpCLEVBTEs7QUFNakIsSUFBQSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLEdBQVYsRUFOWTtBQU9qQixJQUFBLFFBQVEsRUFBRSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUsR0FBZixFQVBPO0FBUWpCLElBQUEsU0FBUyxFQUFFLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsR0FBaEI7QUFSTSxHQUFuQjtBQVVBLEVBQUEsTUFBTSxDQUFDLG9CQUFELEVBQXVCLE9BQXZCLEVBQWdDO0FBQUMsSUFBQSxZQUFZLEVBQUU7QUFBZixHQUFoQyxDQUFOLENBQ0csSUFESCxDQUNRLFlBQVc7QUFDZixJQUFBLGNBQWMsQ0FBQyxNQUFELENBQWQ7QUFDRCxHQUhILFdBSVMsVUFBUyxJQUFULEVBQWU7QUFDcEIsSUFBQSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBTCxJQUFZLElBQWIsQ0FBaEI7QUFDRCxHQU5IO0FBT0Q7O0FBRUQsU0FBUyxhQUFULEdBQXlCO0FBQ3ZCLE1BQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsR0FBakIsRUFBakI7QUFDQSxNQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLEVBQWxCO0FBQ0EsTUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUFuQjtBQUNBLE1BQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxHQUFiLEVBQWI7QUFDQSxNQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEdBQWpCLEVBQWxCO0FBQ0EsTUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLEdBQWYsRUFBZjtBQUNBLE1BQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsR0FBaEIsRUFBaEI7QUFDQSxNQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsR0FBVixFQUFWO0FBRUEsTUFBSSxJQUFJLEdBQUcsZ0JBQWdCLFVBQWhCLEdBQTZCLE1BQTdCLEdBQXNDLFNBQXRDLEdBQWtELFdBQWxELEdBQWdFLE9BQWhFLEdBQTBFLFFBQTFFLEdBQXFGLFlBQXJGLEdBQW9HLE9BQXBHLEdBQThHLFVBQTlHLEdBQTJILE1BQTNILEdBQW9JLE9BQXBJLEdBQThJLFVBQTlJLEdBQTJKLFdBQTNKLEdBQXlLLE9BQXpLLEdBQW1MLGVBQW5MLEdBQXFNLFFBQXJNLEdBQWdOLE9BQWhOLEdBQTBOLFFBQTFOLEdBQXFPLEdBQXJPLEdBQTJPLE9BQTNPLEdBQXFQLFFBQXJQLEdBQWdRLFNBQWhRLEdBQTRRLEdBQXZSO0FBQ0EsRUFBQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsSUFBZCxDQUFtQixJQUFuQjtBQUNEOztBQUVELENBQUMsQ0FBQyxZQUFXO0FBQ1gsRUFBQSxhQUFhO0FBQ2IsRUFBQSxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3pDLElBQUEsYUFBYTtBQUNkLEdBRkQ7QUFHRCxDQUxBLENBQUQ7QUFPQSxJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBSixDQUFZLFdBQVosQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLElBQU0sR0FBRyxHQUFHLElBQUksR0FBSixDQUFRO0FBQ2xCLEVBQUEsRUFBRSxFQUFFLE1BRGM7QUFFbEIsRUFBQSxJQUFJLEVBQUUsRUFGWTtBQUtsQixFQUFBLE9BQU8sRUFBRTtBQUxTLENBQVIsQ0FBWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIHNhdmVOdW1iZXJTZXR0aW5ncygpIHtcclxuICB2YXIgY29lZmZpY2llbnRzID0ge1xyXG4gICAgcG9zdFRvRm9ydW06ICQoJyNwb3N0VG9Gb3J1bScpLnZhbCgpLFxyXG4gICAgcG9zdFRvVGhyZWFkOiAkKCcjcG9zdFRvVGhyZWFkJykudmFsKCksXHJcbiAgICBkaWdlc3Q6ICQoJyNkaWdlc3QnKS52YWwoKSxcclxuICAgIGRpZ2VzdFBvc3Q6ICQoJyNkaWdlc3RQb3N0JykudmFsKCksXHJcbiAgICBkYWlseUxvZ2luOiAkKCcjZGFpbHlMb2dpbicpLnZhbCgpLFxyXG4gICAgeHNmOiAkKCcjeHNmJykudmFsKCksXHJcbiAgICB0aHVtYnNVcDogJCgnI3RodW1ic1VwJykudmFsKCksXHJcbiAgICB2aW9sYXRpb246ICQoJyN2aW9sYXRpb24nKS52YWwoKVxyXG4gIH07XHJcbiAgbmtjQVBJKCcvZS9zZXR0aW5ncy9udW1iZXInLCAnUEFUQ0gnLCB7Y29lZmZpY2llbnRzOiBjb2VmZmljaWVudHN9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNjcmVlblRvcEFsZXJ0KCfkv53lrZjmiJDlip8nKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICBzY3JlZW5Ub3BXYXJuaW5nKGRhdGEuZXJyb3J8fGRhdGEpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlRm9ybXVsYSgpIHtcclxuICB2YXIgZGFpbHlMb2dpbiA9ICQoJyNkYWlseUxvZ2luJykudmFsKCk7XHJcbiAgdmFyIHBvc3RUb0ZvcnVtID0gJCgnI3Bvc3RUb0ZvcnVtJykudmFsKCk7XHJcbiAgdmFyIHBvc3RUb1RocmVhZCA9ICQoJyNwb3N0VG9UaHJlYWQnKS52YWwoKTtcclxuICB2YXIgZGlnZXN0ID0gJCgnI2RpZ2VzdCcpLnZhbCgpO1xyXG4gIHZhciBkaWdlc3RQb3N0XyA9ICQoJyNkaWdlc3RQb3N0JykudmFsKCk7XHJcbiAgdmFyIHRodW1ic1VwID0gJCgnI3RodW1ic1VwJykudmFsKCk7XHJcbiAgdmFyIHZpb2xhdGlvbiA9ICQoJyN2aW9sYXRpb24nKS52YWwoKTtcclxuICB2YXIgeHNmID0gJCgnI3hzZicpLnZhbCgpO1xyXG5cclxuICB2YXIgdGV4dCA9ICflhazlvI/vvJoo5Zyo57q/5aSp5pWwIHggJyArIGRhaWx5TG9naW4gKyAnKSArICcgKyAnKOaWh+eroOaVsCB4ICcgKyBwb3N0VG9Gb3J1bSArICcpICsgKCcgKyAn5Zue5aSN5pWwIHggJyArIHBvc3RUb1RocmVhZCArICcpICsgKCcgKyAn57K+6YCJ5paH56ug5pWwIHggJyArIGRpZ2VzdCArICcpICsgKCcgKyAn57K+6YCJ5Zue5aSN5pWwIHggJyArIGRpZ2VzdFBvc3RfICsgJykgKyAoJyArICfooqvngrnotZ7mlbBeKDEvMikgeCAnICsgdGh1bWJzVXAgKyAnKSArICgnICsgJ+Wtpuacr+WIhiB4ICcgKyB4c2YgKyAnKSArICgnICsgJ+i/neinhOaVsCB4ICcgKyB2aW9sYXRpb24gKyAnKSc7XHJcbiAgJCgnI2Zvcm11bGEnKS50ZXh0KHRleHQpO1xyXG59XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gIHVwZGF0ZUZvcm11bGEoKTtcclxuICAkKCcuZm9ybXVsYSBpbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgdXBkYXRlRm9ybXVsYSgpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNvbnN0IGRhdGEgPSBOS0MubWV0aG9kcy5nZXREYXRhQnlJZCgnZGF0YScpO1xyXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIGRhdGE6IHtcclxuXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcblxyXG4gIH1cclxufSk7XHJcbiJdfQ==
