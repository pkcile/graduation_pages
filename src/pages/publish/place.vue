<!--
 * @Author: 王朋坤
 * @Date: 2022-03-27 20:46:04
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-27 20:55:08
 * @FilePath: /graduation-project-master/src/pages/publish/place.vue
 * @Description: 
-->
<template>
  <div class="social-page send-part-message" style="z-index: 2;background:#EFEFF3" >
    <div class="title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
      <div class="text">打卡主题</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
        }"
        @click="initSendMessage"
      ></div>
    </div>

    <div class="main" style="background:#efeff3">
      <div>
        <input
          v-model="inputData"
          type="text"
          style="
            border: 1px solid #8080802e;
            padding: 10px;
            width: 96%;
            display: block;
            margin: 12px auto;
            border-radius: 5px;
            box-sizing: border-box;
          "
          placeholder="可填写本次打卡主题"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  Pagination,
  Switch,
  Cell,
  CellGroup,
  Picker,
  Field,
  Popup,
  Checkbox
} from "vant";
import axios from "axios";

export default {
  components: {
    [Pagination.name]: Pagination,
    [Switch.name]: Switch,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,

  },
  props: {
    inputcomponentData: String
  },
  data() {
    return {
      inputData: ""
    };
  },
  mounted() {
  
  },
  methods: {
    backTo() {
      this.$parent.placecomponentControl=false;
    },
    backToSocial() {
      this.$router.push("/home/more");
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    sendMessage() {
      this.sendPage = "block";
    },
    initSendMessage() {
      // this.$parent.pageData.inputcomponentData = this.inputData;
      this.$parent.placecomponentControl = false;
    },
    backHomesocial() {
      this.sendPage = "none";
    }
  },
};
</script>

<style lang="scss" scoped>

.send-part-message {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  textarea {
    resize: none;
    width: 100%;
    box-sizing: border-box;
    border-width: 0;
    padding: 20px;
  }
  & > .title {
    // position: relative;
    background: rgba(255, 255, 255, 0);
    height: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // width: 100%    text-align: center;
    .control {
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
    .text {
      flex: 1 0 100px;
    }
    .right {
      width: 50px;
      height: 100%;
      right: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
  }
  & > .main {
    background: #fff;
    height: calc(100% - 50px);
    width: 100%;
    overflow-y: auto;
    position: relative;
    textarea {
      height: 200px;
    }
  }
}
.social-page {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background: #f1f1f4;
  z-index: 0;
  & > .title {
    position: relative;
    background: #F7F7F7;
    height: 50px;
    top: 0;
    // z-index: 1;
    width: 100%;
    text-align: center;
    .control {
      position: absolute;
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-position: center;
      // background-size: 50%;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .right {
      position: absolute;
      width: 50px;
      height: 100%;
      right: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
  }
  & > .main {
    background: #fff;
    height: calc(100% - 50px);
    width: 100%;
    overflow-y: auto;
    // position: absolute;
    // z-index: 0;
    .background-img {
      margin-bottom: 50px;
      height: 150px;
      width: 100%;
      position: relative;
      background-size: cover;
      background-repeat: repeat-x;
    }
    .user-infor {
      position: absolute;
      right: 0;
      bottom: -25px;
      width: 120px;
      height: 50px;
      // border: 1px solid red;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      .name {
        flex: 1 0 50px;
      }
      .img {
        height: 50px;
        flex: 0 0 55px;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 9%;
      }
    }
  }
}

.social-state-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  div {
    line-height: 25px;
    font-size: 16px;
  }
  .user-img {
    flex: 0 0 50px;
    height: 50px;
    background: #bbb;
    margin-left: 12px;
    background-size: contain;
    border-radius: 9%;
  }
  .user-main {
    flex: 1 1 50px;
    padding-left: 5px;
    .user-name {
      color: blue;
    }
    .user-status {
      color: #999;
      div {
        font-size: 14px;
      }
      // .location {
      // }
      .time {
        display: flex;
      }
    }
  }
}
</style>