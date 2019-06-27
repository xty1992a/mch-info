<template>
  <van-popup class="link-picker" v-model="show" :position="position" @closed="close">
    <div class="link-picker-body" :class="isMobile?'mobile':'desktop'" v-loading="onInit">
      <h3>{{title}}</h3>
      <p class="picked-item">
        <span v-if="!pickedItems.length">请选择</span>
        <span class="menu"
              :class="index===currentLevel?'picked':''"
              v-for="(item,index) in pickedItems"
              :key="item.value"
              @click="setLevelOptions(item)">{{item.label}}</span>
      </p>
      <div class="search">
        <el-input v-model="keywords" placeholder="请输入关键字搜索"></el-input>
      </div>
      <div class="picker">
        <div class="loading" v-if="loading" style="padding: 0 10px;line-height: 40px;">加载中...</div>
        <ul class="list" v-else>
          <li class="item"
              :class="isPicked(item)?'picked':''"
              v-show="matchList.includes(item.label)"
              v-for="item in currentOptions"
              :key="item.value"
              @click="pickItem(item)"
          >{{item.label}}
          </li>
        </ul>
      </div>
    </div>
  </van-popup>
</template>

<script>
  import { Popup, Picker } from "vant";

  export default {
    name: "LinkPicker",
    components: { VanPopup: Popup, VanPicker: Picker },
    data() {
      return {
        loading: false,
        onInit: false,
        show: false,
        keywords: "",
        pickedItems: [],
        currentKey: "",
        currentLevel: 0,
        optionMap: {}
      };
    },
    async mounted() {
      const isCached = this.restore();
      if (isCached) return;
      this.initPickState();

      // this.setNextOptions({ level: 0, value: "" });
      // const result = await this.request({ level: 0, value: "" });
      // if (!result.success) return;
      // this.$set(this.optionMap, "topLevel", result.data);
      // this.currentKey = "topLevel";
      // this.$storage.setItem(key, this.optionMap);
    },
    methods: {
      restore() {
        const key = this.key + "optionMap";
        const cacheData = this.$storage.getItem(key);
        if (cacheData && this.value) {
          this.optionMap = cacheData;
          this.initPickedItems();
          return true;
        }
      },
      // 没有值的情况下,获取第一级数据,有值的情况下,依次获取
      async initPickState() {
        this.onInit = true;
        const values = this.value ? this.value.split(",").filter(Boolean).slice(0, -1).map((value, index) => ({
          level: index + 1,
          value
        })) : [];
        const levels = [{ level: 0, value: "" }, ...values];
        while (levels.length) {
          await this.setNextOptions(levels.shift());
        }
        this.value && this.initPickedItems();
        this.onInit = false;
      },

      onCancel() {
        this.resolve({ success: false, value: this.value });
        this.show = false;
      },
      onConfirm() {
        this.resolve({ success: true, value: this.pickedItems.map(it => it.value).join(","), data: this.pickedItems });
        this.show = false;
      },

      initPickedItems() {
        const values = this.value.split(","); // gd,sz,ft
        const keys = ["topLevel", ...values.slice(0, values.length - 1)]; // 叶子没有option--> topLevel,gd,sz
        if (keys.some(k => !this.optionMap[k])) {
          this.currentKey = keys[0];
          return;
        }
        this.pickedItems = values.map((val, index) => {
          return this.optionMap[keys[index]].find(it => it.value === val);
        });
        this.currentLevel = keys.length - 1;
        this.currentKey = keys.slice(-1)[0];
      },
      // 查看平级选项
      setLevelOptions(item) {
        this.currentLevel = item.level - 1;
        if (item.level === 1) {
          this.currentKey = "topLevel";
          return;
        }
        let index = item.level - 2;
        this.currentKey = this.pickedItems[index].value;
      },
      // 查看下级选项
      async setNextOptions(item) {
        if (this.optionMap[item.value]) {
          this.currentKey = item.value || "topLevel";
          this.currentLevel = item.level ? item.level - 1 : 0;
          return;
        }
        const result = await this.request({ level: item.level, value: item.value });
        if (!result.success) return;

        console.log("result is ", result);

        this.$set(this.optionMap, item.value || "topLevel", result.data);
        this.currentKey = item.value || "topLevel";
        this.currentLevel = item.level ? item.level - 1 : 0;
        const key = this.key + "optionMap";
        this.$storage.setItem(key, this.optionMap);
      },

      async request(query) {
        this.loading = true;
        const result = await this.data.request(query);
        if (result.success) {
          result.data = result.data.map(it => ({
            ...it,
            value: it[this.props.value],
            label: it[this.props.label],
            level: query.level + 1
          }));
        }
        this.loading = false;
        return result;
      },

      pickItem(item) {
        this.keywords = "";
        if (!this.pickedItems[item.level - 1]) {
          this.pickedItems.push(item);
        }
        else {
          const prev = this.pickedItems.splice(0, item.level - 1);
          this.pickedItems = [...prev, item];
        }
        if (item.level === this.maxLevel) {
          this.onConfirm();
          return;
        }
        this.setNextOptions(item);
      },
      close() {
        const key = this.key + "optionMap";
        this.$storage.setItem(key, this.optionMap);
        this.$destroy(true);
      },

      isPicked(item) {
        const values = this.pickedItems.map(it => it.value);
        return values.includes(item.value);
      }
    },
    computed: {
      currentOptions() {
        return this.optionMap[this.currentKey] || [];
      },
      maxLevel() {
        return this.data.selectLevel;
      },
      position() {
        return this.isMobile ? "bottom" : "center";
      },
      matchList() {
        const labels = this.currentOptions.map(it => it.label);
        return this.keywords ? labels.filter(it => it.includes(this.keywords)) : labels;
      }
    },
    beforeDestroy() {
      this.$el && this.$el.remove();
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .link-picker {
    font-size: 15px;

    .link-picker-body {
      background-color: #fff;
      overflow: hidden;
      border-radius: 8px;

      h3 {
        padding: 15px;
        text-align: center;
        background-color: #f7f7f7;
      }

      &.mobile {
      }

      &.desktop {
        width: 500px;
        height: 400px;
      }
    }

    .search {
      padding: 10px;
      background-color: #f7f7f7;
    }

    .picked-item {
      height: 44px;
      line-height: 44px;
      padding: 0 10px;
      white-space: nowrap;
      overflow: auto;
      .border;

      .menu {
        cursor: pointer;

        &.picked {
          color: @activeC;
        }

        &:not(:last-child) {
          &:after {
            content: '/';
            padding: 0 5px;
          }
        }
      }
    }

    .picker {
      height: 300px;
      overflow: auto;

      .list {
        .item {
          line-height: 40px;
          padding: 0 10px;
          .border;

          &.picked {
            color: @activeC;
          }
        }
      }
    }
  }

</style>
