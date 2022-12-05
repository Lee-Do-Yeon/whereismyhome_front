import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  updateUser,
  findPass,
  join,
  getAgentInfo,
  out,
} from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    isAdmin: false,
    isAgent: false,
    agentInfo: null,
  },

  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
    myUserInfo(state) {
      return state.userInfo;
    },
  },

  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
      console.log("userInfo now : " + userInfo);
    },
    SET_AGENT_INFO: (state, agentInfo) => {
      state.agentInfo = agentInfo;
    },
    DO_NOTHING: () => {
      console.log("do nothing");
    },
    SET_IS_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin;
    },
    SET_IS_AGENT: (state, isAgent) => {
      state.isAgent = isAgent;
    },
  },

  actions: {
    async updateUserInfo({ commit, dispatch }, user) {
      await updateUser(
        user,
        async ({ data }) => {
          console.log(data);
          await dispatch("getUserInfoById");
          return "X";
        },
        async () => {
          // console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
          await updateUser(
            user,
            async () => {
              await dispatch("getUserInfoById");
            },
            (error) => {
              console.log(error);
            }
          );
        }
      );
    },

    async userConfirm({ commit }, user) {
      await login(
        user,
        async ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            let decodeToken = jwtDecode(accessToken);
            console.log("isAdmin value, ", decodeToken.admin);
            console.log("isAgent value, ", decodeToken.admin);
            commit("SET_IS_ADMIN", decodeToken.admin);
            commit("SET_IS_AGENT", decodeToken.agent);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_ADMIN", false);
            commit("SET_IS_AGENT", false);
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
            console.log("set user info ");
            return "got userInfo";
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
          await findById(
            decodeToken.userId,
            ({ data }) => {
              if (data.message == "success") {
                commit("SET_USER_INFO", data.userInfo);
                return "got userInfo";
              } else {
                console.log("X");
                return "failed to fetch userInfo";
              }
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
    },

    async getUserInfoById({ commit, dispatch, state }) {
      console.log("getUserInfoById started");
      await findById(
        state.userInfo.userId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },

    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      return tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
            return "done";
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userId) {
      await logout(
        userId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
            return "logged out";
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async findPassword({ commit }, userId) {
      findPass(
        userId,
        ({ data }) => {
          if (data.message === "success") {
            alert("가입시 입력하신 이메일로 임시 비밀번호를 보냈습니다.");
          } else {
            alert("존재하지 않는 아이디입니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
      commit("DO_NOTHING");
    },

    async join({ commit }, user) {
      join(
        user,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
      commit("DO_NOTHING");
    },

    async getAgentInfo({ commit }, userId) {
      getAgentInfo(
        userId,
        ({ data }) => {
          commit("SET_AGENT_INFO", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async outOfHere({ commit, dispatch }, userId) {
      await out(
        userId,
        ({ data }) => {
          console.log(data);
          return "out now!";
        },
        async () => {
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
          await out(
            userId,
            ({ data }) => {
              console.log(data);
              return "out now!";
            },
            (e) => {
              console.log(e);
            }
          );
        }
      );
      commit("DO_NOTHING");
    },
  },
};

export default memberStore;
