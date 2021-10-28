<template>
    <div class="wapper" >
        <v-card
    :loading="loading"
    class="mx-auto my-12 form-login"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="../assets/chat.jpg"
    ></v-img>

    <v-card-title style="display: flex;justify-content: center;">LOGIN</v-card-title>


    <v-form
    v-if="checkForm"
    style="padding: 10px;"
    ref="form"
    lazy-validation
  >
    
      <!-- :rules="emailRules" -->
    <v-text-field
      v-model="login.email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="login.password"
      type="password"
      label="Password"
      required
    ></v-text-field>

    <v-card-actions style="display: flex;justify-content: center;">
    <v-btn
      color="success"
      class="mr-4"
      style="margin-right: 10px; color: #59b4d1;"
    >
      Submit
    </v-btn>

    <v-btn @click="changeForm('REGISTER')">
      Register
    </v-btn>
    </v-card-actions>
  </v-form>

  <v-form
    v-else
    style="padding: 10px;"
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="register.fullName"
      label="Full name"
      required
    ></v-text-field>

    <v-text-field
      v-model="register.username"
      label="User name"
      required
    ></v-text-field>

    <v-text-field
      v-model="register.phoneNumber"
      label="Phone"
      required
    ></v-text-field>
    
      <!-- :rules="emailRules" -->
    <v-text-field
      v-model="register.email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="register.password"
      type="password"
      label="Password"
      required
    ></v-text-field>

    <v-card-actions style="display: flex;justify-content: center;">
    <v-btn
      color="success"
      class="mr-4"
      style="margin-right: 10px; color: #59b4d1;"
    >
      Confirm
    </v-btn>

    <v-btn @click="changeForm('LOGIN')">
      Login
    </v-btn>
    </v-card-actions>
  </v-form>
  </v-card>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            login: {
              email: "",
              password: "",
            },
            loading: false,
            checkForm: true,
            register: {
              fullName: "",
              username:"",
              phoneNumber:"",
              email: "",
              password: "",
            },
            change: 0
          }
        },
        methods: {
          changeForm(name) {
            if (name == 'LOGIN') this.checkForm = true
            else this.checkForm = false
          }
        },
    }
</script>

<style lang="scss" scoped>
.wapper {
    background-image: url("../assets/bg3.jpg");
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;
}
.form-login {
    margin: auto;
    top: 7%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>