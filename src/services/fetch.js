import axios from "axios";
import {
  Message,
  MessageBox
} from "element-ui";
import router from "@/router";
import store from '@/store'

let paramsSerializer = function (params) {
  let parts = [];
  for (let key in params) {
    let val = params[key];
    if (val === null || typeof val === "undefined") {
      continue;
    }
    if (Array.isArray(val)) {
      val = JSON.stringify(val);
    }
    parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
  }
  let result = parts.join("&");
  return result;
};
// 注册，使同步有参数，避免刷新丢失
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.common["Authorization"] = store ? store.state.user.user_token : '';
axios.defaults.headers.common["lang"] = store ? store.state.user.language : '';
let instance = axios.create({
  baseURL: "/china/json/api",
  // baseURL: "/json/api",
  timeout: 600000,
  paramsSerializer: function (params) {
    return paramsSerializer(params);
  }
});

let paramPost = function (data) {
  var params = new URLSearchParams();
  for (let name in data) {
    params.append(name, data[name]);
  }
  return params;
};

const lang = store? store.state.user.language:'zh'
let [title, msg, text, login_title, login_text] = ['', '', '', '', '']
if (lang === 'zh') {
  title = '提示'
  msg = '登录信息过期，请重新登录。'
  text = '确定'
  login_title = '登录提醒'
  login_text = '知道了'
} else {
  title = 'Point'
  msg = 'Login information has expired, please relogin.'
  text = 'Yes'
  login_title = 'Attention'
  login_text = 'Got it'
}
const special_route = ["Login", "SignUp", "ForgotPass"]

let isLogonExpires = false;
instance.interceptors.response.use(res => {
  let data = res.data;
  // if (res.config.url == "/api/nologin/login" && res.data.code === 0) {
  //   //登陆成功后对保存过期状态
  //   // localStorage.setItem("isExpires", "1"); //0过期，1不过期
  // }
  if (Object.prototype.toString.call(data) === "[object Object]") {
    if (data.hasOwnProperty("code")) {

      if (data.code == 0) {
        if (data.result.hasOwnProperty("auth_save_status")) {
          if (data.result.auth_save_status == '1') {
            if (data.msg) {
              Message({
                message: data.msg,
                duration: 5000,
                type: 'success',
                offset: 3
              })
            }
          }
        } else {
          if (data.msg) {
            Message({
              message: data.msg,
              duration: 5000,
              type: 'success',
              offset: 3
            })
          }
        }

        return data.result;
      } else if (data.code == 1) {
        if (data.msg) {
          // if (data.status !== '1') {
          Message({
            message: data.msg,
            duration: 5000,
            type: 'error',
            offset: 3
          })
          // }
        }
      } else if (data.code == -1) {
        // && !special_route.includes(router.currentRoute.name)
        if (!isLogonExpires) {
          isLogonExpires = true;
          store.dispatch("user/remove_login_info");
          MessageBox({
            title: title,
            message: msg,
            confirmButtonText: text,
            callback: action => {
              // store.dispatch("user/remove_login_info").then(() => {
              isLogonExpires = false;
              router.push("/user/login");
              // });
            }
          });
        }
      } else if (data.code == 2) { // 踢出团队
        const info = {
          id: '',
          name: '',
          is_manager: '0'
        }
        store.dispatch("system/update_team_info", info).then(() => {
          router.push("/user/team");
        });
      } else if (data.code == 3) {
        store.dispatch("user/remove_login_info");
        // router.replace("/user/login");
        MessageBox({
          title: login_title,
          message: data.msg,
          confirmButtonText: login_text,
          callback: action => {
            // window.location.reload()
          }
        });

      } else {
        if (data.msg) {
          Message({
            message: data.msg,
            duration: 5000,
            offset: 3
          })
        }
        return Promise.reject(new Error(data));
      }
    } else {
      console.error("服务器异常，请联系系统管理员！");
      // return Promise.reject(new Error("服务器异常，请联系系统管理员！"));
      Message({
        message: "Server exception, please try again later or contact your system administrator.",
        duration: 5000,
        offset: 3
      })
      return Promise.reject(new Error("Server exception, please try again later or contact your system administrator."));
    }
  } else {
    console.error("服务器异常，请联系系统管理员！");
    // return Promise.reject(new Error("服务器异常，请联系系统管理员！"));
    Message({
      message: "Server exception, please try again later or contact your system administrator.",
      duration: 5000,
      offset: 3
    })
    return Promise.reject(new Error("Server exception, please try again later or contact your system administrator."));
  }

});
export default instance;
