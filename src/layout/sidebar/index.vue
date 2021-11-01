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
      width="100%"
      permanent
    >
      <v-list>
        <v-list-item @click.stop="dialog = true">
          <v-list-item-icon>
            <v-icon>mdi-bookmark-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Creat Group Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <hr class="new1">
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="joinGroup(item)">{{ item.nameGroup }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data: () => ({
      items: [],
          dialog:  false,
          dataGroup: {
            id: null,
            limitJoinGroup: 0,
            nameGroup: "",
            typeGroup: ""
          }
    }),
    computed: {
        ...mapGetters(['changeDataGroups'])
    },
    watch: {
       changeDataGroups() {
         console.log("phai vao")
         this.groupsUser()
       }
    },
      mounted() {
        this.groupsUser();
      },
      methods: {
        async createGroup() {
          this.dataGroup.userCreate = localStorage.getItem("username")
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
          this.$store.dispatch("app/dataGroupChatCurrent", data)
          this.$router.push("/chat/" + data.id)
        },
        cancelCreate() {
          this.dataGroup = {}
          this.dialog = false
        },
        async groupsUser() {
          let username = localStorage.getItem("username")
          let res = await this.$store.dispatch('groupChatAPI/groupsUser', username)
          if (res.status === 'SUCCESS') {
            let contentCr = res.content
            this.items = []
            for (let it of contentCr) {
              it.icon = 'mdi-unity'
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
