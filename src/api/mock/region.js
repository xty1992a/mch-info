const stateChina = [
  {
    label: "广东",
    value: "gd",
    level: 1,
    children: [
      {
        label: "深圳",
        value: "sz",
        level: 2,
        children: [
          { label: "龙华", value: "lh", level: 3 },
          { label: "福田", value: "ft1", level: 3 },
          { label: "福田", value: "ft2", level: 3 },
          { label: "福田", value: "ft3", level: 3 },
          { label: "福田", value: "ft4", level: 3 },
          { label: "福田", value: "ft5", level: 3 },
          { label: "福田", value: "ft6", level: 3 },
          { label: "福田", value: "ft7", level: 3 },
          { label: "福田", value: "ft8", level: 3 },
          { label: "福田", value: "ft9", level: 3 },
          { label: "福田", value: "ft0", level: 3 },
          { label: "福田", value: "ft11", level: 3 },
          { label: "福田", value: "ft12", level: 3 }
        ]
      },
      {
        label: "广州",
        value: "gz",
        level: 2,
        children: [
          { label: "花都", value: "hd", level: 3 },
          { label: "越秀", value: "yx", level: 3 }
        ]
      }
    ]
  },
  {
    label: "福建",
    value: "fj",
    level: 1,
    children: [
      {
        label: "福州",
        value: "fz",
        level: 2,
        children: [
          {
            label: "仓山",
            value: "cs",
            level: 3
          },
          {
            label: "晋安",
            value: "ja",
            level: 3
          }
        ]
      },
      {
        label: "厦门",
        value: "xm",
        level: 2,
        children: [
          {
            label: "海沧",
            value: "hc",
            level: 3
          },
          {
            label: "同安",
            value: "ta",
            level: 3
          }
        ]
      }
    ]
  }
];
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
const fmtItem = (list) => list.map(it => ({ label: it.label, value: it.value, level: it.level }));

function findCityByName(value) {
  let city = null;
  stateChina.forEach(pro => {
    if (city) return;
    city = pro.children.find(it => it.value === value);
  });
  return city;
}

export const getRegionOption = async (level, value) => {
  await sleep(400);
  console.log(level, value);
  switch (level) {
    case 1:
      return fmtItem(stateChina.find(it => it.value === value).children);
    case 2:
      const city = findCityByName(value);
      console.log(city, value);
      return fmtItem(city.children);
    case 3:
      return fmtItem(city.children);
    default:
      return fmtItem(stateChina);
  }
};

