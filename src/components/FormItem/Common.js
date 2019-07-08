/*
* 	{
		label: '标题',
		key: 'title',
		options: [],
		validator: v => true,
		type: '', // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
		optionsUrl: '',
		fileLabel: '',
		fileUrl: '',
		ext: '',
		role: '',
	}
*/
import DescBtn from "../../components/DescBtn";
import "./common.less";

// 是否是填了一半的时间 ,9999-12-31或2019-01-01,
function isUnfilledTime(str) {
  return /^,\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2},$|^,$/.test(str);
}

export default {
  components: { DescBtn },
  props: {
    value: String,
    data: Object,
    isMobile: Boolean
  },
  methods: {
    // 校验本组件,参数为true表示可以为空
    validate(nullable) {
      const { value, data: { name, validator } } = this;
      if (nullable && (!value || isUnfilledTime(value))) return ""; // 没有填且可为空直接不检查
      if (!nullable && (!value || /^,$/.test(value))) return "请填写" + name;
      return validator(value);
    }
  },
  computed: {
    vValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    },
    placeholder() {
      return "请填写/选择" + this.data.name;
    }
  }
};
