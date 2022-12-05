<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyQNA" class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" v-if="userInfo.isAdmin" size="sm" @click="deleteQNA">글삭제</b-button>
        <!-- 답글 달기.. 운영자만 보여야함. -->
        <b-button variant="outline-success" v-if="userInfo.isAdmin" size="sm" @click="moveWriteReply">답변하기</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${qna.title}</h3><div><h6>${qna.userId}</div><div>${qna.create_date}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <!--<div v-html="message"></div>-->
            <span style="white-space: pre;">{{qna.content}}</span>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- 답변 카드 -->
    <div v-for="reply in replies" v-bind:key="reply.id">
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="`<h3>${reply.title}</h3><div><h6>${reply.userId}</div><div>${reply.create_date}</h6></div>`"
            class="mb-2"
            border-variant="dark"
            no-body
          >
            <b-card-body class="text-left">
              <!--<div v-html="messageX"></div>-->
              <span style="white-space: pre;">{{reply.content}}</span>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
// import moment from "moment";
// import http from "@/api/http";
const memberStore = "memberStore";
const qnaStore = "qnaStore";
import { mapState } from "vuex";
export default {
  name: "QnAView",
  // data() {
  //   return {
  //     qna: nullm
  //     article: {},
  //     answers: [],
  //   };
  // },
  async created() {
    await this.$store.dispatch("qnaStore/getQna",this.$route.params.id);
    await this.$store.dispatch("qnaStore/getReplies",this.$route.params.id);
  },
  computed: {
    // ...mapGetters(["message"]),
    message() {
      if (this.qna.content) return this.qna.content.split("\n").join("<br>");
      return "";
    },
    messageX() {
      if (this.reply.content) return this.reply.content.split("\n").join("<br>");
      return "";
    },
    ...mapState(qnaStore, ["qna", "replies"]),
    ...mapState(memberStore, ["userInfo"]),
  },
    
  methods: {
    moveModifyQNA() {
      this.$router.replace({
        name: "qnamodify",
        params: { id: this.$route.params.id },
      });
    },
    async deleteQNA() {
      if (confirm("정말로 삭제?")) {
        await this.$store.dispatch("qnaStore/deleteQna", this.$route.params.id);
        this.$router.push({ name: "qnalist" });
      }
    },

    moveList() {
      this.$router.push({ name: "qnalist" });
    },
    moveWriteReply() {
      // replace
      this.$router.push({
        name: "awrite",
        params: { id: this.$route.params.id },
      });
    },
  },
};
</script>

<style></style>
