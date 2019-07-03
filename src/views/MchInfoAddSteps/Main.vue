<template>
  <div class="mchInfo-add-main mch-info-page">
    <el-form
            :disabled="checkPaymentId !== 0"
            :model="formData"
            :label-position="labelPosition"
            :rules="rules"
            ref="form"
            label-width="130px"
            class="formData"
    >
      <el-form-item label="营业执照类型" prop="businessLicenseType">
        <el-radio-group v-model="formData.businessLicenseType">
          <el-radio
                  :label="item.value"
                  v-for="item in licenseOptions"
                  :key="item.value"
          >{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户类型" prop="payeeType">
        <el-radio-group v-model="formData.payeeType">
          <el-radio
                  v-for="item in payeeOptions"
                  :key="item.value"
                  :disabled="item.disabled"
                  :label="item.value"
          >{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付方式" :error="payTypeError">
        <!--微信 1:扫码，2:立牌和线上，4:刷脸，8:押金。-->
        <LinkCheck v-model="wechatPayType" label="微信" :options="wechatPayTypeOptions"/>
        <!--支付宝 1:扫码，2:立牌和线上。-->
        <LinkCheck v-model="aliPayType" label="支付宝" :options="aliPayTypeOptions"/>
        <!--银联  1:扫码，16:闪付。-->
        <LinkCheck v-model="unionPayType" label="银联" :options="unionPayTypeOptions"/>
        <p class="error" slot="error" style="color:red;">{{payTypeError}}</p>
      </el-form-item>
      <el-form-item label="门店" prop="chainStoreId" v-show="!isMobile">
        <div class="pick-holder" @click="pickStore" style="width: 220px;">
          <el-input :value="storeName" placeholder="请选择门店"/>
        </div>
      </el-form-item>
      <el-form-item prop="chainStoreId" v-show="isMobile">
        <van-cell title="门店" @click="pickStore" style="margin-left: -20px;">
          <span>{{storeName}}</span>
        </van-cell>
      </el-form-item>
      <el-row v-if="publicInfo && publicInfo.version !== 1">
        <el-col :span="24">
          <el-form-item label="公众号主体跟营业执照名称是否一致" prop="samePrincipal">
            <!-- 64:一致，128:不一致-->
            <el-switch v-model="formData.samePrincipal" :active-value="64" :inactive-value="128"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="公众号AppId" prop="appId">
            <p style="font-weight: bold;">{{ publicInfo.appId }}</p>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="公众号主体名称" prop="publicName">
            <p style="font-weight: bold;">{{ publicInfo.principalName }}</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="选择地区" prop="provinceId">
        <FLinkPicker :data="regionPicker" v-model="region" :is-mobile="isMobile"/>
      </el-form-item>
    </el-form>
    <footer class="main-foot">
      <el-button class="foot-item" @click="$router.push({name: 'Home'})">返回</el-button>
      <el-button class="foot-item" @click="saveAndNext">{{ this.checkPaymentId ? "" : "保存并" }}下一步</el-button>
    </footer>
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex";
  import LinkCheck from "@/components/LinkCheck";
  // regionPicker
  import FLinkPicker from "@/components/FormItem/FLinkPicker";
  import Collapse from "@/components/Collapse";
  import * as API from "@/api";

  const value2Array = (value, list) =>
    list.reduce((p, it) => (!!(it & value) ? [...p, it] : p), []);
  const sumList = list => list.reduce((p, i) => p + i, 0);

  export default {
    name: "MchInfoAddMain",
    components: { LinkCheck, Collapse, FLinkPicker },
    data() {
      return {
        checkShow: false,
        formData: {
          businessLicenseType: "",
          payeeType: "",
          wechatPayType: 3,
          aliPayType: 48,
          unionPayType: 0,
          samePrincipal: 0,
          chainStoreId: "",
          provinceId: "",
          cityId: "",
          countyId: ""
        },

        payTypeError: "",

        rules: {
          businessLicenseType: [
            { required: true, message: "请选择营业执照类型", trigger: "change" }
          ],
          payeeType: [
            { required: true, message: "请选择账户类型", trigger: "change" }
          ],
          chainStoreId: [
            { required: true, message: "请选择门店", trigger: "change" }
          ],
          provinceId: [
            { required: true, message: "请选择地区", trigger: "change" }
          ],
          cityId: [
            { required: true, message: "请选择地区", trigger: "change" }
          ],
          countyId: [
            { required: true, message: "请选择地区", trigger: "change" }
          ],
        },

        regionPicker: {
          name: "地址",
          selectLevel: 3,
          filedName: "mainInfo_region",
          request: API.getLeaveOptions("/api/basic/getArea")
        },

        licenseOptions: [
          { label: "无", value: 1 },
          { label: "个体工商户", value: 2 },
          { label: "企业", value: 4 }
        ],
        aliPayTypeOptions: [
          //   16:扫码，32:立牌和线上。
          { label: "扫码", value: 16 },
          { label: "立牌和线上", value: 32 }
        ],
        unionPayTypeOptions: [
          //  1:扫码，16:闪付。
          { label: "扫码", value: 64 },
          { label: "闪付", value: 128 }
        ],

        pickedStore: null
      };
    },
    async created() {
      if (this.$route.query.checkPaymentId) {
        this.$store.commit(
          "MchInfo/SET_CHECK_PAYMENT_ID",
          this.$route.query.checkPaymentId
        );
      }
      // 有checkPaymentId，说明是回退回来的，禁止修改，并恢复缓存数据
      if (this.checkPaymentId) {
        if (!this.mainInfo) {
          await this.$store.dispatch("MchInfo/getMchInfo", this.checkPaymentId);
          // 没有mainInfo,说明是编辑进入,然后从基础信息回退回来,需要将数据从mchInfo同步过来
          this.$store.commit("MchInfo/SYNC_MAIN_INFO", { ...this.formData });
        }
        if (this.businessId && !this.publicInfo) {
          this.$store.dispatch("User/fetchMchInfo", this.businessId);
        }
        this.formData = this.$utils.copy(this.mainInfo);
      }
      // 没有,说明是新建,检查数据
      else {
        if (!this.publicInfo || !this.businessInfo) {
          this.$router.push({ name: "Home" });
        }
      }
    },
    methods: {
      async pickStore() {
        if (this.checkPaymentId) return;
        const result = await this.$services.pickItemAsync({
          value: this.formData.chainStoreId,
          key: "cached__chain_store__list",
          shouldCache: false,
          columns: [
            // 表格展示项
            { label: "名称", prop: "chainStoreName" },
            // { label: "门店标识", prop: "chainStoreId" }
          ],
          props: {
            key: "chainStoreId",
            title: "chainStoreName"
          },
          request: async query => {
            console.log();
            return await API.getStoreList({
              ...query,
              chainStoreName: query.keywords,
              businessId: this.$store.state.User.businessInfo.businessId
            });
          }
        });

        if (!result.success) return;
        console.log(result);
        this.pickedStore = result.data;
        this.formData.chainStoreId = result.value;
      },

      async pickItem(options, prop) {
        const result = await this.$services.pickItem({
          options,
          value: this.formData[prop]
        });
        if (!result.success) return;
        this.formData[prop] = result.value;
      },

      validateForm() {
        console.log("valid");
        return new Promise(resolve => {
          const { aliPayType, wechatPayType, unionPayType } = this.formData;
          this.payTypeError = "";
          if (aliPayType + wechatPayType + unionPayType === 0) {
            this.payTypeError = "请至少选择一种支付方式!";
            return resolve(null);
          }
          console.log("valid1");

          this.$refs.form.validate(valid => {
            console.log(valid);
            const result = valid ? { ...this.formData, businessId: this.businessInfo.businessId } : null;
            resolve(result);
          });
        });
      },

      async saveAndNext() {
        if (this.checkPaymentId !== 0) {
          this.nextPage(this.checkPaymentId);
          return;
        }

        const data = await this.validateForm();
        if (!data) return;
        if (!data.appId && this.publicInfo.version === 8) {
          this.$message("请到云会员后台授权后再试!");
          return;
        }
        // 提交表单，获得对应的表单模板ID
        const checkPaymentId = await this.$store.dispatch(
          "MchInfo/submitAbility",
          data
        );
        this.nextPage(checkPaymentId);
      },

      nextPage(checkPaymentId) {
        if (checkPaymentId !== 0) {
          this.$router.push({
            name: "MchInfoAddBase",
            query: {
              checkPaymentId
            }
          });
        }
      }
    },
    computed: {
      ...mapGetters("App", ["screenType"]),
      ...mapState("User", ["publicInfo", "businessInfo"]),
      ...mapState("MchInfo", ["checkPaymentId", "mainInfo", "mchInfo"]),
      storeName() {
        if (this.pickedStore) return this.pickedStore.chainStoreName;
        if (this.mchInfo) return this.mchInfo.chainStoreName;
        return "请选择门店";
      },
      businessId() {
        if (!this.mchInfo) return "";
        return this.mchInfo.businessId;
      },
      labelPosition() {
        return this.isMobile ? "top" : "right";
      },
      isMobile() {
        return this.screenType === "xs";
      },

      //   1:扫码，2:立牌和线上，4:刷脸，8:押金。
      wechatPayTypeOptions() {
        const { businessLicenseType: type, payeeType: pay } = this.formData;
        return [
          { label: "扫码", value: 1 },
          { label: "立牌和线上", value: 2 },
          { label: "刷脸", value: 4, disabled: +type === 1 || +pay === 32 },
          { label: "押金", value: 8, disabled: +type === 1 || +pay === 32 }
        ];
      },
      // --8:对私，16:对公，32:非法人。无营业执照时只能选8；营业执照为个体时只能选8，32
      payeeOptions() {
        const type = +this.formData.businessLicenseType;
        return [
          { label: "对私账户", value: 8 },
          { label: "对公", value: 16, disabled: type === 1 || type === 2 }, // 只有企业可用
          { label: "非法人", value: 32, disabled: type === 1 } // 有营业执照即可用
        ];
      },
      region: {
        set(v) {
          const [provinceId, cityId, countyId] = v.split(",");
          this.formData = { ...this.formData, provinceId, cityId, countyId };
        },
        get() {
          const { provinceId, cityId, countyId } = this.formData;
          if (!provinceId || !cityId || !countyId) return "";
          return provinceId + "," + cityId + "," + countyId;
        }
      },
      wechatPayType: {
        get() {
          return value2Array(
            +this.formData.wechatPayType,
            this.wechatPayTypeOptions.map(it => it.value)
          );
        },
        set(v) {
          this.formData.wechatPayType = sumList(v);
        }
      },
      aliPayType: {
        get() {
          return value2Array(
            +this.formData.aliPayType,
            this.aliPayTypeOptions.map(it => it.value)
          );
        },
        set(v) {
          this.formData.aliPayType = sumList(v);
        }
      },
      unionPayType: {
        get() {
          return value2Array(
            +this.formData.unionPayType,
            this.unionPayTypeOptions.map(it => it.value)
          );
        },
        set(v) {
          this.formData.unionPayType = sumList(v);
        }
      }
    },
    watch: {
      "formData.businessLicenseType"(now) {
        console.log("businessLicenseType", now);
        if (this.mchInfo) return;
        if (+now === 1) {
          this.formData.payeeType = 8;
        }
        if (+now === 2 && this.formData.payeeType === 16) {
          this.formData.payeeType = 8;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./common";

  .mchInfo-add-main {
    h3 {
      padding: 10px;
      background-color: #fff;
    }
  }
</style>
