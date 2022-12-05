<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="hasList">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>상태</b-th>
              <b-th>제목</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <qna-list-item v-for="qna in qnalist" :key="qna.id" v-bind="qna" />
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QnaListItem from "@/components/qna/item/QnAListItem";
import { mapState } from "vuex";
const qnaStore = "qnaStore";
export default {
  name: "QnAList",
  components: {
    QnaListItem,
  },
  async created() { 
    await this.$store.dispatch("qnaStore/getQnaList");
  },
  computed: {
    ...mapState(qnaStore,["qnalist","replyStatus"]),
    hasList() {
      return this.qnalist != null;
    }
  },

  methods: {
    moveWrite() {
      this.$router.push({ name: "qwrite" });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
