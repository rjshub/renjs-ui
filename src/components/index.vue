<template>
    <div class="renjs-ui-container">
        <el-container>
            <el-header>没什么想说的</el-header>
            <el-container>
                <el-aside width="200px">
                    <div class="title">组件</div>
                    <el-menu :default-active="active_model"
                        class="el-menu-vertical"
                        :router="true"
                        text-color="#09358A"
                        active-text-color="#09358A">
                        <el-menu-item index="/hourweek">
                            <i class="el-icon-date"></i>
                            <span slot="title">时间选择器(周-时)</span>
                        </el-menu-item>
                        <el-menu-item index="/filter-select">
                            <i class="el-icon-mouse"></i>
                            <span slot="title">select选择器</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      active_model: '/hourweek'
    };
  },
  methods: { },
  created() {
    this.active_model = this.$route.fullPath || '/hourweek'
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.renjs-ui-container {
  height: 100%;
  width: 100%;
  .el-container {
    height: 100%;
    .el-header {
      background: #3a5393;
      color: #fff;
      display: flex;
      align-items: center;
    }
    .el-aside {
      background: #343d55;
      color: #0bb3b3;
      .el-menu-vertical {
        background: transparent;
        border-right: 0;
        .el-menu-item,
        .el-submenu__title {
          font-size: 14px;
          height: 45px;
          color: #b6bdcf !important;
          line-height: 45px;
          i {
            font-size: 18px;
            margin-right: 10px;
          }
          &.is-active {
            background-color: #343d55;
            color: #0bb3b3 !important;
            .el-submenu__title {
              color: #0bb3b3 !important;
            }
          }
          &:hover {
            background: #0bb3b3;
            i,
            span {
              color: #fff !important;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.renjs-ui-container {
  .el-container {
    .el-aside {
      .title {
        width: 100%;
        height: 40px;
        color: #fff;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>