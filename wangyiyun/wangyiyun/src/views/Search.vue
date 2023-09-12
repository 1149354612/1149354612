<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="Red Velvet" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">搜索历史</span>
        <div class="box">
            <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
                {{ item }}
            </span>
        </div>

        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
        <div class="item" v-for="(item, i) in searchList" :key="i">
            <div class="itemLeft" @click="updateIndex(item)">
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <p>{{ item.name }}</p>
                    <span v-for="(item1, index) in item.artists" :key="index">
                        {{ item1.name }}
                        <span v-if="index < item.artists.length - 1" class="artists">/</span>
                    </span>
                </div>
            </div>
            <div class="itemRight">
                <svg class="icon bofang" aria-hidden="true" v-if='item.mv != 0'>
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { getSearchMusic} from "@/request/api/home.js";
import { mapState ,mapMutations} from "vuex";
export default {
    setup(props) {
        // console.log(props);
    },
    props: ["itemList"],
    data() {
        return {
            keyWordList: [],
            searchKey: "",
            searchList: [],
            comments: [],// 评论数据
        };
    },
    computed: {
        ...mapState(["state"]),
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || [];
    },
    methods: {
        enterKey: async function () {
            if (this.searchKey !== "") {
                this.keyWordList.unshift(this.searchKey);
                //   去重
                this.keyWordList = [...new Set(this.keyWordList)];
                // 固定长度
                if (this.keyWordList.length > 10) {
                    this.keyWordList.splice(this.keyWordList.length - 1, 1);
                }
                localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
                let res = await getSearchMusic(this.searchKey);
                // console.log(res);
                this.searchList = res.data.result.songs;
                this.searchKey = "";
            }
        },
        delHistory: function () {
            localStorage.removeItem("keyWordList");
            this.keyWordList = [];
        },
        searchHistory: async function (item) {
            let res = await getSearchMusic(item);
            //   console.log(res);
            this.searchList = res.data.result.songs;
        },
        updateIndex: function (item) {

            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit("pushPlayList",item)
            this.$store.commit("updatePlayListIndex", this.$store.state.playList.length - 1)
          
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex']),

    },
};
</script>
<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: 10px;
        border: none;
        border-radius: 25px;
        border: 1px solid #999;
        width: 90%;
        padding: 5px;
    }
}

.searchHistory {
    width: 100%;
    padding: 10px;
    position: relative;

    .searchSpan {
        font-size: 18px;
        font-weight: bold;
    }

    .box {
        width: 100%;
        height: 100px;

        .spanKey {
            display: inline-block;
            background-color: #eeeaea;
            padding: 5px;
            border-radius: 20px;
            margin: 10px 10px;
            white-space: nowrap;
        }
    }

    .icon {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 30px;
        top: 17px;
    }
}

.itemList {
    width: 100%;

    .item {
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .itemLeft {
            width: 85%;
            height: 100%;
            display: flex;
            align-items: center;

            .leftSpan {
                display: inline-block;
                width: 0.2rem;
                text-align: center;

                .artists {
                    overflow: hidden;
                }
            }

            div {
                p {
                    width: 4.54rem;
                    height: .4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                }

                span {
                    font-weight: 400;
                    font-size: .24rem;
                    color: #999;
                }

                margin-left: 0.3rem;
            }
        }

        .itemRight {
            width: 20%;
            height: 100%;
            display: flex;
            // justify-content: space-between;
            align-items: center;
            position: relative;

            .icon {
                fill: #999;
            }

            .bofang {
                position: absolute;
                left: 0;
            }

            .liebiao {
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>
 