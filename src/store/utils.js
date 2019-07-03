import VALIDATORS from "@/utils/validators";

// 返回一个校验函数,函数接受字符,不通过返回错误提示,通过返回空字符串.
function getValidator(field) {
  //  0:无校验规则，1:正则校验，2:其它校验
  const message = field.checkMsg || field.name + "填写有误!";
  switch (field.checkType) {
    case 0:
      return () => "";
    case 1:
      try {
        const validate = new RegExp(field.checkExpression);
        return v => (validate.test(v) ? "" : message);
      } catch (e) {
        return () => "";
      }
    case 2:
      const valid = VALIDATORS[field.checkExpression] || VALIDATORS["default"];
      return v => valid(v) ? "" : message;
  }
}

const typeMap = [
  // 1:单行文本，2:多行文本，3:单选，4:多选，5:开关，6:级连选择，7:时间选择，8:时间区间选择，9:图片上传，10:文件上传，11:标签, 12,下拉
  "span",
  "text",
  "textarea",
  "radio",
  "checkbox",
  "switch",
  "link-picker",
  "date",
  "date-range",
  "image",
  "file",
  "display",
  "picker"
];
export const formatFields = fields =>
  fields.map(item => {
    const enumJson = Array.isArray(item.enumJson) ? item.enumJson : JSON.parse(item.enumJson);
    return {
      ...item,
      options: enumJson.map(it => ({ label: it.text, value: it.value })),
      validator: getValidator(item),
      dateFormat: item.dateFormatStr,
      filedType: typeMap[item.filedType],
    };
  });
