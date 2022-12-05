import { postQNA, deleteQNA, editQNA, getQNAs, getQNA, getREPLIEs, replyCheck } from "@/api/qna";

const qnaStore = {
  namespaced: true,
  state: {
    qnalist: [],
    qna: null,
    replies: [],
    // replyStatus: [],
    // replyStatus: null,
  },

  getters: {
    newQna(state) {
      return state.qna;
    },
  },

  mutations: {
    SET_QNA_LIST(state, qnalist) {
      state.qnalist = qnalist;
    },

    SET_QNA(state, qna) {
      state.qna = qna;
    },

    SET_REPLIES(state, replies) {
      state.replies = replies;
    },

    SET_REPLY_STATUS(state, info) {
      state.qnalist[info.index].replyStatus = info.status;
    },

    DO_NOTHING() {},
    // qna end
  },

  actions: {
    async getQnaList({ commit, dispatch }) {
      let tempQnaList = [];
      return await getQNAs(
        async ({ data }) => {
          tempQnaList = data;
          for (let i = 0; i < tempQnaList.length; i++) {
            await replyCheck(
              tempQnaList[i].id,
              ({ data }) => {
                tempQnaList[i].replyStatus = data;
                return "pushed to tempReplyStatus";
              },
              (e) => {
                console.log(e);
              }
            );
          }
          commit("SET_QNA_LIST", tempQnaList);
          return "set reply status";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await getQNAs(
              async ({ data }) => {
                tempQnaList = data;
                for (let i = 0; i < tempQnaList.length; i++) {
                  await replyCheck(
                    tempQnaList[i].id,
                    ({ data }) => {
                      tempQnaList[i].replyStatus = data;
                      return "pushed to tempReplyStatus";
                    },
                    (e) => {
                      console.log(e);
                    }
                  );
                }
                commit("SET_QNA_LIST", tempQnaList);
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

    async getQna({ commit, dispatch }, id) {
      return await getQNA(
        id,
        ({ data }) => {
          commit("SET_QNA", data);
          return "done setting qna";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await getQNA(
              id,
              ({ data }) => {
                commit("SET_QNA", data);
                return "just.. return something";
              },
              (e) => {
                console.log(e);
              }
            );
            return "done setting qna after token refresh";
          } else {
            console.log(error);
          }
          return "X";
        }
      );
    },

    async getReplies({ commit, dispatch }, id) {
      return await getREPLIEs(
        id,
        ({ data }) => {
          commit("SET_REPLIES", data);
          return "done setting replies";
        },
        async (error) => {
          const statusCode = error.response.status.toString();
          if (statusCode === "401") {
            commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
            await dispatch("memberStore/tokenRegeneration", null, { root: true });
            await getREPLIEs(
              id,
              ({ data }) => {
                commit("SET_REPLIES", data);
                return "just.. return something";
              },
              (e) => {
                console.log(e);
              }
            );
            return "done setting qna replies after token refresh";
          } else {
            console.log(error);
          }
          return "X";
        }
      );
    },

    async deleteQna({ dispatch, commit }, param) {
      return await deleteQNA(
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
            await deleteQNA(
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
          return "deleteQNA";
        }
      );
    },

    async updateQna({ state, commit, dispatch }, data) {
      return await editQNA(
        {
          id: state.qna.id,
          userId: state.qna.userId,
          title: data.title,
          content: data.content,
          replyTo: state.qna.replyTo,
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
            await editQNA(
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

    // 나중에 엔드포인트 바꾸기
    // async writeReply({ commit, dispatch }, data) {
    //   return await postReply(
    //     data,
    //     ({ data }) => {
    //       console.log(data);
    //       return "done writing";
    //     },
    //     async (error) => {
    //       const statusCode = error.response.status.toString();
    //       if (statusCode === "401") {
    //         console.log("XXX");
    //         commit("memberStore/SET_IS_VALID_TOKEN", false, { root: true });
    //         await dispatch("memberStore/tokenRegeneration", null, { root: true });
    //         await postReply(
    //           data,
    //           ({ data }) => {
    //             console.log(data);
    //             return "something";
    //           },
    //           (e) => {
    //             console.log(e);
    //           }
    //         );
    //         return "done writing";
    //       } else {
    //         console.log(error);
    //       }
    //       return "anything";
    //     }
    //   );
    // },

    async writeQNA({ commit, dispatch }, data) {
      return await postQNA(
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
            await postQNA(
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
export default qnaStore;
