<template>
  <b-row
    class="m-2"
    @click="selectHouse"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <!-- <b-col cols="2" class="text-center align-self-center">
      <b-img thumbnail src="https://picsum.photos/250/250/?image=58" alt="Image 1"></b-img>
    </b-col>
    <b-col cols="10" class="align-self-center">{{ house.aptname }}</b-col> -->
    <b-card
      header-bg-variant="primary"
      header-text-variant="white"
      footer-bg-variant="light"
      border-variant="primary"
      header-border-variant="primary"
      :header="house.aptname"
      header-tag="header"
      :footer="'최근 거래가 ' + house.aptprice + '만원'"
      footer-tag="footer"
      style="width: 500px; max-width: 500px"
    >
      <b-card-text>
        주소 : {{ house.dong }} {{ house.number }}<br />
        층 : {{ house.floor }}<br />
        면적 : {{ house.aptarea }}<br />
      </b-card-text>
    </b-card>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    house: Object,
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    selectHouse() {
      this.detailHouse(this.house.aptCode);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
