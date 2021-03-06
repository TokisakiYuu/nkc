var timeout, loginBehavior = [];
NKC.modules.Login = function() {
  if(!window.verifications) {
    window.verifications = new NKC.modules.Verifications();
  }
  var self = this;
  self.dom = $("#moduleLogin");
  self.dom.modal({
    show: false,
    backdrop: "static"
  });
  self.app = new Vue({
    el: "#moduleLoginApp",
    data: {
      nationCodes: nationCodes,
      type: "login",
      registerStep: 1,
      category: "username", // username, mobile, mobileCode
      username: "",
      password: "",
      repeatPassword: '',
      nationCode: "86",
      code: "",
      mobile: "",
      waiting: 0,
      svgData: "",
      error: "",
      info : "",
      submitting: false,
      succeed: false
    },
    methods: {
      changeStep: function(number) {
        if(number === 1) {
          return this.registerStep = number;
        }
        var _this = this;
        var throwError = this.throwError;
        return Promise.resolve()
          .then(function() {
            var username = _this.username;
            var password = _this.password;
            var repeatPassword = _this.repeatPassword;
            if(!username) throw '请输入用户名';
            if(!password) throw '请输入密码';
            if(!repeatPassword) throw '请输入密码';
            if(password !== repeatPassword) throw '两次输入的密码不相同';
            return nkcAPI('/register/check', 'POST', {
              username: username,
              password: password
            });
          })
          .then(function() {
            _this.registerStep = number;
          })
          .catch(function(error) {
            throwError(error.error || error.message || error);
          });
      },
      selectCategory: function(category) {
        this.category = category;
        this.throwError("");
      },
      selectType: function(type) {
        this.type = type;
      },
      throwError: function(error) {
        this.error = error.error || error.message || error;
      },
      submit: function() {
        var throwError = this.throwError;
        throwError("");
        var this_ = this;
        var type = this.type;
        var category = this.category;

        var body = {};
        var username = this.username;
        var password = this.password;
        var mobile = this.mobile;
        var nationCode = this.nationCode;
        var code = this.code;
        if(type === "login") {
          if(category === "username") {
            if(!username) return throwError("请输入用户名");
            if(!password) return throwError("请输入密码");
            body = {
              username: username,
              password: password,
              // behavior: loginBehavior
            };
          } else if(category === "mobile") {
            if(!nationCode) return throwError("请选择国际区号");
            if(!mobile) return throwError("请输入手机号");
            if(!password) return throwError("请输入密码");
            body = {
              nationCode: nationCode,
              mobile: mobile,
              password: password,
              loginType: "mobile"
            };
          } else {
            if(!nationCode) return throwError("请选择国际区号");
            if(!mobile) return throwError("请输入手机号");
            if(!code) return throwError("请输入短信验证码");
            body = {
              loginType: "code",
              nationCode: nationCode,
              mobile: mobile,
              code: code,
            }
          }
          this.submitting = true;
          nkcAPI("/login", "POST", body)
          .then(function() {
            this_.succeed = true;
            if(NKC.configs.isApp) {
              NKC.methods.rn.emit("login")
            } else {
              window.location.reload();
            }
          })
          .catch(function(data) {
            throwError(data);
            this_.submitting = false;
          })
        } else {
          if(!username) return throwError('请输入用户名');
          if(!password) return throwError('请输入密码');
          if(!nationCode) return throwError("请选择国际区号");
          if(!mobile) return throwError("请输入手机号");
          if(!code) return throwError("请输入短信验证码");
          this.submitting = true;
          nkcAPI("/register", "POST", {
            nationCode: nationCode,
            mobile: mobile,
            code: code,
            username: username,
            password: password,
          })
          .then(function() {
            // window.location.reload();
            this_.succeed = true;
            if(NKC.configs.isApp) {
              NKC.methods.rn.emit("login")
            } else {
              window.location.href = "/register/subscribe";
            }
          })
          .catch(function(data) {
            throwError(data);
            this_.submitting = false;
          })
        }
      },
      sendMobileCode: function(t) {
        var throwError = this.throwError;
        throwError("");
        var this_ = this;
        var nationCode = this.nationCode;
        var mobile = this.mobile;
        if(!nationCode) return throwError("请选择国际区号");
        if(!mobile) return throwError("请输入手机号码");
        var body = {
          nationCode: nationCode,
          mobile: mobile,
        };
        var url;
        if(t === "register") {
          url = "/sendMessage/register";
        } else {
          url = "/sendMessage/login";

        }
        verifications
          .open()
          .then(function(data) {
            body.verifySecret = data.secret;
            return nkcAPI(url, "POST", body);
          })
          .then(function() {
            clearTimeout(timeout);
            this_.waiting = 120;
            timeout = setInterval(function() {
              if(this_.waiting !== 0) {
                this_.waiting --;
              } else {
                clearTimeout(timeout);
              }
            }, 1000);
          })
          .catch(function(data) {
            throwError(data);
          });
      },
      getSvgData: function() {
        var this_ = this;
        nkcAPI("/register/code?t=" + Date.now(), "GET")
          .then(function(data) {
            this_.svgData = data.svgData;
          })
          .catch(function(data) {
            sweetError(data);
          })
      },
      close: function() {
        loginBehavior.length = 0;
        if(NKC.configs.isApp) {
          NKC.methods.rn.emit("closeWebView");
        } else {
          self.dom.modal("hide");
        }
      },
      open: function(type) {
        self.dom.modal("show");
        self.app.type = type || "login";
        self.app.getSvgData();
      }
    }
  });
  self.open = self.app.open;
  self.close = self.app.close;
};

var Login = new NKC.modules.Login();
window.Login = Login;
