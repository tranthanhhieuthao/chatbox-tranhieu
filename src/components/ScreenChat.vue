<template>
  <div>
    <div class="wapper" :key="contentChatShow">
      <div class="header-chat">
        <h3 style="flex: 22">{{ nameGroupSingleCurrent }}</h3>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="listUserNeedAdd"
        >
          <v-icon dark> mdi-account-plus </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="pink"
          @click="openPopupUserInGrp"
        >
          <v-icon dark> mdi-account-switch </v-icon>
        </v-btn>
      </div>
      <hr />
      <div id="content-chat" ref="refContent">
        <div
          v-for="item of listMsg"
          :key="item.id"
          style="padding: 0px 10px 0px 10px"
        >
          <v-card
            v-if="item.sender === username && !item.usernameJoin"
            elevation="4"
            class="mainChat"
          >
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
            </v-list-item-avatar>
            <div style="font-weight: bold">
              {{ item.sender }}, {{ item.timeCreateFormat }}
            </div>
            <div class="commentClass">{{ item.comment }}</div>
          </v-card>

          <v-card
            v-if="item.sender !== username && !item.usernameJoin"
            elevation="4"
            class="subChat"
          >
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" />
            </v-list-item-avatar>
            <div style="font-weight: bold">
              {{ item.sender }}, {{ item.timeCreateFormat }}
            </div>
            <div class="commentClass">{{ item.comment }}</div>
          </v-card>
          <div v-if="item.usernameJoin">
            <div>{{ item.usernameJoin }} has already joined group</div>
          </div>
        </div>
      </div>
      <div id="write-message">
        <v-textarea
          class="mx-2"
          label="Message"
          rows="1"
          prepend-icon="mdi-comment"
          v-model="message"
          v-on:keyup.enter="sendMessage"
        ></v-textarea>
      </div>
    </div>
    <v-dialog v-model="dialogListUser" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> List User </v-card-title>

        <form style="padding: 10px">
          <div v-for="item of listUserJoin" :key="item.id">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{ item.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.gmail }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action-text>
                <v-btn class="mx-2" fab dark small color="primary">
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </v-list-item-action-text>
            </v-list-item>
          </div>
        </form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="cancelDialogListUser">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--    start add user-->

    <v-dialog v-model="dialogAddUser" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Add User </v-card-title>

        <form style="padding: 10px">
          <v-text-field v-model="dataSearch.username"></v-text-field>
          <v-btn class="mr-4" @click="searchUsers"> Search </v-btn>
          <div v-for="item of listUserSearch" :key="item.id">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{ item.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.gmail }}</v-list-item-subtitle>
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
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-list-item-action-text>
            </v-list-item>
          </div>
        </form>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="cancelDialogAddUser">
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
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      stompClient: null,
      username: "",
      message: "",
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
        type: "",
      },
      groupChat: {
        sender: "",
        comment: "",
        idGroupChat: "",
        type: "",
        idUser: 0,
      },
      listUserJoin: [],
      listUserSearch: [],
      dialogAddUser: false,
      dataSearch: {
        username: "",
        page: 1,
        size: 1000,
      },
      dataCmt: {
        idGroup: 0,
        page: 1,
        size: 1000,
      },
      contentChatShow: 0,
      nameJoin: [],
      checkJoin: false,
      nameGroupCurrent: "",
      typeRoomCurrent: "",
      nameGroupSingleCurrent: "",
      userCurrentChatSingle: {},
      checkConnected: [],
    };
  },
  computed: {
    ...mapGetters([
      "dataGroupChatCurrent",
      "dataUserCurrent",
      "checkMissMessage",
    ]),
  },
  watch: {
    dataGroupChatCurrent() {
      this.nameJoin = [];
      this.listMsg = [];
      this.message = "";
      this.init();
    },
  },
  mounted() {
    this.init();
  },

  methods: {
    scrollBot() {
      let element = this.$refs["refContent"];
      if (element !== undefined) {
        element.scrollTop = element.scrollHeight;
      }
    },
    async init() {
      this.typeRoomCurrent = this.dataGroupChatCurrent.typeGroup;
      this.nameGroupCurrent =
        this.dataGroupChatCurrent.nameGroup ||
        sessionStorage.getItem("nameGroundCurrent");
      this.groupChat.idGroupChat =
        this.dataGroupChatCurrent.id ||
        sessionStorage.getItem("idGroundCurrent");
      this.username =
        this.dataUserCurrent || sessionStorage.getItem("username");
      if (this.typeRoomCurrent === "SINGLE") {
        this.nameGroupSingleCurrent = this.nameGroupCurrent
          .split("-")
          .filter((e) => e !== this.username)[0];
      } else this.nameGroupSingleCurrent = this.nameGroupCurrent;
      await this.commentsUser();
      this.usersInGroup();
      this.scrollBot();
      if (this.checkConnected.indexOf(this.groupChat.idGroupChat) < 0) {
        this.connect();
      }
    },
    connect() {
      this.checkConnected.push(this.groupChat.idGroupChat);
      let socket = new SockJS(process.env.VUE_APP_WEBSOCKET);
      this.stompClient = Stomp.over(socket);
      this.stompClient.debug = () => {};
      this.stompClient.connect({}, this.onConnected, () => {
        console.log("cant connect");
      });
    },

    onConnected() {
      // Subscribe to the Public Topic
      this.stompClient.subscribe(
        "/topic/" + this.groupChat.idGroupChat,
        this.onMessageReceived
      );
    },
    addUserIntoGroup(data) {
      if (
        this.typeRoomCurrent === "SINGLE" &&
        this.nameGroupCurrent.includes(this.username) &&
        this.listUserJoin.length === 1
      ) {
        this.groupChat.idUser = this.userCurrentChatSingle.id;
      } else {
        this.groupChat.idUser = data.id;
      }
      this.groupChat.type = "JOIN";
      this.stompClient.send(
        "/app/chat.addUser/" + this.groupChat.idGroupChat,
        JSON.stringify(this.groupChat)
      );
    },

    async contentChat(msg) {
      this.listMsg.push(msg);
      this.listMsg.forEach((e) => {
        e.timeCreateFormat = this.formatTimeChat(e.timeCreate);
      });
      // await this.commentsUser()
      setTimeout(() => {
        this.scrollBot();
      }, 0);
    },

    async sendMessage() {
      if (this.message && this.stompClient) {
        if (
          this.nameGroupCurrent.includes(this.username) &&
          this.typeRoomCurrent === "SINGLE" &&
          this.listUserJoin.length === 1
        ) {
          await this.dataUserChatSingle();
          await this.addUserIntoGroup();
          this.typeRoomCurrent = "";
          this.dataGroupChatCurrent.typeGroup = "";
          this.$store.dispatch(
            "app/dataGroupChatCurrent",
            this.dataGroupChatCurrent
          );
        }
        this.groupChat.sender = this.username;
        this.groupChat.type = "CHAT";
        this.groupChat.comment = this.message;
        this.stompClient.send(
          "/app/chat.sendMessage/" + this.groupChat.idGroupChat,
          JSON.stringify(this.groupChat)
        );
        this.message = "";
      }
    },

    onMessageReceived(payload) {
      let checkTrustRoom = parseInt(JSON.parse(payload.body).idGroupChat);
      let message = JSON.parse(payload.body);
      if (checkTrustRoom === this.groupChat.idGroupChat) {
        if (message.type === "JOIN") {
          this.listMsg.push(message);
          this.checkJoin = true;
          this.$store.dispatch("app/changeDataGroups", Math.random(0, 100));
        } else if (message.type === "LEAVE") {
          this.checkJoin = false;
        } else if (message.type === "CHAT") {
          this.checkJoin = false;
          message.usernameJoin = "";
          this.contentChat(message);
        }
      } else {
        if (message.type === "CHAT") {
          let tempId = [];
          tempId.push(checkTrustRoom);
          let tempRoom = {
            roomId: tempId,
          };
          this.$store.dispatch("app/checkMissMessage", !this.checkMissMessage);
          this.$store.dispatch("app/roomSendMessage", tempRoom);
        }
      }
    },
    openPopupUserInGrp() {
      this.dialogListUser = true;
    },
    async usersInGroup() {
      let res = await this.$store.dispatch(
        "groupChatAPI/usersInGroup",
        this.groupChat.idGroupChat
      );
      if (res.status === "SUCCESS") {
        this.listUserJoin = res.content;
      }
    },
    async dataUserChatSingle() {
      this.dataSearch.username = this.nameGroupCurrent.split("-")[1];
      let res = await this.$store.dispatch(
        "groupChatAPI/findUser",
        this.dataSearch
      );
      if (res.status === "SUCCESS") {
        this.userCurrentChatSingle = res.content.content[0];
      }
    },

    listUserNeedAdd() {
      this.dialogAddUser = true;
    },
    async searchUsers() {
      let res = await this.$store.dispatch(
        "groupChatAPI/findUser",
        this.dataSearch
      );
      if (res.status === "SUCCESS") {
        this.listUserSearch = res.content.content;
      }
    },
    cancelDialogListUser() {
      this.dialogListUser = false;
    },
    cancelDialogAddUser() {
      this.dialogAddUser = false;
    },
    formatTimeChat(time) {
      let temp = new Date(time);
      let check = "";
      if (temp.getHours() > 12) check = "PM";
      else check = "AM";
      return temp.getHours() + ":" + temp.getMinutes() + " " + check;
    },
    async commentsUser() {
      this.dataCmt.idGroup = this.groupChat.idGroupChat;
      let res = await this.$store.dispatch(
        "groupChatAPI/commentsUser",
        this.dataCmt
      );
      if (res.status === "SUCCESS") {
        this.listMsg = res.content.content;
      } else {
        this.listMsg = [];
      }
      this.listMsg.forEach((e) => {
        e.timeCreateFormat = this.formatTimeChat(e.timeCreate);
      });
    },
  },
};
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
  overflow: auto;
}
#write-message {
  width: 100%;
}
.header-chat {
  background: rgb(83, 83, 83);
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
  width: 150px;
}
</style>

