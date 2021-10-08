/**
 * 入口
 * @author Barry@gmail.com
 * @date 2021-10-01
 */
(function () {
  function initHook() {
    window.__JWHOOKS_MAP__ = {
      HOOK_AFTER_AUTH: 'afterAuth',
      HOOK_PAGE_LOADED: 'pageLoaded',
      HOOK_USER_LOADED: 'userLoaded',
      HOOK_BEFORE_START: 'beforeStart',
      HOOK_PERMISSION_CHECK: 'permissionCheck',
      HOOK_BEFORE_CREATE_APP: 'beforeCreateApp',
      HOOK_AFTER_APP_MOUNTED: 'afterAppMounted',
      HOOK_ROUTER_BEFORE_EACH: 'routerBeforeEach',

      execHooks: function(hookType, context, param) {
        var funcs = this[ hookType ] || [];
        var result = null

        funcs.forEach(function(func) {
          result = func.call(context || null, param, result)
        })

        return result
      }
    };
  };

  function setDocumentTitle() {
    document.title = Eld.title
  }

  /**
  * 获取配置文件
  * @author Barry@gmail.com
  * @param url {String} 地址
  * @param callback {Function} 回调方法
  */ 
  function fetchConfig(url, callback) {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.timeout = 2000;
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return;
      if (request.status === 200 || request.status === 304) {
        callback(request.responseText)
      }
    }
  };

  /**
  * 创建脚本
  * @author Barry@gmail.com
  * @param url {String} 脚本地址
  * @param callback {Function} 回调方法
  */ 
  function createScript(url, callback) {
    let script = document.createElement('script')
    script.type = "text/javascript";
    script.async = true;
    script.src = url;

    script.onload = function() {
      callback()
    }

    document.body.appendChild(script);
  };

  /**
  * 加载js
  * @author Barry@gmail.com
  * @param jsList {String} 脚本列表
  * @param callback {Function} 回调方法
  */ 
  function loadJs(jsList, callback) {
    let count = 0;
    let maxCount = jsList.length;
    let handlerLoaded = function() {
      count++;

      if(maxCount === count) {
        callback && callback()
      }
    };

    for (const url of jsList) {
      if(url.indexOf('.js?')>-1) {
        createScript(url, handlerLoaded)
      } else if(url.indexOf('.json?')>-1) {
        fetchConfig(url, function(data) {
          window.Eld = JSON.parse(data)
          handlerLoaded();
        })
      }
    }
  }

  /**
  * 初始化方法
  * @author Barry@gmail.com
  */ 
  function init() {
    let random = document.querySelector('body').getAttribute('random');

    let scriptList = {
      before: [`/config/scaffold.json?v=${random}`, `/source/vendor.js?v=${random}`,`/source/common.js?v=${random}`],
      after: [`/source/app.js?v=${random}`]
    };

    loadJs(scriptList.before, function() {
      setDocumentTitle();
      loadJs(scriptList.after, function() {
        __JWHOOKS_MAP__.execHooks( __JWHOOKS_MAP__.HOOK_BEFORE_START )
      })
    })
  }

  initHook();
  init();
})()
