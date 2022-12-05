<template>
  <b-container v-if="house" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ house.아파트 }}</h3></b-col
      >
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary">아파트 이름 : {{ house.aptname }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info"
          >최근 거래금액 :
          {{ (parseInt(house.aptprice.replace(",", "")) * 10000) | price }}원</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="info" @click="moveInfo(house)">자세히 알아보기</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const houseStore = "houseStore";
import { mapState } from "vuex";
export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },

  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  methods: {
    async moveInfo(house) {
      this.$store.commit("houseStore/SET_DETAIL_HOUSE", house);
      await this.$store.dispatch("houseStore/infoHouse", house.aptCode);
      this.$router.push({
        name: "aptinfo",
        params: { aptCode: house.aptCode },
        // this.$store.dispatch("houseStore/SET_HOUSE_LIST_INFO");
        // params: house,
      });
    },
  },
};
</script>

<style></style>
