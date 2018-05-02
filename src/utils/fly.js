import Fly from 'flyio';
import { requestUrl } from '@/constant/index';
import promisify from '@/utils/promisify';
import store from '@/store/index';

const fly = new Fly(); // 创建fly实例
fly.config.baseURL = requestUrl; // 配置请求基地址

const newFly = new Fly();
newFly.config.baseURL = requestUrl;

fly.interceptors.request.use((request) => {
  if (store.state.signInfo) {
    // request.body = Object.assign(request.body || {}, { session_id: store.state.signInfo });
    request.headers.cookie = `laravel_session=${store.state.signInfo}`;
    return request;
  }
  return fly.interceptors.request.await(promisify(wx.login)
    .then(({ code }) => Promise.all([Promise.resolve(code), promisify(wx.getUserInfo)]))
    .then(([code, userInfo]) =>
      newFly
        .post('/auth/login', {
          code,
          user_info: userInfo,
          company_id: 1,
        }))
    .then(({ data }) => {
      const { session_id: signInfo } = data.data;
      console.log(signInfo);
      store.commit('setSignInfo', signInfo);
      // request.body = Object.assign(request.body || {}, { session_id: signInfo });
      request.headers.cookie = `laravel_session=${signInfo}`;
      return request;
    }));
});

fly.interceptors.response.use(({ data: rst, request }) => {
  switch (rst.code) {
    case 0:
      return rst.data;
    case 7:
      return fly.interceptors.response.await(newFly.get('/refurbishUserSign', store.state.signInfo)
        .then(({ data }) => data.data)
        .then((signInfo) => {
          store.commit('setSignInfo', signInfo);
        })).then(() => fly.request(request));
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
