(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var data = NKC.methods.getDataById("subUsersId");
var noteApp = new Vue({
  el: "#note",
  data: {
    uid: NKC.configs.uid,
    threads: data.threads,
    timeout: null
  },
  mounted: function mounted() {
    if (window.floatUserPanel) {
      window.floatUserPanel.initPanel();
    }
  },
  methods: {
    getUrl: NKC.methods.tools.getUrl,
    visitUrl: NKC.methods.visitUrl,
    fromNow: NKC.methods.fromNow,
    modifyNote: function modifyNote(nc) {
      nc.edit = !nc.edit;

      if (nc.edit) {
        setTimeout(function () {
          noteApp.textareaAutoResize(nc);
        }, 50);
      }
    },
    saveNewNote: function saveNewNote(note) {
      var _id = note._id,
          newContent = note.newContent,
          targetId = note.targetId,
          type = note.type;
      Promise.resolve().then(function () {
        if (!newContent) throw "请输入笔记内容";
        return nkcAPI("/note", "POST", {
          _id: _id,
          type: type,
          targetId: targetId,
          content: newContent
        });
      }).then(function (data) {
        note.notes.push(data.noteContent);
        note.newContent = "";
        noteApp.addNote(note);
        noteApp.textareaAutoResize(note, "note");
      })["catch"](sweetError);
    },
    addNote: function addNote(note) {
      note.edit = !note.edit;
    },
    deleteNote: function deleteNote(note, nc) {
      sweetQuestion("确定要执行删除操作？").then(function () {
        var noteId = nc.noteId,
            _id = nc._id;
        return nkcAPI("/note/".concat(noteId, "/c/").concat(_id), "DELETE");
      }).then(function () {
        var index = note.notes.indexOf(nc);
        if (index !== -1) note.notes.splice(index, 1);
      })["catch"](sweetError);
    },
    saveContent: function saveContent(nc) {
      var content = nc.content,
          noteId = nc.noteId,
          _id = nc._id;
      nkcAPI("/note/".concat(noteId, "/c/").concat(_id), "PUT", {
        content: content
      }).then(function (data) {
        nc.html = data.noteContentHTML;
        noteApp.resetTextarea(nc);
      })["catch"](sweetError);
    },
    getTextarea: function getTextarea(nc) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return this.$refs[t + nc._id][0];
    },
    resetTextarea: function resetTextarea(nc, t) {
      nc.edit = false;
      this.textareaAutoResize(nc, t);
    },
    textareaAutoResize: function textareaAutoResize(nc, t) {
      var textArea = this.getTextarea(nc, t);
      var num = 4 * 12;

      if (num < textArea.scrollHeight) {
        textArea.style.height = textArea.scrollHeight + 'px';
      } else {
        textArea.style.height = '4rem';
      }
      /*clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const textArea = this.getTextarea(nc, t);
        const num = 4 * 12;
        if(num < textArea.scrollHeight) {
          textArea.style.height = textArea.scrollHeight + 'px';
        } else {
          textArea.style.height = '4rem';
        }
      }, 100);*/

    }
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInBhZ2VzL3VzZXIvcHJvZmlsZS9ub3RlLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxXQUFaLENBQXdCLFlBQXhCLENBQWI7QUFDQSxJQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUosQ0FBUTtBQUN0QixFQUFBLEVBQUUsRUFBRSxPQURrQjtBQUV0QixFQUFBLElBQUksRUFBRTtBQUNKLElBQUEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFKLENBQVksR0FEYjtBQUVKLElBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUZWO0FBR0osSUFBQSxPQUFPLEVBQUU7QUFITCxHQUZnQjtBQU90QixFQUFBLE9BUHNCLHFCQU9aO0FBQ1IsUUFBRyxNQUFNLENBQUMsY0FBVixFQUEwQjtBQUN4QixNQUFBLE1BQU0sQ0FBQyxjQUFQLENBQXNCLFNBQXRCO0FBQ0Q7QUFDRixHQVhxQjtBQVl0QixFQUFBLE9BQU8sRUFBRTtBQUNQLElBQUEsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFKLENBQVksS0FBWixDQUFrQixNQURuQjtBQUVQLElBQUEsUUFBUSxFQUFFLEdBQUcsQ0FBQyxPQUFKLENBQVksUUFGZjtBQUdQLElBQUEsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFKLENBQVksT0FIZDtBQUlQLElBQUEsVUFKTyxzQkFJSSxFQUpKLEVBSVE7QUFDYixNQUFBLEVBQUUsQ0FBQyxJQUFILEdBQVUsQ0FBQyxFQUFFLENBQUMsSUFBZDs7QUFDQSxVQUFHLEVBQUUsQ0FBQyxJQUFOLEVBQVk7QUFDVixRQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBQSxPQUFPLENBQUMsa0JBQVIsQ0FBMkIsRUFBM0I7QUFDRCxTQUZTLEVBRVAsRUFGTyxDQUFWO0FBR0Q7QUFDRixLQVhNO0FBWVAsSUFB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QyxJQUFILEdBQVUsS0FBVjtBQUNBLFdBQUssa0JBQUwsQ0FBd0IsRUFBeEIsRUFBNEIsQ0FBNUI7QUFDRCxLQWhFTTtBQWlFUCxJQUFBLGtCQWpFTyw4QkFpRVksRUFqRVosRUFpRWdCLENBakVoQixFQWlFbUI7QUFDeEIsVUFBTSxRQUFRLEdBQUcsS0FBSyxXQUFMLENBQWlCLEVBQWpCLEVBQXFCLENBQXJCLENBQWpCO0FBQ0EsVUFBTSxHQUFHLEdBQUcsSUFBSSxFQUFoQjs7QUFDQSxVQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsWUFBbEIsRUFBZ0M7QUFDOUIsUUFBQSxRQUFRLENBQUMsS0FBVCxDQUFlLE1BQWYsR0FBd0IsUUFBUSxDQUFDLFlBQVQsR0FBd0IsSUFBaEQ7QUFDRCxPQUZELE1BRU87QUFDTCxRQUFBLFFBQVEsQ0FBQyxLQUFULENBQWUsTUFBZixHQUF3QixNQUF4QjtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7O0FBVUQ7QUFuRk07QUFaYSxDQUFSLENBQWhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgZGF0YSA9IE5LQy5tZXRob2RzLmdldERhdGFCeUlkKFwic3ViVXNlcnNJZFwiKTtcclxuY29uc3Qgbm90ZUFwcCA9IG5ldyBWdWUoe1xyXG4gIGVsOiBcIiNub3RlXCIsXHJcbiAgZGF0YToge1xyXG4gICAgdWlkOiBOS0MuY29uZmlncy51aWQsXHJcbiAgICB0aHJlYWRzOiBkYXRhLnRocmVhZHMsXHJcbiAgICB0aW1lb3V0OiBudWxsXHJcbiAgfSxcclxuICBtb3VudGVkKCkge1xyXG4gICAgaWYod2luZG93LmZsb2F0VXNlclBhbmVsKSB7XHJcbiAgICAgIHdpbmRvdy5mbG9hdFVzZXJQYW5lbC5pbml0UGFuZWwoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdldFVybDogTktDLm1ldGhvZHMudG9vbHMuZ2V0VXJsLFxyXG4gICAgdmlzaXRVcmw6IE5LQy5tZXRob2RzLnZpc2l0VXJsLFxyXG4gICAgZnJvbU5vdzogTktDLm1ldGhvZHMuZnJvbU5vdyxcclxuICAgIG1vZGlmeU5vdGUobmMpIHtcclxuICAgICAgbmMuZWRpdCA9ICFuYy5lZGl0O1xyXG4gICAgICBpZihuYy5lZGl0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBub3RlQXBwLnRleHRhcmVhQXV0b1Jlc2l6ZShuYyk7XHJcbiAgICAgICAgfSwgNTApXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzYXZlTmV3Tm90ZShub3RlKSB7XHJcbiAgICAgIGNvbnN0IHtfaWQsIG5ld0NvbnRlbnQsIHRhcmdldElkLCB0eXBlfSA9IG5vdGU7XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgaWYoIW5ld0NvbnRlbnQpIHRocm93IFwi6K+36L6T5YWl56yU6K6w5YaF5a65XCI7XHJcbiAgICAgICAgICByZXR1cm4gbmtjQVBJKFwiL25vdGVcIiwgXCJQT1NUXCIsIHtcclxuICAgICAgICAgICAgX2lkLFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICB0YXJnZXRJZCxcclxuICAgICAgICAgICAgY29udGVudDogbmV3Q29udGVudFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIG5vdGUubm90ZXMucHVzaChkYXRhLm5vdGVDb250ZW50KTtcclxuICAgICAgICAgIG5vdGUubmV3Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICBub3RlQXBwLmFkZE5vdGUobm90ZSk7XHJcbiAgICAgICAgICBub3RlQXBwLnRleHRhcmVhQXV0b1Jlc2l6ZShub3RlLCBcIm5vdGVcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goc3dlZXRFcnJvcik7XHJcbiAgICB9LFxyXG4gICAgYWRkTm90ZShub3RlKSB7XHJcbiAgICAgIG5vdGUuZWRpdCA9ICFub3RlLmVkaXQ7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlTm90ZShub3RlLCBuYykge1xyXG4gICAgICBzd2VldFF1ZXN0aW9uKFwi56Gu5a6a6KaB5omn6KGM5Yig6Zmk5pON5L2c77yfXCIpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qge25vdGVJZCwgX2lkfSA9IG5jO1xyXG4gICAgICAgICAgcmV0dXJuIG5rY0FQSShgL25vdGUvJHtub3RlSWR9L2MvJHtfaWR9YCwgXCJERUxFVEVcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IG5vdGUubm90ZXMuaW5kZXhPZihuYyk7XHJcbiAgICAgICAgICBpZihpbmRleCAhPT0gLTEpIG5vdGUubm90ZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChzd2VldEVycm9yKTtcclxuICAgIH0sXHJcbiAgICBzYXZlQ29udGVudChuYykge1xyXG4gICAgICBjb25zdCB7Y29udGVudCwgbm90ZUlkLCBfaWR9ID0gbmM7XHJcbiAgICAgIG5rY0FQSShgL25vdGUvJHtub3RlSWR9L2MvJHtfaWR9YCwgXCJQVVRcIiwge1xyXG4gICAgICAgIGNvbnRlbnRcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIG5jLmh0bWwgPSBkYXRhLm5vdGVDb250ZW50SFRNTDtcclxuICAgICAgICAgIG5vdGVBcHAucmVzZXRUZXh0YXJlYShuYyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goc3dlZXRFcnJvcik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VGV4dGFyZWEobmMsIHQgPSBcIlwiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLiRyZWZzW3QrbmMuX2lkXVswXTtcclxuICAgIH0sXHJcbiAgICByZXNldFRleHRhcmVhKG5jLCB0KSB7XHJcbiAgICAgIG5jLmVkaXQgPSBmYWxzZTtcclxuICAgICAgdGhpcy50ZXh0YXJlYUF1dG9SZXNpemUobmMsIHQpO1xyXG4gICAgfSxcclxuICAgIHRleHRhcmVhQXV0b1Jlc2l6ZShuYywgdCkge1xyXG4gICAgICBjb25zdCB0ZXh0QXJlYSA9IHRoaXMuZ2V0VGV4dGFyZWEobmMsIHQpO1xyXG4gICAgICBjb25zdCBudW0gPSA0ICogMTI7XHJcbiAgICAgIGlmKG51bSA8IHRleHRBcmVhLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLmhlaWdodCA9IHRleHRBcmVhLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUuaGVpZ2h0ID0gJzRyZW0nO1xyXG4gICAgICB9XHJcbiAgICAgIC8qY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gdGhpcy5nZXRUZXh0YXJlYShuYywgdCk7XHJcbiAgICAgICAgY29uc3QgbnVtID0gNCAqIDEyO1xyXG4gICAgICAgIGlmKG51bSA8IHRleHRBcmVhLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgdGV4dEFyZWEuc3R5bGUuaGVpZ2h0ID0gdGV4dEFyZWEuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGV4dEFyZWEuc3R5bGUuaGVpZ2h0ID0gJzRyZW0nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwKTsqL1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdfQ==
