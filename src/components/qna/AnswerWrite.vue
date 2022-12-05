<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @reset="onReset">
        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="qna.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="qna.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button variant="primary" class="m-1"
          @click="write">글작성</b-button
        >
        <b-button variant="primary" class="m-1">글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>

</template>

<script>

export default {
  name: "AnswerWrite",
  data() {
    return {
      qna: {
        userId: "temp",
        replyTo: this.$route.params.id,
        title: null,
        content: null,
      }
    }
  },
  created() {
    // change later
    
  },
  methods: {
    async write() {
      const param = {
        userId: this.qna.userId,
        title: this.qna.title,
        content: this.qna.content,
        replyTo: this.qna.replyTo,
      };
      await this.$store.dispatch("qnaStore/writeQNA",param);
      this.$router.push({ name: "qnalist" });  
    },
    onReset() {
      this.qna.title="";
      this.qna.content="";
    }
  }
};
</script>

<style></style>
