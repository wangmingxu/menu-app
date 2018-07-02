<template>
    <div class="weui-uploader__bd">
        <div class="weui-uploader__files" id="uploaderFiles">
            <block v-for="item in files" :key="index">
                <div class="weui-uploader__file" @click="predivImage" :id="item">
                    <div class="delete-btn" @click.stop="del(item)">x</div>
                    <image class="weui-uploader__img" :src="item" mode="aspectFill" />
                </div>
            </block>
        </div>
        <div class="weui-uploader__input-box">
            <div class="weui-uploader__input" @click="chooseImage"></div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
      props: ['files'],
      data() {
        return {
        //   files: [],
        };
      },
      methods: {
        chooseImage() {
          const _this = this;//eslint-disable-line
          wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              const files = _this.files.concat(res.tempFilePaths);
              _this.$emit('fileChange', files);
            },
            fail() {
              console.log('fail');
            },
            complete() {
              console.log('commplete');
            },
          });
        },
        predivImage(e) {
          console.log(e);
          wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.files, // 需要预览的图片http链接列表
          });
        },
        del(i) {
          const files = this.files.filter(item => item !== i);
          this.$emit('fileChange', files);
        },
      },
    };
</script>

<style scoped>
    .weui-uploader__hd {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        padding-bottom: 10px;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .weui-uploader__title {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }

    .weui-uploader__info {
        color: #b2b2b2;
    }

    .weui-uploader__bd {
        margin-bottom: -4px;
        margin-right: -9px;
        overflow: hidden;
    }

    .weui-uploader__file {
        float: left;
        margin-right: 15px;
        margin-bottom: 15px;
        position: relative;
    }

    .delete-btn{
        background-color: crimson;
        color: #fff;
        width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 50% 50%;
        text-align: center;
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 12px;
    }

    .weui-uploader__img {
        display: block;
        width: 79px;
        height: 79px;
    }

    .weui-uploader__file_status {
        position: relative;
    }

    .weui-uploader__file_status:before {
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .weui-uploader__file-content {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #fff;
    }

    .weui-uploader__input-box {
        float: left;
        position: relative;
        margin-right: 9px;
        margin-bottom: 9px;
        width: 77px;
        height: 77px;
        border: 1px solid #d9d9d9;
    }

    .weui-uploader__input-box:after,
    .weui-uploader__input-box:before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
    }

    .weui-uploader__input-box:before {
        width: 2px;
        height: 39.5px;
    }

    .weui-uploader__input-box:after {
        width: 39.5px;
        height: 2px;
    }

    .weui-uploader__input-box:active {
        border-color: #999;
    }

    .weui-uploader__input-box:active:after,
    .weui-uploader__input-box:active:before {
        background-color: #999;
    }

    .weui-uploader__input {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
</style>