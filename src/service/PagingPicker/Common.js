const SHOULD_CACHED_KEYS = ["query", "list", "totalLength", "finished"];

export default {
  data() {
    return {
      query: {
        keywords: "",
        pageIndex: 1,
        pageSize: 10
      },
      totalLength: 30,
      list: [],
      onRequest: false
    };
  },
  created() {
    if (this.shouldCache) {
      const cacheData = this.$storage.getItem(this.key);
      if (!cacheData) return;
      SHOULD_CACHED_KEYS.forEach(key => {
        this[key] = cacheData[key] || "";
      });
    }
  },
  methods: {
    pickItem(row) {
      console.log("row", row);
      this.value = row[this.props.key];
    },
    onCancel() {
      this.resolve({ success: false, value: this.value, data: null });
      this.show = false;
    },
    onConfirm() {
      if (!this.value) {
        this.$message("确定之前需要先选择一项");
        return;
      }
      this.resolve({ success: true, value: this.value, data: this.list.find(it => it[this.props.key] === this.value) });
      this.show = false;
    },
    close() {
      this.$destroy();
    }
  },
  beforeDestroy() {
    if (this.shouldCache) {
      const data = SHOULD_CACHED_KEYS.reduce(
        (p, k) => ({ ...p, [k]: this[k] }),
        {}
      );
      this.$storage.setItem(this.key, data);
    }
    this.$el && this.$el.remove();
  }
};
