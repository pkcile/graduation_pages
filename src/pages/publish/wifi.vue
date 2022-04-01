<!--
 * @Author: 王朋坤
 * @Date: 2022-03-29 09:39:33
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-01 16:48:59
 * @FilePath: /graduation-project-master/src/pages/publish/wifi.vue
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
    <div class="send-main" style="overflow-y: auto">
      <div class="mine-double-line-date">
        <div class="title">
          <div>批量选择</div>
          <div style="color: #007aff" @click="refreshLists">wifi列表刷新</div>
        </div>
        <div
          class="main"
          style="background: #fff; border-radius: 5px; overflow-y: auto"
        >
          <div
            class="mine-single-line-three"
            style="
              border: #8080802e 0px solid;
              border-bottom: #8080802e 1px solid;
            "
            @click="allSelectChoosed"
          >
            <div>全选</div>
            <div></div>
            <div><van-checkbox v-model="checked"></van-checkbox></div>
          </div>
        </div>
      </div>

      <ul class="mine-double-line" style="padding: 10px">
        <li>
          <div>wifi选择</div>
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
              >
                <div>
                  <div>
                    {{ `ssid: ${item.ssid}` }}
                  </div>
                  <div>
                    {{ `bssid: ${item.bssid}，level: ${item.level}` }}
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
      itemsData: [
        // {
        //   key: Date.now() + Math.random(),
        //   ssid: "测试wifi名称",
        //   checked: false,
        //   bssid: "e8:65:d4:a9:e6:70",
        //   level: -67,
        //   username: "guest",
        //   id: "guest",
        // },
        // {
        //   key: Date.now() + Math.random(),
        //   ssid: "测试wifi名称",
        //   checked: false,
        //   bssid: "e8:65:d4:a9:e6:70",
        //   level: -67,
        //   username: "guest",
        //   id: "guest",
        // },
      ],
    };
  },
  methods: {
    refreshtest() {
      console.log("refresh");
    },
    forSureStudents() {
      this.$router.push("/edit/asignForsure");
      //   this.$emit("open-person-data-send", this.studentData);
      console.log("aabbcc");
    },
    allSelectChoosed() {
      this.checked = !this.checked;

      if (this.checked) {
        this.itemsData.map((item) => {
          item.checked = true;
        });
      } else {
        this.itemsData.map((item) => {
          item.checked = false;
        });
      }

      // console.log(_this.studentData);
    },
    itemCheckedControl(item) {
      item.checked =  !item.checked;
    },
    backTo() {
      this.$parent.wificomponentControl = false;
    },
    refreshLists() {
      // this.itemsData = [];
      // console.log(this.myUni);
      // this.myUni.postMessage({
      //         data: {
      //           action: "uni.postMessage",
      //           params: {
      //             a: "a",
      //             b: "b",
      //             c: "c",
      //             d: "d",
      //           },
      //         },
      // });

      if (window.plus) {
        //当有plus时，直接plusPredy
        this.GetWiFiAndLocation().then((returnData) => {
          let wifis = [];
          returnData.wifiList.forEach((wifiitem) => {
            wifis.push({
              bssid: wifiitem.bssid,
              ssid: wifiitem.ssid,
              level: wifiitem.level,
              key: Date.now(),
            });
          });
          this.itemsData.length = 0;
          this.itemsData = wifis;
        });
      } else {
        this.$notify("请在android客户端操作");
        const aabbcc = {
          wifiList: [
            {
              bssid: "e8:65:d4:a9:e6:70",
              ssid: "Tenda_A9E670",
              level: -49,
              checked: false,
              id: 0,
            },
            { bssid: "c2:65:c7:d9:ad:78", ssid: "pkcile", level: -67, id: 1 },
            { bssid: "c2:65:c7:d9:ad:7c", ssid: "pkcile", level: -83, id: 2 },
            { bssid: "04:95:e6:77:d6:71", ssid: "金豆豆", level: -74, id: 3 },
          ],
        };

        let wifis = [];

        aabbcc.wifiList.forEach((wifiitem) => {
          wifis.push({
            bssid: wifiitem.bssid,
            ssid: wifiitem.ssid,
            level: wifiitem.level,
            checked: false,
            key: Date.now() + Math.random() + "",
          });
        });

        this.itemsData.length = 0;
        this.itemsData = wifis;
      }
    },
    GetWiFiAndLocation() {
      const _this = this;
      const wifiList = [];

      return new Promise(function (resolve) {
        plus.geolocation.getCurrentPosition(
          function (positionList) {
            // alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords
            // 	.longitude + '\nAltitude:' + p.coords.altitude);
            // #ifdef APP-PLUS
            const mainActivity = plus.android.runtimeMainActivity();
            const Settings = plus.android.importClass(
              "android.provider.Settings"
            );
            const MainActivity = plus.android.runtimeMainActivity();
            const Context = plus.android.importClass("android.content.Context");

            plus.android.importClass("android.net.wifi.WifiManager");
            plus.android.importClass("android.net.wifi.ScanResult");
            plus.android.importClass("android.net.wifi.WifiInfo");
            plus.android.importClass("java.util.ArrayList");

            const wifiManager = MainActivity.getSystemService(
              Context.WIFI_SERVICE
            );
            const resultList = wifiManager.getScanResults();

            // 如果没有获取成功
            if (!resultList || !resultList.size) {
              console.log("WIF初始化未成功");
            }
            // 如果获取成功
            else {
              console.log(resultList.size());
              for (let i = 0; i < resultList.size(); i++) {
                //	 ssid名称、bssidbssid地址、level信号强弱
                wifiList.push({
                  bssid: resultList.get(i).plusGetAttribute("BSSID"),
                  ssid: resultList.get(i).plusGetAttribute("SSID"),
                  level: resultList.get(i).plusGetAttribute("level"),
                  id: i,
                  key: Date.now() + Math.random(),
                });
              }
            }
            // #endif

            resolve({
              wifiList,
              positionList,
            });
          },
          function (e) {
            alert("Geolocation error: " + e.message);
          }
        );

        // uni.getLocation({
        // 	type: 'wgs84',
        // 	success: function(positionList) {
        // 		// #ifdef APP-PLUS
        // 		const mainActivity = plus.android.runtimeMainActivity();
        // 		const Settings = plus.android.importClass("android.provider.Settings");
        // 		const MainActivity = plus.android.runtimeMainActivity();
        // 		const Context = plus.android.importClass('android.content.Context');

        // 		plus.android.importClass("android.net.wifi.WifiManager");
        // 		plus.android.importClass("android.net.wifi.ScanResult");
        // 		plus.android.importClass("android.net.wifi.WifiInfo");
        // 		plus.android.importClass("java.util.ArrayList");

        // 		const wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE);
        // 		const resultList = wifiManager.getScanResults();

        // 		// 如果没有获取成功
        // 		if (!resultList || !resultList.size) {
        // 			console.log("WIF初始化未成功");
        // 		}
        // 		// 如果获取成功
        // 		else {
        // 			console.log(resultList.size());
        // 			for (let i = 0; i < resultList.size(); i++) {
        // 				//	 ssid名称、bssidbssid地址、level信号强弱
        // 				wifiList.push({
        // 					name: resultList.get(i).plusGetAttribute('BSSID'),
        // 					ssid: resultList.get(i).plusGetAttribute('SSID'),
        // 					level: resultList.get(i).plusGetAttribute('level'),
        // 					id: i
        // 				});
        // 			}
        // 		}
        // 		// #endif

        // 		resolve({
        // 			wifiList,
        // 			positionList
        // 		});
        // 	}
        // });
      });
    },
    wififorsure() {
      this.$parent.wificomponentControl = false;
      let filterData = this.itemsData.filter((item) => {
        return item.checked;
      });

      let wificomponentData = [];
      filterData.forEach((item) => {
        wificomponentData.push({
          level: item.level,
          ssid: item.ssid,
          bssid: item.bssid,
          collectuser: "pkcile",
        });
      });

      this.$parent.pageData.wificomponentData = wificomponentData;
      this.checked = false;
      console.log(this.$parent.pageData.wificomponentData);
      // console.log(th);
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