import dayjs from "dayjs";

export default {
  data() {
    return {
      show: false,
      value: "",
      channelItem: null,
      minDate: dayjs().subtract(1, "year").toDate(),
      maxDate: new Date()
    };
  },
  methods: {
    onCancel() {
      this.resolve({ success: false, data: null });
      this.show = false;
    },
    onConfirm() {
      const { startTime, endTime, channelId } = this;
      this.resolve({ success: true, data: { startTime, endTime, channelId } });
      this.show = false;
    },
    close() {
      this.$destroy(true);
    },

    async pickChannel() {
      console.log("getChannelList", this.channelList);
      const result = await this.$services.pickItemAsync({
        value: this.channelId,
        key: "channel_list",
        searchable: false,
        paging: false,
        list: this.list,
        columns: [
          // 表格展示项
          { label: "名称", prop: "channelName" },
          { label: "唯一标识", prop: "id" },
        ],
        props: {
          key: "id",
          title: "channelName"
        },
      });

      if (!result.success) return;
      console.log(result);
      this.channelId = result.value;
      this.channelItem = result.data;
    }
  },
  beforeDestroy() {
    this.$el && this.$el.remove();
  }
};
