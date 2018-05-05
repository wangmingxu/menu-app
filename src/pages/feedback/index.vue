<template>
    <div>
        <div class="zan-panel-title">反馈内容:</div>
        <div class="zan-panel">
            <textarea class="mark" :value="remark" placeholder="请填写反馈内容" auto-focus @input="onRemarkChange($event)"></textarea>
        </div>
        <div class="zan-panel-title">图片(可选):</div>
        <div class="zan-panel zan-panel--without-border upload-pic">
            <uploader :files="tempFiles" @fileChange="fileChangeHandle($event)"></uploader>
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
          tempFiles: [],
          fileMap: {},
        };
      },

      methods: {
        onRemarkChange(e) {
          this.remark = e.target.value;
        },
        async fileChangeHandle(e) {
          this.tempFiles = e;
          const { token } = await this.$http.get('/upload/qiniu/token');
          console.log('tempFiles', this.tempFiles);
          const tasks = this.tempFiles.map((item) => {
            console.log(item);
            // console.log(Object.prototype.hasOwnProperty.call(this.fileMap,item));
            if (Object.prototype.hasOwnProperty.call(this.fileMap, item)) {
              return Promise.resolve(this.fileMap[item]);
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
                const url = `${qiniuDomain}/${rst.key}`;
                this.fileMap[item] = url;
                return url;
              });
          });
          this.files = await Promise.all(tasks);
        },
        async submit() {
          console.log(this.files);
          await this.$http.post('/feedback', {
            content: this.remark,
            images: this.files.map(url => ({ url })),
          });
          wx.showToast({
            title: '提交成功',
            icon: 'success',
          });
          this.resetData();
        },
        resetData() {
          this.files = [];
          this.remark = '';
          this.tempFiles = [];
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