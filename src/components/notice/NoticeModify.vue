<template>
  <!--
  <b-container class="bv-example-row mt-3">
    <board-input-item type="modify" />
  </b-container>
-->
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @reset="onReset">
          <b-form-group
            id="author-group"
            label="작성자:"
            label-for="author"
            description="작성자를 입력하세요."
          >
            <b-form-input
              id="author"
              disabled
              type="text"
              required
              :placeholder="notice.author"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="subject-group"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input id="subject" v-model="newNotice.title" type="text" required>{{
              notice.title
            }}</b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
            <b-form-textarea id="content" v-model="newNotice.content" rows="10" max-rows="15">{{
              notice.content
            }}</b-form-textarea>
          </b-form-group>
          <b-button variant="primary" class="m-1" @click="updateNotice">글수정</b-button>
          <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
        </b-form>
      </b-col>
    </b-row></b-container
  >
</template>

<script>
const noticeStore = "noticeStore";
import { mapGetters, mapState } from "vuex";

export default {
  name: "NoticeModify",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("noticeStore/getNotice", this.$route.params.id);
  },
  computed: {
    ...mapState(noticeStore, ["notice"]),
    ...mapGetters(noticeStore, ["newNotice"]),
  },
  methods: {
    async updateNotice() {
      await this.$store.dispatch("noticeStore/updateNotice", this.newNotice);
      this.$router.push({ name: "nlist" });
    },
    onReset(event) {
      event.preventDefault();
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style></style>
