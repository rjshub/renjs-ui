<template>
    <el-select ref="selectRef"
        class="multiple-select"
        v-model="value"
        :multiple="multiple"
        collapse-tags
        :filterable="filterable"
        :clearable="clearable"
        :style="{width:selectWidth}"
        :multiple-limit="limit"
        size="mini"
        :placeholder="placeholder"
        :remote-method="remoteMethod"
        v-el-select-loadmore="loadMore_option"
        @focus="focus_select"
        @change="change_select">
        <slot></slot>
        <el-tooltip :content="showId? `${item[prop.label]} (${item[prop.label_id]})`:item[prop.label]"
            align="left"
            v-for="item in option_list"
            :key="item[prop.value]">
            <el-option :label="showId? `${item[prop.label]} (${item[prop.label_id]})`:item[prop.label]"
                :value="item[prop.value]">
            </el-option>
        </el-tooltip>
    </el-select>
</template>

<script>
export default {
  name: "FilterSelect",
  components: {},
  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    checked: {
      type: [Array, String, Number],
    },
    prop: {
      type: Object,
      default: () => {
        return { value: "value", label: "label" };
      },
    },
    loadMore: {
      // 是否滚动加载。和remote同时存在
      type: Boolean,
      default: false,
    },
    showId: {
      // option是否拼接选项唯一id
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },

    width: {
      type: String,
      default: "200px",
    },
    placeholder: {
      type: String,
      default: "please select",
    },
    limit: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      value: this.checked,
      selectWidth: this.width,
      range_number: 10,
      option_list: [],
      is_filtering: false,
    };
  },

  watch: {
    checked: {
      handler: function (val) {
        this.value = val;
      },
      deep: true,
    },
    options: {
      handler: function (val) {
        if (this.loadMore) {
          this.option_list = this.options.slice(0, this.range_number);
        } else {
          this.option_list = this.options;
        }
      },
      deep: true,
    },
  },

  methods: {
    loadMore_option() {
      if (!this.is_filtering) {
        this.range_number += 5;
        this.option_list = this.options.slice(0, this.range_number);
      }
    },
    change_select(item) {
      this.$emit("change", item);
    },
    focus_select() {
      this.is_filtering = false;
      if (this.loadMore) {
        this.option_list = this.options.slice(0, this.range_number);
      } else {
        this.option_list = this.options;
      }
    },
    remoteMethod(param) {
      if (param) {
        this.is_filtering = true;
        let result = [];
        this.options.forEach((item) => {
          const str = this.showId ? `${item[this.prop.label]} (${item[this.prop.label_id]})` : item[this.prop.label];
          if (str.toLowerCase().indexOf(param.toLowerCase()) != -1) {
            result.push(item);
          }
        });
        this.option_list = result;
      } else {
        this.is_filtering = false;
        this.option_list = this.options.slice(0, this.range_number);
      }
    },
  },
  computed: {},

  mounted() {
    
  },
};
</script>
<style lang="scss">
.multiple-select {
  transition: all ease-in-out 1s;
  margin: 0 10px 5px 0;

  .overlap {
    ::placeholder {
      color: #606266;
    }
  }
  .el-select__tags {
    // max-width: calc(100% - 30px);
    max-width: 100% !important;
    left: 0px;
    height: 25px;
    display: flex !important;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: hidden;
    & > span {
      display: flex;
      flex-wrap: nowrap;
    }
    .el-tag.el-tag--info {
      .el-select__tags-text {
        display: inline-block;
        max-width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-tag__close.el-icon-close {
        right: -5px;
        top: -6px;
      }
    }

    .el-select__input {
      display: inline-block;
      position: unset !important;
      padding-right: 30px;
      margin-left: 5px;
      max-width: unset !important;
      height: 25px;
      position: absolute;
      top: 0px;
      cursor: pointer;
    }
  }

  .el-input--suffix {
    .el-input__suffix {
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
</style>