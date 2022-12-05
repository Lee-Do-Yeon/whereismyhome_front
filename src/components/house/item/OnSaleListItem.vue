<template>
  <b-tr>
    <b-td>
      <router-link :to="{ name: 'dealview', params: { no: no } }">{{ no }}</router-link>
    </b-td>
    <b-td>{{ floor }}</b-td>
    <b-td>{{ area }}</b-td>
    <b-td>{{ dealAmount }}</b-td>
    <b-td
      ><router-link :to="{ name: 'deallist', params: { agent_id: agentId } }">{{
        agentId
      }}</router-link></b-td
    >
  </b-tr>
</template>

<script>
export default {
  props: {
    no: String,
    dealAmount: String,
    agentId: String,
    area: String,
    floor: String,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
