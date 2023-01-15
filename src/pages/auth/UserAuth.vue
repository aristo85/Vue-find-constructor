<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleErr">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <form @submit.prevent="submitForm" v-else>
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password must be at least 6 char!
        </p>
        <base-button>{{ submitBtnCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{
          switchModeBtnCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
export default {
  components: { BaseButton, BaseCard, BaseSpinner },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      error: false,
      isLoading: false,
    };
  },
  computed: {
    submitBtnCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeBtnCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const action = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", action);
        } else {
          await this.$store.dispatch("signup", action);
        }
        this.$router.replace('/coatches')
      } catch (error) {
        this.error = error.message || "something went wrong!";
      }
      this.isLoading = false;
    },
    switchMode() {
      this.mode = this.mode === "signin" ? "login" : "signin";
    },
    handleErr() {
      this.error = false;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
