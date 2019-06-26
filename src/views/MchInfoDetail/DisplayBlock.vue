<template>
  <div class="display-block">
    <Block :title="block.title" :is-mobile="isMobile" v-for="block in blockList" :key="block.title">
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

  export default {
    name: "DisplayBlock",
    components: { Cell, ImageBlock },
    mixins: [Common],
    data() {
      return {
        pageData: [
          {
            title: "商户信息",
            list: [
              { type: "text", title: "商户账号", value: "xxdgfzd" },
              { type: "text", title: "商户名称", value: "开封市鼓楼区笑笑蛋糕房" },
              { type: "text", title: "商户简称", value: "笑笑蛋糕房" },
              { type: "text", title: "地区邮编", value: "475001" },
              { type: "text", title: "经营地区", value: "河南开封龙亭区" },
              { type: "text", title: "经营地址", value: "河南省 开封市 鼓楼区中山路中段36号" },
              { type: "text", title: "行业类型", value: "食品--蛋糕烘培、休闲零食" },
              { type: "text", title: "客服电话", value: "18898111986" },
              { type: "text", title: "邮箱", value: "1287516519@qq.com" },
              { type: "text", title: "微信公众号AppId", value: "wx66f9b7d62c220fc4" }
            ]
          },
          {
            title: "法人和营业执照信息",
            list: [
              { type: "text", title: "营业执照类型", value: "个体工商户" },
              { type: "text", title: "公司全称", value: "开封市鼓楼区笑笑蛋糕房" },
              { type: "text", title: "营业执照注册号统一社会信用代码", value: "410204606106482" },
              { type: "text", title: "营业执照有效期起始日期", value: "2014-01-07" },
              { type: "text", title: "营业执照有效期截止日期", value: "永久" },
              { type: "text", title: "法人姓名", value: "董豪强" },
              { type: "text", title: "法人身份证", value: "411081198012220855" },
              { type: "text", title: "法人电话", value: "15203785555" },
              { type: "text", title: "法人证件有效期起始日期", value: "2014-04-02" },
              { type: "img", title: "身份证正面", value: imgs.no_auth },
              { type: "img", title: "身份证正面", value: imgs.no_auth },
              { type: "img", title: "身份证正面", value: imgs.no_auth },
              { type: "img", title: "身份证正面", value: imgs.no_auth }
            ]
          }
        ]
      };
    },
    created() {
    },
    methods: {},
    computed: {
      blockList() {
        if (!this.pageData || !this.pageData.length) return;
        return this.pageData.map(block => {
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
      margin-bottom: 10px;

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
