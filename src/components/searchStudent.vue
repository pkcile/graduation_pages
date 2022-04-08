<!--
 * @Author: 王朋坤
 * @Date: 2022-04-09 00:26:58
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-09 00:58:56
 * @FilePath: /graduation-project-master/src/components/searchStudent.vue
 * @Description: 
-->

<template>
  <div>
      <van-search v-model="inputsearch" placeholder="请输入搜索关键词" @focus="focussearch" @blur="bluesearch" @clear="inputclear" background="rgba(255, 255, 255, 0)"/>
  </div>
</template>

<script>
import { Search } from "vant"
import axios from 'axios';

export default {
  components: {
    [Search.name]: Search,  
  },
    data() {
    return {
      inputsearch: "",
      inputsearchshow: false,
      studentitem: []
    };
  },
  created() {},
  mounted() {
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    inputsearch: function (newQuestion, oldQuestion) {
      const _this = this;
      if(this.inputsearch != "") {
        if(this.studentitem.length) {
          console.log("过滤搜索");
          this.studentitem.map(item => {
            console.log(item.name, this.inputsearch, item.studynth);
            if(item.name == this.inputsearch || item.studynth == this.inputsearch || item.classname == this.inputsearch) {
              item.show = true;
            }
            else {
              item.show = false;
            }
          })
        }
      }
      else {
          this.studentitem.map(item => {
            item.show = true;
          })
      }

    },
    searchPoiData: function() {
      if(!this.searchPoiData.length) {
        this.inputsearchshow = false;
      }
    }
  },
  methods: {
    focussearch() {
      if(!this.inputsearchshow) {
        this.inputsearchshow = true;
      }
    },
    bluesearch() {
    },
    inputclear() {

    },
    searchPoiItem(item) {
      this.studentitem = item;
    }
  
  },
}
</script>

<style lang="scss" scoped>
.searchtext {
  transition: 1000ms all;
  height: 200px;
   overflow-y: auto;
  .searchtext-contain {
   
   
   
  }
  .searchtext-contain > div {
    background: #EDF3FF;
    line-height: 20px;
    border-bottom: 1px solid #aaa;
    color: #0462FF;
    padding: 10px;
  }

  .searchtext-contain > div:last-of-type {
    border-bottom: 1px solid #fff;
  }
}
</style>