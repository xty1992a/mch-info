import Vue from "vue";
import "./index.less";

export const WechatNotice = Vue.extend({
  name: "WechatNotice",
  mounted() {
    document.body.appendChild(this.$el);
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    async close() {
      this.show = false;
      await this.$utils.sleep(310);
      this.$destroy();
    }
  },
  beforeDestroy() {
    document.body.removeChild(this.$el);
  },
  render() {
    return (
      <transition name="fade">
        <div v-show={this.show} class="wechat-notice" onClick={this.close}>
          <p>啊哦，微信不能下载呢</p>
          <p>请点击这里选择[浏览器打开]再试试吧</p>

          <button onClick={this.close}>好哒！</button>
        </div>
      </transition>
    );
  }
});

const dftOpt = {
  show: false
};
export default function(opt = {}) {
  const vm = new WechatNotice({ ...dftOpt, ...opt }).$mount();
  vm.show = true;
}
