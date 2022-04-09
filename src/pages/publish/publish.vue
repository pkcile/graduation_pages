<!--
 * @Author: 王朋坤
 * @Date: 2022-03-27 16:15:38
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-09 13:29:01
 * @FilePath: /graduation-project-master/src/pages/publish/publish.vue
 * @Description: 
-->
<template>
  <div
    class="clockInforForm mine-send-part-absolute"
    style="
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
    "
  >
    <div class="send-title">
      打卡信息设置
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
    </div>
    <ul
      class="mine-double-line send-main"
      style="
        box-sizing: border-box;
        height: calc(100% - 50px);
        background: #fff;
        margin-bottom: 10px;
        padding: 10px 20px;
      "
    >
      <!-- 打卡主题设置 -->
      <li>
        <div
          class="mine-single-line-three-theme1"
          @click="inputcomponentControl = true"
        >
          <div>主题</div>
          <div>
            {{
              pageData.inputcomponentData
                ? pageData.inputcomponentData
                : "未初始化"
            }}
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <!-- 打卡时间设置 -->
      <li>
        <div
          class="mine-single-line-three-theme1"
          @click="datecomponentControl = true"
        >
          <div>时间</div>
          <div>
            {{
              pageData.datecomponentData
                ? "" + pageData.datecomponentData.length + "个时间节点"
                : "未初始化"
            }}
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <li>
        <div
          class="mine-single-line-three-theme1"
          @click="placecomponentControl = true"
        >
          <div>地点</div>
          <div>
            {{
              pageData.placecomponentData
                ? "" + (pageData.placecomponentData.length + (pageData.serverplacename ? 1 : 0)) + "个地点节点"
                : "未初始化"
            }}
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <li>
        <div
          class="mine-single-line-three-theme1"
          @click="studentcomponentControlFun"
        >
          <div>人员</div>
          <div>
            {{
              pageData.studentcomponentData
                ? "" + pageData.studentcomponentData.length + "个人员节点"
                : "未初始化"
            }}
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <li>
        <div
          class="mine-single-line-three-theme1"
          @click="wificomponentControl = true"
        >
          <div>辅助</div>
          <div>
            {{
              pageData.wificomponentData
                ? "" + pageData.wificomponentData.length + "个WIFI节点"
                : "值可为空"
            }}
          </div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>

      <li @click="clockInforMake" style="" class="clockNext">下一步</li>
    </ul>
    <!-- <div class="send-footer"  @click="clockInforMake" style="background: #fff;color:#00f;border:1px dotted #00f;">
      下一步
    </div> -->
    <inputcomponent
      v-show="inputcomponentControl"
      :inputcomponentData="pageData.inputcomponentData"
    ></inputcomponent>
    <datecomponent
      v-show="datecomponentControl"
      :datecomponentData="pageData.datecomponentData"
    ></datecomponent>
    <placecomoponent
      v-show="placecomponentControl"
      :placecomponentData="pageData.placecomoponentData"
    ></placecomoponent>
    <wificomoponent
      v-show="wificomponentControl"
      :wificomponentData="pageData.wificomponentData"
    ></wificomoponent>
    <studentcomponent
      v-show="studentcomponentControl"
      :studentcomponentData="pageData.studentcomponentData"
      ref="studentcomponentControlRef"
    ></studentcomponent>
    <resultcomponent
      v-show="resultcomponentControl"
      :resultcomponentData="pageData.resultcomponentData"
      ref="resultcomponentControlRef"
    ></resultcomponent>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Slider, Stepper, Icon } from "vant";
import axios from "axios";
import inputcomponent from "./input.vue";
import datecomponent from "./date.vue";
import placecomoponent from "./place.vue";
import wificomoponent from "./wifi.vue";
import studentcomponent from "./student.vue";
import resultcomponent from "./result.vue";

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
      pageData: {
        inputcomponentData: "",
        placecomponentData: null,
        serverplacename: "",
        datecomponentData: null,
        wificomponentData: null,
        studentcomponentData: null,
        resultcomponentData: null

      },
      inputcomponentControl: false,
      placecomponentControl: false,
      datecomponentControl: false,
      wificomponentControl: false,
      studentcomponentControl: false,
      resultcomponentControl: false
    };
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    inputcomponent: inputcomponent,
    datecomponent: datecomponent,
    placecomoponent: placecomoponent,
    wificomoponent: wificomoponent,
    studentcomponent: studentcomponent,
    resultcomponent: resultcomponent
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
      const _this = this;
      let params = {
        Stamps: this.pageData.datecomponentData,
        Students: this.pageData.studentcomponentData,
        Places: this.pageData.placecomponentData,
        Wifis: this.pageData.wificomponentData,
        serverplacename: this.pageData.serverplacename,
        createuser: this.$store.state.User.login.userinformation ? this.$store.state.User.login.userinformation.username : "guest",
        topic: this.pageData.inputcomponentData
      }
      
      if (
        params?.Stamps?.length &&
        params?.Students?.length &&
        (this.pageData?.placecomponentData?.length + (this.pageData?.serverplacename ? 1 : 0)) &&
        params?.topic 
      ) {
        axios
          .get(
            `${process.env.VUE_APP_POSITION_PATH}/task/publishMain`,
            { params: params }
          )
          .then(function (returnData) {
            if(returnData.data.status.mark == 1) {
              _this.$notify({message: "任务创建成功", duration: 0, type: "success"})
              setTimeout(() => {
                 _this.$notify.clear();
                _this.$refs["resultcomponentControlRef"].resultShow001(returnData.data.result);
              }, 500);
              
              // _this.$parent.pageData.resultcomponent = true;
            }
            // _this.$notify("服务出现问题，或者你的网速过慢");
            console.log(returnData);
          })
          .catch(function () {
            _this.$notify( {message: "服务出现问题，或者你的网速过慢", duration: 1000});
          });
      } else {
        this.$notify({message: "请设置完整参数", duration: 800});
      }
    },
    backTo() {
      this.$router.push("/home/more");
    },
    studentcomponentControlFun() {
      this.studentcomponentControl = true;
      this.$refs["studentcomponentControlRef"].refreshDatabase();
      // console.log(this.$refs["studentcomponentControlRef"].refreshtest);
    },
  },

  mounted() {
    console.log(this.pageData);
  },
};
</script>

<style lang="scss" scoped>
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

/* 单行三个元素 */
.mine-single-line-three-theme1 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  // border: #8080802e 1px solid;
  padding: 10px 8px;
  border-radius: 5px;
  border: 1px solid #fff;
  cursor: pointer;
  & > div:nth-of-type(1) {
    flex: 1 0 70px;
    padding-left: 10px;
    color: #555;
  }
  & > div:nth-of-type(2) {
    flex: 0 1 100px;
    // color: #444;
    color: #555;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 40px;
    color: #555;
  }
}

.mine-single-line-three-theme1:active,
.mine-single-line-three-theme1:hover {
  // background-color: #eee;
  border: 1px solid #eee;
  transition: all 300ms;
}

.mine-double-line > li > div:nth-of-type(1) {
  margin: 6px 0 10px 0 !important;
  color: #555;
}

.clockNext {
  background: #fff;
  color: #00f;
  border: 1px dotted #00f;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  position: sticky;
  margin-bottom: 10px;
  bottom: 0;
  text-align: center;
  transition: all 1s;
}
.clockNext:active,
.clockNext:hover {
  border: 1px solid #00f;
  cursor: pointer;
}
</style>