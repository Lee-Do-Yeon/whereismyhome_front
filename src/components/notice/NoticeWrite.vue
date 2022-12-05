<template>
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
              type="number"
              required
              :valye="notice.author"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="subject-group"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input id="subject" v-model="notice.title" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
            <b-form-textarea
              id="content"
              v-model="notice.content"
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
export default {
  name: "NoticeWrite",
  components: {},
  data() {
    return {
      notice: {
        title: null,
        content: null,
      },
    };
  },
  methods: {
    async write() {
      const param = {
        title: this.notice.title,
        content: this.notice.content,
      };
      await this.$store.dispatch("noticeStore/writeNotice", param);
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
