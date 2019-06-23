import Drag from "../../components/Drag";

export default {
  components: { Drag },
  data() {
    return {
      alertMessage:
        "提示：支付通道的选择按优先级顺序排列,排列顺序越靠前优先级越高。全局支付参数将用于商城、拼团、在线购券、团购、预约、在线计次购买等业务。",
      list: [
        { title: "乐刷通道", key: "ls" },
        { title: "一卡易网络新大陆通道", key: "yky" },
        { title: "微信直连通道", key: "wx" },
        { title: "支付宝直连通道", key: "zfb" }
      ],
      transitionName: "flip"
    };
  },
  methods: {
    swapIndex({ source, target }) {
      this.list = this.list.map((it, index) => {
        if (index === source) return this.list[target];
        if (index === target) return this.list[source];
        return it;
      });
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
    },
    itemTop(value) {
      if (value === 0) return;
      this.list = [this.list.splice(value, 1)[0], ...this.list];
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
  }
};
