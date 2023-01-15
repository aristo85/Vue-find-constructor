<template>
  <form @submit.prevent="sumbinForm">
    <div class="form-control" :class="{ invalid: !firstName.isVal }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearVlidity('firstName')"
      />
      <p v-if="!firstName.isVal">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isVal }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearVlidity('lastName')"
      />
      <p v-if="!lastName.isVal">lastName must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isVal }">
      <label for="description">description</label>
      <textarea
        type="text"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearVlidity('description')"
      ></textarea>
      <p v-if="!description.isVal">description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isVal }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearVlidity('rate')"
      />
      <p v-if="!rate.isVal">rate has to be more than 0</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isVal }">
      <h3>Areas of experties</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearVlidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearVlidity('areas')"
        />
        <label for="backend">backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearVlidity('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isVal">choose at least one!</p>
    </div>
    <base-button>Register</base-button>
    <p v-if="isFormValid">Please fix the above errors!</p>
  </form>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
export default {
  components: { BaseButton },
  emits: ["save-data"],
  data() {
    return {
      isFormValid: true,
      firstName: { val: "", isVal: true },
      lastName: { val: "", isVal: true },
      description: { val: "", isVal: true },
      rate: { val: null, isVal: true },
      areas: { val: [], isVal: true },
    };
  },
  methods: {
    clearVlidity(input) {
      this[input].isVal = true;
    },
    vlidateForm() {
      if (this.firstName.val === "") {
        this.isFormValid = false;
        this.firstName.isVal = false;
      }
      if (this.lastName.val === "") {
        this.isFormValid = false;
        this.lastName.isVal = false;
      }
      if (this.description.val === "") {
        this.isFormValid = false;
        this.description.isVal = false;
      }
      if (!this.rate.val || this.rate.val <= 0) {
        this.isFormValid = false;
        this.rate.isVal = false;
      }
      if (this.areas.val.length < 1) {
        this.isFormValid = false;
        this.areas.isVal = false;
      }
    },
    sumbinForm() {
      this.vlidateForm();
      if (!this.isFormValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit("save-data", formData);
      this.$router.replace("/coatches");
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
