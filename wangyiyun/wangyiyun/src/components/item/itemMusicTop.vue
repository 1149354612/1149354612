<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="" class="coverImg">
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gl-play-copy"></use>
                </svg>
                <span>{{playlist.playCount}}</span>
            </div>
        </div>
        <div class="contentRight">
            <p class="rightP_one">{{playlist.name}}</p>
            <div class="rightimg">
                <img :src="playlist.creator.backgroundUrl" alt=""/>
                <span>{{playlist.creator.nickname}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <p class="rightP_two">
                <span>{{playlist.description}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </p>
        </div>
    <div class="itemTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <span>{{playlist.commentCount}}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{playlist.shareCount}}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        console.log(props);
        //通过props传值，判断如果数据拿不到，就获取sessionStorage中的数据
        if((props.playlist.creator="")){
            props.playlist,creator=JSON.parse(sessionStorage.getItem().playlist).creator;
        }
    },
    props: ['playlist']
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: #fff;
    .bgimg {
        width: 100%;
        height: 40%;
        position: fixed;
        top: 0;
        z-index: -1;
        filter: blur(.4rem);
    }
    .itemLeft {
        display: flex;
        align-items: center;
        font-size: 16px;
        svg.icon {
          fill: #fff;
        }
        span {
            margin-left: 5px;
            font-size: 20px;
        }
    }
    .itemRight {
        display: flex;
        align-items: center;
        svg.icon {
           fill: white;
        }
    }
}

.contentLeft {
    position: relative;
    display:flex;
   .coverImg{
    width: 130px;
    height: 140px;
    padding-left: 10px;
    padding-top: 20px;
    border-radius: 15%;
    box-sizing: border-box;
   }
    .playCount {
        position: absolute;
        top: 20px;
        left: 10px;
        display: flex;
        color: #fff;
        svg.icon {
            /* 设置图标样式 */
            height: 16px;
            width: 16px;
        }
        span {
            margin-left: 5px;
        }
    }
}

.contentRight {
    padding: 10px;
    position: relative;
    display: flex;
    .rightP_one {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #fff;
        position: absolute;
        top: -120px;
        right: 15px;
        display: block; /* 将span元素设置为块级元素 */
        width: 200px; 
        height: 20px; 
        word-wrap: break-word;
    }
    .rightimg {
        display: flex;
        align-items: center;
        position: absolute;
        top: -60px;
        right: 110px;
        img {
           height: 30px;
           width: 30px;
           border-radius: 50%;
        }
        span {
            margin-left: 5px;
            color: rgb(206, 202, 202);
        }
        svg.icon {
           height: 18px;
           width: 18px;
        }
    }
    .rightP_two {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: absolute;
        right: 5px;
        top: -35px;
        span {
            display: inline-block;
            width: 200px;
            vertical-align: middle;
            max-width: calc(100% - 20px - 16px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgb(206, 202, 202);
        }
        svg.icon {
           fill: #fff;
           height: 16px;
           width: 16px;
        }
    }
}

.itemTopFooter {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 20px;
    
    .footerItem {
        display: flex;
        align-items: center;
        svg.icon {
           fill: #fff;
        }
        span {
            margin-left: 5px;
            color: #fff;
        }
    }
}
</style>
