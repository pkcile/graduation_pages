<!--
 * @Author: your name
 * @Date: 2021-11-03 10:27:54
 * @LastEditTime: 2021-11-03 15:30:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/social/emojiMessage.vue
-->

<template>
  <section id="message_section">
   
    <a href="javascript:;" class="messagehover" style="display: block; background: #bfa;width:200px;height:100px;"> 
      <div >
      </div>
    </a>

    <div class="messagehover" style="display: block; background: #bbb;width:200px;height:100px;">
    </div>

    <div class="message-main" >
      <h3 class="message-title clearfix">
        <div class="message-title-img"></div>
        <div class="message-title-name">pkcile</div>
        <div class="message-title-date">评论于2天前</div>
        <div class="message-title-more">...</div>
      </h3>
      <div class="message-content">测试测试，用户留言</div>
      <div class="message-comment">
        <div class="message-comment-smiles"></div>
        <div class="message-comment-smile">
          <svg
            class="octicon octicon-smiley smile-svg"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              class="smile-svg-path"
              fill-rule="evenodd"
              d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"
            ></path>
          </svg>
        </div>
        <div style="display: block; clear: both"></div>
        <div class="message-comment-detail-container">
          <div class="message-comment-detail">
            <div class="message-comment-detail-inner">
              <h3 class="message-comment-detail-title">选择你的回应</h3>
              <div class="message-comment-detail-line"></div>
              <div class="message-comment-detail-emoji">
                <div class="message-comment-detail-emoji-item">&#x1F61C;</div>
                <div class="message-comment-detail-emoji-item">&#128513;</div>
                <div class="message-comment-detail-emoji-item">&#128541;</div>
                <div class="message-comment-detail-emoji-item">&#128558;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.messagehover:active {
  background-color: red !important;
  transition: all 200ms;
}

// .messagehover:hover {
//   background-color: red  !important;
// }
.clearfix::after {
  clear: both;
  display: table;
  content: "";
}

#message_section section {
  background: #bfa;
  width: 340px;
  margin: 0 auto;
}

#message_section .message-main {
  width: 340px;
  margin: 20px auto;
}

.message-main .message-title {
  background: #f1f8ff;
  border-radius: 3px 3px 0 0;
  border-top: 1px solid #d5e6f9;
  border-left: 1px solid #d5e6f9;
  border-right: 1px solid #d5e6f9;
}

.message-title .message-title-img {
  width: 30px;
  height: 30px;
  background: url("https://avatars.githubusercontent.com/u/44103871?s=400&u=8cc5c04de9b7f5ade4c4433f73c0847b08e163e8&v=4")
    no-repeat;
  background-size: contain;
  margin: 10px 0 0 10px;
  border-radius: 15px;
}

.message-title div {
  height: 50px;
  line-height: 50px;
  float: left;
}

.message-title .message-title-name {
  width: 50px;
  margin-left: 5px;
}

.message-title .message-title-date {
  width: 170px;
  margin-left: 5px;
}

.message-title .message-title-more {
  height: 50px;
  width: 38px;
  text-align: right;
  margin-right: 10px;
}

.message-main .message-content {
  line-height: 30px;
  background: #fff;
  border-left: 1px solid #d5e6f9;
  border-right: 1px solid #d5e6f9;
  padding: 10px;
}

.message-main .message-comment {
  border-radius: 0 0 3px 3px;
  background: #fff;
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #d5e6f9;
  border-left: 1px solid #d5e6f9;
  border-right: 1px solid #d5e6f9;
}

.message-comment .message-comment-smiles {
  float: left;
}

.message-comment .message-comment-smiles-item,
.message-comment .message-comment-smile {
  float: left;
  line-height: 33px;
  width: 40px;
  text-align: center;
  cursor: pointer;
}

.message-comment .message-comment-smiles-item:hover {
  background-color: #f1f8ff;
}

.message-comment .message-comment-smile:hover {
  background-color: #f1f8ff;
  fill: #0366d6;
}

.message-comment-smile svg {
  margin-top: 8px;
}

.message-comment-detail-container {
  position: relative;
  /*display: none;*/
}

.message-comment-detail::before {
  content: "";
  display: block;
  border: 5px solid white;
  border: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid red;
  position: absolute;
  top: -10px;
  left: 13px;
}

.message-comment-detail {
  position: absolute;
  z-index: 9;
  left: 0px;
  top: 10px;
  width: 152px;
  border: 1px solid red;
  background: #fff;
  border-radius: 5px;
}

.message-comment-detail-title {
  padding: 10px;
}

.message-comment-detail-line {
  border-bottom: 1px solid #e1e4e8;
}

.message-comment-detail-emoji {
  padding: 5px 10px 10px 10px;
}

.message-comment-detail-emoji-item {
  float: left;
  line-height: 33px;
  width: 33px;
  text-align: center;
  font-size: 16px;
}

.message-comment-detail-emoji-item:hover {
  background: #f1f8ff;
  cursor: pointer;
  font-size: 18px;
}
</style>
</style>