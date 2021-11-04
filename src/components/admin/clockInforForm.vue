<!--
 * @Author: your name
 * @Date: 2021-10-29 14:00:45
 * @LastEditTime: 2021-11-04 10:23:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/clockInforForm.vue
-->

<template>
  <div class="clockInforForm mine-send-part-absolute">   
    <div class="send-title">
      打卡信息设置
      <div class="send-control" :style="{'background-image': `url(${require('@/assets/font/arrow-left.svg')})`}" @click="backTo"></div>
    </div>
    <ul class="mine-double-line send-main" style="box-sizing:border-box;height: calc(100% - 136px);background: #fff;margin-bottom:10px;padding: 10px 20px;">
      <!-- 地点选择 -->
      <li>
        <div>打卡地点选择</div>
        <select
          class="mine-select-custom"
          v-model="publishTask.param.placename"
        >
          <option disabled value="请选择地点">请选择</option>
          <option
            v-for="item in publishTask.formData.placename"
            :key="item.key"
          >
            {{ item.name }}
          </option>
        </select>
      </li>
      <!-- 开始时间 -->
      <li>
        <div>打卡开始时间</div>
        <div class="mine-single-line-three" @click="showStartTimePopup">
          <div>时间</div>
          <div>{{ publishTask.param.starttime }}</div>
          <div><van-icon name="clock-o" /></div>
        </div>
      </li>
      <!-- 结束时间 -->
      <li>
        <div>打卡结束时间</div>
        <div class="mine-single-line-three" @click="showEndTimePopup">
          <div>时间</div>
          <div>{{ publishTask.param.endtime }}</div>
           <div><van-icon name="clock-o" /></div>
        </div>
      </li>
      <!-- 容错半径 -->
      <li>
        <div>定位容错半径</div>
        <van-slider
          style="display: none;"
          v-model="publishTask.param.radius"
          active-color="#ee0a24"
          step="1"
          inactive-color="#8DB6C2"
        >
          <template #button>
            <div class="custom-button">
              {{ publishTask.param.radius + "米" }}
            </div>
          </template>
        </van-slider>
        <div class="mine-single-line-three">
          <div>半径</div>
          <van-stepper v-model="publishTask.param.radius" style="flex: 1 1 150px; padding-left: 0px; padding-left: 0;" integer min="1" step="20" />
          <div style="flex: 0 0 50px">米</div>
        </div>     
      </li>
      <li>
        <div>备注</div>
        <input
          v-model="publishTask.param.content"
          type="text"
          style="
            border: 1px solid gray;
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            border-radius: 5px;
          "
          placeholder="可填写本次打卡主题"
        />
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
    </ul>
    <div class="send-footer"  @click="clockInforMake">
      下一步
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Slider, Stepper, Icon} from "vant";
import axios from "axios";

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
    };
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
      this.$router.push("/home/social");
    }
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon
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

</style>