/**
 * 注入ant-design组件
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */
// import Antd from 'ant-design-vue';
import _ from 'lodash'
import { 
  // Base,
  // Affix,
  // Anchor,
  // AutoComplete,
  // Alert,
  Avatar,
  // BackTop,
  // Badge,
  // Breadcrumb,
  Button,
  // Calendar,
  // Card,
  Collapse,
  // Carousel,
  // Cascader,
  Checkbox,
  Col,
  DatePicker,
  // Divider,
  Dropdown,
  // Form,
  FormModel,
  Icon,
  Input,
  // InputNumber,
  Layout,
  List,
  // LocaleProvider,
  Menu,
  // Mentions,
  Modal,
  message,
  // Pagination,
  // Popconfirm,
  // Popover,
  // Progress,
  Radio,
  // Rate,
  Row,
  Select,
  // Slider,
  Spin,
  // Statistic,
  // Steps,
  // Switch,
  Table,
  // Transfer,
  Tree,
  // TreeSelect,
  Tabs,
  Tag,
  // TimePicker,
  // Timeline,
  Tooltip,
  // Upload,
  // Drawer,
  // Skeleton,
  // Comment,
  // ColorPicker,
  ConfigProvider,
  // Empty,
  // Result,
  Descriptions,
  // PageHeader,
  // Space,
} from 'ant-design-vue';

const injectVuePlugin = (vue) => {
  vue.use(Button)
  vue.use(Collapse)
  vue.use(Checkbox)
  vue.use(Col)
  vue.use(DatePicker)
  vue.use(Dropdown)
  vue.use(FormModel)
  vue.use(Icon)
  vue.use(Input)
  vue.use(Layout)
  vue.use(List)
  vue.use(Menu)
  vue.use(Modal)
  vue.use(message)
  vue.use(Radio)
  vue.use(Row)
  vue.use(Select)
  vue.use(Spin)
  vue.use(Table)
  vue.use(Tree)
  vue.use(Tabs)
  vue.use(ConfigProvider)
  vue.use(Descriptions)
  vue.use(Tooltip)
  vue.use(Tag)
  vue.use(Avatar)

  _.extend(vue.prototype, {
    _,
    $success(msg) {
      message.success(msg || '')
    },

    $warning(msg) {
      message.warning(msg || '')
    },

    $error(msg) {
      message.error(msg || '')
    },
    $confirm(obj){
      Modal.confirm(obj)
    }
  })
}

export default injectVuePlugin