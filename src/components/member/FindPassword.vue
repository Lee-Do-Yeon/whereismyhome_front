<template>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
            <b-form class="text-left">
              <b-form-group label="아이디:" label-for="userid">
                <b-form-input
                  id="userid"
                  v-model="userId"
                  required
                  placeholder="아이디 입력...."
                  @keyup.enter="confirm"
                ></b-form-input>
              </b-form-group>
              <b-button type="button" variant="primary" class="m-1" @click="findPassword">비밀번호 찾기</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </template>


<script>
export default {
    name: "passFind",
    data() {
        return {
            userId: "",
        };
    },
    methods: {
        findPassword() {
            this.$store.dispatch("memberStore/findPassword",this.userId);
            this.$router.push({ name: "home" });
        },
    },
};
</script>
<style></style>
