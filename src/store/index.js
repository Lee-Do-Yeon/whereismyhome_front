import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import houseStore from "@/store/modules/houseStore";
import memberStore from "@/store/modules/memberStore";
import qnaStore from "@/store/modules/qnaStore";
import dealStore from "@/store/modules/dealStore";
import favoriteStore from "@/store/modules/favoriteStore";
import noticeStore from "@/store/modules/noticeStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    houseStore,
    memberStore,
    qnaStore,
    dealStore,
    favoriteStore,
    noticeStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
