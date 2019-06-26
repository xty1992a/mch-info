import Vue from "vue";
import { isMobile } from "../utils";
import { Toast, Cell } from "vant";

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
Vue.prototype.$message = isMobile ? Toast : Message;

list.forEach(com => Vue.use(com));
