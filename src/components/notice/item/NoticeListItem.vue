<template>
  <b-tr>
    <b-td>{{ id }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'nview', params: { id: id } }">{{ title }}</router-link>
    </b-th>
    <b-td>{{ author }}</b-td>
    <b-td>{{ create_date | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "NoticeListItem",
  props: {
     id: Number,
     author: String,
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
