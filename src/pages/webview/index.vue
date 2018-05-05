<template>
    <web-view :src="webviewUrl" v-if="webviewUrl" @message="onWebviewMessage($event)"></web-view>
</template>

<script>
    export default{
      data() {
        return {
          webviewUrl: '',
        };
      },
      methods: {
        onWebviewMessage(e) {
          console.log(e);
        },
      },
      onLoad() {
        this.webviewUrl = decodeURIComponent(this.$root.$mp.query.url);
      },
    };

</script>

<style>

</style>