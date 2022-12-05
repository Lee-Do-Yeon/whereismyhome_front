<template>
  <b-row class="mt-4 mb-4 text-center">
    <b-col class="sm-3">
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="gugunCode" :options="guguns" @change="dongList"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="dong" :options="dongs" @change="searchApt"></b-form-select>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dong: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_APT_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList", "getDong"]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_APT_LIST",
      "CLEAR_DONG_LIST",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      // console.log(this.sidoCode);
      this.CLEAR_DONG_LIST();
      this.dong = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    searchApt() {
      if (this.dong) this.getHouseList(this.dong);
    },
  },
};
</script>

<style></style>
