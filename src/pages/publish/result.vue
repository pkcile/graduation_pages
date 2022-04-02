<!--
 * @Author: 王朋坤
 * @Date: 2022-04-02 10:21:07
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-02 11:47:54
 * @FilePath: /graduation-project-master/src/pages/publish/result.vue
 * @Description: 
-->
<template>
  <div class="clockInforForm mine-send-part-absolute2">
    <div class="send-title">
      结果提示页面
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
    </div>
    <ul
      class="send-main"
      style="
        box-sizing: border-box;
        height: calc(100% - 136px);
        background: #fff;
        margin-bottom: 10px;
        padding: 10px 20px;
      "
    >
      <!-- 地点选择 -->
      <li class="infor-title">信息确定</li>
      <li class="infor-forsure" style=" overflow-y: auto;">
        <div class="mine-single-line-two" @click="showStartTimePopup">
          <div style="">创建编号</div>
          <div>{{ resultShow.id }}</div>
          <div><van-icon name="clock-o" /></div>
        </div>
        <div class="mine-single-line-two" @click="showStartTimePopup">
          <div style="">创建人员</div>
          <div>{{ resultShow.createuser }}</div>
          <!-- <div><van-icon name="clock-o" /></div> -->
        </div>
        <div class="mine-single-line-two" @click="showStartTimePopup">
          <div style="">打卡地点</div>
          <div>{{ resultShow.serverplacename }}</div>
          <!-- <div><van-icon name="clock-o" /></div> -->
        </div>
        <div class="mine-single-line-two" @click="showStartTimePopup">
          <div style="">打卡主题</div>
          <div>{{  resultShow.topic }}</div>
          <!-- <div><van-icon name="clock-o" /></div> -->
        </div>
        <div class="mine-single-line-two" @click="showStartTimePopup">
          <div style="">创建时间</div>
          <div>{{ publishDate }}</div>
          <!-- <div><van-icon name="clock-o" /></div> -->
        </div>
      </li>

      <!-- <li class="infor-title">
        操作选择
      </li>
    
      <li class="infor-forsure" style="height: 80px; overflow-y: auto;">
        <van-radio-group v-model="radio">
            <div class="mine-single-line-two" @click="showStartTimePopup">
                <div style="">打卡位置：</div>
                <div>{{ "打卡位置设置" }}</div>
                <div><van-radio name="2"></van-radio></div>
            </div>

            <div class="mine-single-line-two" @click="showStartTimePopup">
                <div style="">打卡WIFI：</div>
                <div>{{ "WIFI添加设置" }}</div>
                <div><van-radio name="3"></van-radio></div>
            </div>
        </van-radio-group>
      </li> -->
    </ul>
    <div class="send-footer" @click="clockInforMake">返回主页</div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Slider, Stepper, Icon, Divider,  RadioGroup, Radio, Cell, CellGroup} from "vant";
// import axios from "axios";
import { convertDate } from "@/utils/date.js"
export default {
  data() {
    return {
      publishTask: {
        param: {
          radius: 10,
          placename: "",
          user_username: this?.$store?.state?.User?.login?.username,
          starttime: this.convertDate(new Date()),
          endtime: this.convertDate(new Date()),
          content: "",
        },
        formData: {
          placename: [],
          starttime: {
            showDate: false,
            currentDate: new Date(),
          },
          endtime: {
            showDate: false,
          },
          currentDate: new Date(),
        },
        currentDate: new Date(),
      },
      radio: '1',
      activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
      inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      resultShow: {
        classnamesmark: false,
        createstamp: null,
        createuser: "guest",
        id: "001",
        placesmark: false,
        serverplacename: "打卡地址",
        timesmark: false,
        topic: "001",
        wifismark: false
      }
    };
  },
  computed: {
    publishDate() {
      return  convertDate(this.resultShow.createstamp)
    }
  },
  methods: {
    showStartTimePopup() {
      this.publishTask.formData.starttime.showDate = true;
    },
    showEndTimePopup() {
      this.publishTask.formData.endtime.showDate = true;
    },
    convertDate(Date) {
      const date = Date;
      const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        " " +
        (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
        ":" +
        (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
      //  +  ":"  + "00";
      console.log(
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      );
      console.log(
        date.getDate() + 1 > 9 ? date.getDate() + 1 : "0" + (date.getDate() + 1)
      );

      return dateString;
    },
    endtimeData(time) {
      console.log(time);
      this.publishTask.param.endtime = this.convertDate(time);
      this.publishTask.formData.endtime.showDate = false;
    },
    starttimeData(time) {
      console.log(time);
      this.publishTask.param.starttime = this.convertDate(time);
      this.publishTask.formData.starttime.showDate = false;
    },
    clockInforMake() {
        this.$router.push("/home/more");
    //   const _this = this;
    //   if (
    //     this.publishTask.param.placename != "" &&
    //     this.publishTask.starttime != "" &&
    //     this.publishTask.starttime != ""
    //   ) {
    //     axios
    //       .get(
    //         `${process.env.VUE_APP_POSITION_PATH}/api/position/publishtask`,
    //         { params: _this.publishTask.param }
    //       )
    //       .then(function (returnData) {
    //         _this.$notify("创建的任务号码" + returnData.data.id);
    //         _this.$emit("open-person-choose-form", returnData.data.id);
    //       })
    //       .catch(function () {
    //         _this.$notify("服务出现问题，或者你的网速过慢");
    //       });
    //   } else {
    //     _this.$notify("请输入完整地点和打卡起始时间");
    //   }
    },
    backTo() {
      // this.$router.push("/home/more");
      this.$parent.resultcomponentControl = false;
    },
    resultShow001(result) {
      console.log(result);
      this.$parent.resultcomponentControl = true;
      this.resultShow = result;
    }
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  mounted() {
    // 打卡信息数据初始化
    const initPositionData = JSON.parse(
      window.localStorage.getItem("initPositionData")
    );
    const initItems = initPositionData.features.filter((item) => {
      return item.properties.Name && item.properties.Name != " ";
    });
    let initItemsName = [];
    initItems.map((item) => {
      initItemsName.push({
        key: item.properties.Name,
        name: item.properties.Name,
      });
    });
    this.publishTask.formData.placename = initItemsName;

    // 数据
    // console.log(this.publishTask.param);
  },
};
</script>

<style lang="scss" scoped>
.infor-title {
  padding: 10px 0;
  // font-weight: 600;
  // font-family: monospace;
}
.infor-forsure {
  // border-top: 1px solid grey;
  border: 1px solid #aaa;
  border: 1px solid #8080802e;
  padding: 15px 10px;
  // background: #f1f1f4;
  border-radius: 5px;
  .mine-single-line-two {
    display: flex;
    & > div {
      line-height: 40px;
    }
    & > div:nth-of-type(1) {
      flex: 100px 0 0;
      color: #555;
    }
    & > div:nth-of-type(2) {
      flex: 200px 1 1;
      text-align: right;
      padding-right: 15px;
      color: #017aff;
    }
    & > div:nth-of-type(3) {
      // flex: 0% 1 0;
      display: flex;
      align-items: center;
    }
  }
}

.custom-button {
  width: 30px;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
  margin-left: 20px;
}

/* 弹出组件样式2 */
.mine-send-part-absolute2 {
  position: absolute;
  width: 100%;
  height: 100%;
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
    // display: flex;
    // align-items: center;
    // justify-content: center;
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
    height: calc(100% - 126px);
    overflow-y: auto;
  }
  .send-footer {
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: #007aff;
    color: white;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .send-footer:active {
    background: #007bffc7;
    color: #ddd;
    transition: all 100ms;
  }
}
</style>