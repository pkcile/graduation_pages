<!--
 * @Author: your name
 * @Date: 2021-12-07 14:10:17
 * @LastEditTime: 2021-12-18 11:28:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/components/user/social/state2.vue
-->

<template>
  <div class="socail-page" style="z-index: 2">
    <div class="title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backToSocial"
      ></div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/clock.svg')})`,
        }"
        @click="initSendMessage"
      ></div>
    </div>

    <div class="main">
      <div
        class="background-img"
        :style="{
          'background-image': `url('https://wx1.sinaimg.cn/large/6c942574ly1gwzvc23zr5g20hs0dckjl.gif')`,
        }"
      >
        <!-- https://photo.weibo.com/1821648244/wbphotos/large/mid/4710088767701407/pid/6c942574ly1gwzvc23zr5g20hs0dckjl -->
        <div class="user-infor">
          <div class="name">wpkqq qq qq</div>
          <div
            class="img"
            :style="{
              'background-image': `url(${require('@/assets/img/user/1.jpg')})`,
            }"
          ></div>
        </div>
      </div>
      <section class="socail-state-item" v-for="item in userState" v-bind:key="item.key">
        <div
          class="user-img"
          :style="{
            'background-image': `url(${require('@/assets/img/user/1.jpg')})`,
          }"
        ></div>
        <div class="user-main">
          <div class="user-name">{{ item.user.name }}</div>
          <div class="user-comment">{{ item.content }}</div>
          <div class="user-status">
            <div class="location">{{ item.user.position }}</div>
            <div class="time">
              <div>{{ item.user.time }}</div>
              <div>{{ item.user.type }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="post send-part-message" :style="{display:sendPage}">
      <div class="title">
        <div
          class="control"
          :style="{
            'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
          }"
          @click="backHomeSocail"
        ></div>
        <div
          class="right"
          :style="{
            'background-image': `url(${require('@/assets/font/clock.svg')} )`,
          }"
          @click="sendMessage"
        ></div>
      </div>
      <div class="main">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="需要反馈发布的内容……"
        ></textarea>
        <div class="message-config">
          <van-cell-group>
            <van-cell center title="匿名发布" icon="location-o">
              <template #right-icon>
                <!-- <van-switch v-model="checked" size="24" /> -->
                 <van-checkbox v-model="checked"></van-checkbox>
              </template>
            </van-cell>
            <van-cell center title="获取定位" icon="location-o">
              <template #right-icon>
                <van-checkbox v-model="checked"></van-checkbox>
              </template>
            </van-cell>
            <van-cell
              center
              title="主题选择"
              readonly
              clickable
              :value="value"
              placeholder="选择城市"
              @click="showPicker = true"
              icon="location-o"
            >
              <template #right-icon>
                <!-- <van-switch v-model="checked" size="24" /> -->
              </template>
            </van-cell>

            <van-popup v-model="showPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </van-cell-group>
        </div>
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
  data() {
    return {
      sendPage: "none",
      currentPage: 1,
      checked: false,
      studentData: [
        {
          user_username: "hhxx",
          task_id: "47",
          edittime: "2021-07-05 18:49:16",
          status: "1",
          comment: "好好学习测试打卡",
        },
      ],
      value: "",
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      userState: [
        {
          key: 1,
          user: {
            name: "zzz",
            backgroundImg: require('@/assets/img/user/1.jpg'),
            position: "黄河流域",
            time: new Date().toDateString(),
            type: "打卡动态"
          },
          content: "打卡成功，Everthing will be OK!",
          comment: [
            {}
          ]
        },
        {
          key: 2,
          user: {
            name: "zzz",
            backgroundImg: require('@/assets/img/user/1.jpg'),
            position: "黄河流域",
            time: new Date().toDateString(),
            type: "打卡动态"
          },
          content: "打卡成功，Everthing will be OK!如果你已经拷贝了密钥,但想要替换为新的密码,使用 -f 选项覆盖已有的密钥。 $ ssh-copy-id -f sk@192.168.225.22 我们现在已经成功地将本地系统的 SSH 公钥添加进了远程系统。现在,让我们在远程系统上完全禁用掉基于密码认证的",
          comment: [
            {}
          ]
        },
        {
          key: 3,
          user: {
            name: "zzz",
            backgroundImg: require('@/assets/img/user/1.jpg'),
            position: "黄河流域",
            time: new Date().toDateString(),
            type: "打卡动态"
          },
          content: "打卡成功，Everthing will be OK!",
          comment: [
            {}
          ]
        },
        {
          key: 4,
          user: {
            name: "zzz",
            backgroundImg: require('@/assets/img/user/1.jpg'),
            position: "黄河流域",
            time: new Date().toDateString(),
            type: "打卡动态"
          },
          content: "打卡成功，Everthing will be OK!",
          comment: [
            {}
          ]
        },        
        {
          key: 5,
          user: {
            name: "zzz",
            backgroundImg: require('@/assets/img/user/1.jpg'),
            position: "黄河流域",
            time: new Date().toDateString(),
            type: "打卡动态"
          },
          content: "打卡成功，Everthing will be OK!",
          comment: [
            {}
          ]
        }
      ]
    };
  },
  mounted() {
    const _this = this;
    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/recordshow`)
      .then(function (returnData) {
        console.log(returnData.data);
        returnData.data.recordShow.map((item, index) => {
          if (item.edittime) {
            _this.studentData.push({
              user_username: item["user_username"],
              username: "0000",
              edittime: item.edittime,
              status: item.status,
              comment: item.comment,
              id: index,
            });
          }
        });
        console.log(_this.studentData);
      });
  },
  methods: {
    backToSocial() {
      this.$router.push("/home/social");
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    sendMessage() {
      this.sendPage = "block";
    },
    initSendMessage() {
      this.sendPage = "block";
    },
    backHomeSocail() {
      this.sendPage = "none";
    }
  },
};
</script>

<style lang="scss" scoped>
// .post {
// }

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
    position: relative;
    background: rgba(255, 255, 255, 0);
    height: 50px;
    z-index: 1;
    // width: 100%    text-align: center;
    .control {
      position: absolute;
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
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
    position: relative;
    textarea {
      height: 200px;
    }
  }
}
.socail-page {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background: #f1f1f4;
  z-index: 0;
  & > .title {
    position: absolute;
    background: rgba(100, 10, 0, 0.2);
    height: 50px;
    top: 0;
    z-index: 1;
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
      background-size: 50%;
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
    height: 100%;
    width: 100%;
    overflow-y: auto;
    position: absolute;
    z-index: 0;
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

.socail-state-item {
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