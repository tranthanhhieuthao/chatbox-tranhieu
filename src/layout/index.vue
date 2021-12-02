<template>
  <div>
    <v-app class="app-wapper">
      <v-navigation-drawer 
      app
      permanent
      >
        <sidebar />
      </v-navigation-drawer>

      <v-app-bar app>
        <navbar />
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main style="margin-top: 75px;">
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <app />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import navbar from "./navbar";
import sidebar from "./sidebar";
import app from "../App";
export default {
  components: {
    navbar,
    sidebar,
    app,
  },
};
</script>

<style lang="scss" >
.v-application--wrap {
    min-height: 100% !important;
}
// html {
//   height: 100vh;
// }
</style>