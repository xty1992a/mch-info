<script>
  import { Cell } from "vant";

  export default {
    name: "Cell",
    functional: true,
    render(h, context) {
      return context.props.isMobile ? (
        <Cell {...context} class="van-hairline--bottom"/>
      ) : (
        <div class="cell">
          <div class="title">
            <slot><span title={context.props.title}>{context.props.title}</span></slot>
          </div>
          <div class="value">
            <slot><span>{context.props.value}</span></slot>
          </div>
        </div>
      );
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../styles/variable";

  .cell {
    padding: 10px;
    display: flex;
    align-items: center;

    .title, .value {
      display: inline-block;
      vertical-align: middle;
    }

    .title {
      .two-line;
      color: #999;
      justify-content: flex-end;
      width: 30%;
      min-width: 100px;
      text-align: right;
      margin-right: 10px;
      padding-right: 10px;
      position: relative;

      &:after {
        content: ':';
        position: absolute;
        right: 0;
        top: 0;
      }
    }

  }
</style>
