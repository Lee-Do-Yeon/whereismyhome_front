<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" v-if="userInfo.isAdmin" size="sm" @click="moveModifynotice" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" v-if="userInfo.isAdmin"  size="sm" @click="deletenotice">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${notice.title}</h3><div><h6>${notice.author}</div><div>${notice.create_date}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <!--<div v-html="message"></div>-->
            <span style="white-space: pre;">{{notice.content}}</span>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const noticeStore = "noticeStore";
const memberStore = "memberStore";
// import { userInfo } from "os";
import { mapState } from "vuex";
export default {
  name: "NoticeView",
  async created() {
    await this.$store.dispatch("noticeStore/getNotice",this.$route.params.id);
  },
  computed: {
    message() {
      if (this.notice.content) return this.notice.content.split("\n").join("<br>");
      return "";
    },
    messageX() {
      if (this.reply.content) return this.reply.content.split("\n").join("<br>");
      return "";
    },
    ...mapState(noticeStore, ["notice"]),
    ...mapState(memberStore,["userInfo"]),
  },
    
  methods: {
    moveModifynotice() {
      this.$router.replace({
        name: "nmodify",
        params: { id: this.$route.params.id },
      });
    },
    async deletenotice() {
      if (confirm("정말로 삭제?")) {
        await this.$store.dispatch("noticeStore/deleteNotice", this.$route.params.id);
        this.$router.push({ name: "nlist" });
      }
    },
    moveList() {
      this.$router.push({ name: "nlist" });
    },
  },
};
</script>

<style></style>
