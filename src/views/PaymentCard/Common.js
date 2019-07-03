import Drag from "../../components/Drag";
import * as API from "@/api";

function getType(text) {
  if (text.includes("微信")) return "wechat";
  if (text.includes("支付宝")) return "ali";
  if (text.includes("云闪付")) return "union";
  if (text.includes("翼支付")) return "best";
  if (text.includes("分期")) return "stage";
  return "none";
}

export default {
  components: { Drag },
  data() {
    return {
      alertMessage:
        "提示：支付通道的选择按优先级顺序排列,排列顺序越靠前优先级越高。全局支付参数将用于商城、拼团、在线购券、团购、预约、在线计次购买等业务。",
      list: [],
      transitionName: "flip"
    };
  },
  async created() {
    const { businessId } = this.$route.query;
    if (!businessId) {
      this.$message("缺少必要参数!");
      return;
    }
    await this.getPageData(this.$route.query);
  },
  methods: {
    async getPageData({ businessId, chainStoreId }) {
      const result = await API.getPayParams({ businessId, chainStoreId });
      if (!result.success) {
        return;
      }
      console.log(result);
      this.formatPageData(result.data);
    },

    formatPageData(list) {
      this.list = list.map(it => ({
        ...it,
        title: it.name,
        key: it.paramId,
        payTypes: it.payTypes.map(text => ({
          text,
          type: getType(text)
        }))
      }));
    },

    async toggleItem(query) {
      const result = await API.toggleConfig({ ...query, businessId: this.businessId, chainStoreId: this.chainStoreId });
      console.log(result);
      // 修改失败,将其还原
      if (!result.success) {
        const item = this.list.find(it => it.key === query.id);
        item && (item.isActive = !item.isActive);
      }
    },

    async confirmParams(merchantParam) {
      const id = merchantParam.id;
      delete merchantParam.id;
      const data = { merchantParam, businessId: this.businessId, chainStoreId: this.chainStoreId, id };
      const result = await API.editConfig(data);
      if (result.success) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      }
    },

    async sortIndex() {
      const map = this.list.reduce((p, it, index) => ({ ...p, [it.paramId]: this.priorityList[index] }), {});
      const result = await API.sortIndex({ priorityMap: map, businessId: this.businessId, chainStoreId: this.chainStoreId });
      console.log(result);
    },

    swapIndex({ source, target }) {
      this.list = this.list.map((it, index) => {
        if (index === source) return this.list[target];
        if (index === target) return this.list[source];
        return it;
      });
      this.sortIndex();
    },
    dragDone({ source, target }) {
      const list = this.list;
      let temp = list.splice(source, 1);
      // 截取开头到被交换位置的元素
      let start = list.splice(0, target);
      // 组装成结果数组
      this.list = [...start, ...temp, ...list];
      this.transitionName = "";
      this.$nextTick(() => {
        this.transitionName = "flip";
      });
      this.sortIndex();
    },
    itemTop(value) {
      if (value === 0) return;
      this.list = [this.list.splice(value, 1)[0], ...this.list];
      this.sortIndex();
    },
    itemUp(value) {
      if (value === 0) return;
      this.swapIndex({ source: value, target: value - 1 });
    },
    itemDown(value) {
      if (value === this.list.length - 1) return;
      this.swapIndex({ source: value, target: value + 1 });
    },
    resize() {
      this.$refs.drag && this.$refs.drag.refresh();
    }
  },
  computed: {
    typeMap() {
      return this.list.reduce((pre, item) => {
        item.payTypes.forEach(it => {
          if (pre[it.text]) return;
          pre[it.text] = item.key;
        });
        return pre;
      }, {});
    },
    // 初始优先级列表,可能有跳级
    priorityList() {
      return this.list.map(it => it.priority).sort((a, b) => a - b);
    },
    businessId() {
      return this.$route.query.businessId;
    },
    chainStoreId() {
      return this.$route.query.chainStoreId;
    },
  }
};
