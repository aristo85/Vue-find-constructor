export default {
  state() {
    return {
      userId: null,
      token: null,
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuth(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, payload) {
      const { token, userId } = payload;
      state.token = token;
      state.userId = userId;
    },
  },
  actions: {
    async login(ctxt, payload) {
      return ctxt.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    async signup(ctxt, payload) {
      return ctxt.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    async auth(ctxt, payload) {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCft9W2iiwcBzt9T5CEyiJ2H7VZeyyIaAo`;
      if (payload.mode === "login") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCft9W2iiwcBzt9T5CEyiJ2H7VZeyyIaAo`;
      }
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        const error = new Error(
          resData.error.message || "Failed to authenticate!"
        );
        throw error;
      }

      localStorage.setItem("coachtoken", resData.idToken);
      localStorage.setItem("coachId", resData.localId);

      ctxt.commit("setUser", {
        token: resData.idToken,
        userId: resData.localId,
      });
    },
    tryLogin(ctxt) {
      const token = localStorage.getItem("coachtoken");
      const userId = localStorage.getItem("coachId");

      if (token && userId) {
        ctxt.commit("setUser", {
          token,
          userId,
        });
      }
    },
    logout(ctxt) {
      localStorage.removeItem("coachtoken");
      localStorage.removeItem("coachId");
      ctxt.commit("setUser", {
        token: null,
        userId: null,
      });
    },
  },
};
