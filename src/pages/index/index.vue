<style scoped>
  .container {
    position: absolute;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
  }

  .asidebar {
    width: 125px;
    height: 100%;
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 0;
    z-index: 101;
    transition: transform .5s;
    transform: translateX(-100%);
    overflow: hidden;
    border-right: 2rpx solid #ddd;
  }

  .asidebar.active {
    transform: translateX(0);
  }

  .nav {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    position: relative;
  }

  .asidebar-btn {
    position: absolute;
    left: 15px;
    color: cadetblue;
  }

  swiper image {
    width: 100%;
    height: 100%;
  }

  .g-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .sel-box {
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
  }

  .sel-box .week-sel {
    width: 30%;
    text-align: center;
  }

  .sel-box .arr {
    color: #666;
    margin-left: 5%;
  }

  .sel-box .time-sel {
    text-align: right;
    margin-right: 30px
    /* flex: 1; */
  }

  .sel-box .checkbox {
    margin-right: 8%;
  }

  .main-box {
    display: flex;
    flex: 1;
    height: 100%;
  }

  .main-box .slide-nav {
    background: #f5f5f5;
    width: 100px;
    text-align: center;
  }

  .slide-nav .kind-item {
    padding: 10px 0;
    color: #666;
  }

  .slide-nav .kind-item.cur-type {
    background: #fff;
    color: #111;
  }

  .food-list {
    flex: 1;
  }

  .food-list .zan-card{
    padding: 5px 10px;
  }

  .toggle-like {
    display: flex;
    align-items: center;
  }

  .btn-like {
    height: 30px;
    width: 30px;
    background: url('~static/images/like.png') no-repeat;
    background-size: 25px auto;
    background-position: center center;
  }

  .like-count,
  .dislike-count {
    line-height: 30px;
    font-size: 15px;
  }

  .like-count {
    margin-right: 15px;
  }

  .btn-like.active {
    background-image: url('~static/images/like-active.png');
  }

  .btn-dislike {
    height: 30px;
    width: 30px;
    background: url('~static/images/dislike.png') no-repeat;
    background-size: 25px auto;
    background-position: center center;
  }

  .btn-dislike.active {
    background-image: url('~static/images/dislike-active.png');
  }

  .food-list .thumb {
    width: 100%;
    height: 120px;
  }

  .food-name {
    /* width: 150px; */
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 20px;
    line-height: 20px;
    /* -webkit-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap; */
  }

  .ft-bar {
    height: 50px;
    background-color: #fff;
    border-top: 2rpx solid #ddd;
  }

  .ft-bar.fixd {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 102;
    width: 100%;
  }

  .icon-cart {
    line-height: 50px;
    font-size: 24px;
    color: #d81e06;
    padding: 0 20px;
  }

  .btn-settle {
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }

  .btn-clear-cart {
    float: right;
  }

  .cart-box {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 101;
    transform-origin: 20px 100%;
    transform: scale(0);
    transition: transform .5s;
  }

  .cart-box.active {
    transform: scale(1);
  }

  .center-col {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .middle-row {
    display: flex;
    align-items: center;
    height: 90px;
    justify-content: center;
  }

  .icon-cart .zan-badge__count {
    right: 19px;
    top: -1px;
  }
</style>

<template>
  <div class="container">
    <div class="mask" v-if="showCart" @click="toggleCart()"></div>
    <div class="mask" v-if="showAsidebar" @click="toggleAsideBar()"></div>
    <div class="asidebar" :class="{active:showAsidebar}">
      <navigator url="/pages/userinfo/main" hover-class="navigator-hover">
        <div class="zan-cell zan-cell--access">
          <div class="zan-cell__bd">编辑信息</div>
          <div class="zan-cell__ft"></div>
        </div>
      </navigator>
      <navigator url="/pages/myorder/main" hover-class="navigator-hover">
        <div class="zan-cell zan-cell--access">
          <div class="zan-cell__bd">我的订单</div>
          <div class="zan-cell__ft"></div>
        </div>
      </navigator>
      <navigator url="/pages/plusminus/main" hover-class="navigator-hover">
        <div class="zan-cell zan-cell--access">
          <div class="zan-cell__bd">加减餐</div>
          <div class="zan-cell__ft"></div>
        </div>
      </navigator>
      <navigator url="/pages/reserve/main" hover-class="navigator-hover">
        <div class="zan-cell zan-cell--access">
          <div class="zan-cell__bd">留饭</div>
          <div class="zan-cell__ft"></div>
        </div>
      </navigator>
      <navigator url="/pages/feedback/main" hover-class="navigator-hover">
        <div class="zan-cell zan-cell--access">
          <div class="zan-cell__bd">意见反馈</div>
          <div class="zan-cell__ft"></div>
        </div>
      </navigator>
    </div>
    <div class="cart-box" :class="{active:showCart}">
      <div class="zan-panel-title">
        购物车
        <div class="btn-clear-cart" @click="clearCart()">清空购物车</div>
      </div>
      <div class="zan-panel" style="padding: 15px;">
        <zan-loadmore :nodata="true" v-if="cartList.length===0"></zan-loadmore>
        <div class="zan-row" v-for="item in cartList" :key="item.id" style="margin-bottom: 10px;">
          <div class="zan-col zan-col-14" style="line-height: 30px">
            {{item.name}}
          </div>
          <div class="zan-col zan-col-10">
            <zan-stepper v-bind="steppers[item.id]" :componentId="item.id" size="small" @handleZanStepperChange="handleZanStepperChange($event)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="zan-icon zan-icon-wap-nav asidebar-btn" @click="toggleAsideBar()"></div>
      {{currentDate}}
    </div>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
      <block v-for="(item, idx) in banners" :key="idx">
        <swiper-item>
          <image :src="item.cover_url" class="slide-image" height="150" @click="openWithWebview(item.target_url)" />
        </swiper-item>
      </block>
    </swiper>
    <div class="g-content">
      <div class="sel-box">
        <div class="week-sel">
          <picker @change="weekrChange" :value="curDayIndex" :range="weeks">
            <view class="picker">
              {{weeks[curDayIndex]}}
              <span class="arr">&#9660</span>
            </view>
          </picker>
        </div>
        <div class="time-sel">
          <!-- <radio-group @change="mealChange">
            <label class="checkbox" v-for="(item, index) in meals" :key="index">
              <checkbox :value="item.value" :checked="item.value===currentMeal" />{{item.name}}
            </label>
          </radio-group> -->
          <ZanTab v-bind="mealTab" :componentId="'mealTab'" :selectedId="currentMeal" @change="handleZanTabChange"/>
        </div>
      </div>
      <div class="main-box">
        <scroll-view class="slide-nav" :scroll-y="true">
          <div class="kind-item" :class="{'cur-type': currentCategory == item.id}" @click="categoryChange(item.id)" v-for="(item, idx) in categoryList"
            :key="idx">
            {{item.name}}
          </div>
        </scroll-view>
        <scroll-view class="food-list" :scroll-y="true">
          <!-- <zan-loadmore :loading="true" v-if="loading"></zan-loadmore> -->
          <div class="zan-panel zan-panel--without-border" v-if="!loading" style="margin-top: 0px">
            <zan-loadmore :nodata="true" v-if="categoryList.length===0&&!loading"></zan-loadmore>
            <div class="zan-card col-center" v-for="item in foodList[currentCategory]" :key="item.id">
              <div class="zan-card__thumb">
                <image class="zan-card__img" :src="item.image_url" mode="aspectFit" @click="preview(item.image_url)"></image>
              </div>
              <div class="zan-card__detail middle-row">
                <div>
                  <text class="zan-card__detail-row food-name">
                    {{item.name}}
                  </text>

                  <div class="zan-card__detail-row toggle-like center-col">
                    <div class="btn-like" :class="{active:item.liked}" @click="toggleLike(item,'like')"></div>
                    <div class="like-count">{{item.like}}</div>
                    <div class="btn-dislike" :class="{active:item.unliked}" @click="toggleLike(item,'unlike')"></div>
                    <div class="dislike-count">{{item.unlike}}</div>
                  </div>

                  <div class="zan-card__detail-row center-col" v-if="currentMeal===3">
                    <zan-stepper v-bind="steppers[item.id]" :componentId="item.id" size="small" @handleZanStepperChange="handleZanStepperChange($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="ft-bar" :class="{fixd:showCart}" v-if="currentMeal===3">
        <div class="zan-icon zan-icon-shopping-cart icon-cart zan-badge" @click="toggleCart()">
          <div class="zan-badge__count">{{totaCount}}</div>
        </div>
        <div class="zan-btn zan-btn--primary zan-btn--small btn-settle" @click="createOrder()">选好了</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import ZanLoadmore from 'zanui/components/zan/loadmore';
  import ZanStepper from 'zanui/components/zan/stepper';
  import ZanTab from 'zanui/components/zan/tab';
  import flatten from 'lodash/flatten';
  import uniqBy from 'lodash/uniqBy';
  import isEmpty from 'lodash/isEmpty';
  import omit from 'lodash/omit';
  import promisify, { sleep } from '@/utils/promisify';
  import { genTimeRange, getMeal } from '@/utils/index';
  import store from '@/store/index';
  import { mapMutations, mapState } from 'vuex';
  import moment from 'moment';

  export default {
    components: {
      ZanLoadmore,
      ZanStepper,
      ZanTab
    },
    store,
    data() {
      return {
        loading: false,
        banners: [],
        mealTab: {
          list: [{
            id: 1,
            title: '早餐'
          }, {
            id: 2,
            title: '午餐'
          }, {
            id: 3,
            title: '晚餐'
          }],
          scroll: false,
        },
        meals: [
          { value: 1, name: '早' },
          { value: 2, name: '午' },
          { value: 3, name: '晚' },
        ],
        weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        curDayIndex: moment().isoWeekday() - 1,
        currentMeal: -1,
        categoryList: [],
        foodList: {},
        currentCategory: null,
        showAsidebar: false,
        showCart: false,
        steppers: {},
      };
    },
    computed: {
      ...mapState([
        'orderDetail',
      ]),
      cartList() {
        const checkedList = Object.keys(this.steppers).filter(key => this.steppers[key].stepper > 0);
        return uniqBy(flatten(Object.values(this.foodList)).filter(item => checkedList.includes(`${item.id}`)), 'id');
      },
      timeRange() {
        return genTimeRange(+this.curDayIndex + 1, this.currentMeal);
      },
      currentDate() {
        return this.timeRange[0].format('YYYY-MM-DD');
      },
      totaCount() {
        return this.cartList.reduce((pre, cur) => pre + this.steppers[cur.id].stepper, 0);
      },
    },

    watch: {
      curDayIndex() {
        this.steppers = {};
        this.currentCategory = null;
        this.categoryList = [];
        this.loadMenu();
      },
      currentMeal() {
        this.currentCategory = null;
        this.categoryList = [];
        this.loadMenu();
      },
      orderDetail() {
        if (isEmpty(this.orderDetail)) {
          this.clearCart();
        }
      },
    },

    methods: {
      ...mapMutations([
        'setOrderDetail',
      ]),
      ...ZanTab.methods,
      handleZanTabChange (e) {
        const {componentId, selectedId} = e;
        this.currentMeal = selectedId;
        // this[componentId].selectedId = selectedId
      },
      listCategory() {
        return this.$http.get('/menu-category', {
          company_id: 1,
        })
          .then((data) => {
            this.categoryList = data.items;
          });
      },
      loadMenu() {
        this.loading = true;
        this.$http.get('/menu', {
          company_id: 1,
          start_at: this.timeRange[0].format('YYYY-MM-DD HH:mm'),
          end_at: this.timeRange[1].format('YYYY-MM-DD HH:mm'),
        })
          .then((data) => {
            this.loading = false;
            data.items.forEach((item) => {
              Vue.set(this.foodList, item.id, item.menus);
            });
            this.categoryList = data.items.map(item => omit(item, 'menus'));
            [].concat(...data.items.map(item => item.menus)).forEach((item) => {
              if (!this.steppers[item.id]) {
                Vue.set(this.steppers, item.id, {
                  stepper: 0,
                  min: 0,
                  max: 20,
                });
              }
            });
            if (!this.currentCategory && this.categoryList.length > 0) {
              this.currentCategory = this.categoryList[0].id;
            }
          });
      },
      loadUserInfo() {
        this.$http.get('/account/info').then((data) => {
          if (!data.job_number || !data.name) {
            wx.redirectTo({
              url: '/pages/userinfo/main',
            });
          }
        });
      },
      listBanner() {
        this.$http.get('/banner', {
          company_id: 1,
        }).then((data) => {
          this.banners = data.items;
        });
      },
      // mealChange(e) {
      //   // console.log('checkbox发生change事件，携带value值为：', e);
      //   this.currentMeal = +e.target.value;
      // },
      weekrChange(e) {
        // console.log('picker发送选择改变，携带值为', e);
        this.curDayIndex = e.target.value;
      },
      async categoryChange(id) {
        if (this.currentCategory === id) return;
        this.loading = true;
        await sleep(50);
        this.loading = false;
        this.currentCategory = id;
      },
      handleZanStepperChange(e) {
        const { componentId, stepper } = e;
        // console.log(this.steppers);
        this.steppers[componentId].stepper = stepper;
      },
      toggleAsideBar() {
        this.showAsidebar = !this.showAsidebar;
      },
      toggleCart() {
        this.showCart = !this.showCart;
      },
      async toggleLike(item, type) {
        if (type === 'like') {
          await this.$http.get('/like-menu/toggle-like', {
            menu_id: item.id,
          });
          Vue.set(item, 'like', +item.like + (item.liked ? -1 : 1));
          Vue.set(item, 'liked', !item.liked);
        } else {
          await this.$http.get('/like-menu/toggle-unlike', {
            menu_id: item.id,
          });
          Vue.set(item, 'unlike', +item.unlike + (item.unliked ? -1 : 1));
          Vue.set(item, 'unliked', !item.unliked);
        }
      },
      clearCart() {
        Object.keys(this.steppers).forEach((key) => {
          this.steppers[key].stepper = 0;
        });
      },
      preview(url) {
        wx.previewImage({
          urls: [url],
        });
      },
      async createOrder() {
        if (this.cartList.length === 0) {
          await promisify(wx.showToast, {
            title: '请先选择菜式',
            icon: 'none',
          });
          return;
        }
        const orderDetail = this.cartList.map((item) => {
          item.quantity = this.steppers[item.id].stepper; //eslint-disable-line
          return item;
        });
        this.setOrderDetail(orderDetail);
        // await promisify(wx.setStorage, {
        //   key: 'orderDetail',
        //   data: orderDetail,
        // });
        wx.navigateTo({
          url: '/pages/preview/main',
        });
      },


      openWithWebview(url) {
        wx.navigateTo({
          url: `/pages/webview/main?url=${encodeURIComponent(url)}`,
        });
      },
    },

    async onLoad() {
      await this.loadUserInfo();
      this.listBanner();
      // await this.listCategory();
      if (this.currentMeal < 0) {
        this.currentMeal = getMeal();
      }
      this.loadMenu();
    },
    onHide() {
      this.showAsidebar = false;
    },
  };
</script>