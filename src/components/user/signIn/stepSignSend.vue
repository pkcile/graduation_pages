<!--
 * @Author: your name
 * @Date: 2021-11-09 22:24:48
 * @LastEditTime: 2021-11-24 21:17:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/stepSignSend.vue
-->
<template>
    <div class="mine-send-part-absolute" style="width:100%;height:100%;">
    <div class="send-title">
      打卡提交
      <router-link to="/home/social">
        <div
          class="send-control"
          :style="{
            'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
          }"
        ></div>
      </router-link>
    </div>
    <ul class="send-main" style="overflow: hidden;">
      <section class="date">
        {{ date.full }}
      <section class="infor-title">
        <!-- <div>江西师范大学</div> -->
        <div>地点微调</div>
      </section>
        </section>

      <section class="comment">
        <textarea name="" id="" cols="30" rows="10" placeholder="请填写签到备注" v-model="comment" style="resize:none;"></textarea>
      </section>
    </ul>
    <div class="send-footer" @click="forSureResult">确认选择</div>
  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js"
import { getCurrentLocation } from "@/utils/geolocation.js"

export default {
  data() {
    return {
      map: "",
      number: convertDate(),
      date: {
        full: convertDate(),
        hourMinute: convertDate().substr(11, 5)
      },
      comment: "",
    };
  },
  mounted() {
    const _this = this;
    this.setTimeFun();
    
  },
  computed: {
    setTimeFun01: function() {
      setInterval(() => {
        this.date.full = convertDate();
        this.date.hourMinute = convertDate().substr(11, 5);
      }, 500);
    }
  },
  methods: {
    setTimeFun() {
      setInterval(() => {
        this.date.full = convertDate();
        this.date.hourMinute = convertDate().substr(11, 5);
      }, 500);
    },
    forSureResult() {
      console.log(666);
      this.$emit("open-result-form", {test: '001'});
    }
    
  },
};
</script>

<style lang="scss" scoped>
.date {
  line-height: 40px;
  font-size: 15px;
  // border-bottom: 1px solid #aaa;
  padding: 10px;
  background: #fff;
}

.infor-title {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 10px;
  font-size: 17px;
  color: #555;
  background: #fff;
  & > div:nth-of-type(1) {
    flex: 1 0 200px;
  }
  & > div:nth-of-type(2) {
    color: rgba(0, 0, 255, 0.692);
    flex: 0 0 100px;
    display: flex;
    justify-content: right;
  }
}

.comment {
  width: 100%;
  height: 150px;
  background: #fff;
  margin-top: 15px;
  padding: 10px;
  textarea {
    width: 100%;
    height: 100%;
    border-width: 0;
    resize: none;
  }
}


/* 弹出组件样式2 */
.mine-send-part-absolute-sign {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  left: 0%;
  top: 0%;
  background: #f1f1f4;
  // background: #fff;
  z-index: 0;
  .send-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 500;
    font-size: 17px;
    position: relative;
    background: #f7f7f7;
    .send-control {
      position: absolute;
      right: 50;
      top: 0;
      width: 50px;
      height: 100%;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .send-control:active {
     background-color: #eee;
    }
  }
  .send-main {
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
  }
  
}
 

</style>