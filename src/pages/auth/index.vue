<template>
    <div class="container">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo($event)">获取用户信息</button>
    </div>
</template>

<script>
    import store from '@/store/index';

    export default {
      store,
      data() {
        return {
        };
      },

      methods: {
        getUserInfo(e) {
          console.log(e);
        },
      },
    };
</script>

<style scoped>
</style>