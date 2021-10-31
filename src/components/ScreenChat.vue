<template>
<div>
    <div class="wapper">
        <div style="background: #7bb1d9;color: white;display: flex">
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
        searchName: ""
    }
  },
    computed: {
        ...mapGetters(['dataGroupChatCurrent'])
        // dataGroup: {
        //     get() {
        //        return this.$store.state.app.dataGroupChatCurrent
        //     }
        // }
    },
    watch: {
        dataGroupChatCurrent() {
            this.groupChat.idGroupChat = this.dataGroupChatCurrent.id
            console.log("lolo", this.dataGroupChatCurrent)
            this.connect();
        }
    },
  mounted () {
      this.username = localStorage.getItem("username")
  },
  methods: {
   connect() {
    let socket = new SockJS('http://localhost:8081/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, () => {console.log('cant connect')});
    },

 onConnected() {
    // Subscribe to the Public Topic
    this.stompClient.subscribe('/topic/' + this.groupChat.idGroupChat , this.onMessageReceived);

    // Tell your username to the server
    // this.addUserIntoGroup()
    },
      addUserIntoGroup(data) {
          this.groupChat.idUser = data.id
          this.groupChat.type = "CHAT"
          this.stompClient.send("/app/chat.addUser/" + this.groupChat.idGroupChat,
              JSON.stringify(this.groupChat)
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
    if(this.message && this.stompClient) {
        this.groupChat.sender = this.username
        this.groupChat.type = "CHAT"
        this.groupChat.comment = this.message
        this.stompClient.send("/app/chat.sendMessage/" +  this.groupChat.idGroupChat, JSON.stringify(this.groupChat));
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
        this.contentChat(message.sender, message.comment);
    }
 },
      async usersInGroup() {
          let res = await this.$store.dispatch('groupChatAPI/usersInGroup', this.groupChat.idGroupChat)
          this.listUserJoin = res.content
          this.dialogListUser = true

      },

       listUserNeedAdd() {
          this.dialogAddUser = true
      },
      async searchUsers() {
          let res = await this.$store.dispatch('groupChatAPI/findUser', this.searchName)
          this.listUserSearch = res.content
      },
      cancelDialogListUser() {
       this.dialogListUser = false
      },
      cancelDialogAddUser() {
       this.dialogAddUser = false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-chat {
        height: 650px;
        margin-bottom: 10px;
        width: 100%;
        position: relative;
    }
    .wapper {
      background: rgb(234, 240, 245);
    }
</style>

