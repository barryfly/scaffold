import { getExternLanguages } from '_common/hook'
import scaffoldLanguage from '_locale';
let languages = Object.assign(scaffoldLanguage, getExternLanguages());

//系统默认语言和业务系统语言
export default languages