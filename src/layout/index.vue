<template>
    <div>
        <v-app>
        <v-navigation-drawer
            style="margin-top: 130px;"
            app
            permanent
            class="blue-grey lighten-5"
            expand-on-hover>
                <sidebar />
        </v-navigation-drawer>
            <navbar />
            <v-main>
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

<style lang="scss" scoped>

</style>