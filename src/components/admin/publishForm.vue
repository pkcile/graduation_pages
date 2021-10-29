<!--
 * @Author: your name
 * @Date: 2021-10-26 09:27:48
 * @LastEditTime: 2021-10-29 11:07:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm.vue
-->
<template>
  <div class="publishForm">
    <!-- 打卡信息设置窗口 -->
    <ul class="mine-double-line">
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
            value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </li>
      <li>
        <div>打卡开始时间</div>
        <div class="mine-single-line-three" @click="showPopup">
          <div>时间</div>
          <div>{{ publishTask.param.starttime }}</div>
          <div>图标</div>
        </div>
      </li>
      <li>
        <div>打卡结束时间</div>
        <div class="mine-single-line-three" @click="showPopup">
          <div>时间</div>
          <div>{{ publishTask.param.endtime }}</div>
          <div>图标</div>
        </div>
      </li>
      <li>
        <div>定位容错半径</div>
        <van-slider
          v-model="publishTask.param.radius"
          active-color="#ee0a24"
          step="20"
          inactive-color="#8DB6C2"
        >
          <template #button>
            <div class="custom-button">
              {{ publishTask.param.radius + "米" }}
            </div>
          </template>
        </van-slider>
      </li>
      <li>
        <div>备注</div>
        <input
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
      <!-- 获取时间控件 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
          v-model="publishTask.formData.starttime.currentDate"
          type="datetime"
          title="选择完整时间"
          swipe-duration="0"
          visible-item-count="3"
          @confirm="test001"
        />
      </van-popup>
    </ul>
    <div class="mine-button-block" style="position: sticky; bottom: 5px">
      下一步
    </div>
    <!-- 人员选择窗口 -->
    <div
      class="mine-send-part-absolute"
      v-bind:class="{ 'send-part-control': true }"
      style="z-index: 2"
    >
      <div class="send-title">
        人员选择窗口
        <div class="send-control"></div>
      </div>
      <div class="send-main">
        <ul class="mine-double-line" style="padding: 15px">
          <li>
            <div>批量设置</div>
            <div>
              <div>
                <van-checkbox
                  v-model="checked"
                  style="background: #fff; padding: 10px"
                  >全选学生</van-checkbox
                >
              </div>
            </div>
          </li>
          <li>
            <div>学生选择</div>
            <div style="overflow-y: auto; height: 250px">
              <van-checkbox
                v-model="checked"
                style="background: #fff; padding: 10px"
                >王朋坤</van-checkbox
              >
              <van-checkbox
                v-model="checked"
                style="background: #fff; padding: 10px"
                >王朋坤</van-checkbox
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="send-footer">确认选择</div>
    </div>
    <!-- 确认信息发送框 -->
    <div
      class="mine-send-part-absolute"
      v-bind:class="{ 'send-part-control': true }"
    >
      <div class="send-title">
        确认信息窗口
        <div class="send-control"></div>
      </div>
      <div class="send-main">
        <ul class="mine-double-line" style="padding: 15px">
          <li>
            <div>人员确定</div>
            <div style="color: #555">
              <div style="background: #fff; padding: 10px; display: flex">
                <div style="flex: 1 0 100px; padding-left: 10px">王朋坤</div>
                <div style="flex: 1 0 150px">地理信息科学2班</div>
              </div>
              <div style="background: #fff; padding: 10px; display: flex">
                <div style="flex: 1 0 100px; padding-left: 10px">王朋坤</div>
                <div style="flex: 1 0 150px">地理信息科学2班</div>
              </div>
              <div style="background: #fff; padding: 10px; display: flex">
                <div style="flex: 1 0 100px; padding-left: 10px">王朋坤</div>
                <div style="flex: 1 0 150px">地理信息科学2班</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="send-footer">确定</div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Slider, Checkbox, CheckboxGroup } from "vant";
import axios from "axios";

export default {
  data() {
    return {
      publishTask: {
        param: {
          radius: 1,
          placename: "",
          user_username: "",
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
      },
      checked: true,
      value: 11,
      show: false,
      currentDate: new Date(),
    };
  },
  computed: {
    convertTime() {},
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    confirm() {
      console.log("666");
    },
    starttime(time) {
      // this.show = false; // 获取时间成功提示
      // console.log(time.getDate());
      // console.log(new Date());
      // this.publishTask.param.starttime = this.convertDate(time);
      // console.log(this.publishTask.param.starttime);
    },
    convertDate(Date) {
      const date = Date;
      const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        (date.getMinutes() + 1) +
        ":" +
        (date.getSeconds() + 1);

      return dateString;
    },
    test001() {
      console.log(888);
    },
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
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

    console.log(this.convertDate(new Date()));
  },
};
</script>

<style lang="scss" scoped>
.publishForm {
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

/* 上下表单 */
.mine-double-line {
  padding: 20px;
  & > li {
    margin: 10px 0;
    padding: 0 0;
    border-bottom: 1px solid #efeff3;
  }

  & > li > div:nth-of-type(1) {
    margin: 10px 0 15px 0;
    color: #555;
  }

  & > li > :not(div:nth-of-type(1)) {
    margin-bottom: 15px;
  }
}

/* 单行三个元素 */
.mine-single-line-three {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  // background: #f5f5fa;
  // background: #f5f5f5;
  // border: rgba(128, 0, 128, 0.164) 1px solid;
  border: gray 1px solid;
  padding: 10px 8px;
  border-radius: 5px;
  & > div:nth-of-type(1) {
    flex: 0 0 60px;
    padding-left: 10px;
    color: #555;
  }
  & > div:nth-of-type(2) {
    flex: 1 1 150px;
    // color: #444;
    color: #555;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #555;
  }
}

/* 选择 */
.mine-select-custom {
  width: 100%;
  height: 40px;
  padding: 5px 0 5px 10px;
  border: 1px solid gray;
  border-radius: 5px;
  color: #555555;
  background: #fff;
}

.custom-button {
  width: 30px;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}

/* 弹出组件样式 */
.mine-send-part-absolute {
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
  }
}

.send-part-control {
  display: none;
}
</style>