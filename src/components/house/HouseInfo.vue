<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row class="text-center" style="margin-top: 50px">
      <h2>๐  {{ house.aptname }}</h2>
    </b-row>
    <b-row>
      <b-col><house-map></house-map></b-col>
      <b-col>
        <b-row>
          <b-col>
            <b-button
              variant="outline-primary"
              size="sm"
              @click="favorite"
              style="margin-right: 5px"
            >
              ์ฐ {{ favoriteCount }}
            </b-button>
          </b-col>
        </b-row>
        <b-table stacked :items="items"></b-table>
      </b-col>
    </b-row>
    <b-row class="text-center" style="margin-top: 150px">
      <h2>๐ ์ต๊ทผ ๊ฑฐ๋๊ฐ</h2>
    </b-row>
    <b-row>
      <canvas id="myChart" style="width: 100%; height: 400px; margin-bottom: 100px"></canvas>
    </b-row>
    <b-row class="text-center">
      <h2>โ ํ์ฌ ๊ฑฐ๋๊ฐ๋ฅ ๋งค๋ฌผ</h2>
    </b-row>
    <b-row>
      <house-on-sale :house="house"></house-on-sale>
    </b-row>
    <b-row style="height: 250px"></b-row>
  </b-container>
</template>

<script>
import jwtDecode from "jwt-decode";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import HouseOnSale from "@/components/house/HouseOnSale";
import HouseMap from "@/components/house/HouseMap";
import { mapState, mapActions } from "vuex";

const favoriteStore = "favoriteStore";
const houseStore = "houseStore";

export default {
  async created() {
    // let aptCode = this.$route.params.house;
    // let aptCode = this.house.aptCode;
    await this.$store.dispatch("favoriteStore/countFavorite",this.house.aptCode);
  },
  data() {
    return {
      // showModal: false,
      items: [],
    }
  },
  computed: {
    ...mapState(houseStore, ["house", "housedeals"]),
    ...mapState(favoriteStore, ["favoriteCheck", "favoriteCount"]),
  },
  methods: {
    
    ...mapActions(houseStore, ["detailHouse", "infoHouse"]),
    ...mapActions(favoriteStore, [
      "deleteFavorite",
      "createFavorite",
      "checkFavorite",
      "countFavorite",
    ]),
    setHouse(aptCode) {
    // this.detailHouse(aptCode);
    //   this.infoHouse(aptCode);
       this.countFavorite(aptCode);
    },
    async favorite() {
      let decodeToken = jwtDecode(sessionStorage.getItem("access-token"));
      const params = {
        aptCode: this.house.aptCode,
        userId: decodeToken.userId,
      };

      this.checkFavorite;
      console.log("favoriteCheck - " + this.favoriteCheck);
      if (this.favoriteCheck == false) {
        // ์ฐ ์ ํ ์ํ
        console.log("์ฐ ์ ํ ์ํ");
        await this.createFavorite(params);
      } else {
        // ์ฐ ํ ์ํ
        console.log("์ฐํ ์ํ");
        await this.deleteFavorite(params);
      }
      this.favoriteCount;
    },
  },
  components: {
    HouseMap,
    HouseOnSale,
  },
  mounted() {
    // ํ์ด๋ธ ์์
    this.items.push({
      ์ํํธ๋ช: this.house.aptname,
      ์ฃผ์: this.house.dong + " " + this.house.number,
      ์ธต: this.house.floor,
      ๋ฉด์ : this.house.aptarea,
      ์ต๊ทผ๊ฑฐ๋๊ฐ: this.house.aptprice,
    });
    // ํ์ด๋ธ ๋

    // ์ฐจํธ ์์
    const ctx = document.getElementById("myChart");
    let price = [];
    let day = [];
    console.log("aaaaaaaaa ", this.housedeals);
    for (var i = 0; i < this.housedeals.length; i++) {
      let deal = this.housedeals[i];
      price.push(Number(deal.aptprice.replace(",", "")));
      day.push(deal.year + "." + deal.month + "." + deal.day);
    }
    new Chart(ctx, {
      type: "line",
      data: {
        labels: day,
        datasets: [
          {
            label: " ์ค๊ฑฐ๋๊ฐ",
            data: price,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    // ์ฐจํธ ๋
  },
};
</script>

<style></style>
