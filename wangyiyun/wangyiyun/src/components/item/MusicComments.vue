<template>
  <div>
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div>
      <h1 class="title">评论页面</h1>
      <ul class="comments">
        <li v-for="comment in comments" :key="comment.id">
          <p class="content">{{ comment.content }}</p>
          <p class="time">{{ comment.time }}</p>
        </li>
      </ul>
    </div>
    <div class="leavecomments">
      <input type="text" placeholder="留下你想说的话吧" class="input">
      <button>发送</button>
    </div>
  </div>
</template>

<script>
import { mapState ,mapMutations} from "vuex";
import { getMusicComments } from "@/request/api/home.js";

export default {
  data() {
    return {
      comments: [] // 评论数据
    };
  },
  mounted() {
    this.getMusicComments();
  },
  computed: {
    ...mapState(["state"]),
  },
  methods: {
    getMusicComments() {
      const musicId = this. $store. state. playList [this. $store. state.playListIndex].id; // 从state.playList获取id属性
      const limit = 20;
      const offset = 0;
      const before = null;
      getMusicComments(musicId, limit, offset, before)
        .then(response => {
          this.comments = response.data.comments;
        })
        .catch(error => {
          console.error(error);
        });
    },
    ...mapMutations(['updatePlayList','updatePlayListIndex'])
  }
};
</script>

<style lang="less" scoped>
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
  }

  .comments {
    list-style: none;
    margin: 0;
    padding: 0;
 
    li {
      margin-bottom: 20px;
      border-bottom: #ccc6c6 solid;
      .content {
        font-size: 16px;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* 显示的行数 */
        -webkit-box-orient: vertical;
      }

      .time {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
      }
    }
    
    
  }
  .leavecomments{
  display: absolute;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  .input{
    display: inline-block;
    position: absolute;
    left: 0;
    height: 30px;
    width: 80%;
    font-size: 16px;
    border:1px,solid;
    border-radius: 15px;
    background-color: #f6f6f6;
  }
  button{
    display: inline;
    align-items: center;
    justify-content: center;
    position: absolute;
    line-height: 40px;
    right: 10px;
    border: none;
    font-size: 18px;
    color: #b5afaf;
    background-color: #ffffff;
  }
  }
</style>
