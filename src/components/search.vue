<!--
 * @Author: 王朋坤
 * @Date: 2022-04-06 20:32:48
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-10 14:59:43
 * @FilePath: /graduation-project-master/src/components/search.vue
 * @Description: 
-->

<template>
  <div>
      <van-search v-model="inputsearch" placeholder="请输入搜索关键词" @focus="focussearch" @blur="bluesearch" @clear="inputclear"/>
      <div style="position:absolute;width:100%;z-index:100;" class="searchtext" v-show="inputsearchshow"> 
        <div style="width:95%;margin:0 auto;border-radius:5px;" class="searchtext-contain">
          <div v-for="item in searchPoiData" v-bind:key="item.key" @click="searchPoiItem(item)">{{ item.name }}</div>
        </div>
      </div>
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
      searchPoiData: [
        {
          key: "1",
          name: "江西师范大学瑶湖",
          point: ""
        }
      ]
    };
  },
  created() {},
  mounted() {
    // console.log("mounted");
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    inputsearch: function (newQuestion, oldQuestion) {
      const _this = this;
      // console.log("改变");
      if(this.inputsearch) {
        // http://api.tianditu.gov.cn/v2/search
        this.placessearch({keyWord: this.inputsearch})
     
          .then(data => {
            _this.searchPoiData = [];
            // _this.inputsearchshow = false;
            // console.log(data);
             let searchPoiArray = [];
            if(data?.pois) {
              data.pois.forEach(element => {
                searchPoiArray.push({
                  key: Date.now() + Math.random(),
                  name: element.name + "," + element.address,
                  lonlat: element.lonlat,
                  address: element.address
                })
                _this.searchPoiData = searchPoiArray;
              });
            }
            else if(data?.area) {
              searchPoiArray.push({
                key: Date.now() + Math.random(),
                name: data.area.name,
                lonlat: data.area.lonlat,
              })
              _this.searchPoiData = searchPoiArray;
            }
          })
        
  
        if(!this.inputsearchshow) {
          this.inputsearchshow = true;
        }
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

      if(window.plus) {
        var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
        
        plus.webview.currentWebview().setStyle({
          height: originalHeight - 220
        });
        console.log("height - 220")
      }
 
      // console.log("focussearch");
    },
    bluesearch() {
      // bluesearch
      if(window.plus) {
        var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
        
        console.log(plus.android.invoke(plus.android.currentWebview(),"getHeight") / plus.screen.scale );
        console.log(plus.screen.resolutionHeight);
        console.log(originalHeight);
        plus.webview.currentWebview().setStyle({
          height: originalHeight + 220
        });
        console.log("height + 220")
      }
    },
    inputclear() {
      this.searchPoiData = [];  
      this.inputsearchshow = false;
    },
    placessearch(params = {keyWord, level, mapBound, start, count}) {
      let postStr = 
        {
          "keyWord": params.keyWord,
          "level":1,
          "mapBound":"115.888628,28.711304,116,29",
          "queryType":1,
          "start":0,
          "count":7
        }
        
      return new Promise(resolve => {
        axios
        // http://api.tianditu.gov.cn/search?postStr={%22keyWord%22:%22%E6%B2%B3%E5%8C%97%E7%9C%81%E7%8E%8B%E5%B0%8F%E6%A5%BC%E6%9D%91%22,%22level%22:%2211%22,%22mapBound%22:%22116.04577,39.70307,116.77361,40.09583%22,%22queryType%22:%221%22,%22count%22:%2220%22,%22start%22:%220%22}&type=query&tk=c2eac0b552d848155c72b1d3f6aabf36
          .get(`http://api.tianditu.gov.cn/v2/search`, {
            params: {
              postStr: JSON.stringify(postStr),
              type: "query",
              tk: "c2eac0b552d848155c72b1d3f6aabf36"
            },
          })
          .then((returnData) => {
            resolve(returnData?.data);
          })
          .catch(() => {
            // _this.$notify("服务器错误");
            resolve("服务器错误");
          })
      })
    },
    searchPoiItem(item) {
      // console.log(item);
      this.inputsearch = item.name;
      this.searchPoiData = [];
      this.inputsearchshow = false;
      this.$emit("changeviewmap", item);
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