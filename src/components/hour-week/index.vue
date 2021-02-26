<template>
    <div class="byted-weektime"
        @mousedown="dian"
        @mousemove="yi"
        @mouseup="li">
        <div class="calendar">
            <table class="calendar-table"
                style="width:610px">
                <thead class="calendar-head">
                    <tr>
                        <th rowspan="6"
                            class="week-td">星期/时间</th>
                        <th colspan="24">00:00 - 12:00</th>
                        <th colspan="24">12:00 - 24:00</th>
                    </tr>
                    <tr>
                        <td colspan="2"
                            v-for="(item,index) in tableHeader"
                            :key="index">{{item}}</td>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <div id="kuang"
                        :style="{width:kuangObj.width+'px',height:kuangObj.height+'px',top:kuangObj.top+'px',left:kuangObj.left+'px',bottom:kuangObj.bottom+'px',right:kuangObj.right+'px'}"></div>
                    <tr>
                        <td>星期一</td>
                        <td @mousedown.prevent="handleMouseDown(i,0)"
                            @mouseup.prevent="handleMouseUp(i,0)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[0]"
                            :key="i"></td>
                    </tr>
                    <tr>
                        <td>星期二</td>
                        <td @mousedown.prevent="handleMouseDown(i,1)"
                            @mouseup.prevent="handleMouseUp(i,1)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[1]"
                            :key="i"></td>
                    </tr>
                    <tr>
                        <td>星期三</td>
                        <td @mousedown.prevent="handleMouseDown(i,2)"
                            @mouseup.prevent="handleMouseUp(i,2)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[2]"
                            :key="i"></td>
                    </tr>
                    <tr>
                        <td>星期四</td>
                        <td @mousedown.prevent="handleMouseDown(i,3)"
                            @mouseup.prevent="handleMouseUp(i,3)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[3]"
                            :key="i"></td>
                    </tr>
                    <tr>
                        <td>星期五</td>
                        <td @mousedown.prevent="handleMouseDown(i,4)"
                            @mouseup.prevent="handleMouseUp(i,4)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[4]"
                            :key="i"></td>
                    </tr>
                    <tr>
                        <td>星期六</td>
                        <td @mousedown.prevent="handleMouseDown(i,5)"
                            @mouseup.prevent="handleMouseUp(i,5)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[5]"
                            :key="i"></td>
                    </tr>
                    <tr>
                        <td>星期日</td>
                        <td @mousedown.prevent="handleMouseDown(i,6)"
                            @mouseup.prevent="handleMouseUp(i,6)"
                            class="calendar-atom-time"
                            :class="item.class"
                            v-for="(item,i) in rowUnit[6]"
                            :key="i"></td>
                    </tr>

                    <tr>
                        <td colspan="49"
                            class="td-table-tip">
                            <div class="clearfix">
                                <span class="pull-left tip-text">请用鼠标点选时间段。</span>
                                <a @click="clear"
                                    class="pull-right">清空</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="49"
                            class="timeContent">
                            <div v-for="(item,index) in timeStr"
                                style="text-align: left;padding-left: 20px"
                                :key="index"
                                v-show="item.length">
                                <span class="item-week">{{weekDate[index+1]}}:</span>
                                <span>
                                    <span>{{item}}</span>
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 鼠标的画框的效果 -->
        <div id="container"
            v-bind:style="{backgroundColor:back,
            height:h+'px',
            width:w+'px',
            position:'absolute',
            left:left+'px',
            top:top+'px',
            opacity:0.2,
            border:len+'px dashed #000',
            zIndex:-1}"></div>
    </div>
</template>

<script>
export default {
  name: "HourWeek",
  props: {
    config: {
      type: Object,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      tableHeader: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      weekDate: {
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
        7: "星期日",
      },
      rowUnit: [], //每一个单元格
      timeContent: [], //选中的时间段原始数据
      timeSection: [], //时间段，可以返回给后台的数据
      timeStr: [], //时间段，前端显示的数据
      beginDay: 0,
      beginTime: 0,
      downEvent: false,
      kuangObj: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        oldLeft: 0,
        oldTop: 0,
        flag: false,
      },
      py: "",
      px: "",
      back: "#31676f",
      h: "",
      w: "",
      top: "",
      left: "",
      len: 0,
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      for (let i = 0; i < 7; i++) {
        let arr = [];
        for (let j = 0; j < 48; j++) {
          arr.push({ class: null, timeData: j });
        }
        this.rowUnit.push(arr); // 7*24个时间格

        this.timeContent.push({ arr: [] }); // 对应星期选中时间的index
        this.timeSection.push([]); // 对应星期选中时间的时间段
        this.timeStr.push(""); // 前端界面展示的时间
      }

      if (this.config) {
        this.timeContent = this.config.hasOwnProperty("timeSection") ? this.config.timeContent : this.timeContent;
        this.timeSection = this.config.hasOwnProperty("timeSection") ? this.config.timeSection : this.timeSection;
        this.timeStr = this.config.hasOwnProperty("timeStr") ? this.config.timeStr : this.timeStr;
        // setTimeout(() => {
        this.format_edit_style(this.timeContent);
        // }, 2000);
      }
    },
    // 编辑样式回填
    format_edit_style(arr) {
      if (arr.length) {
        arr.forEach((item, day) => {
          if (item.arr.length > 0) {
            item.arr.forEach((item) => {
              if (this.rowUnit[day][item].class == null) {
                this.rowUnit[day][item].class = "ui-selected";
              }
            });
          }
        });
      }
    },
    handleMouseDown(i, day) {
      // console.log("begin_i " + i, "begin_day " + day);
      this.downEvent = true; //按下时鼠标不在范围内则不算
      this.beginDay = day;
      this.beginTime = i;
    },
    dian(event) {
      // console.log(event);
      this.px = event.pageX; //获取x坐标
      this.py = event.pageY;
    },
    yi(event) {
      if (this.px == "" || this.py == "") {
        return;
      }
      var px1 = this.px;
      var px2 = this.py;
      this.left = event.pageX;
      this.top = event.pageY;
      this.h = this.top - this.py;
      this.w = this.left - this.px;
      var hc = -this.h;
      var wc = -this.w;
      this.len = 1;
      this.back = "#31676f";
      if (this.h < 0 && this.w >= 0) {
        // console.log(1);
        this.h = hc;
        this.left = px1;
      } else if (this.h >= 0 && this.w < 0) {
        // console.log(2);
        this.w = wc;
        this.top = px2;
      } else if (this.h < 0 && this.w < 0) {
        // console.log(3);
        this.h = hc;
        this.w = wc;
      } else {
        // console.log(4);
        this.left = this.px;
        this.top = this.py;
      }
      if (this.w < 0) {
        this.w = 0 - this.w;
      }
      if (this.h < 0) {
        this.h = 0 - this.h;
      }
    },
    li() {
      this.px = "";
      this.py = "";
      this.h = "";
      this.w = "";
      this.top = "";
      this.left = "";
      this.len = 0;
      this.back = "";
    },
    handleMouseUp(i, day) {
      // console.log("end_i " + i, "end_day " + day);
      let _this = this;
      let begin = this.beginTime;
      let start = begin <= i ? begin : i; //x轴 起点
      let length = Math.abs(begin - i);
      let end = start + length; //x轴 终点

      let dayStart = this.beginDay <= day ? this.beginDay : day; //y轴 起点
      let dayLength = Math.abs(this.beginDay - day);
      let dayEnd = dayStart + dayLength; //y轴 终点

      //当框选范围内所有块都是选中状态时,执行反选
      function isAdd() {
        for (let x = dayStart; x < dayEnd + 1; x++) {
          for (let y = start; y < end + 1; y++) {
            if (_this.rowUnit[x][y].class == null) return true;
          }
        }
        return false;
      }
      //当点击事件是在table内才触发选取数据操作
      if (this.downEvent) {
        //选时间段
        if (isAdd()) {
          //没选中的全都选上
          for (let x = dayStart; x < dayEnd + 1; x++) {
            for (let y = start; y < end + 1; y++) {
              if (this.rowUnit[x][y].class == null) {
                this.rowUnit[x][y].class = "ui-selected";
                this.timeContent[x].arr.push(this.rowUnit[x][y].timeData);
              }
            }
          }
        } else {
          //反选
          for (let x = dayStart; x < dayEnd + 1; x++) {
            for (let y = start; y < end + 1; y++) {
              if (this.rowUnit[x][y].class == "ui-selected") {
                this.rowUnit[x][y].class = null;
                var c = this.rowUnit[x][y].timeData;
                var kong = "";
                for (let i = 0; i < this.timeContent[x].arr.length; i++) {
                  if (c == this.timeContent[x].arr[i]) {
                    kong = i;
                  }
                }
                console.log(kong);
                this.timeContent[x].arr.splice(kong, 1);
              }
            }
          }
        }
        //过滤时间段,将临近的时间段合并
        this.filterTime(dayStart, dayEnd);
      }
      this.downEvent = false;
    },
    filterTime(start, end) {
      //选中的x,y坐标信息 x:0-47  y:0-6
      function sortCut(arr) {
        //提取连续的数字
        var result = [];
        arr.forEach(function (v, i) {
          var temp = result[result.length - 1];
          if (!i) {
            result.push([v]);
          } else if (v % 1 === 0 && v - temp[temp.length - 1] == 1) {
            temp.push(v);
          } else {
            result.push([v]);
          }
        });
        return result;
      }
      function toStr(num) {
        if (Number.isInteger(num)) {
          let str = num < 10 ? "0" + num : num.toString();
          return str + ":00";
        } else {
          let str = Math.floor(num) < 10 ? "0" + Math.floor(num) : Math.floor(num).toString();
          return str + ":30";
        }
      }
      function timeToStr(arr) {
        //把数组转成方便人看到字符串
        let str = "";
        arr.forEach((arr, index) => {
          let str1 = "";
          if (index == 0) {
            str1 = toStr(arr[0]) + "~" + toStr(arr[1]);
          } else {
            str1 = " , " + toStr(arr[0]) + "~" + toStr(arr[1]);
          }
          str += str1;
        });

        return str;
      }
      //排序,分割成
      for (let i = start; i < end + 1; i++) {
        let arr1 = sortCut(this.timeContent[i].arr.sort((a, b) => a - b));
        let arr2 = [];
        arr1.forEach((arr) => {
          //转成带小数点的时间段,以及供前端显示的字符串
          let arr3 = [];
          arr3.push(arr[0] / 2);
          arr3.push(arr[arr.length - 1] / 2 + 0.5);
          arr2.push(arr3);
        });
        this.timeStr[i] = timeToStr(arr2);
        this.timeSection[i] = arr2;
      }
      // console.log(JSON.stringify(this.timeStr));
      // console.log(JSON.stringify(this.timeContent));
      // console.log(JSON.stringify(this.timeSection));
      this.$emit("save", { timeStr: this.timeStr, timeContent: this.timeContent, timeSection: this.timeSection });
    },
    clear() {
      this.rowUnit.forEach((item) => {
        item.forEach((item1) => {
          item1.class = null;
        });
      });
      this.timeContent.forEach((item) => {
        item.arr = [];
      });
      this.timeSection.forEach((item) => {
        //赋值成空数组[]出问题
        item.length = 0;
      });
      //遍历赋值成'',不管用
      this.timeStr.length = 0;
      for (let i = 0; i < 7; i++) {
        this.timeStr.push("");
      }
      //this.initState = true
      this.$emit("clear");
    },
  },
};
</script>

<style scoped>
.byted-weektime .calendar {
  -webkit-user-select: none;
  position: relative;
  display: inline-block;
}
#tableBody {
  /* position: relative; */
}
/*.byted-weektime .calendar .schedule{background:#2F88FF;width:0;height:0;position:fixed;display:none;top:0;left:0;pointer-events:none;-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;-ms-transition:all 400ms ease;transition:all 400ms ease}*/
.byted-weektime .calendar .calendar-table {
  border-collapse: collapse;
  border-radius: 4px;
}
.byted-weektime .calendar .calendar-table tr .calendar-atom-time:hover {
  background: #ccc;
}
.byted-weektime .calendar .calendar-table tr .ui-selected {
  background: #0bb3b3;
}
.byted-weektime .calendar .calendar-table tr .ui-selected:hover {
  background: #0bb3b3;
}
.byted-weektime .calendar .calendar-table tr,
.byted-weektime .calendar .calendar-table td,
.byted-weektime .calendar .calendar-table th {
  border: 1px solid #dcdfe6;
  font-size: 12px;
  text-align: center;

  line-height: 1.8em;
  -webkit-transition: background 200ms ease;
  -moz-transition: background 200ms ease;
  -ms-transition: background 200ms ease;
  transition: background 200ms ease;
}
.byted-weektime .calendar .calendar-table tbody tr {
  height: 30px;
}
.byted-weektime .calendar .calendar-table tbody tr td:first-child {
  background: #f8f9fa;
}
.byted-weektime .calendar .calendar-table thead th,
.byted-weektime .calendar .calendar-table thead td {
  background: #f8f9fa;
}
.byted-weektime .calendar .calendar-table .td-table-tip {
  line-height: 2.4em;
  padding: 0 12px 0 19px;
  background: #fff !important;
}
.byted-weektime .calendar .calendar-table .td-table-tip .clearfix {
  height: 46px;
  line-height: 46px;
}
.byted-weektime .calendar .calendar-table .td-table-tip .pull-left {
  font-size: 14px;
  color: #333333;
}
.byted-weektime .week-td {
  width: 75px;
  padding: 20px 0;
}
.byted-weektime a {
  cursor: pointer;
  color: #0bb3b3;
  font-size: 14px;
}
#kuang {
  position: absolute;
  background-color: #0bb3b3;
  opacity: 0.3;
}
.timeContent .item-week {
  display: inline-block;
  width: 55px;
}
</style>