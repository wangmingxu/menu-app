<template>
  <div>
    <div class="zan-panel-title">编辑员工信息</div>
    <div class="zan-panel">
      <zan-field v-bind="nameFeild" :value="nameFeild.value" />
      <zan-field v-bind="numberFeild" :value="numberFeild.value" />
    </div>
    <div class="zan-btn zan-btn--primary btn-submit" @click="submitForm()">提交</div>
  </div>
</template>

<script>
  import ZanField from 'zanui/components/zan/field';
  import promisify, { sleep } from '@/utils/promisify';

  export default {
    components: {
      ZanField,
    },

    data() {
      return {
        nameFeild: {
          title: '姓名',
          placeholder: '请填写姓名',
          componentId: 'name',
          handleZanFieldFocus: this.handleNameFocus,
          handleZanFieldChange: this.handleNameChange,
          handleZanFieldBlur: this.handleNameBlur,
          value: '',
        },
        numberFeild: {
          title: '工号',
          placeholder: '请填写工号',
          componentId: 'number',
          handleZanFieldFocus: this.handleNumberFocus,
          handleZanFieldChange: this.handleNumberChange,
          handleZanFieldBlur: this.handleNumberBlur,
          value: '',
        },
        lock: false,
      };
    },

    methods: {
      loadUserInfo() {
        this.$http.get('/account/info').then((data) => {
          this.nameFeild.value = data.name;
          this.numberFeild.value = data.job_number;
        });
      },
      handleNameFocus(e) {
        const { componentId, target, detail } = e;
        console.log('[zan:field:change ]', componentId, target, detail);
        this.nameFeild.value = target.value;
      },
      handleNumberFocus(e) {
        const { componentId, target, detail } = e;
        console.log('[zan:field:change ]', componentId, target, detail);
        this.numberFeild.value = target.value;
      },
      handleNameChange(e) {
        const { componentId, target, detail } = e;
        console.log('[zan:field:change ]', componentId, target, detail);
      },
      handleNumberChange(e) {
        const { componentId, target, detail } = e;
        console.log('[zan:field:change ]', componentId, target, detail);
      },
      handleNameBlur(e) {
        const { componentId, target, detail } = e;
        console.log('[zan:field:blur ]', componentId, target, detail);
        this.nameFeild.value = target.value;
      },
      handleNumberBlur(e) {
        const { componentId, target, detail } = e;
        console.log('[zan:field:blur]', componentId, target, detail);
        this.numberFeild.value = target.value;
      },
      async submitForm() {
        if (this.lock) return;
        this.lock = true;
        await sleep(100);
        await this.$http.put('/account', {
          name: this.nameFeild.value,
          job_number: this.numberFeild.value,
          showLoading: true,
          loadingMsg: '正在提交',
        }).catch(() => {
          this.lock = false;
        });
        this.lock = false;
        await promisify(wx.showToast, {
          title: '提交成功',
          icon: 'success',
          mask: true,
        });
        await sleep(1500);
        wx.navigateBack();
      },
    },

    onLoad() {
      this.loadUserInfo();
    },
  };
</script>

<style scoped>
</style>