import jwtDecode from "jwt-decode";

import { postNOTICE, deleteNOTICE, editNOTICE, getNOTICE, getNOTICELIST } from "@/api/notice";

const noticeStore = {
  namespaced: true,
  state: {
    noticelist: [],
    notice: null,
  },

  getters: {
    newNotice(state) {
      return state.notice;
    },
  },

  mutations: {
    SET_NOTICE_LIST(state, noticelist) {
      state.noticelist = noticelist;
    },
    SET_NOTICE(state, notice) {
      state.notice = notice;
    },
    DO_NOTHING() {},
    // notice end
  },

  actions: {
    async getNoticeList({ commit, dispatch }) {
      return await getNOTICELIST(
        ({ data }) => {
          commit("SET_NOTICE_LIST", data);
          return "done";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await getNOTICELIST(
              async ({ data }) => {
                commit("SET_NOTICE_LIST", data);
                return "helllo";
              },
              (e) => {
                console.log(e);
              }
            );
            return "done here";
          } else {
            console.log(error);
          }
        }
      );
    },

    async getNotice({ commit, dispatch }, id) {
      return await getNOTICE(
        id,
        ({ data }) => {
          commit("SET_NOTICE", data);
          return "done setting notice";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await getNOTICE(
              id,
              ({ data }) => {
                commit("SET_NOTICE", data);
                return "just.. return something";
              },
              (e) => {
                console.log(e);
              }
            );
            return "done setting notice after token refresh";
          } else {
            console.log(error);
          }
          return "X";
        }
      );
    },

    async deleteNotice({ dispatch, commit }, param) {
      return await deleteNOTICE(
        param,
        ({ data }) => {
          console.log(data);
          return "deleted";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          console.log(statusCode);
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await deleteNOTICE(
              param,
              ({ data }) => {
                console.log(data);
                commit("DO_NOTHING");
                return "deleted";
              },
              (e) => {
                console.log(e);
              }
            );
            return "xxxx";
          } else {
            console.log("?");
            console.log(error);
          }
          return "deleteNOTICE";
        }
      );
    },

    async updateNotice({ state, commit, dispatch }, data) {
      return await editNOTICE(
        {
          id: state.notice.id,
          author: state.notice.userId,
          title: data.title,
          content: data.content,
        },
        ({ data }) => {
          console.log(data);
          return "updated";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await editNOTICE(
              data,
              ({ dt }) => {
                console.log(dt);
                return "updated";
              },
              (e) => {
                console.log(e);
              }
            );
          } else {
            console.log(error);
          }
        }
      );
    },

    async writeNotice({ commit, dispatch }, data) {
      let decodeToken = jwtDecode(sessionStorage.getItem("access-token"));
      console.log("current decodeToken author : " + decodeToken.userId);
      data.author = decodeToken.userId;
      console.log("current author : ", data.author);
      return await postNOTICE(
        data,
        ({ data }) => {
          console.log(data);
          return "done writing";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            console.log("XXX");
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await postNOTICE(
              data,
              ({ data }) => {
                console.log(data);
                return "something";
              },
              (e) => {
                console.log(e);
              }
            );
            return "done writing";
          } else {
            console.log(error);
          }
          return "anything";
        }
      );
    },
  },
};
export default noticeStore;
