<template>
  <b-card no-body style="max-width: 20rem">
    <template #header>
      <h4 class="mb-0">{{ fav.apartmentName }}</h4>
    </template>
    <b-list-group flush>
      <b-list-group-item
        ><h5>
          <b-badge variant="primary">주소</b-badge> {{ fav.dong }} {{ fav.jibun }}
        </h5></b-list-group-item
      >
    </b-list-group>

    <b-card-body>
      <a class="card-link"
        ><router-link :to="{ name: 'aptinfo', params: { aptCode: fav.aptCode } }"
          >자세히</router-link
        ></a
      >
      <a class="card-link" @click="deleteFav" style="cursor: pointer">삭제</a>
    </b-card-body>
  </b-card>
</template>

<script>
import jwtDecode from "jwt-decode";
import { mapActions } from "vuex";
const favoriteStore = "favoriteStore";

export default {
  props: {
    fav: Object,
    index: Number,
  },
  methods: {
    ...mapActions(favoriteStore, ["deleteFavorite"]),

    deleteFav() {
      let decodeToken = jwtDecode(sessionStorage.getItem("access-token"));
      const params = {
        aptCode: this.fav.aptCode,
        userId: decodeToken.userId,
        index: this.index,
      };
      this.deleteFavorite(params);
    },
  },
};
</script>

<style></style>
