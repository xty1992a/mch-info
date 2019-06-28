const orderInfo = {
  orderGoodsItems: [{
    "goodsItemOnlineGuid": "3f6dc5b0-1d49-11e9-9b0d-20040fed9860", "goodsItemGuid": "ebbecd25-d29d-11e8-9f73-0010185de866", "skuGuid": "26986c2b-18aa-11e9-a8a2-0010185de866", "buyCount": 1, "price": 1.96, "unit": "个",
    "imagePath": "https://files.1card1.cn/g1/M02/1D/99/CgoMA1zHpMmAFz1aAAdE_GAQfOI379.png", "name": "苹果", "tradePoint": 0, "specs": null
  }]
};
const calcObj = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

const value = orderInfo.orderGoodsItems.reduce((p, it) => calcObj.add(p, calcObj.multiply(it.price, it.buyCount)), 0);

console.log(value);
