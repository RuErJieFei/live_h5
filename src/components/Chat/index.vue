<template>
  <div>
    <div v-for="message in messageList" :key="message">
      {{ message['content'] }}
    </div>
    <div>
      <div class="send-content">
        <input v-model="content" placeholder="Please Enter..."/>
        <el-button @click="sendMsg">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {sendWebsocket, closeWebsocket, websocketSend} from "@/utils/websocket";
import {onMounted, reactive, ref} from "vue";

const message = reactive({
  fromId: "",
  toId: "",
  content: "",
  // type: "LOGIN_MSG"
  type: 0,
})

const messageList = ref([
  {
    content: "你好",
    from: "me",
    // timeLine: getTimeLine(this.messageList[this.messageList.length - 1]),
    // createTime: nowTimeStr()
  }
])

let content = ref("")

onMounted(() => {
  initWs();
  // setMessageCallback(wsMessage);
})

const wsMessage = (data) => {
  // 这里写拿到数据后的业务代码
  messageList.value.push({
        content: data.content
      }
  )
}
// ws连接失败，组件要执行的代码
const wsError = () => {
  // 比如取消页面的loading
}

const initWs = () => {
  //初始化websocket,向服务器发起连接请求，记录用户
  // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
  closeWebsocket();
  // 跟后端协商，需要什么参数数据给后台
  message.fromId = 0;
  // 发起ws请求
  sendWebsocket(message, wsMessage, wsError);
  // countUnreadAllMsg().then(res => {
  //   this.unreadCount = res.data;
  // });
}

const sendMsg = () => {
  if (content.value) {
    //发送消息
    message.fromId = 0;
    // message.toId = 1
    // 群发
    message.type = 2
    message.content = content.value;
    websocketSend(message);

    messageList.value.push({
      content: content.value,
      from: message.fromId,
      // timeLine: getTimeLine(this.messageList[this.messageList.length - 1]),
      // createTime: nowTimeStr()
    });
    content.value = "";
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
