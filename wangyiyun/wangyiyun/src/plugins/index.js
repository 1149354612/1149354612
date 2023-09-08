import { Swipe, SwipeItem,Button,Popup  } from 'vant';
// 放入数组中
let plugins=[
    Swipe,SwipeItem,Button,Popup 
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}

//模块的封装，但这次用按需引入，不需要用这种方法，如要使用，在main.js中
//引入后，getVant（app）就可以使用了