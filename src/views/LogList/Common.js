import { mapState } from "vuex";
import downloadFile from "@/utils/downloadFile";
import dayjs from "dayjs";
import * as API from "@/api";
import * as ROLES from "@/router/roles";

export default {
  data() {
    return {
      onRequest: false,
      listTotalLength: 0,
      hadRequest: false,
      searchQuery: {
        payeeInfoChangeStatus: "",
        channel: "",
        businessLicenceType: [],
        pageIndex: 0,
        pageSize: 10,
        businessAccount: "",
        subMerchantId: "",
        existMerchantId: "",
        businessName: "",
        agentAccount: "",
        storeName: "",
        auditStatus: [],
        startEndDate: "",
        updateStartEndDate: "",
        auditStartEndDate: "",
        payTimes: ""
      }
    };
  },
  async mounted() {
    await this.$services.editFee();
    await this.$services.filterQuery();
    await this.$services.pickItemAsync();
  },

  filters: {
    // 0未审核 1审核中 2审核通过 3拒绝 4弃用
    statusDis: v => ["未审核", "审核中", "通过", "拒绝", "弃用"][v],
    channelDis: v => ["未审核", "审核中", "通过", "拒绝", "弃用"][v],
    date: v => (dayjs(v).isValid() ? dayjs(v).format("MM-DD HH:mm") : ""),
    licenceType: v => ["未知", "无", "个体", "企业"][+v]
  },
  methods: {
    // region 调起弹窗选择器
    // 为其他回调提供服务,弹窗,选择,返回一个值.
    // 选择商户
    async chooseMch() {
      const result = await this.$services.pickItemAsync({
        value: "",
        shouldCache: false,
        searchable: true,
        key: "business_list",
        title: "选择商户",
        placeholder: "请输入商家账号",
        columns: [
          // 表格展示项
          { label: "名称", prop: "name" },
          { label: "账号", prop: "account" }
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
    // 选择门店
    async chooseStore(businessId) {
      const result = await this.$services.pickItemAsync({
        value: "",
        title: "选择门店",
        placeholder: "请输入门店名称",
        key: "cached__chain_store__list",
        shouldCache: false,
        columns: [
          // 表格展示项
          { label: "名称", prop: "chainStoreName" },
          { label: "门店标识", prop: "chainStoreId" }
        ],
        props: {
          key: "chainStoreId",
          title: "chainStoreName"
        },
        request: async query => {
          return await API.getStoreList({
            ...query,
            chainStoreName: query.keywords,
            businessId
          });
        }
      });
      if (!result.success) return null;
      return result.value;
    },
    // 选择进件通道
    async chooseChannel() {
      const list = await this.$store.dispatch("LogList/getChannelList");
      const result = await this.$services.pickItemAsync({
        value: "",
        key: "channel_list",
        searchable: false,
        paging: false,
        list,
        columns: [
          // 表格展示项
          { label: "名称", prop: "channelName" },
          { label: "唯一标识", prop: "id" }
        ],
        props: {
          key: "id",
          title: "channelName"
        }
      });
      if (!result.success) return;
      return result.value;
    },
    // endregion

    async getData({ isList }) {
      const query = this.searchQuery;
      if (query.pageIndex === 1 || !isList) {
        console.log("cover list ");
        return await this.$store.dispatch("LogList/coverList", query);
      } else {
        console.log("append list");
        return await this.$store.dispatch("LogList/appendList", query);
      }
    },

    // region 会影响列表的按钮回调
    // 修改过滤器，页面此时应该重新请求
    async changeQuery() {
      const list = await this.$store.dispatch("LogList/getChannelList");
      const result = await this.$services.filterQuery({
        value: this.searchQuery,
        channelList: list
      });
      if (result.success) {
        this.searchQuery = { ...result.value, pageIndex: 1 };
      }
    },
    // 重新进件(复制记录,修改通道)
    async recheckItem(item) {
      const channelId = await this.chooseChannel();
      if (!channelId) return;
      const result = await API.recheckPayment({
        checkPaymentId: item.mpsCheckPaymentId,
        channelId
      });
      if (result.success) {
        this.searchQuery = { ...this.searchQuery, pageIndex: 1 };
      }
    },
    // 复制进件(拷贝记录,修改门店)
    async repeatItem(item) {
      const chainStoreId = await this.chooseStore(item.businessId);
      if (!chainStoreId) return;
      console.log(item);
      const result = await API.copyPayment({
        checkPaymentId: item.mpsCheckPaymentId,
        chainStoreId
      });
      console.log("copy result", result);
      if (result.success) {
        this.searchQuery = { ...this.searchQuery, pageIndex: 1 };
      }
    },
    // 删除元素
    // 更新视图的操作由各页面监视listTotalLength自行处理
    async deleteItem(item) {
      try {
        await this.$confirm({
          message: "你确定要删除此项吗?"
        });
        this.onRequest = true;
        const complete = await this.$store.dispatch(
          "LogList/deleteListItem",
          item.mpsCheckPaymentId
        );
        // 删除元素需要重新更新finished
        // 确保不影响后续上拉加载
        if (complete) {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.listTotalLength--;
          this.finished = this.listTotalLength === this.list.length;
        }
        this.onRequest = false;
        this.searchQuery = { ...this.searchQuery, pageIndex: 1 };
        // if (this.userInfo.role === this.$roles.MERCHANT) {
        // } else {
        // this.$store
        // }
      } catch (e) {}
    },
    // endregion

    // region  不影响列表的按钮回调
    // 下载指定时间,通道的数据
    async exportList() {
      console.log("导出数据");
      const list = await this.$store.dispatch("LogList/getChannelList");
      if (!list.length) return;
      const result = await this.$services.pickDateRange({
        list,
        startTime: "",
        endTime: "",
        channelId: "",
        isMobile: this.isMobile
      });
      console.log(result);
      if (!result.success) return;
      const { startTime, endTime, channelId } = result.data;
      downloadFile(
        `/api/mch/exportList?channelId=${channelId}&startTime=${startTime}&endTime=${endTime}`,
        Date.now() + ".xls"
      );
    },
    // 修改费率
    async editFee(item) {
      const result = await this.$services.editFee({
        checkPaymentId: item.mpsCheckPaymentId
      });
    },
    // endregion

    // region 复杂的跳转
    // 点击添加按钮，代理商需要先选择商户
    async addItem() {
      const is_merchant = this.userInfo.role === ROLES.MERCHANT; // 非商家需要先选择商家
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
    // endregion

    // region 简单的跳转
    // 编辑进件
    async editItem(item) {
      console.log(item);
      const is_merchant = this.userInfo.role === ROLES.MERCHANT; // 非商家需要先选择商家
      if (!is_merchant) {
        const complete = await this.$store.dispatch(
          "User/fetchMchInfo",
          item.businessId
        );
        if (!complete) return;
      }
      // 重置进件信息
      this.$store.commit("MchInfo/CLEAR_STATE");
      // 直接进入第二步
      this.$router.push({
        name: "MchInfoAddBase",
        query: { checkPaymentId: item.mpsCheckPaymentId }
      });
    },
    // 前往进件页面
    goToAddMchInfo() {
      // 重置进件信息
      this.$store.commit("MchInfo/CLEAR_STATE");
      this.$router.push({ name: "MchInfoAddMain" });
    },
    // 审核进件
    examineItem(item) {
      this.$router.push({
        name: "MchInfoDetail",
        query: { examine: 1, checkPaymentId: item.mpsCheckPaymentId }
      });
    },
    // 查看详情
    enterDetail(item) {
      if (this.userInfo.role === this.$roles.SERVICE) return;
      this.$router.push({
        name: "MchInfoDetail",
        query: { examine: 0, checkPaymentId: item.mpsCheckPaymentId }
      });
    },
    // 进入支付参数配置页面
    enterPayment({ businessId, chainStoreId }) {
      this.$router.push({
        name: "PaymentCard",
        query: { businessId, chainStoreId }
      });
    },
    // 修改结算卡
    editCart(item) {
      this.$router.push({
        name: "EditCard",
        query: { checkPaymentId: item.mpsCheckPaymentId, examine: 0 }
      });
    },
    // 审核结算卡
    checkCard(item) {
      this.$router.push({
        name: "EditCard",
        query: { checkPaymentId: item.mpsCheckPaymentId, examine: 1 }
      });
    },
    goToWxLz(item) {
      location.href = location.origin + item.wxlzUrl;
    },
    goToAliLh(item) {
      location.href = location.origin + item.zfblhUrl;
    }
    // endregion
  },

  computed: {
    ...mapState("LogList", ["list"]),
    ...mapState("App", ["isMobile"]),
    ...mapState("User", ["userInfo"])
  }
};
