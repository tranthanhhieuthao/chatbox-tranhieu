<template>
  <div class="wapper">
    <v-card :loading="loading" class="mx-auto my-12 form-login" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img src="../assets/chat.jpg"></v-img>

      <v-card-title v-if="checkForm" style="display: flex; justify-content: center"
        >LOGIN</v-card-title
      >
      <v-card-title v-if="!checkForm" style="display: flex; justify-content: center"
        >REGISTER</v-card-title
      >

      <v-form v-if="checkForm" style="padding: 10px" ref="form" lazy-validation>
        <!-- :rules="emailRules" -->
        <v-text-field
          v-model="login.username"
          label="User name"
          required
        ></v-text-field>

        <v-text-field
          v-model="login.password"
          type="password"
          label="Password"
          required
        ></v-text-field>

        <v-card-actions style="display: flex; justify-content: center">
          <v-btn
            class="mr-4"
            style="margin-right: 10px; color: #59b4d1"
            @click="loginChat()"
          >
            <v-progress-circular
              v-if="loadingLogin"
              indeterminate
              color="primary"
            ></v-progress-circular>
            Submit
          </v-btn>

          <v-btn @click="changeForm('REGISTER')"> Register </v-btn>
        </v-card-actions>
      </v-form>

      <v-form v-else style="padding: 10px" ref="form" lazy-validation>
        <v-text-field
          v-model="registerForm.fullName"
          label="Full name"
          required
        ></v-text-field>

        <v-text-field
          v-model="registerForm.username"
          label="User name"
          required
        ></v-text-field>

        <!-- <v-text-field
            v-model="registerForm.sex"
            label="Sex"
            required
    ></v-text-field> -->

        <v-select
          v-model="registerForm.sex"
          :items="items"
          color="pink"
          label="Sex"
          required
        ></v-select>

        <v-text-field
          v-model="registerForm.phoneNumber"
          label="Phone"
          required
        ></v-text-field>

        <!-- :rules="emailRules" -->
        <v-text-field
          v-model="registerForm.gmail"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="registerForm.password"
          type="password"
          label="Password"
          required
        ></v-text-field>

        <v-card-actions style="display: flex; justify-content: center">
          <v-btn
            class="mr-4"
            style="margin-right: 10px; color: #59b4d1"
            @click="registerChat()"
          >
            <v-progress-circular
              v-if="loadingLogin"
              indeterminate
              color="primary"
            ></v-progress-circular>
            Confirm
          </v-btn>

          <v-btn @click="changeForm('LOGIN')"> Login </v-btn>
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
        gmail: "",
        password: "",
      },
      loading: false,
      checkForm: true,
      registerForm: {
        fullName: "",
        username: "",
        phoneNumber: "",
        gmail: "",
        password: "",
        sex: "",
      },
      loadingLogin: false,
      change: 0,
      items: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
    };
  },
  created() {
    this.items = [
      {
        text: "Female",
        value: "Female",
      },
      {
        text: "Male",
        value: "Male",
      },
    ];
  },
  methods: {
    changeForm(name) {
      if (name == "LOGIN") this.checkForm = true;
      else this.checkForm = false;
    },
    async loginChat() {
      this.loadingLogin = true;
      let res = await this.$store.dispatch("groupChatAPI/login", this.login);
      if (res.status === "SUCCESS") {
        this.$notify({
          title: "Success",
          message: "Login success",
          type: "success",
          position: "bottom-right",
        });
        this.loadingLogin = false;
        this.$store.dispatch("app/dataUserCurrent", this.login.username);
        sessionStorage.setItem("username", this.login.username);
        this.$router.replace("/home");
      } else {
        this.loadingLogin = false;
        this.$notify({
          title: "LOGIN FAIL CAUSE USER " + res.status,
          message: "Login fail",
          type: "error",
          position: "bottom-right",
        });
      }
    },
    async registerChat() {
      this.loadingLogin = true;
      let res = await this.$store.dispatch(
        "groupChatAPI/register",
        this.registerForm
      );
      if (res.status === "SUCCESS") {
        this.$notify({
          title: "Success",
          message: "Register success",
          type: "success",
          position: "bottom-right",
        });
        this.loadingLogin = false;
      } else {
        this.$notify({
          title: "Register Fail cause " + res.status,
          message: "Register fail",
          type: "error",
          position: "bottom-right",
        });
        this.loadingLogin = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wapper {
  background-image: url("../assets/bg3.jpg");
  object-fit: cover;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
}
.form-login {
  margin: auto;
  top: 7%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>
