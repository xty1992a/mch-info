<template>
  <van-popup class="m-paging-picker" v-model="show" position="right" @closed="close" style="height: 100%;width: 100%;">
    <div style="height: 300px;background-color: #fff;">
      <van-navbar :title="title" left-text="返回" right-text="确定" @click-left="onCancel" @click-right="onConfirm">
      </van-navbar>
      <header>
        <el-input prefix-icon="el-icon-date" slot="title" size="small" :placeholder="placeholder" v-model="query.keywords"></el-input>
        <el-button type="primary" size="mini" @click="search">搜索</el-button>
      </header>
      <section>
        <van-list :loading="loading" :finished="finished"
                  finished-text="没有更多了"
                  @load="loadData">
          <div v-for="item in list" :key="item.key" class="list-wrap">
            <p class="item" @click="pickItem(item)">
              <span>{{item.title}}</span>
              <i class="el-icon-success" :class="item.key===value?'active':''"></i>
            </p>
          </div>
        </van-list>
      </section>
    </div>
  </van-popup>
</template>

<script>
  import Common from "./Common";
  import { Popup, NavBar, List } from "vant";

  export default {
    name: "MPagingPicker",
    mixins: [Common],
    components: { VanPopup: Popup, VanNavbar: NavBar, VanList: List },
    data() {
      return {
        show: false,
        finished: false,
        loading: false
      };
    },
    created() {
    },
    methods: {
      async loadData() {
        console.log("load...");
        this.loading = true;
        const result = await this.request(this.query);
        if (result.success) {
          console.log(result.data);
          this.query.pageIndex++;
          this.list = [...this.list, ...result.data];
        }
        this.loading = false;
        this.finished = this.query.pageIndex >= 4;
      },

      search() {
        this.list = [];
        this.query.pageIndex = 1;
        this.finished = false;
        this.loadData();
      }
    },
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .m-paging-picker {
    font-size: 15px;

    .van-nav-bar {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    header {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 10px;

      .el-input {
        text-align: center;
        margin-right: 10px;

        input {
          border: 0;
          background-color: #f9f9f9;
        }
      }
    }

    section {
      position: absolute;
      bottom: 0;
      right: 0;
      top: 97px;
      left: 0;
      overflow: auto;

      .van-list {
        .list-wrap {
          padding: 0 10px;

          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;

            .active {
              color: @activeC;
            }
          }
        }
      }
    }

  }

</style>
