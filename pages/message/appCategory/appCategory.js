(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var data = NKC.methods.getDataById('data');
var usersObj = {};
data.users.map(function (ug) {
  ug.data.map(function (u) {
    return usersObj[u.uid] = u;
  });
});
var app = new Vue({
  el: '#app',
  data: {
    edit: !data.category,
    category: data.category || {
      name: '',
      description: '',
      friendsId: []
    },
    users: data.users,
    usersObj: usersObj
  },
  computed: {
    selectedUsers: function selectedUsers() {
      var arr = [];
      var self = this;
      this.category.friendsId.map(function (uid) {
        var u = self.usersObj[uid];
        if (u) arr.push(u);
      });
      return arr;
    },
    selectedUsersId: function selectedUsersId() {
      var selectedUsers = this.selectedUsers;
      return selectedUsers.map(function (u) {
        return u.uid;
      });
    }
  },
  methods: {
    getUrl: NKC.methods.tools.getUrl,
    selectUser: function selectUser(u) {
      var friendsId = this.category.friendsId;
      var index = friendsId.indexOf(u.uid);

      if (index === -1) {
        friendsId.push(u.uid); // Vue.set(friendsId, friendsId.length, u.uid)
      } else {
        this.unSelectUser(u);
      }
    },
    unSelectUser: function unSelectUser(u) {
      var friendsId = this.category.friendsId;
      var index = friendsId.indexOf(u.uid);

      if (index !== -1) {
        friendsId.splice(index, 1);
      }
    },
    save: function save() {
      var self = this;
      var _self$category = self.category,
          _id = _self$category._id,
          name = _self$category.name,
          description = _self$category.description;
      var method, url;

      if (_id) {
        method = 'PATCH';
        url = "/friend_category/".concat(_id);
      } else {
        method = 'POST';
        url = "/friend_category";
      }

      return nkcAPI(url, method, {
        name: name,
        description: description,
        friendsId: self.selectedUsersId
      }).then(function (data) {
        self.edit = false;
        NKC.methods.appToast('保存成功');

        if (!_id) {
          NKC.methods.visitUrl("/message/category?cid=".concat(data.category._id));
        }
      })["catch"](NKC.methods.appToast);
    },
    visitUserHome: function visitUserHome(u) {
      NKC.methods.visitUrl(NKC.methods.tools.getUrl('messageUserDetail', u.uid), true);
    },
    toEdit: function toEdit() {
      this.edit = true;
    },
    remove: function remove() {
      var self = this;
      sweetQuestion("\u5220\u9664\u5206\u7EC4\u300C".concat(this.category.name, "\u300D\uFF1F")).then(function () {
        return nkcAPI("/friend_category/".concat(self.category._id), 'DELETE').then(function () {
          NKC.methods.appToast('删除成功');
          NKC.methods.appClosePage();
        })["catch"](NKC.methods.appToast);
      });
    }
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWdlcy9tZXNzYWdlL2FwcENhdGVnb3J5L2FwcENhdGVnb3J5Lm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxXQUFaLENBQXdCLE1BQXhCLENBQWI7QUFDQSxJQUFNLFFBQVEsR0FBRyxFQUFqQjtBQUNBLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFlLFVBQUEsRUFBRSxFQUFJO0FBQ25CLEVBQUEsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFSLENBQVksVUFBQSxDQUFDO0FBQUEsV0FBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUgsQ0FBUixHQUFrQixDQUF0QjtBQUFBLEdBQWI7QUFDRCxDQUZEO0FBR0EsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFKLENBQVE7QUFDbEIsRUFBQSxFQUFFLEVBQUUsTUFEYztBQUVsQixFQUFBLElBQUksRUFBRTtBQUNKLElBQUEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBRFI7QUFFSixJQUFBLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBTCxJQUFpQjtBQUN6QixNQUFBLElBQUksRUFBRSxFQURtQjtBQUV6QixNQUFBLFdBQVcsRUFBRSxFQUZZO0FBR3pCLE1BQUEsU0FBUyxFQUFFO0FBSGMsS0FGdkI7QUFPSixJQUFBLEtBQUssRUFBRSxJQUFJLENBQUMsS0FQUjtBQVFKLElBQUEsUUFBUSxFQUFSO0FBUkksR0FGWTtBQVlsQixFQUFBLFFBQVEsRUFBRTtBQUNSLElBQUEsYUFEUSwyQkFDUTtBQUNkLFVBQU0sR0FBRyxHQUFHLEVBQVo7QUFDQSxVQUFNLElBQUksR0FBRyxJQUFiO0FBQ0EsV0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixVQUFBLEdBQUcsRUFBSTtBQUNqQyxZQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBTCxD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WSxJQUFaO0FBQ0QsS0FqRE07QUFrRFAsSUFBQSxNQWxETyxvQkFrREU7QUFDUCxVQUFNLElBQUksR0FBRyxJQUFiO0FBQ0EsTUFBQSxhQUFhLHlDQUFTLEtBQUssUUFBTCxDQUFjLElBQXZCLGtCQUFiLENBQ0csSUFESCxDQUNRLFlBQU07QUFDVixlQUFPLE1BQU0sNEJBQXFCLElBQUksQ0FBQyxRQUFMLENBQWMsR0FBbkMsR0FBMEMsUUFBMUMsQ0FBTixDQUNKLElBREksQ0FDQyxZQUFNO0FBQ1YsVUFBQSxHQUFHLENBQUMsT0FBSixDQUFZLFFBQVosQ0FBcUIsTUFBckI7QUFDQSxVQUFBLEdBQUcsQ0FBQyxPQUFKLENBQVksWUFBWjtBQUNELFNBSkksV0FLRSxHQUFHLENBQUMsT0FBSixDQUFZLFFBTGQsQ0FBUDtBQU1ELE9BUkg7QUFTRDtBQTdETTtBQTNCUyxDQUFSLENBQVoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBkYXRhID0gTktDLm1ldGhvZHMuZ2V0RGF0YUJ5SWQoJ2RhdGEnKTtcclxuY29uc3QgdXNlcnNPYmogPSB7fTtcclxuZGF0YS51c2Vycy5tYXAodWcgPT4ge1xyXG4gIHVnLmRhdGEubWFwKHUgPT4gdXNlcnNPYmpbdS51aWRdID0gdSk7XHJcbn0pO1xyXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIGRhdGE6IHtcclxuICAgIGVkaXQ6ICFkYXRhLmNhdGVnb3J5LFxyXG4gICAgY2F0ZWdvcnk6IGRhdGEuY2F0ZWdvcnkgfHwge1xyXG4gICAgICBuYW1lOiAnJyxcclxuICAgICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgICBmcmllbmRzSWQ6IFtdLFxyXG4gICAgfSxcclxuICAgIHVzZXJzOiBkYXRhLnVzZXJzLFxyXG4gICAgdXNlcnNPYmosXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgc2VsZWN0ZWRVc2VycygpIHtcclxuICAgICAgY29uc3QgYXJyID0gW107XHJcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICB0aGlzLmNhdGVnb3J5LmZyaWVuZHNJZC5tYXAodWlkID0+IHtcclxuICAgICAgICBjb25zdCB1ID0gc2VsZi51c2Vyc09ialt1aWRdO1xyXG4gICAgICAgIGlmKHUpIGFyci5wdXNoKHUpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RlZFVzZXJzSWQoKSB7XHJcbiAgICAgIGNvbnN0IHtzZWxlY3RlZFVzZXJzfSA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBzZWxlY3RlZFVzZXJzLm1hcCh1ID0+IHUudWlkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdldFVybDogTktDLm1ldGhvZHMudG9vbHMuZ2V0VXJsLFxyXG4gICAgc2VsZWN0VXNlcih1KSB7XHJcbiAgICAgIGNvbnN0IGZyaWVuZHNJZCA9IHRoaXMuY2F0ZWdvcnkuZnJpZW5kc0lkO1xyXG4gICAgICBjb25zdCBpbmRleCA9IGZyaWVuZHNJZC5pbmRleE9mKHUudWlkKTtcclxuICAgICAgaWYoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgZnJpZW5kc0lkLnB1c2godS51aWQpO1xyXG4gICAgICAgIC8vIFZ1ZS5zZXQoZnJpZW5kc0lkLCBmcmllbmRzSWQubGVuZ3RoLCB1LnVpZClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0VXNlcih1KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHVuU2VsZWN0VXNlcih1KSB7XHJcbiAgICAgIGNvbnN0IGZyaWVuZHNJZCA9IHRoaXMuY2F0ZWdvcnkuZnJpZW5kc0lkO1xyXG4gICAgICBjb25zdCBpbmRleCA9IGZyaWVuZHNJZC5pbmRleE9mKHUudWlkKTtcclxuICAgICAgaWYoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgZnJpZW5kc0lkLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgY29uc3Qge19pZCwgbmFtZSwgZGVzY3JpcHRpb259ID0gc2VsZi5jYXRlZ29yeTtcclxuICAgICAgbGV0IG1ldGhvZCwgdXJsO1xyXG4gICAgICBpZihfaWQpIHtcclxuICAgICAgICBtZXRob2QgPSAnUEFUQ0gnO1xyXG4gICAgICAgIHVybCA9IGAvZnJpZW5kX2NhdGVnb3J5LyR7X2lkfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgICAgIHVybCA9IGAvZnJpZW5kX2NhdGVnb3J5YDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmtjQVBJKHVybCwgbWV0aG9kLCB7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBmcmllbmRzSWQ6IHNlbGYuc2VsZWN0ZWRVc2Vyc0lkXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIHNlbGYuZWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgTktDLm1ldGhvZHMuYXBwVG9hc3QoJ+S/neWtmOaIkOWKnycpO1xyXG4gICAgICAgICAgaWYoIV9pZCkge1xyXG4gICAgICAgICAgICBOS0MubWV0aG9kcy52aXNpdFVybChgL21lc3NhZ2UvY2F0ZWdvcnk/Y2lkPSR7ZGF0YS5jYXRlZ29yeS5faWR9YCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goTktDLm1ldGhvZHMuYXBwVG9hc3QpO1xyXG4gICAgfSxcclxuICAgIHZpc2l0VXNlckhvbWUodSkge1xyXG4gICAgICBOS0MubWV0aG9kcy52aXNpdFVybChOS0MubWV0aG9kcy50b29scy5nZXRVcmwoJ21lc3NhZ2VVc2VyRGV0YWlsJywgdS51aWQpLCB0cnVlKTtcclxuICAgIH0sXHJcbiAgICB0b0VkaXQoKSB7XHJcbiAgICAgIHRoaXMuZWRpdCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgc3dlZXRRdWVzdGlvbihg5Yig6Zmk5YiG57uE44CMJHt0aGlzLmNhdGVnb3J5Lm5hbWV944CN77yfYClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbmtjQVBJKGAvZnJpZW5kX2NhdGVnb3J5LyR7c2VsZi5jYXRlZ29yeS5faWR9YCwgJ0RFTEVURScpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICBOS0MubWV0aG9kcy5hcHBUb2FzdCgn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgTktDLm1ldGhvZHMuYXBwQ2xvc2VQYWdlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChOS0MubWV0aG9kcy5hcHBUb2FzdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdfQ==