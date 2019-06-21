import { isMobile } from "@/utils";
import { isAliLife, isWechat } from "../../utils/device-type";

// region
function getType(width) {
  const breakPoints = [768, 992, 1200, 1920];
  const types = ["xs", "sm", "md", "lg", "xl"];
  const index = breakPoints.findIndex(it => it > width);
  return types[index === -1 ? 4 : index];
}

// endregion
/*
xs	    <768px
sm	≥768px
md	≥992px
lg	    ≥1200px
xl	    ≥1920px
*/

export default {
  namespaced: true,
  state: {
    isMobile,
    isWechat,
    isAliLife,
    screenWith: 0,
    screenHeight: 0
  },
  mutations: {
    CLEAR_STATE: state => {
    },
    SET_SCREEN_WIDTH: (state, width) => state.screenWith = width,
    SET_SCREEN_HEIGHT: (state, height) => state.screenHeight = height
  },
  actions: {},
  getters: {
    screenType: state => getType(state.screenWith)
  }
};
