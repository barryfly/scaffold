/**
 * Cookie操作
 * getCookie(name) 获取cookie
 * setCookie(name, value, 有效期, 域, 路径) 设置cookie
 * delCookie(name, 域) 删除cookie
 * 
 * Session操作
 * getSession(name, isJson) 获取session
 * setSession(name, value) 设置session
 * delSession(name) 删除session
 * 
 * Local操作
 * getLocal(name, isJson) 获取local
 * setLocal(name, value) 设置local
 * delLocal(name) 删除local
 *
 * Login操作
 * jumpToLogin()
 *
 * Language操作
 * getLanguage(key)
 * 
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

const getCookie = function(name) {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

const setCookie = function(name, value, exdays = 1, domain = "", path = "/") {
  let expires = new Date();
  expires.setTime(expires.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toGMTString()};domain=${domain};path=${path}`;
};

const delCookie = function(name, domain = "") {
  const cname = getCookie(name);
  if (!!cname) {
    setCookie(name, "", -1, domain);
  }
};

const getSession = function(name) {
  let session = window.sessionStorage.getItem(name)
  try {
    session = JSON.parse(session)
  } catch (error) {
    return session
  }
  return session
}

const setSession = function(name, value) {
  value = typeof value === 'string' ? value : JSON.stringify(value)
  window.sessionStorage.setItem(name, value)
}

const delSession = function(name) {
  window.sessionStorage.removeItem(name)
}

const getLocal = function(name) {
  let local = window.localStorage.getItem(name)
  try {
    local = JSON.parse(local)
  } catch (error) {
    return local
  }
  return local
}

const setLocal = function(name, value) {
  value = typeof value === 'string' ? value : JSON.stringify(value)
  window.localStorage.setItem(name, value)
}

const delLocal = function(name) {
  window.localStorage.removeItem(name)
}

const jumpToLogin = function() {
    delCookie('token','')
}

const getLanguage = function(key = 'language') {
    let i18n = getLocal(key) || Jw.defaultLanguage;
    return i18n
}

export { getCookie, setCookie, delCookie, getSession, setSession, delSession, getLocal, setLocal, delLocal, jumpToLogin, getLanguage };
