<template>
  <div class="log-list">
    <van-list
            v-if="listTotalLength"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            ref="list"
    >
      <div class="list-wrap">
        <LeftGoTransition>
          <MchInfoCard
                  v-for="(item, index) in list"
                  :key="item.mpsCheckPaymentId"
                  :data="item"
                  @invoke="invokeMethod"
          />
        </LeftGoTransition>
      </div>
      <BackTop :show="scrollTop > 300">
        <i class="el-icon-top"></i>
      </BackTop>
    </van-list>

    <div class="empty" v-else>
      <div class="img">
        <img src="" alt="">
      </div>
      <p>什么都没有哦</p>
    </div>
    <FloatBtn bottom="130px" @click="changeQuery" style="color:#999;">
      <svg-icon icon="filter"/>
    </FloatBtn>
    <footer class="list-foot">
      <!--<div class="left-btn">-->
      <!--<el-button @click="exportList" v-role="[$roles.SERVICE]">下载</el-button>-->
      <!--</div>-->
      <div class="right-btn">
        <el-button @click="addItem" size="large" type="primary">新增</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
  import LeftGoTransition from "@/components/LeftGoTransition";
  import FloatBtn from "@/components/FloatBtn";
  import BackTop from "@/components/FloatBtn/BackTop";
  import { mapState } from "vuex";
  import { List } from "vant";

  import MchInfoCard from "./children/MchInfoCard";
  import Common from "./Common";

  const SCREEN_HEIGHT = document.documentElement.clientHeight;

  export default {
    name: "LogList",
    mixins: [Common],
    components: {
      VanList: List,
      MchInfoCard,
      FloatBtn,
      BackTop,
      LeftGoTransition
    },
    data() {
      return {
        scrollTop: 0,
        loading: false,
        finished: false
      };
    },
    created() {
      this.debouncedScroll && window.removeEventListener("scroll", this.debouncedScroll);
      this.debouncedScroll = this.$utils.debounce(this.checkScrollTop, 100);
      window.addEventListener("scroll", this.debouncedScroll);
    },
    activated() {
      this.fetchData(this.$store.state.LogList.shouldRefresh);
      this.$store.commit("LogList/SET_SHOULD_REFRESH", false);
    },
    methods: {
      // 加载事件视为修改pageIndex的一种行为
      async onLoad() {
        this.searchQuery = {
          ...this.searchQuery,
          pageIndex: this.searchQuery.pageIndex + 1
        };
        this.fetchData();
      },
      async fetchData(shouldCover = false) {
        const result = await this.$store.dispatch("LogList/appendList", {
          query: {
            ...this.searchQuery
          },
          shouldCover,
        });
        this.loading = false;

        console.log(result);

        if (result.success) {
          this.listTotalLength = result.data.total;
          this.finished = this.listTotalLength === this.list.length;
        }
        else {
          this.finished = true;
        }
      },
      invokeMethod(method, data) {
        console.log("method ", method);
        this[method](data);
      },
      checkScrollTop() {
        const el = document.scrollingElement;
        this.scrollTop = el.scrollTop;
      }
    },
    computed: {
      ...mapState("App", ["isWechat"])
    },
    watch: {
      /*
       * 用户删除数据时，高度会发生改变，此时van-list不会检查是否需要加载
       * 因此需要手动检查。当其高度小于屏幕高度时，手动触发其更新
       * 因为动画缓动原因，需要延时至少300ms
       * */
      async listTotalLength() {
        if (!this.$refs.list) {
          await this.$utils.sleep(50);
        }
        const list = this.$refs.list;
        await this.$utils.sleep(320);
        if (list.$el.clientHeight < SCREEN_HEIGHT) {
          console.log("list length small than SCREEN");
          list.check();
        }
      },
      // searchQuery: {
      //   async handler() {
      //     if (this.onRequest) return;
      //     this.fetchData();
      //   }
      // }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .log-list {
    padding-bottom: 70px;

    .list-wrap {
      padding: 10px 14px;
    }

    .list-foot {
      background-color: #fff;
      padding: 0 14px;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;

      .left-btn {
        width: 80px;
      }

      .right-btn {
        flex: 1;

        .el-button {
          width: 100%;
        }
      }
    }

    .list-foot {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      height: 60px;
    }

    .float-btn {
      font-size: 28px;
    }
  }

  .empty {
    padding: 20vh 0 0;
    text-align: center;

    .img {
      margin: 0 auto;
      width: 200px;
      height: 200px;
      background-color: #f7f7f7;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .van-list__finished-text {
    text-align: center;
  }

</style>
