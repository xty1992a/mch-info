const SHOULD_CACHED_KEYS = ["query", "list", "totalLength", "list"];

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
  created() {
    const cacheData = this.$storage.getItem("pagingPicker__data");
    if (!cacheData) return;
    SHOULD_CACHED_KEYS.forEach(key => {
      this[key] = cacheData[key] || "";
    });
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
      this.$destroy();
    }
  },
  beforeDestroy() {
    const data = SHOULD_CACHED_KEYS.reduce(
      (p, k) => ({ ...p, [k]: this[k] }),
      {}
    );
    this.$storage.setItem("pagingPicker__data", data);
    this.$el && this.$el.remove();
  }
};
