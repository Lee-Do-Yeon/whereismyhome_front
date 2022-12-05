<template>
  <b-tr>
    <b-td>{{ id }}</b-td>
    <b-td v-if="replyStatus === 0">미답변</b-td>
    <b-td v-else>답변완료</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'qview', params: { id: id } }">{{ title }}</router-link>
    </b-th>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ create_date | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

// import { mapState } from "vuex";
// const qnaStore = "qnaStore";
export default {
  name: "QnaListItem",
  props: {
     id: Number,
     userId: String,
     title: String,
     create_date: String,
     replyStatus: Number,
  },
  data() {
    return {
    };
  },
  created() {

  },
  computed : {
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
