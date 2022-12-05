<template>
  <b-tr>
    <b-th
      ><router-link :to="{ name: 'dealview', params: { no: no } }">{{ no }}</router-link></b-th
    >
    <b-td v-if="state == false">거래 가능</b-td>
    <b-td v-else-if="state == true">거래 완료</b-td>
    <b-td>
      {{ aptCode }}
    </b-td>
    <b-td>{{ dealAmount }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "DealListItem",
  props: {
    no: String,
    dealAmount: String,
    state: Boolean,
    aptCode: String,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
