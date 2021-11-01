<template>
<div>
    <div class="wapper" :key="contentChatShow" ref="refContent">
        <div class="header-chat">
        <h3 style="flex: 22;">{{ dataGroupChatCurrent.nameGroup }}</h3>
            <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="listUserNeedAdd"
            >
                <v-icon dark>
                    mdi-account-plus
                </v-icon>
            </v-btn>
            <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="pink"
                    @click="usersInGroup"
            >
                <v-icon dark>
                    mdi-account-switch
                </v-icon>
            </v-btn>
        </div>
        <hr />
        <div id="content-chat">
          <div  v-for="item of listMsg" :key="item.id" style="padding: 0px 10px 0px 10px;">
          <v-card
          v-if="item.sender === username"
            elevation="4"
            class="mainChat"
          >
           <div style="font-weight: bold;">{{item.sender}}</div>
           <div class="commentClass">{{item.comment}}</div>
           </v-card>
           <v-card
          v-if="item.sender !== username"
            elevation="4"
            class="subChat"
          >
           <div style="font-weight: bold;">{{item.sender}}</div>
           <div class="commentClass">{{item.comment}}</div>
           </v-card>
           <div v-if="item.usernameJoin ">
                    <div>
                        {{item.usernameJoin}} joined group
                    </div>
            </div>
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
        </div>
    </div>
    <v-dialog
            v-model="dialogListUser"
            max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">
                List User
            </v-card-title>

            <form style="padding: 10px;">
                <div v-for="item of listUserJoin" :key="item.id">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>{{item.username}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.gmail}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    color="primary"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </v-list-item-action-text>
                    </v-list-item>
                </div>
            </form>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        text
                        @click="cancelDialogListUser"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

<!--    start add user-->

    <v-dialog
            v-model="dialogAddUser"
            max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">
                Add User
            </v-card-title>


            <form style="padding: 10px;">
                <v-text-field v-model="searchName"></v-text-field>
                <v-btn
                        class="mr-4"
                        @click="searchUsers"
                >
                    Search
                </v-btn>
                <div v-for="item of listUserSearch" :key="item.id">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>{{item.username}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.gmail}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    color="primary"
                                    @click="addUserIntoGroup(item)"
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </v-list-item-action-text>
                    </v-list-item>
                </div>
            </form>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        text
                        @click="cancelDialogAddUser"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { mapGetters } from 'vuex'
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
       dialogListUser: false,
      listMsg: [],
      commentChat: {
          sender: "",
          comment: "",
          // like, heart, simile
          status: "",
          countStatus: 0,
          idGroupChat: 0,
          idUser: 0,
          type: ""
       },
        groupChat: {
            sender: "",
            comment: "",
            idGroupChat: "",
            type: "",
            idUser: 0
        },
        listUserJoin: [],
        listUserSearch: [],
        dialogAddUser: false,
        searchName: "",
        dataCmt: {
            idGroup: 0,
            page: 1,
            size: 1000
        },
        contentChatShow: 0,
        nameJoin: [],
        checkJoin: false
    }
  },
    computed: {
        ...mapGetters(['dataGroupChatCurrent', 'dataUserCurrent'])
    },
    watch: {
        dataGroupChatCurrent() {    
            this.nameJoin = []
            this.listMsg = []
            this.message = ''
            let element = this.$refs['refContent']
      console.log("lklk", element)
      element.scrollTop = element.scrollHeight;
            this.init()
                
        }
    },
  mounted () {
      let element = this.$refs['refContent']
      console.log("lklk", element)
      element.scrollTop = element.scrollHeight;
    this.init()
  },
  methods: {
    init() {
        this.groupChat.idGroupChat = this.dataGroupChatCurrent.id 
        this.username = this.dataUserCurrent  
        this.commentsUser()
        this.connect()
    },
    connect() {
    let socket = new SockJS('http://localhost:8081/ws')
        this.stompClient = Stomp.over(socket)
        this.stompClient.connect({}, this.onConnected, () => {console.log('cant connect')})
    },

    onConnected() {
    // Subscribe to the Public Topic
    this.stompClient.subscribe('/topic/' + this.dataGroupChatCurrent.id , this.onMessageReceived);
    },
      addUserIntoGroup(data) {
          this.groupChat.idUser = data.id
          this.groupChat.type = "JOIN"
          this.stompClient.send("/app/chat.addUser/" + this.dataGroupChatCurrent.id,
              JSON.stringify(this.groupChat)
          )
      },

 contentChat(sender, content) {
   let temp = {
     sender: sender,
     comment: content
   }
   this.listMsg.push(temp);
 },

 sendMessage() {
    if(this.message && this.stompClient) {
        this.groupChat.sender = this.username
        this.groupChat.type = "CHAT"
        this.groupChat.comment = this.message
        this.stompClient.send("/app/chat.sendMessage/" +  this.dataGroupChatCurrent.id, JSON.stringify(this.groupChat));
        this.message = '';
    }
 },

 onMessageReceived(payload) {
    let message = JSON.parse(payload.body);
    console.log("huhu", message)
    if(message.type === 'JOIN') {
        this.listMsg.push(message)
        this.checkJoin = true
    } else if (message.type === 'LEAVE') {
        console.log('LEAVE')
        this.checkJoin = false
    } else if(message.type === 'CHAT'){
        this.checkJoin = false
        this.contentChat(message.sender, message.comment);
    }
 },
      async usersInGroup() {
          let res = await this.$store.dispatch('groupChatAPI/usersInGroup', this.groupChat.idGroupChat)
          if (res.status === 'SUCCESS') {
            this.listUserJoin = res.content
            this.dialogListUser = true
          }

      },

       listUserNeedAdd() {
          this.dialogAddUser = true
      },
      async searchUsers() {
          let res = await this.$store.dispatch('groupChatAPI/findUser', this.searchName)
          if (res.status === 'SUCCESS') {
            this.listUserSearch = res.content
          }
      },
      cancelDialogListUser() {
       this.dialogListUser = false
      },
      cancelDialogAddUser() {
       this.dialogAddUser = false
      },
      async commentsUser() {
          this.dataCmt.idGroup = this.dataGroupChatCurrent.id
           let res = await this.$store.dispatch('groupChatAPI/commentsUser', this.dataCmt)
           if (res.status === 'SUCCESS') {
                this.listMsg = res.content.content
           } else {
               this.listMsg = []
           }
           
          

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-chat {
        height: 600px;
        margin-bottom: 10px;
        margin-top: 20px;
        overflow: auto;
        padding: auto;
       
    }
    .wapper {
      background: rgb(234, 240, 245);
      /* overflow: auto; */
    }
    #write-message {
        width: 100%;
    }
    .header-chat {
        background: #7bb1d9;
        color: white;
        display: flex; 
        /* z-index: 1000; */
        width: 100%;
    }
    .mainChat {
        display: grid;
        justify-content: flex-start;
        margin-bottom: 10px;
        background-color: rgb(191, 216, 247);
        padding: 3px;
        width: fit-content;
        left: 85%;
    }
    .subChat {
        display: grid;
        justify-content: flex-start;
        margin-bottom: 10px;
         padding: 3px;
         width: fit-content;
        left: 4%;
    
    }
    .commentClass {
        width: 140px;
    }
</style>

