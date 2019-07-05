import Vue from "vue";
import { isMobile } from "../utils";
import { Toast, Cell, Dialog as VanDialog } from "vant";

import {
  Message,
  Button,
  Select,
  Option,
  Input,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Cascader,
  Switch,
  DatePicker,
  Carousel,
  Row,
  Col,
  Dialog,
  Form,
  Footer,
  FormItem,
  Popover,
  Container,
  Header,
  Main,
  Loading,
  Dropdown, DropdownItem, DropdownMenu
} from "element-ui";

const list = [
  Cell,
  Dropdown, DropdownItem, DropdownMenu,
  Loading,
  Container,
  Header,
  Main,
  Popover,
  Cascader,
  Button,
  Select,
  Option,
  Input,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  DatePicker,
  Carousel,
  Row,
  Col,
  Dialog,
  Form,
  Footer,
  FormItem
];
Vue.prototype.$message = (opt) => {
  if (typeof opt === "string") {
    opt = {
      type: isMobile ? "text" : "info",
      message: opt
    };
  }
  if (isMobile) {
    if (opt.type === "error" || opt.type === "warning") {
      opt.type = "fail";
    }
  }
  else {
    if (opt.type === "fail") {
      opt.type = "error";
    }
  }
  isMobile ? Toast(opt) : Message(opt);
};

Vue.prototype.$confirm = VanDialog;

list.forEach(com => Vue.use(com));
