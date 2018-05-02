<template>
    <div>
            <div class="zan-panel-title">编辑信息</div>
            <div class="zan-panel">
                    <zan-field v-bind="nameFeild" :value="nameFeild.value"/> 
                    <zan-field v-bind="numberFeild" :value="numberFeild.value"/> 
            </div>
            <div class="zan-btn zan-btn--primary btn-submit" @click="submitForm()">提交</div>
    </div>
</template>

<script>
  import ZanField from 'zanui/components/zan/field';
  import promisify from '@/utils/promisify';

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
          // handleZanFieldChange: this.handleNameChange,
          handleZanFieldBlur: this.handleNameBlur,
          value: '',
        },
        numberFeild: {
          title: '工号',
          placeholder: '请填写工号',
          componentId: 'number',
          // handleZanFieldChange: this.handleNumberChange,
          handleZanFieldBlur: this.handleNumberBlur,
          value: '',
        },
      };
    },

    methods: {
      loadUserInfo() {
        this.$http.get('/account/info').then((data) => {
          this.nameFeild.value = data.job_number;
          this.numberFeild.value = data.name;
        });
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
        await this.$http.put('/account', {
          name: this.nameFeild.value,
          job_number: this.numberFeild.value,
        });
        await promisify(wx.showToast, {
          title: '提交成功',
          icon: 'success',
        });
      },
    },

    onLoad() {
      this.loadUserInfo();
    },
  };
</script>

<style scoped>
</style>