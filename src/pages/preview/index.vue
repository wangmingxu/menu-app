<template>
    <div>
        <div class="zan-card"  v-for="item in orderDetail" :key="item.id">
            <div class="zan-card__thumb">
                <image class="zan-card__img" :src="item.image_url"
                    mode="widthFix"></image>
            </div>
            <div class="zan-card__detail">
                <div class="zan-card__detail-row">
                    <div class="zan-card__right-col">x{{item.quantity}}</div>
                    <div class="zan-card__left-col">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="zan-panel-title">备注</div>
        <div class="zan-panel">
            <textarea class="mark" placeholder="填写备注(可选)" @input="onRemarkChange($event)"></textarea>
        </div>
        <div class="zan-btn zan-btn--primary btn-submit" @click="submitOrder()">提交</div>
    </div>
</template>

<script>
    import promisify from '@/utils/promisify';
    import store from '@/store/index';
    import {mapState,mapMutations} from 'vuex';

    export default {
      store,
      data() {
        return {
          remark: '',
        };
      },
      computed:{
        ...mapState([
          'orderDetail'
        ])
      },

      methods: {
        ...mapMutations([
          'setOrderDetail'
        ]),
        async submitOrder() {
          await promisify(wx.showLoading, { title: '正在提交' });
          try {
            await this.$http.post('/order', {
              menus: this.orderDetail,
              remark: this.remark,
            });
          } catch (error) {
            console.log(error);
          } finally {
            wx.hideLoading();
          }
          this.setOrderDetail([]);
          wx.redirectTo({
            url: '/pages/success/main',
          });
        },
        onRemarkChange(e) {
          this.remark = e.target.value;
        },
      },

      // async onLoad() {
      //   const { data: orderDetail } = await promisify(wx.getStorage, {
      //     key: 'orderDetail',
      //   });
      //   this.orderDetail = orderDetail;
      // },
    };
</script>

<style scoped>
</style>