<!--
 * @Author: 王朋坤
 * @Date: 2022-03-18 08:15:01
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-19 00:09:53
 * @FilePath: /graduation-project-master/src/pages/init/result.vue
 * @Description: 
-->

<template>
  <Transition name="modal">
    <div v-if="showResulet" class="modal-mask">
      <van-nav-bar
        class="header"
        title="结果页面"
        left-arrow
        @click-left="closeclose"
      />
      <ul class="mine-form-display-infor" style="color: #017afebf">
        <transition-group name="list" tag="p">
          <li v-for="item in returnData" :key="item.key">
            <span>{{ item.key }}</span>
            <span :class="{ redColor: item.red, blueColor: item.blue }">{{
              item.value
            }}</span>
          </li>
        </transition-group>
      </ul>
      <!-- 注册按钮 -->
      <div
        class="mine-button-block"
        style="margin-top: 18px; position: sticky; bottom: 30px; left: 0;background:rgba(255, 255, 255,0);border: 1px dotted #1989FA;color:#579BFF;"
        @click="closeclose"
      >
        {{ pageData.register.title }}
      </div>
    </div>
  </Transition>
</template>

<script>
import { NavBar } from "vant";

export default {
  props: {
    show: Boolean,
  },
  name: "modal",
  data() {
    return {
      pageData: {
        register: {
          title: "返回",
        },
      },
      returnData: [
        {
          key: "打卡结果",
          value: "注册成功，密码1234",
          blue: true,
          red: false,
        },
        {
          key: "打卡任务数",
          value: "returnData.data.result?.name",
        },
        {
          key: "位置011",
          value: "(116.001, 36.111)",
        },
        {
          key: "位置022",
          value: "(116.001, 36.111)",
        },
        {
          key: "位置013",
          value: "(116.001, 36.111)",
        },
        {
          key: "位置024",
          value: "(116.001, 36.111)",
        },
        // {
        //   key: "位置015",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置026",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置017",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置028",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置029",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置0199",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置02997",
        //   value: "(116.001, 36.111)",
        // },
        // {
        //   key: "位置01676",
        //   value: "(116.001, 36.111)",
        // },
      ],
      showResulet: this.show,
    };
  },
  methods: {
    // goBack() {

    // }
    closeclose() {
      this.showResulet = false;
      console.log(this.showResulet);
    },
    openopen(data) {
      this.showResulet = true;
      console.log("open" + data);
    },
  },
  components: {
    [NavBar.name]: NavBar,
  },
};
</script>


<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: #fff;
  transition: all 0.1s ease;
  .mine-form-display-infor {
    overflow-y: auto;
    width: 100%;
    height: calc(100% - 56px);
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>