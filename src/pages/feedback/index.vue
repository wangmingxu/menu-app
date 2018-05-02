<template>
    <div>
        <div class="zan-panel-title">反馈内容:</div>
        <div class="zan-panel">
            <textarea class="mark" placeholder="请填写反馈内容" auto-focus @input="onRemarkChange($event)"></textarea>
        </div>
        <div class="zan-panel-title">图片(可选):</div>
        <div class="zan-panel zan-panel--without-border upload-pic">
            <uploader :files="files" @fileChange="fileChangeHandle($event)"></uploader>
        </div>
        <div class="zan-btn zan-btn--primary btn-submit" @click="submit()">提交</div>
    </div>
</template>

<script>
    import uploader from '@/components/uploader';
    import promisify from '@/utils/promisify';
    import { qiniuDomain } from '@/constant/index';

    export default {
      components: {
        uploader,
      },

      data() {
        return {
          files: [],
          remark: '',
        };
      },

      methods: {
        onRemarkChange(e) {
          this.remark = e.target.value;
        },
        async fileChangeHandle(e) {
          this.files = e;
          const { token } = await this.$http.get('/upload/qiniu/token');
          const tasks = this.files.map((item) => {
            if (String.prototype.startsWith.call(item, qiniuDomain)) {
              return Promise.resolve(item);
            }
            return promisify(wx.uploadFile, {
              url: 'https://up-z2.qiniup.com',
              filePath: item,
              name: 'file',
              formData: {
                token,
              },
            })
              .then(({ data }) => {
                const rst = JSON.parse(data);
                return `${qiniuDomain}/${rst.key}`;
              });
          });
          this.files = await Promise.all(tasks);
        },
        async submit() {
          await this.$http.post('/feedback', {
            content: this.remark,
            images: this.files.map(url => ({ url })),
          });
          wx.showToast({
            title: '提交成功',
            icon: 'success',
          });
        },
      },

      mounted() {
      },
    };
</script>

<style scoped>
    .upload-pic {
        padding: 15px;
    }
</style>