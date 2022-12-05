<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button v-if="userInfo.isAdmin" variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="hasList">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <notice-list-item v-for="notice in noticelist" :key="notice.id" v-bind="notice" />
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NoticeListItem from "@/components/notice/item/NoticeListItem";
import { mapState } from "vuex";
const noticeStore = "noticeStore";
const memberStore = "memberStore";
export default {
  name: "NoticeList",
  components: {
    NoticeListItem,
  },
  async created() { 
    await this.$store.dispatch("noticeStore/getNoticeList");
  },
  computed: {
    ...mapState(noticeStore, ["noticelist"]),
    ...mapState(memberStore, ["userInfo"]),
    hasList() {
      return this.noticelist != null;
    }
  },

  methods: {
    moveWrite() {
      this.$router.push({ name: "nwrite" });
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
