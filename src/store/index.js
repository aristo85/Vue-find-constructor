import { createStore } from "vuex";
import coatches from "./modules/coatches";
import requests from "./modules/requests";
import auth from "./modules/auth";

const store = createStore({
  modules: {
    coatches: coatches,
    requests: requests,
    auth,
  },
});

export default store;
