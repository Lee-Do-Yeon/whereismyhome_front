import http from "@/api/http";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    housedeals: [],
    house: null,
  },
  getters: {},

  mutations: {
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dong, text: dong.dong });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_HOUSE_LIST_INFO(state) {
      state.houses = [];
      state.houses.push(state.house);
    },
    SET_DETAIL_HOUSE(state, house) {
      // console.log("Mutations", house);
      state.house = house;
      console.log(house);
    },
    SET_INFO_HOUSE(state, housedeals) {
      state.housedeals = housedeals;
      console.log(housedeals);
    },
  },

  actions: {
    getSido({ commit }) {
      http
        .get(`/map/sido`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      http
        .get(`/map/gugun`, { params })
        .then(({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDong({ commit }, gugunCode) {
      const params = { gugun: gugunCode };
      http
        .get(`/map/dong`, { params })
        .then(({ data }) => {
          commit("SET_DONG_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHouseList({ commit }, dong) {
      const params = {
        dong: dong,
        sort: "asc", // 임시
        order: "price", // 임시
      };
      http
        .get(`/map/${params.dong}/${params.sort}/${params.order}`)
        .then(({ data }) => {
          commit("SET_HOUSE_LIST", data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async detailHouse({ commit }, aptCode) {
      await http
        .get(`/map/${aptCode}`)
        .then(({ data }) => {
          commit("SET_DETAIL_HOUSE", data);
          console.log("house obj for aptCode ", aptCode, " is ", data);
          return "done setting detail house";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async infoHouse({ commit }, aptCode) {
      await http
        .get(`/map/deals/${aptCode}`)
        .then(({ data }) => {
          commit("SET_INFO_HOUSE", data);
          ("done setting info house");
          return "done setting";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default houseStore;
