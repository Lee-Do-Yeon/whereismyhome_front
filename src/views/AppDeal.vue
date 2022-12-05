<template>
  <b-container class="bv-example-row mt-3 text-center">
    <agent-profile></agent-profile>
    <router-view></router-view>
  </b-container>
</template>
<script>
import AgentProfile from "@/components/deal/AgentProfile";
export default {
  name: "AppAgent",
  components: {
    AgentProfile,
  },
};
</script>
