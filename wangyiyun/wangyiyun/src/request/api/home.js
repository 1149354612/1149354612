import service from "@/request/index.js";
//获取轮播图
export function getBanner() {
    return service({
        method: "GET",
        url: "/banner?type=2",
    })
}
//获取推荐歌单
export function getMusicList() {
    return service({
        method: "GET",
        url: "/personalized?limit=10",
    })
}
//获取搜索结果
export function getSearchMusic(data) {
    return service({
        method: "GET",
        url: `/search?keywords= ${data}`,
    })
}
export function sendCaptcha(data) {
    return service({
        method: "POST",
        url: `/captcha/sent?phone=${data.phone}`,
    })
}
export function verifyCaptcha(data) {
    return service({
        method: "GET",
        url: `/captcha/verify?phone=${data.phone}&captcha=${data.captcha}`,
    })
}
//获取二维码key
export function generateQRCodeKey() {
    return service({
        method: "GET",
        url: `/login/qr/key`,
    })
}
//获取二维码
export function generateQRCode(data) {
    return service({
        method: "GET",
        url: `/login/qr/create`,
        params:data
    })
}
//验证二维码
export function checkQRCodeStatus(data) {
    return service({
        method: "GET",
        url: `/login/qr/check`,
        params:data
    })
}
//获取用户详情
export function getLoginUser(data) {
    return service({
        method: "GET",
        url: `/user/detail?uid=${data}`
    })
}
//获取歌曲评论
export function getMusicComments(data) {
    return service({
        method:"GET",
        url:`/comment/music?id=${data}`
    })
}