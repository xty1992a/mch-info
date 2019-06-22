<template>
  <div class="log-list" v-loading="onRequest">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list-wrap">
        <MchInfoCard
          v-for="(item, index) in list"
          :key="item.key + '_' + index"
          :data="item"
          @invoke="invokeMethod"
        />
      </div>
      <BackTop v-if="scrollTop > 300">
        <i class="el-icon-top" style="font-size: 28px;"></i>
      </BackTop>
      <FloatBtn bottom="130px" @click="changeQuery">
        <i class="el-icon-cold-drink" style="font-size: 28px;"></i>
      </FloatBtn>
      <footer class="list-foot">
        <div class="left-btn">
          <el-button @click="download">下载</el-button>
        </div>
        <div class="right-btn">
          <el-button @click="addItem" size="large" type="primary"
            >新增
          </el-button>
        </div>
      </footer>
    </van-list>
  </div>
</template>

<script>
import FloatBtn from "@/components/FloatBtn";
import BackTop from "@/components/FloatBtn/BackTop.js";
import { mapState } from "vuex";
import { List } from "vant";
import MchInfoCard from "./children/MchInfoCard";
import Common from "./Common";

export default {
  name: "LogList",
  mixins: [Common],
  components: { VanList: List, MchInfoCard, FloatBtn, BackTop },
  data() {
    return {
      scrollTop: 0,
      loading: false,
      finished: false
    };
  },
  created() {
    this.debouncedScroll &&
      window.removeEventListener("scroll", this.debouncedScroll);
    this.debouncedScroll = this.$utils.debounce(this.checkScrollTop, 100);
    window.addEventListener("scroll", this.debouncedScroll);
  },
  methods: {
    async onLoad() {
      this.loading = true;
      console.log("load");
      this.searchQuery.pageIndex++;
      await this.$store.dispatch("LogList/appendList", this.searchQuery);
      this.loading = false;
      this.finished = this.searchQuery.pageIndex >= 4;
    },
    download() {
      if (this.isWechat) {
        this.$message("微信不支持下载,请在浏览器中打开!");
        return;
      }
      console.log("下载去...");
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
}

.van-list__finished-text {
  text-align: center;
}
</style>
