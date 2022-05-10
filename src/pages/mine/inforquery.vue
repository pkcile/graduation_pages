<!--
 * @Author: 王朋坤
 * @Date: 2022-05-07 14:04:03
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-07 15:57:50
 * @FilePath: /graduation-project-master/src/pages/mine/inforquery.vue
 * @Description: 
-->
<template>
  <div
    class="mine-send-part-absolute personDataSend"
    style="position: fixed; width: 100%; height: 100%; top: 0px; z-index: 100"
    v-bind:class="{ 'send-part-control': true }"
  >
    <!-- <mapview v-show="mapviewControl" ref="startmapview"> </mapview> -->
    <div class="send-title" style="height: 50px; line-height: 50px; color: #444 !important;font-weight:400;">
      信息修改
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
    </div>
    <div class="send-main" style="height: calc(100% - 50px); overflow-y: auto">
      <!-- 表单 -->
      <ul class="" style="">
        <li class="mine-single-line-three-002">
          <div>{{ "学号" }}</div>
          <div>{{ personitemData.studynth }}</div>
        </li>
        <li class="mine-single-line-three-002">
          <div>{{ "姓名" }}</div>
          <div>{{ personitemData.name }}</div>
          <!-- <div><van-icon name="arrow" /></div> -->
        </li>
        <li class="mine-single-line-three-002">
          <div>{{ "班级" }}</div>
          <div>{{ personitemData.classname }}</div>
          <!-- <div><van-icon name="arrow" /></div> -->
        </li>
        <li class="mine-single-line-three-002"> 
          <div>{{ "身份" }}</div>
          <div>{{ personitemData.role }}</div>
          <!-- <div><van-icon name="arrow" /></div> -->
        </li>
        <li class="mine-input-row-edit">
          <label>{{ "昵称" }}</label>
          <input type="text" :placeholder="personitemData.username"  v-model="personitemData.username"/>
        </li>
        <li class="mine-input-row-edit">
          <label>{{ "签名" }}</label>
          <input type="text" :placeholder="personitemData.showinfor"  v-model="personitemData.showinfor"/>
        </li>
        <li class="mine-single-line-three-002" @click="actionSheet.imglink.display=true"> 
          <div>{{ "头像" }}</div>
          <div>{{ personitemData.imglinkSpeak }}</div>
          <div><van-icon name="arrow" /></div>
        </li>
        <van-action-sheet
          v-model="actionSheet.imglink.display"
          :actions="actionSheet.imglink.data"
          @select="changImglink"
        />
      </ul>
      <div
        class="mine-button-block bottom-fix"
        style="position: sticky; bottom: 20px; left: 0; margin-top: 15px; background:#0DC160;"
        @click="updateinformation"
      >
        更新修改
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js";
import axios from "axios";
import {
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  ActionSheet,
  Icon,
} from "vant";
import { mapState, mapMutations } from "vuex";
import { placeserverjudgeapi } from "@/api/index/index.js";
import { getResultClockLogItem , registerStudynthQueryItem} from "@/api/mine/index.js";
import {registerStudynthUpdate} from "@/api/usercontrol/index.js"

export default {
  name: "indexmodal",
  data() {
    return {
      mapviewControl: false,
      actionSheet: {
        role: {
          display: false,
          data: [
            { name: "管理员" }, 
            { name: "学生" }, 
            ],
        },
        imglink: {
          display: false,
          data: [
            {
              name: "头像001",
              value: "1.jpg"
            },
            {
              name: "头像002",
              value: "2.jpg"
            }
          ]
        }
      },
      personitemData: {
        studynth: "201824803050",
        role: "管理员",
        classname: "18级地理信息科学2班",
        name: "王朋坤",
        imglink: "4.gif",
        imglinkSpeak: "",
        showinfor: "默认签名",
        username: "abc"

      },
      personitemDataCopy: null

    };
  },
  components: {
    // mapview: mapview,
    [Icon.name]: Icon,
    [ActionSheet.name]: ActionSheet,
  },
  methods: {
    backTo() {
      this.$parent.inforquerycomponentControl = false;
      // console.log(this.$parent.logcomponentControl);
    },
    changImglink(data) {
      console.log("改变班级",data.name);
      this.actionSheet.imglink.display = false;
      this.personitemData.imglink = data.value;
      this.personitemData.imglinkSpeak = data.name;
    },
    usereditcomponentRefFun(params) {
      console.log(params);
      this.$parent.inforquerycomponentControl = true;
      this.personitemDataCopy = params;
      this.personitemData.studynth = params.studynth;
      this.personitemData.role = params.role;
      this.personitemData.classname = params.classname;
      this.personitemData.name = params.name;
      this.personitemData.imglink = params.imglink;
      this.personitemData.imglinkSpeak = params.imglinkSpeak;
      this.personitemData.username = params.username;
      if(!params.classname) {
        registerStudynthQueryItem({studynth: params.studynth, username: params.username})
          .then(returnData => {
            if(returnData.data?.result) {
              this.personitemData.classname = returnData.data.result.classname;
            }
          })
      }

    },
    updateinformation() {
      registerStudynthUpdate({studynth: this.personitemData.studynth, role: this.personitemData.role,classname: this.personitemData.classname, name: this.personitemData.name })
        .then(returnData => {
          console.log(returnData);
          if(returnData?.data) {
            this.$toast("修改成功");
            this.personitemDataCopy.studynth = this.personitemData.studynth;
            this.personitemDataCopy.role = this.personitemData.role;
            this.personitemDataCopy.classname = this.personitemData.classname;
            this.personitemDataCopy.name = this.personitemData.name;
          }
          else {
            this.$toast("修改失败");
          }
        })
    },
    ...mapMutations("User", [
      "updateStatus",
      "wifiStore",
      "geometryStore",
      "taskSignResultStore",
    ]),
  },
  created() {},
  mounted() {
    this.$parent.pageResult = false;
  },
};
</script>

<style lang="scss">
/* 输入框 */
.mine-input-row-edit {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  // padding: 15px;
  padding: 10px 8px;
  background: #fff;
  border-bottom: 1px solid #8080802e;
  label {
    flex: 0 0 100px;
    display: flex;
    padding-left: 10px;
    color: #444;
  }
  input {
    flex: 1 1 80px;
    display: flex;
    color: #888;
  }
}

/* 单行三个元素 */
.mine-single-line-three-002 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #8080802e;
  padding: 10px 8px;
  cursor: pointer;
  background: #fff;
  & > div:nth-of-type(1) {
    flex: 0 0 100px;
    padding-left: 10px;
    color: #444;
  }
  & > div:nth-of-type(2) {
    flex: 1 0 100px;
    color: #444;
    // color: #aaa;
    text-align: left;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #444;
  }
}

.mine-single-line-three-002:active {
  background-color: rgba(238, 238, 238, 0.377);
  transition: all 300ms;

  & > div:nth-of-type(2) {
    flex: 1 100px;
    // color: #007aff;
    text-align: left;
  }
}
</style>