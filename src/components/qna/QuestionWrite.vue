<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @reset="onReset">
          <b-form-group
            id="subject-group"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input id="subject" v-model="qna.title" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
            <b-form-textarea
              id="content"
              v-model="qna.content"
              rows="10"
              max-rows="15"
            ></b-form-textarea>
          </b-form-group>
          <b-button variant="primary" class="m-1" @click="write">글작성</b-button>
          <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "QuestionWrite",
  components: {},
  data() {
    return {
      qna: {
        title: null,
        content: null,
      },
    };
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
  },
  methods: {
    async write() {
      const param = {
        userId: this.userInfo.userId,
        title: this.qna.title,
        content: this.qna.content,
      };
      await this.$store.dispatch("qnaStore/writeQNA", param);
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
