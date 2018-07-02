<script>
  export default {
    created() {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || [];
      logs.unshift(Date.now());
      wx.setStorageSync('logs', logs);

      console.log('app created and cache logs by setStorageSync');
    },
  };
</script>

<style>
  @import "~zanui/assets/style/zanui.wxss";
  .textarea-placeholder {
    font-size: 15px;
  }

  .mark {
    width: 100%;
    height: 200px;
    padding: 7px 15px;
    box-sizing: border-box;
  }

  .zan-btn.btn-submit {
    margin: 15px;
  }
  .zan-panel-title{
    color: #333;
    font-size: 16px;
  }
  .zan-tab{
    height: 35px;
  }
  .zan-tab__bd{
    width: auto;
    border: none;
    height: 35px;
  }
  .zan-tab__item{
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 15px;
  }
  .zan-tab__title{
    height: 35px;
    line-height: 35px;
  }
</style>