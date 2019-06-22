<template>
  <el-row class="edit-card" type="flex" justify="center">
    <el-col :md="20" :lg="18" :xl="14">
      <h3>结算信息修改申请</h3>
      <section class="content">
        <el-row class="title">
          <el-col class="pay-cell pay-chanel" :span="6">支付通道</el-col>
          <el-col class="pay-cell pay-type" :span="12">支付类型</el-col>
          <el-col class="pay-cell pay-set" :span="2">操作</el-col>
          <el-col class="pay-cell pay-index" :span="4">优先级调整</el-col>
        </el-row>
        <Drag :data="list" @drag-over="swapIndex">
          <div>
            <ChanelItem
              @up="itemUp"
              @down="itemDown"
              @top="itemTop"
              v-for="(item, index) in list"
              :index="index"
              :key="item.key"
              :total="list.length"
              :data="item"
            />
          </div>
        </Drag>
      </section>
      <footer class="footer">
        <el-button type="primary">确定</el-button>
      </footer>
    </el-col>
  </el-row>
</template>

<script>
import Drag from "../../components/Drag";
import Common from "./Common";
import ChanelItem from "./children/ChanelItem";

export default {
  name: "EditCard",
  mixins: [Common],
  components: { Drag, ChanelItem },
  data() {
    return {
      list: [
        { title: "乐刷通道", key: "ls" },
        { title: "一卡易网络新大陆通道", key: "yky" },
        { title: "微信直连通道", key: "wx" },
        { title: "支付宝直连通道", key: "zfb" }
      ]
    };
  },
  created() {},
  methods: {
    swapIndex({ source, target }) {
      this.list = this.list.map((it, index) => {
        if (index === source) return this.list[target];
        if (index === target) return this.list[source];
        return it;
      });
    },
    itemTop(value) {
      this.list = [this.list.splice(value, 1)[0], ...this.list];
    },
    itemUp(value) {
      this.swapIndex({ source: value, target: value - 1 });
    },
    itemDown(value) {
      this.swapIndex({ source: value, target: value + 1 });
    }
  },
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.edit-card {
  min-height: 100vh;
  background-color: #fff;

  h3 {
    padding: 18px;
  }

  .content {
    border: 1px solid #f0f2f5;
    border-radius: 8px;
    min-height: 500px;
    padding: 30px 0;
  }

  .content {
    background-color: #f9f9f9;
    padding: 0;

    .title {
      height: 48px;
      background-color: #f5f7fa;
      border-bottom: 1px solid #f2f4f6;

      .pay-cell {
        line-height: 48px;
        font-weight: bold;
        text-align: center;
      }
    }
  }

  .pay-cell {
  }

  .footer {
    padding: 40px;
    text-align: center;

    .el-button {
      height: 42px;
      width: 240px;
    }
  }
}
</style>
