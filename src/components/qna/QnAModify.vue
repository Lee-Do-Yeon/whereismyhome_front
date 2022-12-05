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
          <!-- <b-form-group
          id="userId-group"
          label="작성자:"
          label-for="userId"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userId"
            disabled
            type="text"
            required
            :placeholder="qna.userId"
          ></b-form-input>
        </b-form-group> -->

          <b-form-group
            id="subject-group"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input id="subject" v-model="newQna.title" type="text" required>{{
              qna.title
            }}</b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
            <b-form-textarea id="content" v-model="newQna.content" rows="10" max-rows="15">{{
              qna.content
            }}</b-form-textarea>
          </b-form-group>
          <b-button variant="primary" class="m-1" @click="updateQNA">글수정</b-button>
          <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const qnaStore = "qnaStore";
import { mapGetters, mapState } from "vuex";

export default {
  name: "QnAModify",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("qnaStore/getQna", this.$route.params.id);
  },
  computed: {
    ...mapState(qnaStore, ["qna"]),
    ...mapGetters(qnaStore, ["newQna"]),
  },
  methods: {
    async updateQNA() {
      // const qnaPost = {
      //   id: this.qna.id,
      //   userId: this.qna.userId,
      //   title: this.title,
      //   content: this.content,
      // };
      // this.newQna
      await this.$store.dispatch("qnaStore/updateQna", this.newQna);
      this.$router.push({ name: "qnalist" });
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
