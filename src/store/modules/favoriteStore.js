import { createFavorite, getFavoriteList, deleteFavorite, checkFavorite, countFavorite } from "@/api/favorite";

const favoriteStore = {
  namespaced: true,
  state: {
    favoritelist: [],
    favoriteCheck: false,
    favoriteCount: 0,
  },

  getters: {},

  mutations: {
    SET_FAVORITE_LIST(state, favoritelist) {
      state.favoritelist = favoritelist;
    },
    SET_FAVORITE_CHECK(state, favoriteCheck) {
      state.favoriteCheck = favoriteCheck;
    },
    SET_FAVORITE_COUNT(state, favoriteCount) {
      state.favoriteCount = favoriteCount;
    },
    DELETE_FAVORITE(state, index) {
      state.favoritelist.splice(index, 1);
    },
    DO_NOTHING() {},
  },

  actions: {
    async getFavoriteList({ commit, dispatch }, userId) {
      await getFavoriteList(
        userId,
        ({ data }) => {
          commit("SET_FAVORITE_LIST", data);
          return "done";
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("memberStore/tokenRegeneration", null, { root: true });
          await getFavoriteList(
            userId,
            ({ data }) => {
              commit("SET_FAVORITE_LIST", data);
              return "done";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },
    async createFavorite({ commit, dispatch }, params) {
      await createFavorite(
        params,
        async ({ data }) => {
          console.log("createFavorite : " + data);
          commit("SET_FAVORITE_CHECK", true);
          await countFavorite(
            params.aptCode,
            ({ data }) => {
              commit("SET_FAVORITE_COUNT", data);
              return "ADS";
            },
            (error) => {
              console.log(error);
            }
          );
          return "done";
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("memberStore/tokenRegeneration", null, { root: true });
          await createFavorite(
            params,
            async ({ data }) => {
              console.log(data);
              commit("SET_FAVORITE_CHECK", true);
              await countFavorite(
                params.aptCode,
                ({ data }) => {
                  commit("SET_FAVORITE_COUNT", data);
                  return "ADS";
                },
                (error) => {
                  console.log(error);
                }
              );
              return "done";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },

    async deleteFavorite({ commit, dispatch }, params) {
      await deleteFavorite(
        {
          userId: params.userId,
          aptCode: params.aptCode,
        },
        async ({ data }) => {
          console.log("deleteFavorite : " + data);
          commit("DELETE_FAVORITE", params.index);
          commit("SET_FAVORITE_CHECK", false);
          await countFavorite(
            params.aptCode,
            ({ data }) => {
              commit("SET_FAVORITE_COUNT", data);
              return "done";
            },
            (error) => {
              console.log(error);
            }
          );
          return "done";
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("memberStore/tokenRegeneration", null, { root: true });
          await deleteFavorite(
            params,
            async ({ data }) => {
              console.log(data);
              commit("SET_FAVORITE_CHECK", false);
              await countFavorite(
                params.aptCode,
                ({ data }) => {
                  commit("SET_FAVORITE_COUNT", data);
                  return "done";
                },
                (error) => {
                  console.log(error);
                }
              );
              return "done";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },

    checkFavorite({ commit }, params) {
      checkFavorite(
        params,
        ({ data }) => {
          console.log("checkFavorite : " + data);
          if (data == 0) {
            commit("SET_FAVORITE_CHECK", false);
          } else {
            commit("SET_FAVORITE_CHECK", true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async countFavorite({ commit, dispatch }, aptCode) {
      await countFavorite(
        aptCode,
        ({ data }) => {
          commit("SET_FAVORITE_COUNT", data);
          return "done";
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("memberStore/tokenRegeneration", null, { root: true });
          await countFavorite(
            aptCode,
            ({ data }) => {
              commit("SET_FAVORITE_COUNT", data);
              return "done";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },
  },
};
export default favoriteStore;
