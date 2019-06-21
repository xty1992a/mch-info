/**
 * Created by rule on 2019/4/8.
 * 将图片挂载为模块的属性
 * 使用时,引入该模块
 * import img from 'imgs'
 *
 * <img :src="img.xxx">
 */
const img = {};
const req = require.context("./", false, /\.(png|jpe?g|gif|svg)(\?.*)?$/);

req.keys().forEach(it => {
  let key = it.replace(/\.\/(.*)\.(png|jpe?g|gif|svg)(\?.*)?$/, "$1");
  img[key] = req(it);
});

export default img;
