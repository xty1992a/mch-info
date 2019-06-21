import { mapGetters, mapState } from "vuex";

const mockData = [
  { key: 1, title: "asdfasdf", cf: "而天通苑", sj: "去玩儿", ddd: "UI哦" },
  { key: 2, title: "阿斯蒂芬", cf: "的覆盖", sj: "覆盖", ddd: "UI哦" },
  { key: 3, title: "儿童", cf: "问题", sj: "asdfasdf", ddd: "退" },
  { key: 4, title: "分低功耗", cf: "的覆盖吧", sj: "阿萨德", ddd: "红狗" }
];

export default {
  data() {
    return {
      onRequest: false,
      searchQuery: {
        pageIndex: 0,
        pageSize: 10,
        businessAccount: "",
        businessName: "",
        dlsName: "",
        chainStoreName: "",
        mchStatus: "",
        checkStatus: "",
        requestTime: "",
        mchTime: "",
        payTimes: ""
      }
    };
  },
  async mounted() {
    await this.$services.editFee();
    await this.$services.filterQuery();
  },
  methods: {
    // 修改过滤器
    async changeQuery() {
      const result = await this.$services.filterQuery({
        value: this.searchQuery
      });
      console.log(result);
      if (result.success) {
        Object.keys(this.searchQuery).forEach(key => {
          if (!result.value.hasOwnProperty(key)) return;
          this.searchQuery[key] = result.value[key];
        });
      }
    },
    // 修改费率
    editFee() {
      console.log("call fee edit");
      this.$services.editFee({
        value: "",
        options: []
      });
    },
    async addItem() {
      const result = await this.$services.pickItemAsync({
        value: "",
        columns: [
          { label: "吃饭", prop: "cf" },
          { label: "睡觉", prop: "sj" },
          { label: "打豆豆", prop: "ddd" }
        ],
        request: async query => {
          await this.$utils.sleep(300);
          return { success: true, data: mockData.map(it => ({ ...it, key: Math.random() })) };
        }
      });

      console.log(result);
    },

    goToAddMchInfo() {
      this.$store.commit("MchInfo/CLEAR_STATE");
      this.$router.push({ name: "MchInfoAddMain" });
    },

    // region actions 点击按钮后的回调
    // region 顶部按钮

    exportList() {
    },
    // endregion

    checkItem(item) {
      console.log(item);
    },
    reAddMch(item) {
      console.log(item);
    },
    editItem(item) {
      console.log(item);
    },
    async deleteItem(item) {
      this.onRequest = true;
      await this.$store.dispatch("LogList/deleteListItem", item);
      this.onRequest = false;
    },
    editCart(item) {
      console.log(item);
    }

    // endregion
  },

  computed: {
    ...mapState("LogList", [
      "list"
    ])
  }
};
