<template>
  <div class="examine-block" :class="isMobile?'mobile':''">
    <Block title="审核操作" :is-mobile="isMobile" v-if="isExamine">
      <el-form label-width="120px">
        <template v-if="isMobile">
          <van-cell is-link title="当前状态"></van-cell>
          <van-cell is-link title="进件详情"></van-cell>
          <van-cell title="备注说明"></van-cell>
          <div class="textarea-panel">
            <el-input type="textarea" v-model="formData.description"/>
          </div>
          <van-cell is-link title="进件结果"></van-cell>
        </template>
        <template v-else>
          <el-form-item label="当前状态">
          </el-form-item>
          <el-form-item label="修改状态">
            <el-radio-group v-model="formData.status">
              <el-radio :label="item.value" v-for="item in statusList" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注说明">
            <div class="textarea-panel">
              <el-input type="textarea" v-model="formData.description"/>
            </div>
          </el-form-item>
          <el-form-item label="进件结果">
            <el-button size="small">查看详情</el-button>
          </el-form-item>
        </template>
      </el-form>
    </Block>

    <footer class="page-foot">
      <el-button @click="$router.push({name:'Home'})">返回</el-button>
      <el-button>保存</el-button>
      <el-button type="primary">进件</el-button>
    </footer>
  </div>
</template>

<script>
  import { Cell } from "vant";
  import Common from "./Common";

  export default {
    name: "ExamineBlock",
    mixins: [Common],
    components: { VanCell: Cell },
    props: {
      isExamine: Boolean
    },
    data() {
      return {
        formData: {
          status: "0",
          description: ""
        },
        statusList: [
          { label: "未通过", value: "0" },
          { label: "未通过", value: "1" },
          { label: "未通过", value: "2" },
          { label: "未通过", value: "3" }
        ]
      };
    },
    created() {
    },
    methods: {},
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .examine-block {

    .block {
      margin-bottom: -20px;
    }

    .el-form-item {
      margin-bottom: 10px;
    }

    .page-foot {
      text-align: center;
      position: absolute;
      bottom: -80px;
      right: 0;
      left: 0;

    }

    &.mobile {
      .page-foot {
        padding: 10px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;

        .el-button {
          padding: 6px 20px;
        }
      }

      .textarea-panel {
        padding: 0 15px 15px;
      }
    }

    .textarea-panel {
      border-radius: 8px;
      overflow: hidden;

      textarea {
        border: 0;
        background-color: #f7f7f7;
      }
    }
  }
</style>
