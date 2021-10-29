<!--
 * @Author: your name
 * @Date: 2021-10-29 14:35:19
 * @LastEditTime: 2021-10-29 14:35:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/personDataSend.vue
-->

<template>
  <div class="personDataSend">
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