<template>
  <div data-app>
    <Notification v-if="success" type="success" :message="success" />
    <Notification v-if="error" type="danger" :message="error" />
    <v-card class="mx-auto">
      <v-card-title>Регистрация<v-spacer/><v-btn icon to="/"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
      <v-card-text>
        <form v-if="!success" method="post" @submit.prevent="register">
          <v-text-field
            v-model="username"
            type="text"
            name="username"
            label="ФИО"
            required
          />
          <v-text-field
            label="Электронная почта"
            v-model="email"
            type="email"
            name="email"
          />
          <v-text-field
            label="Пароль"
            v-model="password"
            type="password"
            name="password"
          />
          <v-checkbox
            v-model="special_user"
            label="Для профессионалов"
          ></v-checkbox>
          <div v-if="special_user">
            <v-select
              label="Тип"
              :items="special_user_type"
              v-model="type"
            ></v-select>

            <v-text-field label="Телефон" v-model="phone" name="phone" />
            <v-text-field label="Адрес" v-model="address" name="address" />
            <input type="file" @onchange="setFile" name="file" />
          </div>
          <v-btn type="submit" text> Регистрация </v-btn>
        </form>
      </v-card-text>
    </v-card>
    <div class="has-text-centered" style="margin-top: 20px">
      Уже есть аккаунт? <nuxt-link to="/login">Войти</nuxt-link>
    </div>
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
      special_user_type: [
        "Частный мастер",
        "Салон",
        "Магазин",
        "Учебный центр",
      ],
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      file: "",
      type: "",
      success: null,
      error: null,
      special_user: false,
    };
  },
  methods: {
    async register() {
      this.error = null;
      try {
        this.$axios.setToken(false);
        let obj = {
          username: this.username,
          email: this.email,
          password: this.password,
          phone: this.phone,
        };

        if (this.special_user) {
          obj.special_user = this.special_user;
          obj.type = this.type;
          obj.address = this.address;
        }

        await this.$axios.post("auth/local/register", obj);
        this.success="Успешно";
        this.$router.back();
        //this.success = `A confirmation link has been sent to your email account. \
 //Please click on the link to complete the registration process.`;
      } catch (e) {
        this.error = e.message;
      }
    },
    setFile(v) {
      this.file = v.target.files || e.dataTransfer.files;
      if (!files.length) return;
    },
  },
};
</script>
