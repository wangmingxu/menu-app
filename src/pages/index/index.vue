<style scoped>
    .container{
    position: absolute;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
  }
  .nav {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
  swiper image{
    width: 100%;
    height: 100%;
  }
  .g-content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .sel-box{
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
  } 
  .sel-box .week-sel{
    width: 30%;
    text-align: center;
  }
  .sel-box .arr{
    color: #666;
    margin-left: 5%;
  }
  .sel-box .time-sel{
    text-align: right;
    flex: 1;
  }
  .sel-box .checkbox{
    margin-right: 8%;
  }
  .main-box{
    display: flex;
    flex: 1;
    height: 100%;
  }
  .main-box .slide-nav{
    background: #f5f5f5;
    width: 100px;
    text-align: center;
  }
  .slide-nav .food-item{
    padding: 10px 0;
    color: #666;
  }
  .slide-nav .food-item.cur-type{
    background: #fff;
    color: #111;
  }
</style>

<template>
  <div class="container">
    <div class="nav">
      2018-01-01
    </div>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
      <block v-for="(item, idx) in imgUrls" :key="idx">
        <swiper-item>
          <image :src="item" class="slide-image" width="355" height="150" />
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
          <checkbox-group @change="mealChange">
            <label class="checkbox" v-for="(item, index) in meals" :key="index">
              <checkbox :value="item.name" />{{item.value}}
            </label>
          </checkbox-group>
        </div>
      </div>
      <div class="main-box">
          <scroll-view class="slide-nav" :scroll-y="true">
            <div class="food-item"
            :class="{'cur-type': curFoodId == item.id}"
            @click="foodChange(item)"
            v-for="(item, idx) in foodKinds" :key="idx">
              {{item.name}}
            </div>
          </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgUrls: [
          "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
          "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
          "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
        ],
        meals: [
          { name: 1, value: '早' },
          { name: 2, value: '午' },
          { name: 3, value: '晚' },
        ],
        weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        curDayIndex: 0,
        foodKinds: [
          { id: 0, name: '全部' },
          { id: 1, name: '饮品' },
          { id: 2, name: '素菜' },
          { id: 3, name: '肉' },
          { id: 1, name: '饮品' },
          { id: 2, name: '素菜' },
          { id: 3, name: '肉' },
          { id: 1, name: '饮品' },
          { id: 2, name: '素菜' },
          { id: 3, name: '肉' },
          { id: 1, name: '饮品' },
          { id: 2, name: '素菜' },
          { id: 3, name: '肉' },
          
        ],
        curFoodId: 0,
      };
    },

    components: {},

    methods: {
      mealChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e)
      },
      weekrChange: function (e) {
        console.log('picker发送选择改变，携带值为', e)
        this.curDayIndex = e.target.value;
      },
      foodChange: function (item) {
        console.log(item);
        this.curFoodId = item.id;
      },
    },

    created() { }
  };
</script>