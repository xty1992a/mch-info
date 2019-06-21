<template>
  <van-popup class="link-picker" v-model="show" position="bottom" @closed="close">
    <p class="picked-item">
      <span v-if="!pickedItems.length">请选择</span>
      <span class="menu"
            :class="index===currentLevel?'picked':''"
            v-for="(item,index) in pickedItems"
            :key="item.value"
            @click="setLevelOptions(item)">{{item.label}}</span>
    </p>
    <!--</van-picker>-->
    <div class="picker">
      <div class="loading" v-if="loading" style="padding: 0 10px;line-height: 40px;">加载中...</div>
      <ul class="list" v-else>
        <li class="item"
            :class="isPicked(item)?'picked':''"
            v-for="item in currentOptions"
            :key="item.value"
            @click="pickItem(item)"
        >{{item.label}}
        </li>
      </ul>
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
        show: false,
        pickedItems: [],
        currentKey: "",
        currentLevel: 0,
        optionMap: {}
      };
    },
    created() {
    },
    async mounted() {
      const key = this.key + "optionMap";
      const cacheData = this.$storage.getItem(key);
      if (cacheData && this.value) {
        this.optionMap = cacheData;
        this.initPickedItems();
        return;
      }
      const result = await this.request({ level: 0, value: "" });
      console.log("result ", result);
      this.$set(this.optionMap, "topLevel", result);
      this.currentKey = "topLevel";
      this.$storage.setItem(key, this.optionMap);
    },
    methods: {
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
          this.currentKey = item.value;
          this.currentLevel = item.level - 1;
          return;
        }
        const result = await this.request({ level: item.level, value: item.value });
        this.$set(this.optionMap, item.value, result);
        this.currentKey = item.value;
        this.currentLevel = item.level - 1;
        const key = this.key + "optionMap";
        this.$storage.setItem(key, this.optionMap);
      },

      async request(query) {
        this.loading = true;
        const result = await this.data.request(query);
        this.loading = false;
        return result;
      },

      pickItem(item) {
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

    .van-picker__toolbar {
      height: 88px;
      position: relative;

      .picked-item {
        position: absolute;
        left: 0;
        top: 44px;
        right: 0;
      }
    }

    .picked-item {
      height: 44px;
      line-height: 44px;
      padding: 0 10px;
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
