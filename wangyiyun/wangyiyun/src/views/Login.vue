<template>
  <div class="nav">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
  </div>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="text"
        name="captcha"
        class="captcha"
        v-model="captcha"
        placeholder="请输入验证码"
      />
      <button class="btn1" @click="sendCaptcha">发送验证码</button>
      <button class="btn" @click="login">登录</button>
      <br />
      <span class="tip">扫描二维码登录</span>
      <div v-if="key">
        <img :src="qrCode" alt="二维码" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  checkQRCodeStatus,
  generateQRCodeKey,
  generateQRCode,
  sendCaptcha,
  verifyCaptcha,
} from "@/request/api/home.js";
export default {
  data() {
    return {
      phone: "",
      captcha: "",
      key: "",
      qrCode: "",
    };
  },
  methods: {
    async init() {
      await this.generateQRCodeKey();
      await this.generateQRCode();
      await this.checkQRCodeStatus();
    },
    sendCaptcha: async function () {
      try {
        const response = await this.$store.dispatch("sendCaptcha", {
          phone: this.phone,
        });
        // 根据返回结果判断验证码发送是否成功，可以在这里添加相应的逻辑处理
        console.log("验证码发送成功");
      } catch (error) {
        // 处理错误情况
        console.error("验证码发送失败", error);
      }
    },
    generateQRCodeKey: async function () {
      try {
        const response = await generateQRCodeKey();
        this.key = response.data.data.unikey;
      } catch (error) {
        console.error("生成二维码密钥失败", error);
      }
    },
  

    async generateQRCode() {
      console.log(this.key);
      try {
        const response = await generateQRCode({
          key: this.key,
          qrimg: true,
        });
        console.log(response);
        this.qrCode = response.data.data.qrimg;
      } catch (error) {
        console.error("生成二维码失败", error);
      }
    },
    async  checkQRCodeStatus(){
      try {
        const response = await checkQRCodeStatus( {
          key: this.key,
        });
        const status = response.data.status;
        if (status === 801) {
          // 二维码待扫描
          console.log("二维码待扫描");
        } else if (status === 802) {
          // 二维码待确认
          console.log("二维码待确认");
        } else if (status === 803) {
          // 二维码授权登录成功
          console.log("二维码登录成功", response.data.cookies);
          this.$store.commit("updateIsLogin", true);
          this.$router.push("/infoUser");
        } else if (status === 800) {
          // 二维码过期
          console.log("二维码已过期");
          clearInterval(this.qrCodeTimer);
        } else if (status === 502 && response.data.noCookie === true) {
          // 需要加上 noCookie 参数重新请求
          console.log("重新请求二维码检测扫码状态接口");
        }
      } catch (error) {
        console.error("二维码检测扫码状态接口失败", error);
      }
    },
    login: async function () {
      try {
        const response = await this.$store.dispatch("verifyCaptcha", {
          phone: this.phone,
          captcha: this.captcha,
        });
        if (response.data.code === 200) {
          // 验证成功，进行登录操作
          this.$store.commit("updateIsLogin", true);
          this.$router.push("/infoUser");
        } else {
          alert("验证码错误");
        }
      } catch (error) {
        // 处理错误情况
        console.error("验证码验证失败", error);
      }
    },
  },
  mounted() {
    this.init();

    // 每隔一段时间检查二维码扫码状态
    this.qrCodeTimer = setInterval(this.checkQRCodeStatus, 3000);
  },
  beforeDestroy() {
    clearInterval(this.qrCodeTimer); // 销毁定时器
  },
};
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

.login {
  width: 100%;
  height: 80%;
  margin-top: 100px;
  .loginTop {
    font-size: 36px;
    font-family: fantasy;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loginContent {
    margin-top: 20px;
    text-align: center; /* 将文本内容居中对齐 */

    .phone,
    .captcha {
      width: 80%;
      height: 40px;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .btn1 {
      width: 30%;
      height: 40px;
      background-color: #d30a0a;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn {
      width: 50%;
      height: 40px;
      background-color: #d30a0a;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 auto;
    }
  }
  .tip {
    display: block;
    margin-top: 20px;
  }
}
</style>
