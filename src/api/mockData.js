import { Loading } from "element-ui";

export const formItems = [
  {
    name: "姓名",
    filedName: "name",
    enumJson: [],
    validator: v => true,
    filedType: "text", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "婚否",
    filedName: "isMarry",
    enumJson: [{ label: "是", value: "true" }, { label: "否", value: "false" }],
    validator: v => true,
    filedType: "switch", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "",
    selectLevel: 1,
    limitRole: ""
  },
  {
    name: "性别",
    filedName: "gender",
    enumJson: [{ label: "男", value: "m" }, { label: "女", value: "f" }],
    validator: v => true,
    filedType: "radio", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "爱好",
    filedName: "hobby",
    enumJson: [
      { label: "唱", value: "1" },
      { label: "跳", value: "2" },
      { label: "rap", value: "3" },
      { label: "打篮球", value: "4" }
    ],
    validator: v => true,
    filedType: "checkbox", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "爱好2",
    filedName: "hobby2",
    enumJson: [
      { label: "唱", value: "1" },
      { label: "跳", value: "2" },
      { label: "rap", value: "3" },
      { label: "打篮球", value: "4" }
    ],
    validator: v => true,
    filedType: "picker", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "生日",
    filedName: "birth",
    enumJson: [],
    validator: v => true,
    filedType: "date", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "地址",
    filedName: "address",
    enumJson: [],
    validator: v => true,
    filedType: "link-picker", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "/api/getRegion",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "实习时间",
    filedName: "time",
    enumJson: [],
    validator: v => true,
    filedType: "date-range", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "照片",
    filedName: "pic",
    enumJson: [],
    validator: v => true,
    filedType: "image", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: 3,
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "文件",
    filedName: "file",
    enumJson: [],
    validator: v => true,
    filedType: "file", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "协议模板",
    attachmentUrl: "",
    extInfo: "",
    description: "请先下载附件并填写后,再拍照上传!",
    dateFormat: 3,
    selectLevel: 3,
    limitRole: ""
  },
  {
    name: "补充说明(选填)",
    filedName: "desc",
    enumJson: [],
    validator: v => true,
    filedType: "textarea", // 'text' || 'textarea' || 'radio' || 'checkbox' || 'picker' || 'date' || 'link-picker' || 'date-range' || 'image' || 'file',
    sourceUrl: "",
    attachment: "",
    attachmentUrl: "",
    extInfo: "",
    description: "",
    dateFormat: "YYYY-MM-DD",
    selectLevel: 3,
    limitRole: ""
  }
];
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const businessInfo = {
  businessId: "asdfasdfasdf"
};
export const publicInfo = {
  appid: "asdfasdfasdf",
  principalName: "xx同城惠",
  version: 8
};

export default async function(data) {
  const l = Loading.service();
  await sleep(500);
  l.close();
  return {
    success: true,
    data
  };
}
