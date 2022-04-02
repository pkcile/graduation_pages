<!--
 * @Author: 王朋坤
 * @Date: 2022-04-02 17:08:58
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-02 17:36:11
 * @FilePath: /graduation-project-master/src/pages/usercontrol/useradd.vue
 * @Description: 
-->
<template>
    <div
    class="social-page send-part-message"
    style="z-index: 2; background: #efeff3"
  >
    <div class="title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
        }"
        @click="rightSure"
      ></div>
      <div class="text">学生信息</div>
    </div>
    <div class="main" style="background: #efeff3">
      <div style="padding: 0 10px 10px 10px;">
        <div class="mine-double-line-date" style="display: none">
          <div class="title">
            <div style="color: #007aff" @click="useraddcomponentControl=true">用户添加</div>
            <!-- <div style="color: #007aff" @click="useraddcomponentControl=true">用户添加</div> -->
          </div>
          <div
            class="main"
            style="
              background: #fff;
              border-radius: 5px;
            "
          >
            <!-- <van-cell title="可选择多个" :value="323" @click="show = true" /> -->
            <!-- v-for="getHourItem in getHours" v-bind:key="getHourItem.id" -->
            <div
              class="mine-single-line-three-001"
              v-for="item in itemsData"
              v-bind:key="item.key"
            >
              <div>{{ item.name }}</div>
              <div>{{ item.studynth }}</div>
              <div><van-icon name="arrow" /></div>
            </div>
          </div>
        </div>
          <div class="mine-double-line-date">
          <div class="title">
            <div style="color: #007aff" @click="useraddcomponentControl=true">用户添加</div>
            <!-- <div style="color: #007aff" @click="useraddcomponentControl=true">用户添加</div> -->
          </div>
          <div
            class="main inputmain"
            style="
              background: #fff;
              border-radius: 5px;
              margin-top: 0px;
            "
          >
          <div>
            <div class="mine-input-row-001">
              <label>{{ "学号" }}</label>
              <input type="text" />
              <!-- :placeholder="inputItem.inputplaceholder"
                v-model="inputItem.value" -->
            </div>
            <div class="mine-input-line"></div>
          </div>
          <div>
            <div class="mine-input-row">
              <label>{{ "班级" }}</label>
              <input type="text" />
              <!-- :placeholder="inputItem.inputplaceholder"
                v-model="inputItem.value" -->
            </div>
            <div class="mine-input-line"></div>
          </div>
          <div>
            <div class="mine-input-row-001">
              <label>{{ "姓名" }}</label>
              <input type="text" />
              <!-- :placeholder="inputItem.inputplaceholder"
                v-model="inputItem.value" -->
            </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      classnames: [],
      itemsData: [],
    }
  },
  methods: {
    backTo() {
      this.$parent.useraddcomponentControl = false;
    },
    rightSure() {
      console.log("2232");
      this.$parent.useraddcomponentControl = false;
    }
  }
}
</script>


<style lang="scss" scoped>
.inputmain {
  /* 输入框 */
  .mine-input-row-001 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    line-height: 40px;
    // background: #fff;
    label {
      flex: 0 0 80px;
      display: flex;
      justify-content: center;
    }
    input {
      flex: 1 1 80px;
      display: flex;
      /* justify-content: center; */
    }
  }
}

/* 单行三个元素 */
.mine-single-line-three-001 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #8080802e;
  padding: 10px 8px;
  cursor: pointer;
  & > div:nth-of-type(1) {
    flex: 1 1 120px;
    padding-left: 10px;
    color: #555;
  }
  & > div:nth-of-type(2) {
    flex: 1 1 140px;
    // color: #444;
    color: #555;
    text-align: right;
    padding-right: 20px;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #555;
  }
}

.mine-single-line-three-001:active {
  background-color: #eee;
  transition: all 300ms;
}

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
  z-index: 0;
  // border-bottom: #8080802e 1px solid;
  & > .title {
    position: relative;
    background: #f7f7f7;
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

.mine-double-line-date {
  & > .title {
    margin: 15px auto 5px auto;
    padding: 7px;
    display: flex;
    & > div:nth-of-type(1) {
      flex: 1 1 100px;
    }
    & > div:nth-of-type(2) {
      flex: 0 0 100px;
      text-align: right;
    }
  }

  & > .main {
    & > div:last-of-type {
      border-bottom: solid 0px #aaa !important;
    }
  }

  .van-cell {
    // border-radius: 5px;
  }
}
</style>