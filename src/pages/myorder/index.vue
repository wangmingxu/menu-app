<template>
    <div>
        <zan-loadmore :nodata="true" v-if="orderList.length===0"></zan-loadmore>
        <div v-for="(item,i) in orderList" :key="item.id">
            <div class="zan-panel-title">下单时间:{{item.created_at}}</div>
            <div class="zan-panel">
                <div class="zan-card" v-for="(menu,j) in item.menus" :key="menu.id">
                    <div class="zan-card__thumb">
                        <image class="zan-card__img" :src="menu.image_url"
                            mode="widthFix"></image>
                    </div>
                    <div class="zan-card__detail">
                        <div class="zan-card__detail-row">
                            <div class="zan-card__right-col">x{{menu.quantity}}</div>
                            <div class="zan-card__left-col">
                                {{menu.name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="zan-cell zan-cell--access">
                    <div class="zan-cell__bd">备注:{{item.remark}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ZanLoadmore from 'zanui/components/zan/loadmore';

    export default {
      components: {
        ZanLoadmore,
      },

      data() {
        return {
          orderList: [],
        };
      },

      onLoad() {
        this.$http.get('/order', {
          page_size: 100,
        }).then((data) => {
          this.orderList = data.items;
        });
      },
    };
</script>

<style scoped>
</style>