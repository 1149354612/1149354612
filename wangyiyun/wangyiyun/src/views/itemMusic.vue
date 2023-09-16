<template>
<itemMusicTop :playlist="state.playlist"/>
<itemMusicList :itemList="state.itemList"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted,reactive } from 'vue';
import {getMusicItemList,getItemList} from '@/request/api/item';
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import itemMusicList from '@/components/item/itemMusicList.vue'
export default{
setup(){
    const state=reactive({
        playlist:{},
        itemList:[],
    })
    onMounted(async()=>{
        let id=useRoute().query.id;
        console.log(id);
        //获取歌单介绍数据
        let res=await getMusicItemList(id);
        console.log(res);
        state.playlist=res.data.playlist;
        //获取歌单歌曲
        let result=await getItemList(id);
        console.log(result);
        state.itemList=result.data.songs;

        sessionStorage.setItem('itemDetail',JSON.stringify(state))
    });
    return {state};
},
components:{
    itemMusicTop,itemMusicList
}
}
</script>
