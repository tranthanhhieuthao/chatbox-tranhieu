<template>
    <div>
        <v-app>
        <v-navigation-drawer
            style="top: 15%;"
            app
            permanent
            class="blue-grey lighten-5"
            >
                <sidebar />
        </v-navigation-drawer>
            <navbar />
            <v-main style="margin-top: 130px;">
            <v-container>
                <app />
            </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import navbar from './navbar'
import sidebar from './sidebar'
import app from '../App'
    export default {
        components: {
            navbar,sidebar,app
        }
    }
</script>

<style lang="scss" >
html {
    overflow: hidden;
}
</style>