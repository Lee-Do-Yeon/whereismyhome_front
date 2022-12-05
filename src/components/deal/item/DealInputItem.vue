<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group label="가격">
          <b-input-group append="만원" type="text">
            <b-form-input
              id="subject"
              v-model="newDeal.dealAmount"
              type="text"
              placeholder="가격을 입력하세요."
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="층">
          <b-input-group append="층" type="text">
            <b-form-input
              id="subject"
              v-model="newDeal.floor"
              type="text"
              placeholder="층을 입력하세요."
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="면적">
          <b-input-group append="m2" type="text">
            <b-form-input
              id="subject"
              v-model="newDeal.area"
              type="text"
              placeholder="면적을 입력하세요."
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="아파트코드">
          <b-input-group append="m2" type="text">
            <b-form-input
              id="subject"
              v-model="newDeal.aptCode"
              type="text"
              placeholder="코드를 입력하세요."
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-button variant="outline-primary" class="m-1" @click="moveList">목록</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-if="this.type == 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import jwtDecode from "jwt-decode";
import { mapActions, mapState } from "vuex";
const dealStore = "dealStore";

export default {
  name: "DealInputForm",
  props: {
    type: { type: String },
  },
  data() {
    return {
      newDeal: {
        aptCode: "",
        dealAmount: "",
        area: "",
        floor: "",
        state: 0,
        agentId: "",
      },
    };
  },
  computed: {
    ...mapState(dealStore, ["deal"]),
  },
  created() {
    let decodeToken = jwtDecode(sessionStorage.getItem("access-token"));
    this.newDeal.agentId = decodeToken.userId;

    if (this.type === "modify") {
      this.newDeal = this.deal;
    }
  },
  methods: {
    ...mapActions(dealStore, ["createDeal", "deleteDeal", "modifyDeal"]),
    onSubmit(event) {
      event.preventDefault();
      console.log("onSubmit : " + this.type);
      this.type === "modify" ? this.updateDeal() : this.registDeal();
    },
    onReset(event) {
      event.preventDefault();
      this.newDeal.aptCode = "";
      this.newDeal.dealAmount = "";
      this.newDeal.area = "";
      this.newDeal.floor = "";
      this.newDeal.state = 0;
    },
    moveList() {
      this.$router.push({ name: "deal", params: { agent_id: this.newDeal.agentId } });
    },
    async registDeal() {
      console.log("딜 생성하기.");
      await this.createDeal(this.newDeal);
      this.moveList();
    },
    updateDeal() {
      console.log("딜 수정하기.");
      this.modifyDeal(this.newDeal);
      this.moveList();
    },
  },
};
</script>

<style></style>
