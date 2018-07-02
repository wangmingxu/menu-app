import Fly from 'flyio';
import { requestUrl } from '@/constant/index';
import promisify from '@/utils/promisify';
import store from '@/store/index';

const fly = new Fly(); // 创建fly实例
fly.config.baseURL = requestUrl; // 配置请求基地址

const newFly = new Fly();
newFly.config.baseURL = requestUrl;

const timeLogMap = {};

try {
  // console.time('读取本地存储');
  timeLogMap.getStorage = Date.now();
  const signInfo = wx.getStorageSync('signInfo');
  store.commit('setSignInfo', signInfo);
  console.log('读取本地存储耗时', Date.now() - timeLogMap.getStorage, 'ms');
  // console.timeEnd('读取本地存储');
} catch (error) {
  console.log(error);
}

fly.interceptors.request.use((request) => {
  // console.time(request.url);
  if (request.body && Object.prototype.hasOwnProperty.call(request.body, 'showLoading') && request.body.showLoading) {
    wx.showLoading({ title: request.body.loadingMsg, mask: true });
  }
  timeLogMap[request.url] = Date.now();
  const needLogin = request.body && Object.prototype.hasOwnProperty.call(request.body, 'needLogin') && request.body.needLogin;
  if (store.state.signInfo && !needLogin) {
    // request.body = Object.assign(request.body || {}, { session_id: store.state.signInfo });
    request.headers.cookie = `laravel_session=${store.state.signInfo}`;
    return request;
  }
  return fly.interceptors.request.await(promisify(wx.showLoading, { title: '正在登录' })
    .then(() => promisify(wx.login))
    .then(({ code }) => Promise.all([Promise.resolve(code), promisify(wx.getUserInfo)]))
    .then(([code, userInfo]) =>
      newFly
        .post('/auth/login', {
          code,
          user_info: userInfo,
          company_id: 1,
        }))
    .then(({ data }) => {
      wx.hideLoading();
      const { session_id: signInfo } = data.data;
      wx.setStorage({
        key: 'signInfo',
        data: signInfo,
      });
      console.log(signInfo);
      store.commit('setSignInfo', signInfo);
      // request.body = Object.assign(request.body || {}, { session_id: signInfo });
      request.headers.cookie = `laravel_session=${signInfo}`;
      return request;
    })
    .catch((e) => {
      console.log(e);
      wx.hideLoading();
    }));
});

fly.interceptors.response.use(({ data: rst, request }) => {
  // console.timeEnd(request.url);
  console.log(`${request.url}耗时`, Date.now() - timeLogMap[request.url], 'ms');
  if (request.body && Object.prototype.hasOwnProperty.call(request.body, 'showLoading') && request.body.showLoading) {
    wx.hideLoading();
  }
  switch (rst.code) {
    case 0:
      return rst.data;
    case 1002:
      request.body = Object.assign(request.body || {}, { needLogin: true });
      return fly.request(request);
    default:
      console.log(request);
      if (request.body && Object.prototype.hasOwnProperty.call(request.body, 'showMsg') && !request.body.showMsg) {
        return Promise.reject(rst);
      }
      wx.showModal({
        title: '提示',
        content: rst.msg,
        showCancel: false,
      });
      return Promise.reject(rst);
  }
}, (err) => {
  console.log('error-interceptor', err);
});

export { newFly };

export default fly;
