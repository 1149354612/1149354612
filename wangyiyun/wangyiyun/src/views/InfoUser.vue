<template>
    <div class="nav">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>个人主页</span>
      </div>

</template>

<script>
import { mapState } from 'vuex';
export default{
    computed:{
        ...mapState(['user'])
    },
    mounted() {
        console.log(this.user);
    },
}
</script>

<style lang="less" scoped>
.nav {
    width: 100%;
    height: 30px;
    .icon {
        width: 30px;
        height: 30px;
    }
}
span{
  margin: 0,auto;
  font-size: 36px;
  text-align: center;
}
</style>