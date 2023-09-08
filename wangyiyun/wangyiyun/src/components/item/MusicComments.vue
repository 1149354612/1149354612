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
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      const musicId = this.$store.state.playList[0].id; // 从state.playList获取id属性
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
    }
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

        /* 可以根据实际需求设置限制行数 */
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
</style>
