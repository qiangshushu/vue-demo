import { InputNumber, Select, Tabs, TabPane, Option, Checkbox, Tooltip, Tag, Dialog, Form, FormItem, Input, Radio, Collapse, CollapseItem, Upload, Button, TimeSelect, DatePicker, Table, TableColumn, Slider, Message, Loading, MessageBox, Switch, Tree, Progress, Popover, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default {
  async install(Vue) {
    Vue.use(InputNumber);
    Vue.use(Select);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Option);
    Vue.use(Checkbox);
    Vue.use(Tooltip);
    Vue.use(Tag);
    Vue.use(Dialog);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);
    Vue.use(Radio);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Upload);
    Vue.use(Button);
    Vue.use(TimeSelect);
    Vue.use(DatePicker);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Slider);
    Vue.use(Switch);
    Vue.use(Tree);
    Vue.use(Progress);
    Vue.use(Popover);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);

    Vue.use(Loading.directive);
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$message = Message;
  }
};
