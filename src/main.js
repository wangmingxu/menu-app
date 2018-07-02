import fly from '@/utils/fly';
import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

Vue.use({
  install() {
    Object.defineProperty(Vue.prototype, '$http', { value: fly });
    // Object.defineProperty(Vue.prototype, '$eventHub', { value: new Vue() });
  },
});

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/preview/main', 'pages/plusminus/main', 'pages/feedback/main', 'pages/userinfo/main', 'pages/success/main', 'pages/reserve/main', 'pages/webview/main','pages/auth/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '每日菜单',
      navigationBarTextStyle: 'black',
    },
  },
};
