<template>
<div>
    <div class="wapper">
        <div id="content-chat">
          <div  v-for="item of listMsg" :key="item.id">
          <v-card
            elevation="2"
            shaped
            style="margin-bottom: 10px;"
          >
           <div style="font-weight: bold;">{{item.username}}</div>
           {{item.content}}
           </v-card>
          </div>
        </div>
        <div id="write-message">
            <v-textarea
          class="mx-2"
          label="Message"
          rows="1"
          prepend-icon="mdi-comment"
          v-model="message" v-on:keyup.enter="sendMessage"
        ></v-textarea>
        <v-textarea
          class="mx-2"
          label="UserName"
          rows="1"
          prepend-icon="mdi-comment"
          v-model="username"
        ></v-textarea>
        </div>
    </div>
</div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      stompClient: null,
      username: '',
      message: '',
      listMsg: []
    }
  },
  mounted () {
    this.connect();
  },
  methods: {
   connect() {
    let socket = new SockJS('http://localhost:8081/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, () => {console.log('cant connect')});
    
},

 onConnected() {
    // Subscribe to the Public Topic
    this.stompClient.subscribe('/topic/publicChatRoom', this.onMessageReceived);

    // Tell your username to the server
    this.stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: this.username, type: 'JOIN', content:''})
    )
},

 contentChat(sender, content) {
   let temp = {
     username: sender,
     content: content
   }
   this.listMsg.push(temp);
   console.log('jiji', this.listMsg)
},

 sendMessage() {
   console.log('hah', this.message)
    if(this.message && this.stompClient) {
        let chatMessage = {
            sender: this.username,
            content: this.message,
            type: 'CHAT'
        };
        console.log(chatMessage)
        this.stompClient.send("/app/chat.sendMessage", JSON.stringify(chatMessage));
        this.message = '';
    }
},

 onMessageReceived(payload) {
    let message = JSON.parse(payload.body);
    console.log('kkk', message)

    if(message.type === 'JOIN') {
        console.log('JOIN')
    } else if (message.type === 'LEAVE') {
        console.log('LEAVE')
    } else {
      console.log('vaqo da')
        this.contentChat(message.sender, message.content);
    }
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-chat {
        height: 600px;
        margin-top: 130px;
        margin-bottom: 10px;
        width: 100%;
    }
    .wapper {

    }
</style>
