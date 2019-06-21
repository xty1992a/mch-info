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
      const { value, data: { filedName, validator } } = this;
      if (!nullable && !value) return "请填写" + filedName;
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
