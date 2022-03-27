<!--
 * @Author: your name
 * @Date: 2021-12-07 22:49:03
 * @LastEditTime: 2022-03-27 15:52:06
 * @LastEditors: 王朋坤
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/components/admin/editTask/choose.vue
-->

<template>
  <div class="mine-send-part-absolute2">
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
    <!-- <div style="width: 100px; height: 100px; background: #bfa;">
    </div> -->
    <van-dropdown-menu class="sort">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <ul
      class="send-main"
      style="
        box-sizing: border-box;
        height: calc(100% - 200px);
        background: #fff;
        margin-bottom: 26px;
      "
    >
      <van-radio-group v-model="radio">
        <div class="radio-four" v-for="item in queryTask" v-bind:key="item.id">
          <div>{{ item.id }}</div>
          <div>{{ item.placename }}</div>
          <div>36小时前</div>
          <div>{{ item.user_username }}</div>
          <van-radio v-bind:name="item.id"></van-radio>
        </div>
      </van-radio-group>
    </ul>

    <div class="send-footer" @click="clockInforMake">下一步</div>
  </div>
</template>

<script>
import { RadioGroup, Radio, DropdownMenu, DropdownItem } from "vant";
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
          currentDate: new Date(),
        },
        currentDate: new Date(),
      },
      value1: 0,
      value2: "a",
      option1: [
        { text: "未关联学生", value: 0 },
        { text: "已关联学生", value: 1 },
        { text: "全部类型", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "打卡地点", value: "d" },
        { text: "创建时间", value: "b" },
        { text: "创建人员", value: "c" },
      ],
      radio: "1",
      queryTask: [
        {
          id: 1111,
          placename: "暑假实习打卡",
          user_username: "王朋坤"
        },
        {
          id: 2222,
          placename: "暑假实习打卡",
          user_username: "王朋坤"
        }
      ]
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
      this.$router.push("/edit/forsure");
      // const _this = this;
      // if (
      //   this.publishTask.param.placename != "" &&
      //   this.publishTask.starttime != "" &&
      //   this.publishTask.starttime != ""
      // ) {
      //   axios
      //     .get(
      //       `${process.env.VUE_APP_POSITION_PATH}/api/position/publishtask`,
      //       { params: _this.publishTask.param }
      //     )
      //     .then(function (returnData) {
      //       _this.$notify("创建的任务号码" + returnData.data.id);
      //       _this.$emit("open-person-choose-form", returnData.data.id);
      //     })
      //     .catch(function () {
      //       _this.$notify("服务出现问题，或者你的网速过慢");
      //     });
      // } else {
      //   _this.$notify("请输入完整地点和打卡起始时间");
      // }
    },
    backTo() {
      this.$router.push("/home/more");
    },
  },
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },
  mounted() {
    const _this = this;
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
    axios.get('/api/position/queryTask')
      .then(function (returnData) {
        // 处理成功情况
        console.log(returnData.data);
        _this.queryTask = returnData.data.queryTask;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
    
  },
};
</script>

<style lang="scss" scoped>
.radio-four {
  display: flex;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0 15px 0 10px;
  & > div {
    font-size: 14px;
  }
  & > div:nth-of-type(1) {
    flex: 0 0 50px;
    color: #aaa;
  }

  & > div:nth-of-type(2) {
    flex: 1 1 70px;
    color: #017aff;
  }

  & > div:nth-of-type(3) {
    flex: 1 0 60px;
    color: #017aff;
  }

  & > div:nth-of-type(4) {
    flex: 1 1 50px;
    color: #fff;
    color: #017aff;
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
    height: calc(100% - 214px);
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