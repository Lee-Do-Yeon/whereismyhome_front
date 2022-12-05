<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h1 style="margin: 30px 0px">🏡 전국 아파트 조회</h1>
    <b-row> </b-row>
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4" align="left">
        <house-list />
      </b-col>
      <b-col cols="8">
        <house-map />
        <house-detail></house-detail>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import HouseMap from "@/components/house/HouseMap.vue";

export default {
  name: "AppHouse",
  components: {
    HouseSearchBar,
    HouseList,
    HouseMap,
    HouseDetail,
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 149, 27, 0.3) 30%);
}
</style>
