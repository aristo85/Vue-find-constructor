<template>
  <section>
    <base-card>
      <h2>Register as a Constructor</h2>
      <coatch-form @save-data="addCoach"></coatch-form>
    </base-card>
  </section>
</template>

<script>
import CoatchForm from "@/components/coatches/CoatchForm.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { mapActions } from 'vuex';
export default {
  components: { CoatchForm, BaseCard },
methods: {
  ...mapActions('coatches', ['addCoach'])
// saveData(data) {
//   this.$store.dispatch('coatches/addCoach', data)
// }
}
};
</script>

<style scoped></style>
