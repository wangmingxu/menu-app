<template>
  <div>
    <div class="zan-panel-title">类型</div>
    <div class="zan-panel">
      <zan-select v-bind="{ items, checkedValue:type, componentId: 'base'}" @handleZanSelectChange="handleZanSelectChange" />
    </div>
    <!-- <div class="zan-panel-title">数量</div> -->
    <div class="zan-panel">
      <div class="zan-cell zan-field" style="border-bottom: 1rpx solid #e5e5e5">
        <div class="zan-cell__hd zan-field__title">数量</div>
        <input type="number" placeholder="请输入加减餐数量" class="zan-field__input zan-cell__bd" v-model="quantity" />
      </div>
    </div>
    <div class="zan-panel-title">备注</div>
    <div class="zan-panel">
      <textarea :value="remark" class="mark" placeholder="填写备注" @input="onRemarkChange($event)"></textarea>
    </div>
    <button class="zan-btn zan-btn--primary btn-submit" formType="submit" @click="submit()">提交</button>
  </div>
</template>

<script>
  import ZanSelect from 'zanui/components/zan/select';
  import promisify from '@/utils/promisify';

  export default {
    components: {
      ZanSelect,
    },

    data() {
      return {
        quantity: 1,
        remark: '',
        items: [
          {
            padding: 0,
            value: '1',
            name: '加餐',
          },
          {
            padding: 0,
            value: '2',
            name: '减餐',
          },
        ],
        type: '1',
      };
    },

    methods: {
      handleZanSelectChange({ value }) {
        this.type = value;
      },
      onRemarkChange(e) {
        this.remark = e.target.value;
      },
      async submit() {
        await promisify(wx.showLoading, { title: '正在提交' });
        try {
          await this.$http.post('/order-change-log', {
            quantity: this.type === '1' ? this.quantity : -this.quantity,
            remark: this.remark,
          });
        } catch (error) {
          console.log(error);
        } finally {
          wx.hideLoading();
        }
        wx.showToast({
          title: '提交成功',
          icon: 'success',
        });
        this.resetData();
      },
      resetData() {
        this.quantity = 1;
        this.type = '1';
        this.remark = '';
      },
    },

    onLoad() {
    },
  };
</script>

<style scoped>
</style>