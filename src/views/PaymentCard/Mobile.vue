<template>
  <div class="m-edit-card">
    <Drag :data="list" @drag-over="dragDone" ref="drag">
      <transition-group tag="div" :name="transitionName">
        <div
                class="card-item-wrap"
                v-for="(item, index) in list"
                :key="item.key"
        >
          <div class="card-item">
            <div class="handler"></div>
            <van-cell title="支付通道" :value="item.title"></van-cell>
            <van-cell title="支付方式" is-link>
              <div class="pay-item">
                <i class="el-icon-star-on"></i>
              </div>
              <div class="pay-item">
                <i class="el-icon-picture"></i>
              </div>
              <div class="pay-item">
                <i class="el-icon-s-finance"></i>
              </div>
              <div class="pay-item">
                <i class="el-icon-s-open"></i>
              </div>
            </van-cell>
            <van-cell title="配置" is-link/>
            <div class="card-foot">
              <span
                      class="sort-btn"
                      @click="itemUp(index)"
                      :class="index === 0 ? 'disabled' : ''"
              >
                <i class="el-icon-top"></i>
              </span>
              <span
                      class="sort-btn"
                      @click="itemDown(index)"
                      :class="index === list.length - 1 ? 'disabled' : ''"
              >
                <i class="el-icon-bottom"></i>
              </span>
              <span
                      class="sort-btn"
                      v-show="index !== 0"
                      @click="itemTop(index)"
                      :class="index === list.length - 1 ? 'disabled' : ''"
                      style="transform: rotate(180deg)"
              >
                <i class="el-icon-download"></i>
              </span>
            </div>
          </div>
        </div>
      </transition-group>
    </Drag>
  </div>
</template>

<script>
  import { Cell } from "vant";
  import Common from "./Common";

  export default {
    name: "MEditCard",
    mixins: [Common],
    components: { VanCell: Cell },
    data() {
      return {};
    },
    created() {
    },
    methods: {
      commandHandler() {
      }
    },
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
  .m-edit-card {
    background-color: #f7f7f7;
    padding: 10px;

    .card-item-wrap {
      padding-bottom: 10px;
    }

    .sorter-holder {
      background-color: #fff !important;
    }

    .card-item {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
      background-color: #fff;

      .handler {
        height: 30px;
        background-color: #f7f7f7;
      }

      .pay-item {
        display: inline-block;
      }

      .card-foot {
        white-space: nowrap;
        padding: 10px;
        text-align: right;

        .sort-btn {
          display: inline-flex;
          margin: 0 10px;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0;
          color: #333;

          &.disabled {
            background-color: #f9f9f9;
            color: #999;
          }
        }
      }
    }

    .flip-move {
      transition: 0.3s;
    }
  }
</style>
