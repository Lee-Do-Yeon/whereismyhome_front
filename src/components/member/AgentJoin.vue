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
            <!-- μ€κ°μμλͺ μλ ₯ -->
            <b-form-group label="μ€κ°μμλͺ:" label-for="userName">
              <b-form-input
                type="text"
                id="userName"
                v-model="user.userName"
                required
                placeholder="μ€κ°μμλͺ μλ ₯...."
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
            <!-- λ±λ‘λ²νΈ μλ ₯ -->
            <b-form-group label="λ±λ‘λ²νΈ:" label-for="registerNumber">
              <b-form-input
                type="text"
                id="registerNumber"
                v-model="user.registerNumber"
                required
                placeholder="λ±λ‘λ²νΈ μλ ₯...."
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
import { mapActions } from "vuex";
import { join } from "@/api/member";
const memberStore = "memberStore";

export default {
  name: "AgentJoin",
  data() {
    return {
      isLoginError: false,
      user: {
        userId: null,
        userName: null,
        userPwd: null,
        phone: null,
        address: null,
        registerNumber: null,
        isAgent: 1,
      },
    };
  },
  methods: {
    ...mapActions(memberStore, ["join"]),
    async confirm() {
      await join(
        this.user,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
