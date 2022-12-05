<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveCreate()">매물 등록</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>매물 번호</b-th>
              <b-th>상태</b-th>
              <b-th>아파트코드</b-th>
              <b-th>가격</b-th>
            </b-tr>
          </b-thead>
          <tbody v-if="deallist && deallist.length != 0">
            <deal-list-item v-for="deal in deallist" :key="deal.no" v-bind="deal" />
          </tbody>
          <tbody v-else>
            <b-td colspan="5">매물을 등록하세요.</b-td>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import DealListItem from "@/components/deal/item/DealListItem";
import { mapState } from "vuex";
const dealStore = "dealStore";
const memberStore = "memberStore";

export default {
  name: "DealList",
  components: {
    DealListItem,
  },
  computed: {
    ...mapState(memberStore, ["agentInfo"]),
    ...mapState(dealStore, ["deallist"]),
  },
  async created() {
    let userId = this.$route.params.agent_id;
    await this.$store.dispatch("memberStore/getAgentInfo", userId);
    this.createList();
  },
  methods: {
    moveCreate() {
      this.$router.push({ name: "dealcreate" });
    },
    createList() {
      let agent_id = this.agentInfo.userId;
      this.$store.dispatch("dealStore/getDealListByAgent", agent_id);
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
