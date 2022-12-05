<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand><router-link :to="{ name: 'home' }">구해줘 홈즈</router-link></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            ><router-link :to="{ name: 'apt' }">아파트 실거래가 조회</router-link></b-nav-item
          >
          <b-nav-item v-if="userInfo !== null && isAgent"
            ><router-link :to="{ name: 'deal', params: { agent_id: userInfo.userId } }"
              >매물 관리</router-link
            ></b-nav-item
          >
          <b-nav-item v-if="!isAgent & (userInfo !== null)"
            ><router-link :to="{ name: 'houseFavorite' }">관심단지</router-link></b-nav-item
          >
          <b-nav-item><router-link :to="{ name: 'qna' }">Q&A</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'notice' }">Notice</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'chat' }">채팅</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="userInfo">{{ userInfo.userName }}님, 반갑습니다. </b-nav-item>
          <b-nav-item v-if="userInfo" @click="logout">로그아웃</b-nav-item>
          <b-nav-item v-if="userInfo">
            <router-link :to="{ name: 'update' }">회원정보 수정</router-link>
          </b-nav-item>
          <template v-else
            ><b-nav-item><router-link :to="{ name: 'login' }">로그인</router-link></b-nav-item>
            <b-nav-item
              ><router-link :to="{ name: 'join' }">회원가입</router-link></b-nav-item
            ></template
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo", "isAdmin", "isAgent"]),
  },
  methods: {
    async logout() {
      if (this.userInfo) {
        await this.$store.dispatch("memberStore/userLogout", this.userInfo.userId);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped>
#logo {
  width: 120px;
}

.link {
  text-decoration: none;
}
</style>
