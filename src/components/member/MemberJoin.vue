<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="text-center" style="margin: 30px 0px; justify-content: center">
      <h2>πͺ νμκ°μ</h2>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >μμ΄λ λλ λΉλ°λ²νΈλ₯Ό νμΈνμΈμ.</b-alert
            >
            <!-- μμ΄λ μλ ₯ -->
            <b-form-group label="μμ΄λ:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userId"
                required
                placeholder="μμ΄λ μλ ₯...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- λΉλ°λ²νΈ μλ ₯ -->
            <b-form-group label="λΉλ°λ²νΈ:" label-for="userPwd">
              <b-form-input
                type="password"
                id="userPwd"
                v-model="user.userPwd"
                required
                placeholder="λΉλ°λ²νΈ μλ ₯...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- μ΄λ¦ μλ ₯ -->
            <b-form-group label="μ΄λ¦:" label-for="userName">
              <b-form-input
                type="text"
                id="userName"
                v-model="user.userName"
                required
                placeholder="μ΄λ¦ μλ ₯...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- μ νλ²νΈ μλ ₯ -->
            <b-form-group label="μ νλ²νΈ:" label-for="userphone">
              <b-form-input
                type="text"
                id="userphone"
                v-model="user.phone"
                required
                placeholder="μ νλ²νΈ μλ ₯...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- μ£Όμ μλ ₯ -->
            <b-form-group label="μ£Όμ:" label-for="useraddress">
              <b-form-input
                type="text"
                id="useraddress"
                v-model="user.address"
                required
                placeholder="μ£Όμ μλ ₯...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- μ΄λ©μΌ μλ ₯ -->
            <b-form-group label="μ΄λ©μΌ:" label-for="useraddress">
              <b-form-input
                type="text"
                id="useraddress"
                v-model="user.email"
                required
                placeholder="μ΄λ©μΌ μλ ₯...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- νμκ°μ λ²νΌ -->
            <b-button type="button" variant="primary" @click="confirm">νμκ°μ</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "MemberJoin",
  data() {
    return {
      isLoginError: false,
      user: {
        userId: null,
        userName: null,
        userPwd: null,
        phone: null,
        address: null,
        email: null,
        registerNumber: null,
        isAgent: 0,
      },
    };
  },
  methods: {
    //...mapActions(memberStore, ["join"]),
    confirm() {
      this.$store.dispatch("memberStore/join", this.user);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
