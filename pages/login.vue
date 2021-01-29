<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>Войти<v-spacer/><v-btn icon to="/"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
        <v-card-text>
          <Notification v-if="error" type="danger" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <div class="control">
                <v-text-field
                  label="Электронная почта"
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <v-text-field
                  label="Пароль"
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                />
              </div>
            </div>
            <div class="control">
              <v-btn type="submit" class="mr-2">Войти</v-btn>

              <v-btn to="/register">Регистрация</v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Notification from "~/components/Notification";


export default {
  components: {
    Notification,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      dialog: false,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        await this.$auth.loginWith("local", {
          data: {
            identifier: this.email,
            password: this.password,
          },
        });
        this.$router.push("/");
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message;
      }
    },
  },
};
</script>
