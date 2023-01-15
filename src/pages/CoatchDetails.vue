<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
export default {
  components: { BaseCard, BaseButton, BaseBadge },
  props: ["id"],
  data() {
    return {
      selectedCoatch: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoatch.firstName + " " + this.selectedCoatch.lastName;
    },
    contactLink() {
      return "/coatches/" + this.id + "/contact";
    },
    areas() {
      return this.selectedCoatch.areas;
    },
    rate() {
      return this.selectedCoatch.hourlyRate;
    },
    description() {
      return this.selectedCoatch.description;
    },
  },
  created() {
    this.selectedCoatch = this.$store.getters["coatches/coatches"].find(
      (c) => c.id === this.id
    );
  },
};
</script>

<style></style>
