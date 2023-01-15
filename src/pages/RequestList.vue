<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleErr">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Recieved</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasReqs">
          <request-item
            v-for="req in allReqs"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You havent recieved any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import { mapGetters } from "vuex";
import RequestItem from "@/components/requests/RequestItem.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
export default {
  components: { BaseCard, RequestItem, BaseSpinner },
  data() {
    return {
      isLoading: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters("requests", ["allReqs", "hasReqs"]),
  },
  created() {
    this.loadReqs();
  },
  methods: {
    async loadReqs() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchReqs");
      } catch (error) {
        this.error = error.message || "something went wrong!";
      }
      this.isLoading = false;
    },
    handleErr() {
      this.error = false;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
