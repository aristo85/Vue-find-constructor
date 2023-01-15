<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleErr">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coatch-filter @change-filter="setFilters"></coatch-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
          <base-button link to="/auth" v-if="!isAuth">Login</base-button>
          <base-button
            v-if="isAuth && !isCoach && !isLoading"
            link
            to="/register"
            >Regester as Constructor</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoatches">
          <coatch-item
            v-for="coatch in filteredCoatches"
            :key="coatch.id"
            :id="coatch.id"
            :first-name="coatch.firstName"
            :last-name="coatch.lastName"
            :rate="coatch.hourlyRate"
            :areas="coatch.areas"
          ></coatch-item>
        </ul>
        <h3 v-else>No constructors found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoatchItem from "@/components/coatches/CoatchItem.vue";
import { mapGetters } from "vuex";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CoatchFilter from "@/components/coatches/CoatchFilter.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
export default {
  components: {
    CoatchItem,
    BaseCard,
    BaseButton,
    CoatchFilter,
    BaseSpinner,
    BaseDialog,
  },
  computed: {
    ...mapGetters("coatches", ["coatches", "hasCoatches", "isCoach"]),
    ...mapGetters(["isAuth"]),
    filteredCoatches() {
      const list = [...this.coatches];
      return list.filter((coatch) => {
        if (this.activeFilters.frontend && coatch.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coatch.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coatch.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
  },
  data() {
    return {
      isLoading: false,
      error: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coatches/getCoaches");
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    handleErr() {
      this.error = false;
    },
  },
};
</script>

<style coped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
