import FloatBtn from "./index";
import TweenManager, { Tween } from "../../utils/tween-manager";

export async function backTop(duration = 300) {
  const doc = document.body.scrollTop
    ? document.body
    : document.documentElement;
  const start = doc.scrollTop;
  const manager = new TweenManager({
    duration,
    start,
    end: 0,
    easing: Tween.Linear
  });
  while (manager.next()) {
    await TweenManager.frame();
    doc.scrollTop = manager.currentValue;
  }
}

export default {
  name: "BackTop",
  components: { FloatBtn },
  functional: true,
  render(h, data) {
    return h(
      "FloatBtn",
      {
        ...data,
        on: {
          click: () => {
            backTop(300);
          }
        }
      },
      data.children
    );
  }
};
