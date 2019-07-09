<template>
  <div class="display-block">
    <el-alert v-role="[$roles.MERCHANT, $roles.AGENT]"
              v-if="reason"
              title="拒绝原因"
              :closable="false"
              :description="reason"
              style="margin-bottom: 15px;"
              type="error">
    </el-alert>
    <Block :title="block.title" :is-mobile="isMobile" v-for="(block,i) in blockList" :key="block.title+i">
      <el-row type="flex" align="center" style="flex-wrap: wrap">
        <el-col :xs="24" :md="12"
                v-for="item in block.textList"
                :key="item.key">
          <Cell :title="item.title" :value="item.value" :is-mobile="isMobile"/>
        </el-col>
      </el-row>
      <el-row type="flex" align="center" style="flex-wrap: wrap;" :gutter="30" class="image-row">
        <el-col :xs="24" :md="12" :lg="8" v-for="img in block.imgList" :key="img.key" class="image-col">
          <ImageBlock :src="img.value" :is-mobile="isMobile" :label="img.title"/>
        </el-col>
      </el-row>
    </Block>
  </div>
</template>

<script>
  import Common from "./Common";
  import ImageBlock from "./children/ImageBlock";
  import imgs from "@/assets/imgs";
  import Cell from "./children/Cell";
  import { Alert } from "element-ui";

  export default {
    name: "DisplayBlock",
    components: { Cell, ImageBlock, ElAlert: Alert },
    mixins: [Common],
    props: {
      data: Array,
      reason: String
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {
      blockList() {
        if (!this.data || !this.data.length) return;
        return this.data.map(block => {
          return {
            title: block.title,
            textList: block.list.filter(it => it.type === "text").map((it, index) => ({ ...it, key: it.value + index })),
            imgList: block.list.filter(it => it.type === "img").map((it, index) => ({ ...it, key: it.value + index }))
          };
        });
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .display-block {
    .block {
      margin-bottom: 18px;
      border: 1px solid #F0F2F5;
      border-radius: 8px;
      overflow: hidden;

      .block-body {
      }

      .image-row {
        padding-top: 15px;

        .image-col {
          margin-bottom: 15px;
        }
      }

      .cell {
      }
    }
  }

  .mobile-app {
    .display-block {
    }

    .image-row {
      padding: 10px;
    }
  }
</style>
