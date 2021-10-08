<template>
  <a-config-provider :locale="locale">
    <div id="app" class="height-full">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
// 国际化
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import enUS from 'ant-design-vue/lib/locale-provider/en_US';

export default {
  name: 'app',

  data() {
    return {
      locale: this.getLocale(),
    }
  },

  components: {

  },

  mounted() {
    __JWHOOKS_MAP__.execHooks(__JWHOOKS_MAP__.HOOK_USER_LOADED)
    __JWHOOKS_MAP__.execHooks(__JWHOOKS_MAP__.HOOK_AFTER_APP_MOUNTED)
  },

  methods: {
    getLocale() {
      let languageMap = {
        'zh-cn': zhCN,
        'en-us': enUS,
      };

      let language = localStorage.getItem('jw-language') || Eld.defaultLanguage;
      language = language.toLowerCase()

      return languageMap[language] || zhCN;
    }
  }
}
</script>

<style scoped>

</style>