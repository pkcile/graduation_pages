<!--
 * @Author: 王朋坤
 * @Date: 2022-03-27 16:15:38
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-28 23:37:56
 * @FilePath: /graduation-project-master/src/pages/publish/publish.vue
 * @Description: 
-->
<template>
  <div class="clockInforForm mine-send-part-absolute" style="background:#fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100
  ">   
    <div class="send-title">
      打卡信息设置
      <div class="send-control" :style="{'background-image': `url(${require('@/assets/font/arrow-left.svg')})`}" @click="backTo"></div>
    </div>
    <ul class="mine-double-line send-main" style="box-sizing:border-box;height: calc(100% - 50px);background: #fff;margin-bottom:10px;padding: 10px 20px;">
      <!-- 打卡主题设置 -->
      <li>
        <div class="mine-single-line-three-theme1" @click="inputcomponentControl=true"> 
          <div>主题</div>
          <div>{{ pageData.inputcomponentData ? pageData.inputcomponentData : "未初始化" }}</div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <!-- 打卡时间设置 -->
      <li>
        <div class="mine-single-line-three-theme1"  @click="datecomponentControl=true">
          <div>时间</div>
          <div>{{ pageData.datecomponentData ? "设置了" + pageData.datecomponentData.length + "个时间节点": "未初始化" }}</div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <li>
        <div class="mine-single-line-three-theme1" @click="placecomponentControl=true">
          <div>地点</div>
          <div>{{ pageData.placecomponentData ?  "设置了" + pageData.placecomponentData.length + "个地点节点" : "未初始化" }}</div>
          <div><van-icon name="arrow" /></div>
        </div>
      </li>
      <!-- 获取开始时间控件 -->
      <van-popup
        v-model="publishTask.formData.starttime.showDate"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          v-model="publishTask.formData.currentDate"
          type="datetime"
          title="选择完整时间"
          swipe-duration="0"
          visible-item-count="3"
          @confirm="starttimeData"
        />
      </van-popup>
      <!-- 获取结束时间控件 -->
      <van-popup
        v-model="publishTask.formData.endtime.showDate"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          v-model="publishTask.formData.currentDate"
          type="datetime"
          title="选择完整时间"
          swipe-duration="0"
          visible-item-count="3"
          @confirm="endtimeData"
        />    
      </van-popup>
      <li   @click="clockInforMake" style="background: #fff;color:#00f;border:1px dotted #00f;padding: 10px;margin-top:20px;border-radius:5px;position:sticky;margin-bottom:10px;bottom:0;width:80px;text-align:center;">
        下一步
      </li>
    </ul>
    <!-- <div class="send-footer"  @click="clockInforMake" style="background: #fff;color:#00f;border:1px dotted #00f;">
      下一步
    </div> -->
    <inputcomponent v-show="inputcomponentControl" :inputcomponentData="pageData.inputcomponentData"></inputcomponent>
    <datecomponent v-show="datecomponentControl" :datecomponentData="pageData.datecomponentData"></datecomponent>
    <placecomoponent v-show="placecomponentControl" :placecomponentData="pageData.placecomoponentData"></placecomoponent>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Slider, Stepper, Icon} from "vant";
import axios from "axios";
import inputcomponent from "./input.vue"
import datecomponent from "./date.vue"
import placecomoponent from "./place.vue"

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
          currentDate: new Date() 
        },
        currentDate: new Date(),
       
      },
      pageData: {
        inputcomponentData: "",
        placecomponentData: null,
        datecomponentData: null
      },
      inputcomponentControl: false,
      placecomponentControl: false,
      datecomponentControl: false
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
    placecomoponent: placecomoponent
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
      if(this.publishTask.param.placename != "" && this.publishTask.starttime != "" && this.publishTask.starttime != "") {
        axios.get(`${process.env.VUE_APP_POSITION_PATH}/api/position/publishtask`, {params: _this.publishTask.param}) 
          .then(function(returnData) {
            _this.$notify("创建的任务号码" + returnData.data.id);
            _this.$emit("open-person-choose-form", returnData.data.id);

          })
          .catch(function() {
            _this.$notify("服务出现问题，或者你的网速过慢");
            
          })
      }
      else {
        _this.$notify("请输入完整地点和打卡起始时间");
      }
    },
    backTo() {
      this.$router.push("/home/more");
    }
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
  }
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
    flex: 0 1 80px;
    // color: #444;
    color: #555;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 40px;
    color: #555;
  }
}

.mine-single-line-three-theme1:active, .mine-single-line-three-theme1:hover{
  // background-color: #eee;
  border: 1px solid #eee;
  transition: all 300ms;
}

.mine-double-line > li > div:nth-of-type(1) {
    margin: 6px 0 10px 0 !important;
    color: #555;
}

</style>