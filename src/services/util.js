import * as mathjs from "mathjs";
import store from "@/store";

const lang = store.state.user.language
let [today, yesterday, week] = ['', '', '']
if (lang === 'zh') {
  today = '今天'
  yesterday = '昨天'
  week = '过去7天'
} else {
  today = 'Today'
  yesterday = 'Yesterday'
  week = 'Last 7 days'
}

/**图片放大预览start */
let previewImage = function (url) {
  this.$alert('<img src="' + url + '" style="max-width:90vw;max-height:85vh;"/>', {
    dangerouslyUseHTMLString: true,
    showConfirmButton: false,
    closeOnClickModal: true,
    showClose: true,
    center: true,
    customClass: "el-message-preview-box",
    callback: () => {
      console.log("关闭预览");
    }
  });
};
/**图片放大预览end */

/**文件下载 start*/
let downloadFile = function (sUrl) {
  //iOS devices do not support downloading. We have to inform user about this.
  if (/(iP)/g.test(navigator.userAgent)) {
    alert("Your device does not support files downloading. Please try again in desktop browser.");
    return false;
  }

  //If in Chrome or Safari - download via virtual link click
  if (downloadFile.isChrome || downloadFile.isSafari || downloadFile.isFirefox) {
    //Creating new link node.
    var link = document.createElement("a");
    // var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
    // var filePath = sUrl.substring(0, sUrl.lastIndexOf("/") + 1);
    link.href = encodeURI(sUrl);
    // link.href = encodeURIComponent(sUrl);
    // link.href = sUrl;
    // link.href = encodeURI(filePath) + encodeURIComponent(fileName);
    link.target = "_blank";

    if (link.download !== undefined) {
      //Set HTML5 download attribute. This will prevent file from opening if supported.
      var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
      link.download = fileName;
    }

    //Dispatching click event.
    if (document.createEvent) {
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  // Force file download (whether supported by server).
  if (sUrl.indexOf("?") === -1) {
    sUrl += "?download";
  }

  window.open(sUrl, "_self");
  return true;
};
downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
downloadFile.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
/**文件下载 end*/

/**金额格式化、千分位、包括保留指定小数
 * @param {*} number 数字
 * @param {*} places 小数后几位
 * @param {*} symbol 货币符号  $
 * @param {*} thousand 千分位符号   ,
 * @param {*} decimal_point 小数点符号   .
 */
let formatNumber = function (number, places, symbol, thousand, decimal_point) {
  // console.log('places',places)
  number = number || 0;
  places = !isNaN((places = Math.abs(places))) ? places : 0;
  symbol = symbol !== undefined ? symbol : "¥";
  if (symbol == '%') {
    number = number * 100
  }
  thousand = thousand || ",";
  decimal_point = decimal_point || ".";
  var negative = number < 0 ? "-" : "",
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;

  let decimal = decimal_point + Math.abs(number - i)
    .toFixed(places)
    .slice(2)

  // decimal = (decimal == '.00'? '':decimal)
  let result = ''
  if (symbol == '¥') {
    result = symbol + negative +
      (j ? i.substr(0, j) + thousand : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
      (places ?
        decimal :
        "")
  } else {
    result = negative +
      (j ? i.substr(0, j) + thousand : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
      (places ?
        decimal :
        "") + symbol
  }
  return result;
};

let getImageWH = file => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    let url = "";
    if (typeof file == "string") {
      url = file;
    } else {
      url = URL.createObjectURL(file);
    }
    img.src = url;
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = err => {
      reject(err);
    };
  });
};

/**常用正则表达式 */
let constReg = {
  //电子邮箱//@hylink.com和@hylinkad.com、@pagechoice.com
  email: /^([A-Za-z0-9_\-\.])+\@(hylink|hylinkad|pagechoice)\.com$/,
  // allEmail: /^[a-zA-Z0-9\.]+@[a-z0-9]+\.[a-z]{2,4}$/,
  allEmail: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  // email: /^([A-Za-z0-9_\-\.])+\@(hylink)\.com$/,
  //手机号码 11位
  phone_china: /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0-1,6-8])|(18[0-9])|(19[8,9]))\d{8}$/,
  phone_HK: /^(5|6|8|9)[0-9]{7}$/,
  phone_USA: /^\d{3}\s?-?\d{3}-?\s?\d{4}$/,
  //用户名 中文、英文、空白字符
  username: /^[\u4e00-\u9fa5a-zA-Z\s+]{2,20}$/,
  //真实姓名  中文、英文大小写
  trueName: /^[\u4e00-\u9fa5a-zA-Z]{2,15}$/,
  //英文字母、数字、特殊字符(!-+*@#$.)，中的至少2种组合。8位到20位
  password: /(?!^(\d+|[a-zA-Z]+|[\~\!\+\-\@\#\$\.\*?]+)$)^[\w\~\!\+\-\@\#\$\.\*?]{8,20}$/,
  // 不允许输入引号，其他的都可以
  input_word: /[\'\"\’\‘\”\“]+/,
  //中文、英文、数字、_-
  cnenName1: /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/,
  cnenName2: /^[\u4e00-\u9fa5a-zA-Z0-9][\u4e00-\u9fa5a-zA-Z0-9_-]{1,19}$/,
  cnenName3: /^[\u4e00-\u9fa5a-zA-Z&]+$/,
  cnenName4: /^[\u4e00-\u9fa5a-zA-Z0-9.//\(\)（）_-]+$/,
  //支持英文、数字、下划线、中划线，首位必须是字母，长度最少2位最多20位
  name: /^[a-zA-Z][a-z0-9A-Z_-]{1,}$/,
  //大写英文字母
  uppercaseEn: /^[A-Z]+$/,


  name1: /^[a-zA-Z0-9\u4E00-\u9FA5_\(\)（）\.。，,$-—]{1,150}$/, //名称为数字、英文、中文、下划线 150个字符以内
  name2: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,30}$/, //数字，英文，中文、下划线 30个字符以内
  num: /^([1-9][0-9]*)(\.[0-9]{1,2})?$/, //正整数、最多保留2位小数。
  // num_min_a_thousand: /^([1-9][0-9]{3,6})(\.[0-9]{1,2})?$/, //正整数1000-9999999、最多保留2位小数。
  num_min_a_thousand: /^[1-9][0-9]{3,6}$/, //正整数1000-9999999、最多保留2位小数。
  num4: /^([1-9][0-9]*)(\.[0-9]{1,4})?$/, //正整数、最多保留4位小数。
  num23: /^(0|([1-9][0-9]*))(\.[0-9]{1,3})?$/, //正整数、最多保留3位小数。
  num2: /^(0|-?([1-9][0-9]*))(\.[0-9]{1,2})?$/, //负整数,正整数、最多保留2位小数。
  num3: /^(0(\.\d{1,4})?|1(\.0{1,4})?)$/, //0到1之间的小数，最多4位小数，包括0和1

  positiveInt1: /^([0-9]{1,2}|100)$/, //0-100的整数
  positiveInt: /^[1-9]\d*$/, //匹配正整数
  nonnegativeInt: /^([1-9][0-9]*|0)$/, //非负整数
  chinese: /^[\u4e00-\u9fa5]+$/,
  english: /^[A-Za-z]+$/,
  //  /^\+?[1-9][0-9]*$/

  //URL规则：
  //(1)、地址必须以http/https/ftp/ftps开头；
  //(2) 、地址不能包含双字节符号或非链接特殊字符
  url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/, //
};

/**使用mathjs 重写toFixed方法 */
Number.prototype.toFixed = function (d) {
  return mathjs.format(this, {
    notation: "fixed",
    precision: d
  });
};

//日期插件快捷键
let datePickerShortcuts = [{
    text: today,
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: yesterday,
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      picker.$emit("pick", [start, end]);
    },
  },
  {
    text: week,
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit("pick", [start, end]);
    },
  },
];
//后代组件  对父组件发送事件
let dispatch = function (componentName, eventName, params) {
  var parent = this.$parent || this.$root;
  var name = parent.$options.componentName;

  //寻找父级，如果父级不是符合的组件名，则循环向上查找
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.componentName;
    }
  }
  //找到符合组件名称的父级后，触发其事件。整体流程类似jQuery的closest方法
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params));
  }
};

//事件广播  父组件向 后代组件 
let broadcast = function (componentName, eventName, params) {
  broadcast.call(this, componentName, eventName, params);

  function broadcast(componentName, eventName, params) {
    //遍历所有子组件
    this.$children.forEach(child => {
      var name = child.$options.componentName;
      //寻找符合指定名称的子组件
      if (name === componentName) {
        //在符合的自组件上触发的事件，但是不会再继续寻找符合名称的组件的子集，原因？
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        //不符合继续寻找他的子集（即孙子组件）
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
};
let encodeB64 = function (str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
let decodeB64 = function (str) {
  return decodeURIComponent(escape(window.atob(str)));
}

// 设置自适应
let getWindow = () => {
  if (process.env.isPreview) {
    return {
      width: process.env.iframeWidth,
      height: process.env.iframeHeight
    };
  } else {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
};
//作为插件必须定义公开的 install 方法
export default function install(Vue, options) {
  Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
  Vue.encodeB64 = Vue.prototype.$encodeB64 = encodeB64;
  Vue.decodeB64 = Vue.prototype.$decodeB64 = decodeB64;
  Vue.getImageWH = Vue.prototype.$getImageWH = getImageWH;
  Vue.dispatch = Vue.prototype.$dispatch = dispatch;
  Vue.broadcast = Vue.prototype.$broadcast = broadcast;
  Vue.previewImage = Vue.prototype.$previewImage = previewImage;
  Vue.downloadFile = Vue.prototype.$downloadFile = downloadFile;
  Vue.formatNumber = Vue.prototype.$formatNumber = formatNumber;
  Vue.constReg = Vue.prototype.$constReg = constReg;
  Vue.getWindow = Vue.prototype.$getWindow = getWindow;
  Vue.datePickerShortcuts = Vue.prototype.$datePickerShortcuts = datePickerShortcuts;
  Vue.directive("focus", {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      el.focus();
    },
    update: function (el, {
      value
    }) {
      if (value) {
        el.focus();
      }
    }
  });
  Vue.directive("el-select-loadmore", {
    bind(el, binding) {
      let self = this;
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
      SELECTWRAP_DOM.addEventListener("scroll", function () {
        /**
         * scrollHeight 获取元素内容高度(只读)
         * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
         * clientHeight 读取元素的可见高度(只读)
         * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
         * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
         */
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (condition) binding.value();
      });
    },
  });
}
