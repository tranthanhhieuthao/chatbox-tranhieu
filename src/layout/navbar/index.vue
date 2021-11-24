<template>
    <div>
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn icon href="/home">
      <v-icon>mdi-home</v-icon>
      </v-btn>

      <!-- <v-app-bar-title>Wellcome Chatbox</v-app-bar-title> -->

      <v-spacer></v-spacer>

      <v-btn icon @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-email</v-icon>
      </v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
    export default {
        data() {
          return {
            key: 0
          }
        },
        methods: {
          logout() {
            sessionStorage.clear()
            this.$router.replace('/')
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>