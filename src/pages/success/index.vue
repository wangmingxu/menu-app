<template>
    <div class="page">
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <icon type="success" size="93"></icon>
            </div>
            <div class="weui-msg__text-area">
                <div class="weui-msg__title">操作成功</div>
                <div class="weui-msg__desc">已成功下单，可在我的订单页面中查看下单详情
                    <!-- <navigator url="" class="weui-msg__link">文字链接</navigator> -->
                </div>
            </div>
            <div class="weui-msg__opr-area">
                <div class="weui-btn-area">
                        <navigator url="/pages/myorder/main" hover-class="navigator-hover" style="margin-bottom: 15px;">
                            <button class="weui-btn" type="primary">我的订单</button>
                        </navigator>
                        <navigator url="/pages/feedback/main" hover-class="navigator-hover">
                            <button class="weui-btn" type="default">反馈意见</button>
                        </navigator>
                </div>
            </div>
            <div class="weui-msg__extra-area">
                <div class="weui-footer">
                    <!-- <div class="weui-footer__links">
                        <navigator url="" class="weui-footer__link">底部链接文本</navigator>
                    </div> -->
                    <div class="weui-footer__text">Copyright © 2008-2018 weui.io</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .weui-msg {
        padding-top: 36px;
        text-align: center;
    }

    .weui-msg__link {
        display: inline;
        color: #586c94;
    }

    .weui-msg__icon-area {
        margin-bottom: 30px;
    }

    .weui-msg__text-area {
        margin-bottom: 25px;
        padding: 0 20px;
    }

    .weui-msg__title {
        margin-bottom: 5px;
        font-weight: 400;
        font-size: 20px;
    }

    .weui-msg__desc {
        font-size: 14px;
        color: #999;
    }

    .weui-msg__opr-area {
        margin-bottom: 25px;
    }

    .weui-msg__extra-area {
        margin-bottom: 15px;
        font-size: 14px;
        color: #999;
    }

    @media screen and (min-height:438px) {
        .weui-msg__extra-area {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            text-align: center;
        }
    }

    .weui-btn {
        margin-top: 15px;
    }

    .weui-btn:first-child {
        margin-top: 0;
    }

    .weui-btn-area {
        margin: 1.17647059em 15px 0.3em;
    }
</style>