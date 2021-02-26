<template>
    <div class="filter-select-container">
        <h3>element-ui select选择器重写，多选标签格式，可搜索，可下拉加载更多，可展示重写label。</h3>
        <div class="title">##多选+搜索+label重写+下拉</div>
        <FilterSelect v-model="filter_form.option_1"
            :prop="{value: 'id', label: `campaign_name`, label_id: 'media_campaign_id'}"
            :options="option_list_1"
            :showId="true"
            :loadMore="true"
            filterable
            multiple
            @change="option_1_change"
            placeholder="请选择"></FilterSelect>
        <div class="title">##多选+搜索</div>

        <FilterSelect v-model="filter_form.option_2"
            :prop="{value: 'id', label: `name`}"
            :options="option_list_2"
            filterable
            multiple
            @change="option_2_change"
            placeholder="请选择"></FilterSelect>
    </div>
</template>

<script>
import FilterSelect from "@/components/filter-select/index.vue";

export default {
  components: { FilterSelect },
  data() {
    return {
      filter_form: {
        option_1: [],
        option_2: [],
      },
      option_list_1: [
        {
          campaign_name: "T03竞价5.25-6.30",
          id: "1667646011167779_1",
          media_campaign_id: "1667646011167779",
        },
        {
          campaign_name: "T03竞价7.1-7.31",
          id: "1670902818132044_1",
          media_campaign_id: "1670902818132044",
        },
        {
          campaign_name: "T03零跑7.29-8.31",
          id: "1673512283730948_1",
          media_campaign_id: "1673512283730948",
        },
        {
          campaign_name: "2月搜广",
          id: "1687585838861371_1",
          media_campaign_id: "1687585838861371",
        },
        {
          campaign_name: "零跑T03-8月冲量城市计划",
          id: "1674254127689779_1",
          media_campaign_id: "1674254127689779",
        },
        {
          campaign_name: "微朋-C11-0116-拼多6图+朋友圈大图+冰岛实拍-大图卡片-1",
          id: "2467169792_3",
          media_campaign_id: "2467169792",
        },
        {
          campaign_name: "微朋-C11-0101-0103-合约朋友圈-30城",
          id: "2443771063_3",
          media_campaign_id: "2443771063",
        },
        {
          campaign_name: "公-0919-KV42吴晓波续航价格-大图卡片-就要高配-15w人群",
          id: "330000650_3",
          media_campaign_id: "330000650",
        },
        {
          campaign_name: "T03-0606-行动式卡片-金融9870元KV5-综合-原生小程序-22城",
          id: "2210765226_3",
          media_campaign_id: "2210765226",
        },
        {
          campaign_name: "微朋-C11-0114-智能辅助驾驶+预售价格+政策-多图-1",
          id: "2464811625_3",
          media_campaign_id: "2464811625",
        },
        {
          campaign_name: "公-0916-KV22内饰外拍-就要高配-29城-商品广告-欧拉",
          id: "327595741_3",
          media_campaign_id: "327595741",
        },
        {
          campaign_name: "微朋-C11-0122-朋友圈-智能辅助驾驶+预售价格+政策-多图",
          id: "2474823553_3",
          media_campaign_id: "2474823553",
        },
        {
          campaign_name: "朋-0911-KV59内饰外观-大图卡片-就要高配-千万别关",
          id: "2310905529_3",
          media_campaign_id: "2310905529",
        },
        {
          campaign_name: "T03-0521-常规卡片-空间KV2-行为3-原生页-21城",
          id: "2195851202_3",
          media_campaign_id: "2195851202",
        },
      ],
      option_list_2: [
        {
          code: "jl",
          id: 1,
          name: "巨量引擎",
        },
        {
          code: "tx",
          id: 2,
          name: "腾讯广告",
        },
        {
          code: "wx",
          id: 3,
          name: "微信广告",
        },
      ],
    };
  },
  watch: {},
  methods: {
    option_1_change() {
      console.log(this.filter_form.option_1);
    },
    option_2_change() {
      console.log(this.filter_form.option_2);
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.filter-select-container {
  .title {
    color: #333;
    line-height: 40px;
  }
}
</style>