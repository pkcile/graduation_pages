<!--
 * @Author: 王朋坤
 * @Date: 2022-03-31 20:28:35
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-02 16:57:45
 * @FilePath: /graduation-project-master/src/pages/publish/student.vue
 * @Description: 
-->
<template>
  <div
    class="mine-send-part-absolute personChooseForm"
    v-bind:class="{ 'send-part-control': true }"
    style="z-index: 2; height: 100%"
  >
    <div class="send-title title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
      <div class="text">位置拾取</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
        }"
        @click="wififorsure"
      ></div>
    </div>
    <div class="send-main" style="overflow-y: auto; height: calc(100% - 50px)">
      <div class="mine-double-line-date">
        <div class="title">
          <div>批量选择</div>
          <div style="color: #007aff" @click="refreshLists">全部选择</div>
        </div>
        <div
          class="main"
          style="
            background: #fff;
            border-radius: 5px;
            overflow-y: auto;
            height: 160px;
          "
        >
          <div
            class="mine-single-line-three-wifi"
            style="
              border: #8080802e 0px solid;
              border-bottom: #8080802e 1px solid;
            "
            @click="allSelectChoosed(item)"
            v-for="item in classname"
            v-bind:key="item.key"
          >
            <div>{{ item.classname }}</div>
            <div></div>
            <div><van-checkbox v-model="item.checked"></van-checkbox></div>
          </div>
        </div>
      </div>

      <ul class="mine-double-line" style="padding: 10px">
        <li>
          <div>人员选择</div>
          <div style="overflow-y: auto; height: 250px">
            <div
              class="main"
              style="background: #fff; border-radius: 5px; overflow-y: auto"
            >
              <div
                class="mine-single-line-three-wifi"
                style="
                  border: #8080802e 0px solid;
                  border-bottom: #8080802e 1px solid;
                "
                @click="itemCheckedControl(item)"
                v-for="item in itemsData"
                v-bind:key="item.key"
                v-show="item.pageshow"
              >
                <div>
                  <div>
                    {{ `姓名: ${item.name}` }}
                  </div>
                  <div>
                    {{ `性别: ${item.gender}，学号: ${item.studynth}` }}
                  </div>
                  <div></div>
                </div>
                <div><van-checkbox v-model="item.checked"></van-checkbox></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="send-footer" @click="forSureStudents">确认选择</div> -->
  </div>
</template> 

<style lang="scss" scoped>
.title {
  // position: relative;
  background: #f1f1f4;
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
    background-size: 100%;
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

.mine-double-line-date {
  // box-sizing:border-radius;
  padding: 10px;
  & > .title {
    margin: 5px auto 5px auto;
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
  }

  .van-cell {
    border-radius: 5px;
  }
}

/* 单行三个元素 */
.mine-single-line-three-wifi {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  border: #8080802e 1px solid;
  padding: 10px 8px;
  border-radius: 5px;
  cursor: pointer;
  & > div:nth-of-type(1) {
    flex: 1 1 70px;
    padding-left: 10px;
    color: #555;
  }
  & > div:nth-of-type(2) {
    flex: 0 0 50px;
    // color: #444;
    color: #555;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #555;
  }
}

.mine-single-line-three-wifi:active {
  background-color: #eee;
  transition: all 300ms;
}
</style>

<script>
import axios from "axios";
import {
  Checkbox,
  CheckboxGroup,
  Calendar,
  Cell,
  CellGroup,
  DatetimePicker,
  Icon,
  Popup,
} from "vant";
export default {
  data() {
    return {
      checked: false,
      classname: [],
      allchecked: true,
      itemsData: [{}, {}],
    };
  },
  methods: {
    allSelectChoosed(classnameelectitem) {
      classnameelectitem.checked = !classnameelectitem.checked;
      console.log(classnameelectitem);
      if (classnameelectitem.checked) {
        this.itemsData.map((item) => {
          if (item.classname == classnameelectitem.classname) {
            item.pageshow = true;
            item.checked = true;
          }
        });
      } else {
        this.itemsData.map((item) => {
          if (item.classname == classnameelectitem.classname) {
            item.pageshow = false;
            item.checked = false;
          }
        });
      }

      // console.log(_this.studentData);
    },
    itemCheckedControl(item) {
      item.checked = !item.checked;
      console.log(item);
    },
    backTo() {
      this.$parent.studentcomponentControl = false;
    },
    refreshLists() {
      this.allchecked = !this.allchecked;
      this.classname.map((item) => {
        item.checked = this.allchecked;
        this.allSelectChoosed(item);
      });
    },
    wififorsure() {
      this.$parent.studentcomponentControl = false;
      let filterData = this.itemsData.filter((item) => {
        return item.checked;
      });

      let studentcomponentData = [];
      filterData.forEach((item) => {
        studentcomponentData.push({
          studynth: item.studynth,
        });
      });

      this.$parent.pageData.studentcomponentData = studentcomponentData;
      this.checked = false;
      console.log(this.$parent.pageData.studentcomponentData);
      // console.log(th);
    },
    refreshDatabase() {
      const _this = this;
      console.log(this.classname.length, this.itemsData.length);
      if (this.classname.length && this.itemsData.length) {
      } else {
        axios
          .get(
            `${process.env.VUE_APP_POSITION_PATH}/user/registerStudynthQuery`,
            {}
          )
          .then(function (returnData) {
            console.log(_this);

            console.log(returnData.data.result);
            let studentData = [];
            let newSet = new Set();
            let newSetClassnameArray = [];
            returnData.data.result.forEach((item, index) => {
              newSet.add(item.classname);
              studentData.push({
                key: index + Math.random() + "",
                checked: false,
                classname: item.classname,
                name: item.name,
                studynth: item.studynth.trim(),
                gender: item.gender,
                pageshow: false,
              });
            });

            for (const item of newSet) {
              newSetClassnameArray.push({
                classname: item,
                checked: false,
                key: Date.now() + Math.random(),
              });
            }

            _this.itemsData = studentData;
            _this.classname = newSetClassnameArray;
            console.log(studentData);
          })
          .catch(function () {
            _this.$notify("服务出现问题，或者你的网速过慢");
          });
      }
    },
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  mounted() {
    const _this = this;

    // console.log();
    if (window.plus) {
      plus.storage.setItem("test", "test with hbuilder!");
      console.log(plus.storage.getItem("test"));
    }
  },
};
</script>