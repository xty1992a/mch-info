<template>
  <div class="login">
    <div @keypress.enter="enterPress" class="container">
      <div class="content">
        <el-row class="account-type" style="margin: auto;">
          <el-col
            :span="12"
            class="type-item"
            :class="params.accountType === 2 ? 'active' : ''"
            @click.native="params.accountType = 2"
          >
            <span>商户</span>
          </el-col>
          <el-col
            :span="12"
            class="type-item"
            :class="params.accountType === 1 ? 'active' : ''"
            @click.native="params.accountType = 1"
          >
            <span>代理商</span>
          </el-col>
        </el-row>
        <el-form>
          <div class="form-item">
            <label for="username"><i class="el-icon-user"></i>账户</label>
            <input id="username" v-model="params.username" />
          </div>
          <div class="form-item" style="margin-bottom: 40px;">
            <label for="password"><i class="el-icon-lock"></i>密码</label>
            <input id="password" type="password" v-model="params.password" />
          </div>
          <div>
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      params: {
        username: "",
        password: "",
        accountType: 2
      }
    };
  },
  methods: {
    enterPress() {
      this.login();
    },
    async login() {
      if (Object.keys(this.params).some(key => !this.params[key])) {
        this.$message({
          type: "error",
          message: "请填写完整!"
        });
        return;
      }
      let res = await this.$store.dispatch("User/LoginByUsername", this.params);
      if (res.success) {
        let redirect_url = this.$route.query["redirect_url"] || "/";
        this.$router.push(redirect_url);
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.App.isMobile;
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../styles/variable";

.login {
  height: 100vh;

  .content {
    background-color: #fff;
    box-shadow: 4px 0 16px rgba(144, 147, 153, 0.1);
    border-radius: 5px;
    padding: 50px;
    margin: 0 auto;

    .account-type {
      text-align: center;

      .type-item {
        font-size: 18px;
        margin-bottom: 30px;
        cursor: pointer;

        span {
          display: inline-block;
          line-height: 44px;
          width: 60px;
          border-bottom: 3px solid transparent;
        }

        &.active {
          span {
            color: @activeC;
            border-bottom-color: @activeC;
          }
        }
      }
    }

    .form-item {
      display: flex;
      height: 50px;
      width: 280px;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      margin: 0 auto 20px;

      &:active {
        border-bottom-color: @activeC;
      }

      label {
        width: 70px;
        font-size: 16px;

        i {
          padding: 0 5px;
        }
      }

      input {
        border: 0;
        background-color: #fff;
      }
    }

    .el-button {
      width: 100%;
    }
  }
}

.mobile-app {
  .container {
    height: 100%;
  }

  .content {
    height: 100%;
    padding-top: 0;
  }
}

.desktop-app {
  .login {
    display: flex;
    align-items: center;

    .container {
      width: 100%;
    }

    .content {
      width: 460px;
    }
  }
}
</style>
