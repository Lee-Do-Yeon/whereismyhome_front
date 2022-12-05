import {
  getDealListByAgent,
  getDealListByHouse,
  createDeal,
  getDeal,
  deleteDeal,
  report,
  modifyDeal,
} from "@/api/deal";

const dealStore = {
  namespaced: true,
  state: {
    deallist: [],
    deal: null,
  },

  getters: {},

  mutations: {
    SET_DEAL_LIST_BY_AGENT(state, deallist) {
      state.deallist = deallist;
    },
    SET_DEAL_LIST_BY_HOUSE(state, deallist) {
      state.deallist = deallist;
    },
    SET_DEAL(state, deal) {
      state.deal = deal;
    },
    DO_NOTHING() {},
  },

  actions: {
    getDealListByAgent({ commit }, agentId) {
      getDealListByAgent(
        agentId,
        ({ data }) => {
          console.log(data);
          commit("SET_DEAL_LIST_BY_AGENT", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDealListByHouse({ commit }, aptCode) {
      getDealListByHouse(
        aptCode,
        ({ data }) => {
          console.log(data);
          commit("SET_DEAL_LIST_BY_HOUSE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async createDeal({ commit, dispatch }, deal) {
      console.log("dealStore -createDeal");
      await createDeal(
        deal,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          commit("DO_NOTHING");
          return "posted";
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("memberStore/tokenRegeneration", null, { root: true });
          await createDeal(
            deal,
            ({ data }) => {
              console.log(deal);
              let msg = "등록 처리시 문제가 발생했습니다.";
              if (data === "success") {
                msg = "등록이 완료되었습니다.";
              }
              alert(msg);
              return "posted";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },
    modifyDeal({ commit }, deal) {
      console.log("dealStore -modifyDeal");
      modifyDeal(
        deal,
        ({ data }) => {
          console.log(this.deal);
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          commit("DO_NOTHING");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDeal({ commit }, no) {
      getDeal(
        no,
        ({ data }) => {
          console.log(data);
          commit("SET_DEAL", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async deleteDeal({ commit, dispatch }, deleteData) {
      await deleteDeal(
        deleteData,
        ({ data }) => {
          console.log(this.deal);
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          commit("DO_NOTHING");
          return "deleted";
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("memberStore/tokenRegeneration", null, { root: true });
          await deleteDeal(
            deleteData,
            ({ data }) => {
              let msg = "등록 처리시 문제가 발생했습니다.";
              if (data === "success") {
                msg = "등록이 완료되었습니다.";
              }
              alert(msg);
              return "deleted";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },
    report({ commit }, deal) {
      report(
        deal,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
      commit("DO_NOTHING");
    },
  },
};
export default dealStore;
