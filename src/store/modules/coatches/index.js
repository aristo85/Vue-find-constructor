export default {
  namespaced: true,
  state() {
    return {
      isUserAcoach: false,
      coatches: [],
    };
  },
  mutations: {
    getCoaches(state, payload) {
      state.coatches = payload;
    },
    addCoach(state, payload) {
      state.coatches.push(payload);
    },
  },
  actions: {
    async getCoaches(ctxt) {
      const res = await fetch(
        `https://vue-http-demo-5e226-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
      );

      const resData = await res.json();

      if (!res.ok) {
        const error = new Error(resData.message || "Failed to fetch!");
        throw error;
      }

      const coaches = [];

      for (const key in resData) {
        const coach = {
          id: key,
          firstName: resData[key].firstName,
          lastName: resData[key].lastName,
          description: resData[key].description,
          hourlyRate: resData[key].hourlyRate,
          areas: resData[key].areas,
        };
        coaches.push(coach);
      }
      ctxt.commit("getCoaches", coaches);
    },
    async addCoach(cntxt, data) {
      const token = cntxt.rootGetters.token;
      const userId = cntxt.rootGetters.getUserId;
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };

      const res = await fetch(
        `https://vue-http-demo-5e226-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify(coachData),
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        const error = new Error(resData.message || "Failed to fetch!");
        throw error;
      }

      cntxt.commit("addCoach", { ...coachData, id: userId });
    },
  },
  getters: {
    coatches(state) {
      return state.coatches;
    },
    hasCoatches(state) {
      return state.coatches?.length > 0;
    },
    isCoach(state, getters, rootStates, rootGetters) {
      return state.coatches.some((coach) => coach.id === rootGetters.getUserId);
    },
  },
};
