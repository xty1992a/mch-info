<template>
  <div class="panel">
    <div class="label" :style="{ width: labelWidth, textAlign: labelAlign }">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="value">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  components: {},
  props: {
    label: String,
    value: String,

    labelWidth: {
      type: String,
      default: "200px"
    },
    labelAlign: {
      type: String,
      default: "right"
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.panel {
  display: flex;
  padding: 15px;
  line-height: 24px;

  .label {
  }
}
</style>
