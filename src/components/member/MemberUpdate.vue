<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="text-center" style="margin: 30px 0px; justify-content: center">
      <h2>⚙ 회원정보수정</h2>
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
                :value="userInfo.userId"
                required
                disabled
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
                >{{ userInfo.userId }}</b-form-input
              >
            </b-form-group>
            <!-- 비밀번호 입력 -->
            <b-form-group label="비밀번호:" label-for="userPwd">
              <b-form-input
                type="password"
                id="userPwd"
                v-model="myUserInfo.userPwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <!-- 이름 입력 -->
            <b-form-group label="이름:" label-for="userName">
              <b-form-input
                type="text"
                id="userName"
                v-model="myUserInfo.userName"
                required
                placeholder="이름 입력...."
                @keyup.enter="confirm"
                >{{ userInfo.userName }}</b-form-input
              >
            </b-form-group>
            <!-- 전화번호 입력 -->
            <b-form-group label="전화번호:" label-for="userphone">
              <b-form-input
                type="text"
                id="userphone"
                v-model="myUserInfo.phone"
                required
                placeholder="전화번호 입력...."
                @keyup.enter="confirm"
                >{{ userInfo.phone }}</b-form-input
              >
            </b-form-group>
            <!-- 주소 입력 -->
            <b-form-group label="주소:" label-for="useraddress">
              <b-form-input
                type="text"
                id="useraddress"
                v-model="myUserInfo.address"
                required
                placeholder="주소 입력...."
                @keyup.enter="confirm"
                >{{ userInfo.address }}</b-form-input
              >
            </b-form-group>
            <!-- 회원가입 버튼 -->
            <b-button type="button" variant="primary" @click="confirm">정보 수정</b-button>
            <b-button type="button" variant="primary" @click="out">회원탈퇴</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import { update } from "@/api/member";
const memberStore = "memberStore";

export default {
  name: "MemberUpdate",
  data() {
    return {
      isLoginError: false,
    };
  },
  computed: {
    ...mapGetters(memberStore, ["myUserInfo"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    async confirm() {
      await this.$store.dispatch("memberStore/getUserInfoById", this.myUserInfo);
      this.$router.push({ name: "home" });
    },
    async out() {
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        await this.$store.dispatch("memberStore/outOfHere", this.myUserInfo.userId);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style></style>
