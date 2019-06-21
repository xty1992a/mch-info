export default {
  data() {
    return {
      query: {
        keywords: "",
        pageIndex: 1,
        pageSize: 10
      },
      totalLength: 30,
      list: []
    };
  },
  methods: {
    pickItem(row) {
      this.value = row.key;
    },
    onCancel() {
      this.resolve({ success: false, value: this.value });
      this.show = false;
    },
    onConfirm() {
      this.resolve({ success: true, value: this.value });
      this.show = false;
    },
    close() {
      this.$destroy(true);
    }
  },
  beforeDestroy() {
    this.$el && this.$el.remove();
  }
};
