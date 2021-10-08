/**
 * 注入I18n国际化
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */
import langCN from './zh-CN'
import langEN from './en-US'

let defaultLanguage = localStorage.getItem('language') || Eld.defaultLanguage

defaultLanguage = defaultLanguage.toLowerCase()


let langMaps = {
  'zh-cn': langCN,
  'en-us': langEN,
};

export default defaultLanguage ? langMaps[defaultLanguage] : langCN