<template>
  <div class="mchInfo-add-main mch-info-page">
    <el-form :disabled="checkPaymentId!==0" :model="formData" :label-position="labelPosition" :rules="rules" ref="formData" label-width="130px" class="formData">
      <el-form-item label="营业执照类型" prop="businessLicenseType">
        <el-radio-group v-model="formData.businessLicenseType">
          <!--1:无，2:个体，4:企业-->
          <el-radio :label="1">无</el-radio>
          <el-radio :label="2">个体工商户</el-radio>
          <el-radio :label="4">企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户类型" prop="payeeType">
        <el-radio-group v-model="formData.payeeType">
          <!--8:对私，16:对公，32:非法人。无营业执照时只能选8；营业执照为个体时只能选8，32-->
          <el-radio :label="8">对私账户</el-radio>
          <el-radio :label="16" :disabled="formData.businessLicenseType===1">对公账户</el-radio>
          <el-radio :label="32" :disabled="formData.businessLicenseType===1">非法人</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--   <el-form-item label="活动时间" required>
           <el-col :span="11">
             <el-form-item prop="date1">
               <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
             </el-form-item>
           </el-col>
           <el-col class="line" :span="2">-</el-col>
           <el-col :span="11">
             <el-form-item prop="date2">
               <el-time-picker placeholder="选择时间" v-model="formData.date2" style="width: 100%;"></el-time-picker>
             </el-form-item>
           </el-col>
         </el-form-item>-->
      <el-form-item label="支付方式" :error="payTypeError">
        <!--微信 1:扫码，2:立牌和线上，4:刷脸，8:押金。-->
        <LinkCheck v-model="wechatPayType" label="微信" :options="wechatPayTypeOptions"/>
        <!--支付宝 1:扫码，2:立牌和线上。-->
        <LinkCheck v-model="aliPayType" label="支付宝" :options="aliPayTypeOptions"/>
        <!--银联  1:扫码，16:闪付。-->
        <LinkCheck v-model="unionPayType" label="银联" :options="unionPayTypeOptions"/>
      </el-form-item>
      <el-form-item label="门店" prop="chainStoreId">
        <el-select v-model="formData.chainStoreId">
          <el-option value="0" label="东华店"/>
          <el-option value="1" label="福田店"/>
        </el-select>
      </el-form-item>
      <el-row v-if="publicInfo && publicInfo.version===1">

        <el-col :span="24">
          <el-form-item label="公众号主体跟营业执照名称是否一致" prop="samePrincipal">
            <!-- 64:一致，128:不一致-->
            <el-switch v-model="formData.samePrincipal" :active-value="64" :inactive-value="128"/>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :span="12">
          <el-form-item label="公众号AppId" prop="appId">
            <p style="font-weight: bold;">{{publicInfo.appid}}</p>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="公众号主体名称" prop="publicName">
            <p style="font-weight: bold;">{{publicInfo.principalName}}</p>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <footer class="main-foot">

      <el-button class="foot-item">暂存</el-button>

      <el-button class="foot-item" @click="saveAndNext">{{this.checkPaymentId?"":"保存并"}}下一步</el-button>
    </footer>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import LinkCheck from "../../components/LinkCheck";

  const copy = o => JSON.parse(JSON.stringify(o));

  export default {
    name: "MchInfoAddMain",
    components: { LinkCheck },
    data() {
      return {
        formData: {
          businessLicenseType: 1,
          payeeType: 8,
          wechatPayType: 1,
          aliPayType: 1,
          unionPayType: 16,
          samePrincipal: "",
          chainStoreId: "0"
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
          ]
        },

        wechatPayType: [],
        aliPayType: [],
        unionPayType: [],

        wechatPayTypeOptions: [
          //  1:扫码，2:立牌和线上，4:刷脸，8:押金。
          { label: "扫码", value: 1 },
          { label: "立牌和线上", value: 2 },
          { label: "刷脸", value: 4 },
          { label: "押金", value: 8 }
        ],
        aliPayTypeOptions: [
          //   1:扫码，2:立牌和线上。
          { label: "扫码", value: 1 },
          { label: "立牌和线上", value: 2 }
        ],
        unionPayTypeOptions: [
          //  1:扫码，16:闪付。
          { label: "扫码", value: 1 },
          { label: "闪付", value: 16 }
        ]
      };
    },
    created() {
      this.$store.commit("User/SET_PUBLIC_INFO", {
        appid: "asdfasdfasdf",
        principalName: "xx同城惠",
        version: 8
      });
      this.$store.commit("User/SET_BUSINESS_INFO", {
        businessId: "asdfasdfasdf"
      });

      if (this.checkPaymentId) {
        console.log("callback ", this.mainInfo);
        this.formData = copy(this.mainInfo);
      }
    },
    methods: {
      submitForm() {
        return new Promise(resolve => {
          const { aliPayType, wechatPayType, unionPayType } = this.formData;
          this.payTypeError = "";
          if (aliPayType + wechatPayType + unionPayType === 0) {
            this.payTypeError = "请至少选择一种支付方式!";
            return resolve(null);
          }

          this.$refs.formData.validate((valid) => {
            resolve(valid ? { ...this.formData, businessId: this.businessInfo.businessId, ...this.publicInfo } : null);
          });

        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      async saveAndNext() {

        if (this.checkPaymentId !== 0) {
          this.nextPage(this.checkPaymentId);
          return;
        }

        const data = await this.submitForm();
        console.log(data);
        if (!data) return;
        if (!data.appid && this.publicInfo.version === 8) {
          this.$message("请到云会员后台授权后再试!");
          return;
        }
        const checkPaymentId = await this.$store.dispatch("MchInfo/submitAbility", data);
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
      ...mapGetters("App", [
        "screenType"
      ]),
      ...mapState("User", [
        "publicInfo",
        "businessInfo"
      ]),
      ...mapState("MchInfo", [
        "checkPaymentId",
        "mainInfo"
      ]),
      labelPosition() {
        return this.screenType === "xs" ? "top" : "right";
      }
    },
    watch: {
      wechatPayType(now) {
        this.formData.wechatPayType = now.reduce((p, i) => p + i, 0);
      },
      aliPayType(now) {
        this.formData.aliPayType = now.reduce((p, i) => p + i, 0);
      },
      unionPayType(now) {
        this.formData.unionPayType = now.reduce((p, i) => p + i, 0);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .mchInfo-add-main {
    h3 {
      padding: 10px;
      background-color: #fff;
    }

  }
</style>
