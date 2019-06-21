<template>
  <el-collapse class="bank-picker" v-model="showList" style="border: 0;">
    <el-collapse-item name="1">
      <div class="bank-list">
        <div class="bank-item" v-for="item in 10">
          <i class="el-icon-platform-eleme"></i>
          <span>中国工商银行</span>
        </div>
      </div>
      <p style="font-size: 13px;color: #999;">
        城市商业银行，农村商业银行，信用合作联社及其他银行，请选择"其他银行"
      </p>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { Collapse, CollapseItem } from "element-ui";

export default {
  name: "BankPicker",
  components: { ElCollapse: Collapse, ElCollapseItem: CollapseItem },
  props: {
    show: Boolean
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    showList() {
      return this.show ? ["1"] : [];
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.bank-picker {
  .bank-list {
    padding: 20px 10px 0;
    display: flex;
    flex-wrap: wrap;
    /*align-items: center;*/
    line-height: 1;

    .bank-item {
      font-size: 15px;
      line-height: 45px;
      height: 45px;
      width: 160px;
    }
  }
}
</style>
