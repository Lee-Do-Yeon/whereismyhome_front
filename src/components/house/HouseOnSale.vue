<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>매물 번호</b-th>
              <b-th>층</b-th>
              <b-th>면적</b-th>
              <b-th>가격</b-th>
              <b-th>중개사</b-th>
            </b-tr>
          </b-thead>
          <tbody v-if="deallist && deallist.length != 0">
            <on-sale-list-item v-for="deal in deallist" :key="deal.no" v-bind="deal" />
          </tbody>
          <tbody v-else>
            <b-td colspan="5">현재 거래 가능한 매물이 없습니다.</b-td>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import OnSaleListItem from "@/components/house/item/OnSaleListItem";
import { mapState } from "vuex";
const dealStore = "dealStore";

export default {
  name: "HouseOnSale",
  components: {
    OnSaleListItem,
  },
  props: {
    house: Object,
  },
  created() {
    this.$store.dispatch("dealStore/getDealListByHouse", this.house.aptCode);
    console.log(this.house.aptCode, " is aptCode");
  },
  computed: {
    ...mapState(dealStore, ["deallist"]),
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
