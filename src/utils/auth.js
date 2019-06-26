import Cookie from "js-cookie";

export function isLogin() {
  return Cookie.get("custom_session_id") !== undefined;
}

export function logOut() {
  Cookie.remove("custom_session_id");
}
