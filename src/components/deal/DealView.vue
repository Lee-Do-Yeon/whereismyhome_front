<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyDeal" class="mr-2"
          >수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteDeal">삭제</b-button>
        <b-button id="show-btn" size="sm" class="btn btn-danger" @click="showModal"
          >허위매물 신고</b-button
        >
        <b-modal ref="my-modal" hide-footer title="허위매물 신고">
          <div class="d-block text-center">
            <h3>
              허위신고는 형사처벌의 대상이 될 수 있음을 인지하며 본 매물을 허위매물로 신고합니다.
            </h3>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideModal">닫기</b-button>
          <b-button class="mt-2" variant="outline-warning" block @click="report"
            >허위매물 신고</b-button
          >
        </b-modal>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card :header-html="`<h3>${deal.no}</h3>`" class="mb-2" border-variant="dark" no-body>
          <b-card-body class="text-left">
            <b-table stacked :items="items"></b-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import jwtDecode from "jwt-decode";
const dealStore = "dealStore";
const memberStore = "memberStore";
import { mapState } from "vuex";
export default {
  name: "DealView",
  data() {
    return {
      items: [],
      agent_id: "",
    };
  },
  async created() {
    await this.$store.dispatch("dealStore/getDeal", this.$route.params.no);
    let decodeToken = jwtDecode(sessionStorage.getItem("access-token"));
    this.agent_id = decodeToken.userId;
    this.items.push({
      아파트코드: this.deal.aptCode,
      층: this.deal.floor,
      가격: this.deal.dealAmount,
    });
  },
  computed: {
    ...mapState(dealStore, ["deal"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    report() {
      this.$store.dispatch("dealStore/report", {
        dealNumber: this.deal.no,
        reportedBy: this.userInfo.userId,
      });
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    moveModifyDeal() {
      this.$router.replace({
        name: "dealmodify",
        params: { no: this.deal.no },
      });
    },
    async deleteDeal() {
      if (confirm("정말로 삭제?")) {
        await this.$store.dispatch("dealStore/deleteDeal", { no: this.$route.params.no, userId: this.userInfo.userId});
        this.moveList();
      }
    },
    moveList() {
      this.$router.push({ name: "deal", params: { agent_id: this.agent_id } });
    },
  },
};
</script>

<style></style>
