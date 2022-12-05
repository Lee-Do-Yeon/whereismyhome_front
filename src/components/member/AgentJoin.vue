<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="text-center" style="margin: 30px 0px; justify-content: center">
      <h2>👪 회원가입</h2>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <!-- 아이디 입력 -->
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userId"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 비밀번호 입력 -->
            <b-form-group label="비밀번호:" label-for="userPwd">
              <b-form-input
                type="password"
                id="userPwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 중개업소명 입력 -->
            <b-form-group label="중개업소명:" label-for="userName">
              <b-form-input
                type="text"
                id="userName"
                v-model="user.userName"
                required
                placeholder="중개업소명 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 전화번호 입력 -->
            <b-form-group label="전화번호:" label-for="userphone">
              <b-form-input
                type="text"
                id="userphone"
                v-model="user.phone"
                required
                placeholder="전화번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 주소 입력 -->
            <b-form-group label="주소:" label-for="useraddress">
              <b-form-input
                type="text"
                id="useraddress"
                v-model="user.address"
                required
                placeholder="주소 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 등록번호 입력 -->
            <b-form-group label="등록번호:" label-for="registerNumber">
              <b-form-input
                type="text"
                id="registerNumber"
                v-model="user.registerNumber"
                required
                placeholder="등록번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 회원가입 버튼 -->
            <b-button type="button" variant="primary" @click="confirm">회원가입</b-button>
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
