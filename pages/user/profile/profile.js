(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.draft = new ( /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "removeDraft",
    value: function removeDraft(did) {
      nkcAPI('/u/' + NKC.configs.uid + "/drafts/" + did, "DELETE").then(function () {
        window.location.reload();
      })["catch"](function (data) {
        sweetError(data);
      });
    }
  }, {
    key: "removeDraftSingle",
    value: function removeDraftSingle(did) {
      var self = this;
      sweetQuestion("确定要删除当前草稿？删除后不可恢复。").then(function () {
        self.removeDraft(did);
      })["catch"](function () {});
    }
    /*
    * 清空草稿箱
    * */

  }, {
    key: "removeAll",
    value: function removeAll() {
      var self = this;
      sweetQuestion("确定要删除全部草稿？删除后不可恢复。").then(function () {
        self.removeDraft("all");
      })["catch"](function () {});
    }
  }, {
    key: "getInputs",
    value: function getInputs() {
      return $(".draft-checkbox input");
    }
  }, {
    key: "getSelectedDraftsId",
    value: function getSelectedDraftsId() {
      var arr = [];
      var dom = this.getInputs();

      for (var i = 0; i < dom.length; i++) {
        var d = dom.eq(i);

        if (d.prop("checked")) {
          arr.push(d.attr("data-did"));
        }
      }

      return arr;
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      var selectedDraftsId = this.getSelectedDraftsId();
      var dom = this.getInputs();

      if (selectedDraftsId.length !== dom.length) {
        dom.prop("checked", true);
      } else {
        dom.prop("checked", false);
      }
    }
  }, {
    key: "removeSelectedDrafts",
    value: function removeSelectedDrafts() {
      var selectedDraftsId = this.getSelectedDraftsId();
      var self = this;
      if (!selectedDraftsId.length) return;
      var did = selectedDraftsId.join("-");
      sweetQuestion("确定要删除已勾选的草稿？删除后不可恢复。").then(function () {
        self.removeDraft(did);
      })["catch"](function () {});
    }
  }]);

  return _class;
}())();
var data = NKC.methods.getDataById("subUsersId");

if (!window.SubscribeTypes) {
  window.SubscribeTypes = new NKC.modules.SubscribeTypes();
}

window.user = new ( /*#__PURE__*/function () {
  function _class2() {
    _classCallCheck(this, _class2);

    this.subUsersId = data.subUsersId;
    this.subForumsId = data.subForumsId;
    this.subColumnsId = data.subColumnsId;
    this.subThreadsId = data.subThreadsId;
    this.collectionThreadsId = data.collectionThreadsId;
    this.subscribes = data.subscribes;
  }

  _createClass(_class2, [{
    key: "moveSub",
    value: function moveSub(subId) {
      this.moveSubs([subId]);
    }
  }, {
    key: "moveSubs",
    value: function moveSubs() {
      var subsId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var subscribes = [];
      var self = this;
      subsId.map(function (id) {
        var s = self.subscribes[id];
        if (s) subscribes.push(s);
      });
      var selectedTypesId = [];

      if (subscribes.length === 1) {
        selectedTypesId = subscribes[0].cid;
      } else if (subscribes.length === 0) {
        return;
      }

      subsId = subscribes.map(function (s) {
        return s._id;
      });
      SubscribeTypes.open(function (typesId) {
        nkcAPI("/account/subscribes", "PATCH", {
          type: "modifyType",
          typesId: typesId,
          subscribesId: subsId
        }).then(function () {
          SubscribeTypes.close();
          subscribes.map(function (s) {
            s.cid = typesId;
          });
          sweetSuccess("执行成功");
        })["catch"](function (data) {
          sweetError(data);
        });
      }, {
        selectedTypesId: selectedTypesId,
        hideInfo: true,
        selectTypesWhenSubscribe: true
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(id, type) {
      var buttonsDom = $(".account-follower-buttons[data-".concat(type, "='").concat(id, "']"));
      var subId, func;

      if (type === "user") {
        subId = this.subUsersId;
        func = SubscribeTypes.subscribeUserPromise;
      } else if (type === "forum") {
        subId = this.subForumsId;
        func = SubscribeTypes.subscribeForumPromise;
      } else if (type === "column") {
        subId = this.subColumnsId;
        id = Number(id);
        func = SubscribeTypes.subscribeColumnPromise;
      } else if (type === "thread") {
        subId = this.subThreadsId;
        func = SubscribeTypes.subscribeThreadPromise;
      } else if (type === "collection") {
        subId = this.collectionThreadsId;
        func = SubscribeTypes.collectionThreadPromise;
      }

      var sub = !subId.includes(id);
      new Promise(function (resolve, reject) {
        if (!["user", "collection", "thread"].includes(type) || !sub) {
          resolve();
        } else {
          SubscribeTypes.open(function (cid) {
            resolve(cid);
          });
        }
      }).then(function (cid) {
        if (cid) {
          return func(id, sub, cid);
        } else {
          return func(id, sub);
        }
      }).then(function () {
        SubscribeTypes.close();

        if (sub) {
          if (type === "collection") {
            sweetSuccess("收藏成功");
          } else {
            sweetSuccess("关注成功");
          }

          buttonsDom.addClass("active");
          var index = subId.indexOf(id);
          if (index === -1) subId.push(id);
        } else {
          if (type === "collection") {
            sweetSuccess("收藏已取消");
          } else {
            sweetSuccess("关注已取消");
          }

          buttonsDom.removeClass("active");

          var _index = subId.indexOf(id);

          if (_index !== -1) subId.splice(_index, 1);
        }
      })["catch"](sweetError);
      /*if(sub) {
        SubscribeTypes.open(function(cid) {
          func(id, sub, cid)
            .then(function() {
              SubscribeTypes.close();
              if(type === "collection") {
                sweetSuccess("收藏成功");
              } else {
                sweetSuccess("关注成功");
              }
              buttonsDom.addClass("active");
              const index = subId.indexOf(id);
              if(index === -1) subId.push(id);
            })
            .catch(function(data) {
              sweetError(data);
            })
        });
        } else {
          func(id, sub)
          .then(function() {
            buttonsDom.removeClass("active");
            if(type === "collection") {
              sweetSuccess("收藏已取消");
            } else {
              sweetSuccess("关注已取消");
            }
            const index = subId.indexOf(id);
            if(index !== -1) subId.splice(index, 1);
          })
          .catch(function(data) {
            sweetError(data);
          })
      }*/
    }
  }, {
    key: "editType",
    value: function editType() {
      SubscribeTypes.open(function () {}, {
        editType: true
      });
    }
  }]);

  return _class2;
}())();

window.removeBlacklist = function (uid, _id) {
  NKC.methods.removeUserFromBlacklist(uid).then(function (data) {
    if (!data) return;
    var dom = $("[data-type=\"blacklist\"][data-id=\"".concat(_id, "\"]"));
    if (dom && dom.length) dom.remove();
  });
};

if (NKC.configs.isApp) {
  window.ready().then(function () {
    newEvent("userChanged", function (data) {
      if (!data.user) return;
      window.location.href = window.location.pathname.replace(/\/u\/([0-9]+\/)/ig, "/u/" + data.user.uid + "/");
    });
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWdlcy91c2VyL3Byb2ZpbGUvcHJvZmlsZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE1BQU0sQ0FBQyxLQUFQLEdBQWU7QUFDYixvQkFBYztBQUFBO0FBRWI7O0FBSFk7QUFBQTtBQUFBLGdDQUlELEdBSkMsRUFJSTtBQUNmLE1BQUEsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQUosQ0FBWSxHQUFwQixHQUEwQixVQUExQixHQUF1QyxHQUF4QyxFQUE2QyxRQUE3QyxDQUFOLENBQ0csSUFESCxDQUNRLFlBQVc7QUFDZixRQUFBLE1BQU0sQ0FBQyxRQUFQLENBQWdCLE1BQWhCO0FBQ0QsT0FISCxXQUlTLFVBQVMsSUFBVCxFQUFlO0FBQ3BCLFFBQUEsVUFBVSxDQUFDLElBQUQsQ0FBVjtBQUNELE9BTkg7QUFPRDtBQVpZO0FBQUE7QUFBQSxzQ0FhSyxHQWJMLEVBYVU7QUFDckIsVUFBTSxJQUFJLEdBQUcsSUFBYjtBQUNBLE1BQUEsYUFBYSxDQUFDLG9CQUFELENBQWIsQ0FDRyxJQURILENBQ1EsWUFBVztBQUNmLFFBQUEsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsR0FBakI7QUFDRCxPQUhILFdBSVMsWUFBVyxDQUFFLENBSnRCO0FBS0Q7QUFDRDs7OztBQXJCYTtBQUFBO0FBQUEsZ0NBd0JEO0FBQ1YsVUFBSSxJQUFJLEdBQUcsSUFBWDtBQUNBLE1BQUEsYUFBYSxDQUFDLG9CQUFELENBQWIsQ0FDRyxJQURILENBQ1EsWUFBVztBQUNmLFFBQUEsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsS0FBakI7QUFDRCxPQUhILFdBSVMsWUFBVSxDQUFFLENBSnJCO0FBS0Q7QUEvQlk7QUFBQTtBQUFBLGdDQWlDRDtBQUNWLGFBQU8sQ0FBQyxDQUFDLHVCQUFELENBQVI7QUFDRDtBQW5DWTtBQUFBO0FBQUEsMENBcUNTO0FBQ3BCLFVBQUksR0FBRyxHQUFH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LEVBQUU7QUFEVCxPQUZIO0FBS0Q7QUE3Slc7O0FBQUE7QUFBQSxNQUFkOztBQWlLQSxNQUFNLENBQUMsZUFBUCxHQUF5QixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDckMsRUFBQSxHQUFHLENBQUMsT0FBSixDQUFZLHVCQUFaLENBQW9DLEdBQXBDLEVBQ0csSUFESCxDQUNRLFVBQUEsSUFBSSxFQUFJO0FBQ1osUUFBRyxDQUFDLElBQUosRUFBVTtBQUNWLFFBQU0sR0FBRyxHQUFHLENBQUMsK0NBQXFDLEdBQXJDLFNBQWI7QUFDQSxRQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBZCxFQUFzQixHQUFHLENBQUMsTUFBSjtBQUN2QixHQUxIO0FBTUQsQ0FQRDs7QUFTQSxJQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksS0FBZixFQUFzQjtBQUNwQixFQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQ0csSUFESCxDQUNRLFlBQVc7QUFDZixJQUFBLFFBQVEsQ0FBQyxhQUFELEVBQWdCLFVBQVMsSUFBVCxFQUFlO0FBQ3JDLFVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBVCxFQUFlO0FBQ2YsTUFBQSxNQUFNLENBQUMsUUFBUCxDQUFnQixJQUFoQixHQUF1QixNQUFNLENBQUMsUUFBUCxDQUFnQixRQUFoQixDQUF5QixPQUF6QixDQUFpQyxtQkFBakMsRUFBc0QsUUFBUSxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQWxCLEdBQXdCLEdBQTlFLENBQXZCO0FBQ0QsS0FITyxDQUFSO0FBSUQsR0FOSDtBQU9EIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwid2luZG93LmRyYWZ0ID0gbmV3IChjbGFzcyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gIH1cclxuICByZW1vdmVEcmFmdChkaWQpIHtcclxuICAgIG5rY0FQSSgnL3UvJyArIE5LQy5jb25maWdzLnVpZCArIFwiL2RyYWZ0cy9cIiArIGRpZCwgXCJERUxFVEVcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHN3ZWV0RXJyb3IoZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgfVxyXG4gIHJlbW92ZURyYWZ0U2luZ2xlKGRpZCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzd2VldFF1ZXN0aW9uKFwi56Gu5a6a6KaB5Yig6Zmk5b2T5YmN6I2J56i/77yf5Yig6Zmk5ZCO5LiN5Y+v5oGi5aSN44CCXCIpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNlbGYucmVtb3ZlRHJhZnQoZGlkKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uKCkge30pXHJcbiAgfVxyXG4gIC8qXHJcbiAgKiDmuIXnqbrojYnnqL/nrrFcclxuICAqICovXHJcbiAgcmVtb3ZlQWxsKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc3dlZXRRdWVzdGlvbihcIuehruWumuimgeWIoOmZpOWFqOmDqOiNieeov++8n+WIoOmZpOWQjuS4jeWPr+aBouWkjeOAglwiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWxmLnJlbW92ZURyYWZ0KFwiYWxsXCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oKXt9KVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5wdXRzKCkge1xyXG4gICAgcmV0dXJuICQoXCIuZHJhZnQtY2hlY2tib3ggaW5wdXRcIik7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZERyYWZ0c0lkKCkge1xyXG4gICAgdmFyIGFyciA9IFtdO1xyXG4gICAgdmFyIGRvbSA9IHRoaXMuZ2V0SW5wdXRzKCk7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZG9tLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBkID0gZG9tLmVxKGkpO1xyXG4gICAgICBpZihkLnByb3AoXCJjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgYXJyLnB1c2goZC5hdHRyKFwiZGF0YS1kaWRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0QWxsKCkge1xyXG4gICAgdmFyIHNlbGVjdGVkRHJhZnRzSWQgPSB0aGlzLmdldFNlbGVjdGVkRHJhZnRzSWQoKTtcclxuICAgIHZhciBkb20gPSB0aGlzLmdldElucHV0cygpO1xyXG4gICAgaWYoc2VsZWN0ZWREcmFmdHNJZC5sZW5ndGggIT09IGRvbS5sZW5ndGgpIHtcclxuICAgICAgZG9tLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZVNlbGVjdGVkRHJhZnRzKCkge1xyXG4gICAgdmFyIHNlbGVjdGVkRHJhZnRzSWQgPSB0aGlzLmdldFNlbGVjdGVkRHJhZnRzSWQoKTtcclxuICAgIHZhciBzZWxmID0gdGhpczsgICAgaWYoIXNlbGVjdGVkRHJhZnRzSWQubGVuZ3RoKSByZXR1cm47XHJcbiAgICB2YXIgZGlkID0gc2VsZWN0ZWREcmFmdHNJZC5qb2luKFwiLVwiKTtcclxuICAgIHN3ZWV0UXVlc3Rpb24oXCLnoa7lrpropoHliKDpmaTlt7Lli77pgInnmoTojYnnqL/vvJ/liKDpmaTlkI7kuI3lj6/mgaLlpI3jgIJcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2VsZi5yZW1vdmVEcmFmdChkaWQpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oKSB7fSlcclxuICB9XHJcbn0pKCk7XHJcbmNvbnN0IGRhdGEgPSBOS0MubWV0aG9kcy5nZXREYXRhQnlJZChcInN1YlVzZXJzSWRcIik7XHJcbmlmKCF3aW5kb3cuU3Vic2NyaWJlVHlwZXMpIHtcclxuICB3aW5kb3cuU3Vic2NyaWJlVHlwZXMgPSBuZXcgTktDLm1vZHVsZXMuU3Vic2NyaWJlVHlwZXMoKTtcclxufVxyXG53aW5kb3cudXNlciA9IG5ldyAoY2xhc3Mge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zdWJVc2Vyc0lkID0gZGF0YS5zdWJVc2Vyc0lkO1xyXG4gICAgdGhpcy5zdWJGb3J1bXNJZCA9IGRhdGEuc3ViRm9ydW1zSWQ7XHJcbiAgICB0aGlzLnN1YkNvbHVtbnNJZCA9IGRhdGEuc3ViQ29sdW1uc0lkO1xyXG4gICAgdGhpcy5zdWJUaHJlYWRzSWQgPSBkYXRhLnN1YlRocmVhZHNJZDtcclxuICAgIHRoaXMuY29sbGVjdGlvblRocmVhZHNJZCA9IGRhdGEuY29sbGVjdGlvblRocmVhZHNJZDtcclxuICAgIHRoaXMuc3Vic2NyaWJlcyA9IGRhdGEuc3Vic2NyaWJlcztcclxuICB9XHJcbiAgbW92ZVN1YihzdWJJZCkge1xyXG4gICAgdGhpcy5tb3ZlU3Vicyhbc3ViSWRdKTtcclxuICB9XHJcbiAgbW92ZVN1YnMoc3Vic0lkID0gW10pIHtcclxuICAgIGNvbnN0IHN1YnNjcmliZXMgPSBbXTtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc3Vic0lkLm1hcChpZCA9PiB7XHJcbiAgICAgIGNvbnN0IHMgPSBzZWxmLnN1YnNjcmliZXNbaWRdO1xyXG4gICAgICBpZihzKSBzdWJzY3JpYmVzLnB1c2gocyk7XHJcbiAgICB9KTtcclxuICAgIGxldCBzZWxlY3RlZFR5cGVzSWQgPSBbXTtcclxuICAgIGlmKHN1YnNjcmliZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHNlbGVjdGVkVHlwZXNJZCA9IHN1YnNjcmliZXNbMF0uY2lkO1xyXG4gICAgfSBlbHNlIGlmKHN1YnNjcmliZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHN1YnNJZCA9IHN1YnNjcmliZXMubWFwKHMgPT4gcy5faWQpO1xyXG5cclxuICAgIFN1YnNjcmliZVR5cGVzLm9wZW4oZnVuY3Rpb24odHlwZXNJZCkge1xyXG4gICAgICBua2NBUEkoXCIvYWNjb3VudC9zdWJzY3JpYmVzXCIsIFwiUEFUQ0hcIiwge1xyXG4gICAgICAgIHR5cGU6IFwibW9kaWZ5VHlwZVwiLFxyXG4gICAgICAgIHR5cGVzSWQ6IHR5cGVzSWQsXHJcbiAgICAgICAgc3Vic2NyaWJlc0lkOiBzdWJzSWRcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgIFN1YnNjcmliZVR5cGVzLmNsb3NlKCk7XHJcbiAgICAgICAgICBzdWJzY3JpYmVzLm1hcChzID0+IHtcclxuICAgICAgICAgICAgcy5jaWQgPSB0eXBlc0lkXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHN3ZWV0U3VjY2VzcyhcIuaJp+ihjOaIkOWKn1wiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICBzd2VldEVycm9yKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LCB7XHJcbiAgICAgIHNlbGVjdGVkVHlwZXNJZDogc2VsZWN0ZWRUeXBlc0lkLFxyXG4gICAgICBoaWRlSW5mbzogdHJ1ZSxcclxuICAgICAgc2VsZWN0VHlwZXNXaGVuU3Vic2NyaWJlOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZShpZCwgdHlwZSkge1xyXG4gICAgY29uc3QgYnV0dG9uc0RvbSA9ICQoYC5hY2NvdW50LWZvbGxvd2VyLWJ1dHRvbnNbZGF0YS0ke3R5cGV9PScke2lkfSddYCk7XHJcbiAgICBsZXQgc3ViSWQsIGZ1bmM7XHJcbiAgICBpZih0eXBlID09PSBcInVzZXJcIikge1xyXG4gICAgICBzdWJJZCA9IHRoaXMuc3ViVXNlcnNJZDtcclxuICAgICAgZnVuYyA9IFN1YnNjcmliZVR5cGVzLnN1YnNjcmliZVVzZXJQcm9taXNlO1xyXG4gICAgfSBlbHNlIGlmKHR5cGUgPT09IFwiZm9ydW1cIikge1xyXG4gICAgICBzdWJJZCA9IHRoaXMuc3ViRm9ydW1zSWQ7XHJcbiAgICAgIGZ1bmMgPSBTdWJzY3JpYmVUeXBlcy5zdWJzY3JpYmVGb3J1bVByb21pc2U7XHJcbiAgICB9IGVsc2UgaWYodHlwZSA9PT0gXCJjb2x1bW5cIikge1xyXG4gICAgICBzdWJJZCA9IHRoaXMuc3ViQ29sdW1uc0lkO1xyXG4gICAgICBpZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGZ1bmMgPSBTdWJzY3JpYmVUeXBlcy5zdWJzY3JpYmVDb2x1bW5Qcm9taXNlO1xyXG4gICAgfSBlbHNlIGlmKHR5cGUgPT09IFwidGhyZWFkXCIpIHtcclxuICAgICAgc3ViSWQgPSB0aGlzLnN1YlRocmVhZHNJZDtcclxuICAgICAgZnVuYyA9IFN1YnNjcmliZVR5cGVzLnN1YnNjcmliZVRocmVhZFByb21pc2U7XHJcbiAgICB9IGVsc2UgaWYodHlwZSA9PT0gXCJjb2xsZWN0aW9uXCIpIHtcclxuICAgICAgc3ViSWQgPSB0aGlzLmNvbGxlY3Rpb25UaHJlYWRzSWQ7XHJcbiAgICAgIGZ1bmMgPSBTdWJzY3JpYmVUeXBlcy5jb2xsZWN0aW9uVGhyZWFkUHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdWIgPSAhc3ViSWQuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYoIVtcInVzZXJcIiwgXCJjb2xsZWN0aW9uXCIsIFwidGhyZWFkXCJdLmluY2x1ZGVzKHR5cGUpIHx8ICFzdWIpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgU3Vic2NyaWJlVHlwZXMub3BlbigoY2lkKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGNpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAgIC50aGVuKGNpZCA9PiB7XHJcbiAgICAgICAgaWYoY2lkKSB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuYyhpZCwgc3ViLCBjaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuYyhpZCwgc3ViKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBTdWJzY3JpYmVUeXBlcy5jbG9zZSgpO1xyXG4gICAgICAgIGlmKHN1Yikge1xyXG4gICAgICAgICAgaWYodHlwZSA9PT0gXCJjb2xsZWN0aW9uXCIpIHtcclxuICAgICAgICAgICAgc3dlZXRTdWNjZXNzKFwi5pS26JeP5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dlZXRTdWNjZXNzKFwi5YWz5rOo5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnV0dG9uc0RvbS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3ViSWQuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgICBpZihpbmRleCA9PT0gLTEpIHN1YklkLnB1c2goaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZih0eXBlID09PSBcImNvbGxlY3Rpb25cIikge1xyXG4gICAgICAgICAgICBzd2VldFN1Y2Nlc3MoXCLmlLbol4/lt7Llj5bmtohcIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2VldFN1Y2Nlc3MoXCLlhbPms6jlt7Llj5bmtohcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBidXR0b25zRG9tLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzdWJJZC5pbmRleE9mKGlkKTtcclxuICAgICAgICAgIGlmKGluZGV4ICE9PSAtMSkgc3ViSWQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChzd2VldEVycm9yKTtcclxuXHJcblxyXG4gICAgLyppZihzdWIpIHtcclxuICAgICAgU3Vic2NyaWJlVHlwZXMub3BlbihmdW5jdGlvbihjaWQpIHtcclxuICAgICAgICBmdW5jKGlkLCBzdWIsIGNpZClcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBTdWJzY3JpYmVUeXBlcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICBpZih0eXBlID09PSBcImNvbGxlY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgIHN3ZWV0U3VjY2VzcyhcIuaUtuiXj+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2VldFN1Y2Nlc3MoXCLlhbPms6jmiJDlip9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnV0dG9uc0RvbS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzdWJJZC5pbmRleE9mKGlkKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggPT09IC0xKSBzdWJJZC5wdXNoKGlkKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzd2VldEVycm9yKGRhdGEpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIGZ1bmMoaWQsIHN1YilcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGJ1dHRvbnNEb20ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICBpZih0eXBlID09PSBcImNvbGxlY3Rpb25cIikge1xyXG4gICAgICAgICAgICBzd2VldFN1Y2Nlc3MoXCLmlLbol4/lt7Llj5bmtohcIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2VldFN1Y2Nlc3MoXCLlhbPms6jlt7Llj5bmtohcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YklkLmluZGV4T2YoaWQpO1xyXG4gICAgICAgICAgaWYoaW5kZXggIT09IC0xKSBzdWJJZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgIHN3ZWV0RXJyb3IoZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0qL1xyXG4gIH1cclxuICBlZGl0VHlwZSgpIHtcclxuICAgIFN1YnNjcmliZVR5cGVzLm9wZW4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgfSwge1xyXG4gICAgICBlZGl0VHlwZTogdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcbn0pKCk7XHJcblxyXG5cclxud2luZG93LnJlbW92ZUJsYWNrbGlzdCA9ICh1aWQsIF9pZCkgPT4ge1xyXG4gIE5LQy5tZXRob2RzLnJlbW92ZVVzZXJGcm9tQmxhY2tsaXN0KHVpZClcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICBpZighZGF0YSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBkb20gPSAkKGBbZGF0YS10eXBlPVwiYmxhY2tsaXN0XCJdW2RhdGEtaWQ9XCIke19pZH1cIl1gKTtcclxuICAgICAgaWYoZG9tICYmIGRvbS5sZW5ndGgpIGRvbS5yZW1vdmUoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmlmKE5LQy5jb25maWdzLmlzQXBwKSB7XHJcbiAgd2luZG93LnJlYWR5KClcclxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICBuZXdFdmVudChcInVzZXJDaGFuZ2VkXCIsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZighZGF0YS51c2VyKSByZXR1cm47XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvdVxcLyhbMC05XStcXC8pL2lnLCBcIi91L1wiICsgZGF0YS51c2VyLnVpZCArIFwiL1wiKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcbiJdfQ==
