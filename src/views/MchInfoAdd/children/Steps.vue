<template>
  <div class="mch-info-add-steps">
    <div class="step-item" :class="currentStep>=0?'active':''">
      <span class="step-depth">
        <span class="ring" v-if="arrowShow">1</span>
        <span class="fill" v-else>1</span>
      </span>
      <span class="step-text">支付能力选择</span>
      <i class="el-icon-arrow-right" v-if="arrowShow"></i>
    </div>
    <div class="step-item" :class="currentStep>=1?'active':''">
      <span class="step-depth">
        <span class="ring" v-if="arrowShow">2</span>
        <span class="fill" v-else>2</span>
      </span>
      <span class="step-text">基础信息</span>
      <i class="el-icon-arrow-right" v-if="arrowShow"></i>
    </div>
    <div class="step-item" :class="currentStep>=2?'active':''">
      <span class="step-depth">
        <span class="ring" v-if="arrowShow">3</span>
        <span class="fill" v-else>3</span>
      </span>
      <span class="step-text">结算信息</span>
      <i class="el-icon-arrow-right" v-if="arrowShow"></i>
    </div>
    <div class="step-item" :class="currentStep>=3?'active':''">
      <span class="step-depth">
        <span class="ring" v-if="arrowShow">4</span>
        <span class="fill" v-else>4</span>
      </span>
      <span class="step-text">其他信息</span>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";

  export default {
    name: "Steps",
    components: {},
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {
      ...mapState("App", [
        "isMobile",
      ]),
      ...mapGetters("App", [
        "screenType"
      ]),
      ...mapState("MchInfo", [
        "currentPage"
      ]),
      ...mapGetters("MchInfo", [
        "currentStep"
      ]),

      arrowShow() {
        return this.screenType !== "xs";
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../styles/variable";

  .mch-info-add-steps {
    display: flex;
    background-color: #F5F7FA;
    border-radius: 4px 4px 0 0;
    border: 1px solid #F0F2F5;
    border-bottom: none;

    .step-item {
      flex: 1;
      flex-wrap: wrap;
      display: flex;
      padding: 15px 0;
      align-items: center;

      &:first-child {
        .step-depth:before {
          display: none;
        }
      }

      &:last-child {
        .step-depth:after {
          display: none;
        }
      }

    }

    .step-depth {
      position: relative;

      span {
        display: inline-block;
        position: relative;
        z-index: 1;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
      }

      .ring {
        border: 1px solid #e5e5e5;
      }

      .fill {
        background-color: #e5e5e5;
      }

      &:after, &:before {
        content: '';
        opacity: 0;
        height: 1px;
        top: 50%;
        position: absolute;
        background-color: #E4E7ED;
      }

      &:before {
        left: 0;
        right: 50%;
      }

      &:after {
        left: 50%;
        right: 0;
      }
    }
  }

  .desktop-app {
    .mch-info-add-steps {
      .step-item {
        height: 56px;
        justify-content: space-evenly;

        &.active {
          color: @activeC;

          .ring {
            color: #fff;
            background-color: @activeC;
            border-color: @activeC;
          }
        }
      }

      .step-text {
      }
    }
  }

  .mobile-app {
    .mch-info-add-steps {
      .step-item {
        text-align: center;

        &.active {
          color: @activeC;

          .fill {
            color: #fff;
            background-color: @activeC;
          }
        }

        .step-depth {
          &:after, &:before {
            opacity: 1;
          }
        }

        .step-text {
          white-space: nowrap;
          margin-top: 10px;
        }

        .step-depth, .step-text {
          width: 100%;
        }
      }
    }
  }
</style>
