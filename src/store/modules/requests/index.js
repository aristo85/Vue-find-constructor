export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addReq(state, payload) {
      state.requests.push(payload);
    },
    fetchReqs(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async addReq(ctxt, payload) {
      const newReq = {
        userEmail: payload.email,
        message: payload.message,
      };
      const res = await fetch(
        `https://vue-http-demo-5e226-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newReq),
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        const error = new Error(resData.message || "Failed to fetch!");
        throw error;
      }

      console.log("re", resData);
      newReq.id = resData.name;
      newReq.coachId = payload.coachId;

      ctxt.commit("addReq", newReq);
    },
    async fetchReqs(cntx) {
      const coachId = cntx.rootGetters.getUserId;
      const token = cntx.rootGetters.token;
      const res = await fetch(
        `https://vue-http-demo-5e226-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
      );

      const resData = await res.json();

      if (!res.ok) {
        const error = new Error(resData.message || "Failed to fetch!");
        throw error;
      }

      const reqs = [];

      for (const key in resData) {
        const req = {
          id: key,
          coachId: coachId,
          userEmail: resData[key].userEmail,
          message: resData[key].message,
        };
        reqs.push(req);
      }

      cntx.commit("fetchReqs", reqs);
    },
  },
  getters: {
    allReqs(state, getters, rootStates, rootGetters) {
      const coachId = rootGetters.getUserId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasReqs(state, getters) {
      return getters.allReqs && getters.allReqs.length > 0;
    },
  },
};
