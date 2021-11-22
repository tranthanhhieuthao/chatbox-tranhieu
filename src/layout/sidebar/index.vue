<template>
  <div>
    <v-card
    class="mx-auto"
    height="800"
    width="300"
  >
    <v-navigation-drawer
      absolute
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      permanent
    >
      <v-list>
        <v-list-item @click.stop="dialog = true">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Creat Group Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="dialogAddFriend = true">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>Add friend</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="dialogListFriend = true">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>List Friend</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <hr class="new1">
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          @click="joinGroup(item)"
        >
          <v-list-item-icon  >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >{{ item.nameGroup }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  <!-- create group  -->

  <v-dialog
          v-model="dialog"
          max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Create new group
      </v-card-title>

      <form style="padding: 10px;">
        <v-text-field
                v-model="dataGroup.nameGroup"
                label="Name"
                required
        ></v-text-field>
        <v-text-field
                v-model="dataGroup.limitJoinGroup"
                label="Limit"
                required
        ></v-text-field>
      </form>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
                color="green darken-1"
                text
                @click="cancelCreate"
        >
          Cancel
        </v-btn>

        <v-btn
                color="green darken-1"
                text
                @click="createGroup"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- add friend  -->

  <v-dialog
          v-model="dialogAddFriend"
          max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Add Friend
      </v-card-title>
      <v-text-field v-model="dataSearch.username"></v-text-field>
                <v-btn
                        class="mr-4"
                        @click="searchUsers"
                >
                    Search
        </v-btn>

      <form style="padding: 10px;" v-for="(item, i) of listUserSearch" :key="i">
        <v-list-item>
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
                  @click="addNewFriend(item)"
              >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
              </v-btn>
          </v-list-item-action-text>
        </v-list-item>
      </form>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
                color="green darken-1"
                text
                @click="cancelAddFriend"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- list friend  -->

  <v-dialog
          v-model="dialogListFriend"
          max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        List Friend
      </v-card-title>

      <form style="padding: 10px;" v-for="(item, i) of listFriend" :key="i">
        <v-list-item>
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
                  @click="removeFriend(item)"
              >
                  <v-icon dark>
                    mdi-minus
                  </v-icon>
              </v-btn>
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click="chatSingle(item)"
              >
                  <v-icon dark>
                    mdi-wechat
                  </v-icon>
              </v-btn>
          </v-list-item-action-text>
        </v-list-item>
      </form>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
                color="green darken-1"
                text
                @click="cancelListFriend"
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
        data: () => ({
      items: [],
          dialog:  false,
          dialogAddFriend:false,
          dialogListFriend: false,
          dataGroup: {
            id: null,
            limitJoinGroup: 0,
            nameGroup: "",
            typeGroup: ""
          },
          dataSearch: {
            username: "",
            page: 1,
            size: 1000
          },
          listUserSearch: [],
          listFriend: [],
          dataFriend: {
            username: "",
            page: 1,
            size: 1000
          },
          groupChat: {}
    }),
    computed: {
        ...mapGetters(['changeDataGroups'])
    },
    watch: {
      changeDataGroups() {
        this.addUserIntoGroup()
      }
    },
      mounted() {
        this.groupsUser();
        this.getListFriend()
        this.connect()
      },
      methods: {
        connect() {
        let socket = new SockJS(process.env.VUE_APP_WEBSOCKET)
        this.stompClient = Stomp.over(socket)
        this.stompClient.connect({}, this.onConnected, () => {console.log('cant connect')})
      },
      onConnected() {
      // Subscribe to the Public Topic
      this.stompClient.subscribe('/topic/group', this.groupsUser);
      },
      addUserIntoGroup() {
          this.groupChat.type = "ADD_GROUP"
          this.stompClient.send("/app/group.addUser" ,
              JSON.stringify(this.groupChat)
          )
      },
        async addNewFriend(data) {
          let temp = {
            userLogin: sessionStorage.getItem("username"),
            userFriend: data.username
          }
          let res = await this.$store.dispatch('userAPI/addFriend', temp)
          if (res.status === 'SUCCESS') {
            this.getListFriend()
            console.log("ADD FRIEND SUCCESS")
          }
          
        },
        removeFriend(data) {
          console.log(data)
        },
        async searchUsers() {
          let res = await this.$store.dispatch('groupChatAPI/findUser', this.dataSearch)
          if (res.status === 'SUCCESS') {
            this.listUserSearch = res.content.content
          }
       },
       async getListFriend() {
         this.dataFriend.username = sessionStorage.getItem("username")
          let res = await this.$store.dispatch('userAPI/friends', this.dataFriend)
          if (res.status === 'SUCCESS') {
            this.listFriend = res.content.content
            console.log("xem nao", this.listFriend)
          }
       },
      cancelAddFriend() {
        this.dataSearch.username = ""
        this.dialogAddFriend = false
      },
      cancelListFriend() {
        this.dialogListFriend = false
      },
      chatSingle() {

      },
        async createGroup() {
          this.dataGroup.userCreate = sessionStorage.getItem("username")
          let res = await this.$store.dispatch('groupChatAPI/createGroup', this.dataGroup)
          if (res.status === 'SUCCESS') {
            this.$notify({
              title: 'Success',
              message: 'Create success',
              type: 'success',
              position: 'bottom-right'
            })
            this.groupsUser()
            // this.$router.push("/chat")
          } else {
            this.$notify({
              title: 'Fail',
              message: 'Create fail',
              type: 'error',
              position: 'bottom-right'
            })
          }
          this.dialog = false
        },
        joinGroup(data) {
          if (parseInt(data.id) !== parseInt(sessionStorage.getItem("idGroundCurrent"))) {
            sessionStorage.setItem("idGroundCurrent", data.id)
            sessionStorage.setItem("nameGroundCurrent", data.nameGroup)
            this.$store.dispatch("app/dataGroupChatCurrent", data)
            this.$router.push("/chat/" + data.id)
          }
        },
        cancelCreate() {
          this.dataGroup = {}
          this.dialog = false
        },
        async groupsUser() {
          let username = sessionStorage.getItem("username")
          let res = await this.$store.dispatch('groupChatAPI/groupsUser', username)
          if (res.status === 'SUCCESS') {
            let contentCr = res.content
            this.items = []
            for (let it of contentCr) {
              it.icon = 'mdi-plex'
              this.items.push(it);
            }
            // this.$router.push("/chat")
          }
          this.dialog = false
        },
      },
    }
</script>

<style lang="scss" scoped>
 .new1 {
   border: 1px solid black;
   width: 100%;
 }
</style>
