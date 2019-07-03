<template>
  <Container title="支付方式配置" class="payment-card">
    <section class="content">
      <el-row class="title">
        <el-col class="pay-cell pay-chanel" :span="6">支付通道</el-col>
        <el-col class="pay-cell pay-type" :span="10">支付类型</el-col>
        <el-col class="pay-cell pay-set" :span="2">操作</el-col>
        <el-col class="pay-cell pay-switch" :span="2">操作</el-col>
        <el-col class="pay-cell pay-index" :span="4">优先级调整</el-col>
      </el-row>

      <el-alert style="padding: 16px;" :title="alertMessage" type="warning">
      </el-alert>
      <Drag :data="list" @drag-over="dragDone" ref="drag">
        <transition-group tag="div" :name="transitionName">
          <ChanelItem
                  @up="itemUp"
                  @down="itemDown"
                  @top="itemTop"
                  @resize="resize"
                  @toggle="toggleItem"
                  @confirm="confirmParams"
                  v-for="(item, index) in list"
                  :index="index"
                  :key="item.key"
                  :total="list.length"
                  :data="item"
                  :map="typeMap"
          />
        </transition-group>
      </Drag>
    </section>
    <footer class="footer" slot="foot">
      <el-button type="primary">确定</el-button>
    </footer>
  </Container>
</template>

<script>
  import Container from "@/components/Container";
  import { Alert } from "element-ui";
  import Common from "./Common";
  import ChanelItem from "./children/ChanelItem";

  export default {
    name: "PaymentCard",
    mixins: [Common],
    components: { ChanelItem, ElAlert: Alert, Container },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
  .payment-card {
    .content {
      border: 1px solid #f0f2f5;
      border-radius: 8px;
      min-height: 500px;
      padding: 30px 0;
      overflow: hidden;
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
        .pay-index{
          text-align: left;
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

    .flip-move {
      transition: 0.3s;
    }
  }
</style>
