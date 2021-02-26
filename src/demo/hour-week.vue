<template>
    <div class="">
        <h3>将时间按照周-24时拆分。每小格代表半小时。</h3>
        <HourWeek style="margin: 20px 0"
            @save="get_check_time_result"
            @clear="reset_check_time_result"
            :config="{}"></HourWeek>
        <div style="color: #ff0000">需要编辑时将save输出的结果作为config的属性值传入</div>
    </div>
</template>

<script>
import HourWeek from "@/components/hour-week/index.vue";

export default {
  components: { HourWeek },
  data() {
    return {
      timeStr: [],
      timeContent: [],
      timeSection: [],
    };
  },
  watch: {},
  methods: {
    get_check_time_result(param) {
      this.timeStr = param.timeStr;
      this.timeContent = param.timeContent;
      this.timeSection = param.timeSection;
      console.log({
        timeStr: this.timeStr,
        timeContent: this.timeContent,
        timeSection: this.timeSection,
      });
    },
    reset_check_time_result() {
      this.timeStr = [];
      this.timeContent = [];
      this.timeSection = [];
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>