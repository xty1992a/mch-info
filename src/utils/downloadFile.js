import { isWechat } from "./device-type";
import notice from "@/service/WechatNotice";

export default function(path, name) {
  if (isWechat) {
    notice();
    return;
  }
  const a = document.createElement("a");
  a.href = path;
  a.download = name;
  a.click();
}
