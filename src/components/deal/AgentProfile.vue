<template>
  <div style="max-width: 100%; height: 150px; margin-top: 50px">
    <b-row no-gutters>
      <b-col md="6"
        ><h1>{{ agentInfo.userName }}</h1></b-col
      >
      <b-col md="2">
        <b-row
          ><h6><b-badge variant="primary">등록번호</b-badge></h6></b-row
        >
        <b-row
          ><h6><b-badge variant="primary">주소</b-badge></h6></b-row
        >

        <b-row
          ><h6><b-badge variant="primary">전화번호</b-badge></h6></b-row
        >
      </b-col>
      <b-col md="4">
        <b-row>{{ agentInfo.registerNumber }}</b-row>
        <b-row>{{ agentInfo.address }}</b-row>
        <b-row>{{ agentInfo.phone }}</b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  computed: {
    ...mapState(memberStore, ["agentInfo"]),
  },
};
</script>

<style></style>
