<script>
import { Cell } from "vant";

export default {
  name: "Cell",
  functional: true,
  render(h, context) {
    return context.props.isMobile ? (
      <Cell {...context} class="van-hairline--bottom" />
    ) : (
      <div class="ui-cell">
        <div class="title">
          <span title={context.props.title}>{context.props.title}</span>
        </div>
        <div class="value">
          <span>{context.props.value}</span>
        </div>
      </div>
    );
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../styles/variable";

.ui-cell {
  padding: 10px;
  display: flex;
  align-items: center;

  .title,
  .value {
    display: inline-block;
    vertical-align: middle;
  }

  .title {
    line-height: 1.3;
    color: #999;
    width: 30%;
    min-width: 100px;
    text-align: right;
    margin-right: 10px;
    padding-right: 10px;
    position: relative;

    &:after {
      content: ":";
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
