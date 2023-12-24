
<template>
  <div class="all">
   <!-- 左侧导航栏 -->
    <div class="home" :class="{ 'night-mode': nightMode }">
   <el-menu
     :collapse="isCollapse"
     default-active="2"
     background-color="#545c64"
     text-color="#fff"
     active-text-color="#ffd04b"
     :class="{ 'night-mode': nightMode }"
   >
     <el-menu-item index="2" @click="toggleNightMode">
       <i class="el-icon-menu"></i>
       <span slot="title">切换模式</span>
     </el-menu-item>
     <el-menu-item index="3" @click="toggleDayMode">
       <i class="el-icon-document"></i>
       <span slot="title">拓展接口</span>
     </el-menu-item>
     <el-menu-item index="4" class="bottom-menu" :class="{ 'night-mode': nightMode }">
       <i class="el-icon-setting"></i>
       <span slot="title">设置</span>
     </el-menu-item>
   </el-menu>
  </div>
   <!-- 聊天记录区域 -->
   <div class="right">
    <!-- ChatGPT 版本选择 -->
    <el-row :gutter="20" class="version-selector">
    <el-select v-model="value" class="selectStyle"  placeholder="Please select ChatMdel" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-row>
    <div class="chat-history">
     <div v-for="(message, index) in chatHistory" :key="index" class="chat-message" :class="{ 'user-message': message.sender === 'User', 'gpt-message': message.sender === 'ChatGPT' }">
       {{ message.sender }}: {{ message.text }}
     </div>
   </div>
   <!-- 输入框t -->
   <div class="chat-input">
     <input v-model="inputValue" placeholder="Type something..."  @keyup.enter="sendMessage" />
     <button @click="sendMessage">Send</button>
   </div>

   </div>
   
 </div>

  
</template>
 
<script>
export default {
  data() {
    return {
      isCollapse: false,
      nightMode: false,
      options: [{
          value: '选项1',
          label: 'OpenAi'
        }, {
          value: '选项2',
          label: 'Ours'
        }, {
          value: '选项3',
          label: 'Chat2DB'
        }],
        value: '',
      inputValue: '', // Add a data property for input value
      chatHistory: [
      
      ], // 聊天记录
    };
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 1500) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    toggleNightMode() {
      this.nightMode = true;
    },
    toggleDayMode() {
      this.nightMode = false;
    },
    sendMessage() {
      const userMessage = { sender: 'User', text: this.inputValue };
      this.$set(this.chatHistory, this.chatHistory.length, userMessage);

      // 模拟 ChatGPT 的响应，这里使用 setTimeout 模拟异步
      setTimeout(() => {
        const gptMessage = { sender: 'ChatGPT', text: 'Response from ChatGPT' };
        this.$set(this.chatHistory, this.chatHistory.length, gptMessage);
      }, 1000); // 假设等待1秒钟模拟异步响应

      this.inputValue = ''; // 清空输入框
    },

  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.all{
  display: flex;  // 使用 Flexbox 布局
}
.home{
  width: 8%;
/* 添加夜晚模式的样式 */
.night-mode {
  background-color: #1a1a1a; /* 夜晚模式的背景颜色 */
  color: #ec1e1e; /* 夜晚模式的文字颜色 */
}

/* 添加左侧导航栏夜晚模式的样式 */
.night-mode .el-menu {
  background-color: #ec0e0e; /* 夜晚模式左侧导航栏的背景颜色 */
  color: #ffffff; /* 夜晚模式左侧导航栏的文字颜色 */
}
  // padding: 10px;  // 左侧元素的内边距
  .el-menu {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  position: relative;
}

.bottom-menu {
  margin-top: auto;
}


}

.right{
  flex: 1;  // 左侧元素占据剩余空间
 
  padding: 10px;  // 右侧元素的内边距
  .version-selector{
    width: 80%;
    height: 4vh;
    left: 11%;
  margin-bottom: 1%;
text-align: left;
.selectStyle{
border: none;
}
  }
  /* 聊天记录样式 */
.chat-history {
  max-height: 80vh;
  overflow-y: auto;
 padding: 1%;
  height: 82vh;
  border-bottom: 1px solid #fd1919;
  
  border-radius: 20px; /* 添加圆角样式 */
  border: 1px solid #df1a1a;

  bottom: 0;
  left: 15%;
  width: 80%;
  margin: 0 auto; /* 居中 */
  margin-bottom: 1.5%;
}
/* ChatGPT-style input */
.chat-input {
  display: flex;
  // background-color: #f1f1f1;

  border-radius: 20px; /* 添加圆角样式 */
  border: 1px solid #df1a1a;

  position: absolute;
  bottom: 0;
  left: 15%;
  width: 80%;
  margin: 0 auto; /* 居中 */
  margin-bottom: 1.5%;

}

.chat-input input {
  flex: 1;
  padding: 8px;
  border-top-left-radius: 20px; /* 添加圆角样式 */
  border-bottom-left-radius: 20px; /* 添加圆角样式 */

  // background-color: #f1f1f1;
  border: none;

  outline: none;
  margin: 0 auto; /* 居中 */
  width: 78%; /* 设置宽度为 80% */
}

.chat-input button {
  background-color: #4caf50;
  // color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  // border-radius: 20px; /* 添加圆角样式 */
  border-radius: 20px; /* 添加圆角样式 */
  // border-bottom-right-radius: 20px; /* 添加圆角样式 */
  padding-right: 20px;
}


.chat-message {
  margin-bottom: 8px;
  text-align: left;
}

}

</style>
