import fetch from "@/services/fetch";

const state = {
  token: 0, // 默认
  user_name: "",
  user_fullName: '',
  user_id: "",
  user_show_id: '',
  user_email: '',
  user_permission: '',
  user_token: '',
  user_nav: false, // 展开
  pass_step: 'first', //改密码步骤
  signup_step: 'first', // 注册步骤
  send_email: '', // 改密码，注册发送的邮箱
  tmp_username: '', // 改密码，注册暂存的用户名
  tmp_userID: '', //改密码暂存的用户id
  // sync_status
  is_privacy: false, // 是否停留在版权页
  language: 'zh'
};
const getters = {
  isLogin: state => {
    return state.token == "1";
  },
  isRoot: state => {
    return state.user_id == "1"; //系统管理员
    // return true;
  }
};
const mutations = {
  UPDATE_TOKEN(state, value) {
    state.token = value;
  },
  UPDATE_USER_NAME(state, value) {
    state.user_name = value;
  },
  UPDATE_USER_FULL_NAME(state, value) {
    state.user_fullName = value;
  },
  UPDATE_USER_ID(state, value) {
    state.user_id = value;
  },
  UPDATE_USER_SHOW_ID(state, value) {
    state.user_show_id = value;
  },
  UPDATE_USER_EMAIL(state, value) {
    state.user_email = value
  },
  UPDATE_USER_PERMISSION(state, value) {
    state.user_permission = value
  },
  UPDATE_USER_TOKEN(state, value) {
    state.user_token = value
  },
  UPDATE_USER_NAV(state, value) {
    if (value == '0') {
      state.user_nav = true
    } else {
      state.user_nav = false
    }
  },

  UPDATE_PASS_STEP(state, value) {
    state.pass_step = value;
  },
  UPDATE_SIGNUP_STEP(state, value) {
    state.signup_step = value;
  },
  UPDATE_SEND_EMAIL(state, value) {
    state.send_email = value
  },
  UPDATE_TMP_USERNAME(state, value) {
    state.tmp_username = value
  },
  UPDATE_TMP_USER_ID(state, value) {
    state.tmp_userID = value
  },
  UPDATE_IS_PRIVACY(state, value) {
    state.is_privacy = value
  },
  UPDATE_LANGUAGE(state, value) {
    state.language = value
  },
};
const actions = {
  login({
    getters,
    commit,
    dispatch
  }, data) {
    return new Promise((resolve, reject) => {
      fetch
        .post("/nologin/login", data)
        .then(data => {
          if (data) {
            commit("UPDATE_TOKEN", 1);
            commit("UPDATE_USER_NAME", data.username);
            commit("UPDATE_USER_FULL_NAME", data.truename);
            commit("UPDATE_USER_ID", data.id);
            commit("UPDATE_USER_SHOW_ID", data.userid);
            commit("UPDATE_USER_EMAIL", data.email);
            commit("UPDATE_USER_PERMISSION", data.permission);
            commit("UPDATE_USER_TOKEN", data.token);
          } else {
            commit("UPDATE_TOKEN", 0);
            commit("UPDATE_USER_NAME", "");
            commit("UPDATE_USER_ID", "");
            commit("UPDATE_USER_FULL_NAME", "");
            commit("UPDATE_USER_EMAIL", "");
            commit("UPDATE_USER_PERMISSION", "");
            commit("UPDATE_USER_TOKEN", "");
            commit("UPDATE_PASS_STEP", 'first')
            commit("UPDATE_SIGNUP_STEP", 'first')
          }
          resolve(data);
        })
        .catch(err => {
          console.log('err')
          reject(err);
        });
    });
  },
  logout({
    commit,
    dispatch
  }, data) {
    return new Promise((resolve, reject) => {
      fetch
        .post("/user/logout")
        .then(res => {
          dispatch("remove_login_info");
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  remove_login_info({
    commit,
    dispatch
  }) {
    commit("UPDATE_TOKEN", 0);
    commit("UPDATE_USER_NAME", "");
    commit("UPDATE_USER_ID", "");
    commit("UPDATE_USER_FULL_NAME", "");
    commit("UPDATE_USER_EMAIL", "");
    commit("UPDATE_USER_PERMISSION", "");
    commit("UPDATE_USER_TOKEN", "");
    commit("UPDATE_PASS_STEP", 'first')
    commit("UPDATE_SIGNUP_STEP", 'first')
    return Promise.resolve();
  },
  update_user_name({
    commit
  }, data) {
    commit('UPDATE_USER_NAME', data)
  },
  update_user_message({
    commit
  }, data) {
    commit("UPDATE_USER_NAME", data.username);
    commit("UPDATE_USER_FULL_NAME", data.truename);
    commit("UPDATE_USER_ID", data.id);
    commit("UPDATE_USER_SHOW_ID", data.userid);
    commit("UPDATE_USER_EMAIL", data.email);
    commit("UPDATE_USER_PERMISSION", data.permission);
    commit("UPDATE_USER_TOKEN", data.token);
  },
  update_user_nav({
    commit
  }, data) {
    commit("UPDATE_USER_NAV", data)
    return new Promise((resolve, reject) => {
      fetch
        .post("user/changenavi", {
          navi: data
        })
        .then(data => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  update_pass_step({
    commit
  }, data) {
    commit("UPDATE_PASS_STEP", data)
  },
  update_signup_step({
    commit
  }, data) {
    commit("UPDATE_SIGNUP_STEP", data)
  },
  update_send_email({
    commit
  }, data) {
    commit("UPDATE_SEND_EMAIL", data)
  },
  update_tmp_username({
    commit
  }, data) {
    commit("UPDATE_TMP_USERNAME", data)
  },
  update_tmp_userID({
    commit
  }, data) {
    commit("UPDATE_TMP_USER_ID", data)
  },
  update_is_privacy({
    commit
  }, data) {
    commit("UPDATE_IS_PRIVACY", data)
  },
  update_language({
    commit
  }, data) {
    commit("UPDATE_LANGUAGE", data)
  },

};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
