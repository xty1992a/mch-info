import { mapState } from "vuex";
import downloadFile from "@/utils/downloadFile";
import * as API from "@/api";
import * as ROLES from "@/router/roles";

export default {
  data() {
    return {
      onRequest: false,
      listTotalLength: 20,
      searchQuery: {
        pageIndex: 1,
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
    // 选择商户
    async chooseMch() {
      const result = await this.$services.pickItemAsync({
        value: "",
        columns: [
          // 表格展示项
          { label: "名称", prop: "name" },
          { label: "账号", prop: "account" },
          { label: "商家标识", prop: "businessId" }
        ],
        props: {
          key: "businessId",
          title: "name"
        },
        request: async query => {
          return await API.getMchList({ ...query, searchStr: query.keywords });
        }
      });

      if (!result.success) return;
      return result.value;
    },

    // region actions 点击按钮后的回调
    // region 顶部按钮
    // 修改过滤器，页面此时应该重新请求
    async changeQuery() {
      const result = await this.$services.filterQuery({
        value: this.searchQuery
      });
      console.log(result);
      if (result.success) {
        // 使searchQuery得到完全替换，避免页面需要deep监视
        this.searchQuery = Object.keys(this.searchQuery).reduce((p, key) => {
          return { ...p, [key]: result.value[key] || this.searchQuery[key] };
        }, {});
      }
    },
    // 导出,即下载
    exportList() {
      console.log("导出数据");
      downloadFile("/static/1.txt", "1.txt");
    },
    // endregion
    // 审核进件
    examineItem(item) {
      this.$router.push({ name: "MchInfoDetail", query: { examine: 1 } });
      console.log(item);
    },
    // 查看详情
    enterDetail() {
      this.$router.push({ name: "MchInfoDetail", query: { examine: 0 } });
    },
    // 进入支付参数配置页面
    enterPayment() {
      this.$router.push({ name: "PaymentCard" });
    },
    // 重新进件
    // 重新进入进件流程
    reAddMch(item) {
      console.log(item);
    },
    // 编辑进件
    editItem(item) {
      console.log(item);
    },
    // 修改费率
    editFee() {
      console.log("call fee edit");
      this.$services.editFee({
        value: "",
        options: []
      });
    },
    // 点击添加按钮，代理商需要先选择商户
    async addItem() {
      const is_merchant = this.$store.state.User.userInfo.role === ROLES.MERCHANT; // 非商家需要先选择商家
      let businessId;
      if (!is_merchant) {
        businessId = await this.chooseMch();
        if (!businessId) return;
      }
      // 商家账号登陆时应已初始化好了一个businessId
      else {
        businessId = this.$store.state.User.businessInfo.businessId;
      }

      console.log("business id is ", businessId);

      const complete = await this.$store.dispatch(
        "User/fetchMchInfo",
        businessId
      );
      if (!complete) return;
      this.goToAddMchInfo();
    },

    // 前往进件页面
    goToAddMchInfo() {
      // 重置进件信息
      this.$store.commit("MchInfo/CLEAR_STATE");
      this.$router.push({ name: "MchInfoAddMain" });
    },

    // 删除元素
    // 更新视图的操作由各页面监视listTotalLength自行处理
    async deleteItem(item) {
      this.onRequest = true;
      const complete = await this.$store.dispatch(
        "LogList/deleteListItem",
        item
      );
      // 删除元素需要重新更新finished
      // 确保不影响后续上拉加载
      if (complete) {
        this.listTotalLength--;
        this.finished = this.listTotalLength === this.list.length;
      }
      this.onRequest = false;
    },
    // 修改结算卡
    editCart(item) {
      this.$router.push({ name: "EditCard" });
      console.log(item);
    }

    // endregion
  },

  computed: {
    ...mapState("LogList", ["list"]),
    ...mapState("User", ["userInfo"])
  }
};
