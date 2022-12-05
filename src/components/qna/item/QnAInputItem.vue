<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="article.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type != 'modify'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
// import http from "@/api/http";

export default {
  name: "QnAInputItem",
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      /*
      http.get(`/qna/post/${this.$route.params.id}`).then(({ data }) => {
        this.article = data;
      });
      this.isUserid = true;
      */
    } else if (this.type === "answer") {
      // 답변하는 글의 글 번호 -> ${this.$route.params.articleno}
      this.$store.dispatch;
      this.article.replyTo = this.$route.params.id;
      console.log("답변하기");
      this.article.title = "Re:" + "제목이면 좋겠는데";
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userId &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userId.focus());
      err &&
        !this.article.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "modify" ? this.modifyQNA() : this.registQNA();
    },
    onReset(event) {
      event.preventDefault();
      this.article.id = 0;
      this.article.title = "";
      this.article.content = "";
      this.moveList();
    },

    /*
    registQNA({commit}, data) {
      http
        .post(`/qna/post`,data)
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          console.log(data);
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          
        });


      const params = { id : data };

      http.get(`/qna/post`, {params})
      .then(({data}) => {
        commit("SET_QNA",data)
      })
      .catch((error)=> {
        console.log(error);
      });
    },

    modifyQNA({commit},data) {
      http.put(`/qna/post`,data).then(({data})=> {
        let msg="등록 처리시 문제가 발생했습니다.";
        console.log(data);
        if (data === "success") {
          msg = "등록이 완료되었습니다";
        }
        alert(msg);
      })
    }

    */
  },
};
</script>

<style></style>
