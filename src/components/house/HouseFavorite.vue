<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row class="text-center" style="margin: 30px 0px">
      <h2>💖 내 관심단지</h2>
    </b-row>
    <b-card-group deck v-if="favoritelist && favoritelist.length != 0" style="margin-right: 20px">
      <favorite-item
        v-for="(fav, index) in favoritelist"
        :key="index"
        :fav="fav"
        :index="index"
      ></favorite-item>
    </b-card-group>
    <div v-else>찜한 관심단지가 없습니다.</div></b-container
  >
</template>

<script>
import jwtDecode from "jwt-decode";
import FavoriteItem from "@/components/house/item/FavoriteItem";
import { mapState, mapActions } from "vuex";
const favoriteStore = "favoriteStore";

export default {
  components: {
    FavoriteItem,
  },
  computed: {
    ...mapState(favoriteStore, ["favoritelist"]),
  },
  created() {
    let decodeToken = jwtDecode(sessionStorage.getItem("access-token"));
    let userId = decodeToken.userId;
    this.initList(userId);
  },
  methods: {
    ...mapActions(favoriteStore, ["getFavoriteList"]),
    initList(userId) {
      this.getFavoriteList(userId);
    },
  },
};
</script>

<style></style>
