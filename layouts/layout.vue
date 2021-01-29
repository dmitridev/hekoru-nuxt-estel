<template>
  <v-app>
    <v-main>
      <v-container>
        <v-toolbar class="flex" height="90" dark color="primary">
          <v-toolbar-title dark>
            <NuxtLink to="/" class="white--text">ЛОГО</NuxtLink>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-layout class="mt-2">
            <v-text-field
              single-line
              dense
              background-color="white"
              placeholder="Поиск"
              class="flex xs8 mr-2"
              hide-details
              filled
            ></v-text-field>
            <template v-if="!$store.getters['isAuthenticated']">
              <v-btn to="/login" class="flex xs2" dense color="primary">
                кабинет
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <template v-if="$store.getters['isAuthenticated']">
              <v-btn to="/profile" class="flex xs2">Кабинет</v-btn>
            </template>
            <v-dialog width="800" fullscreen>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  dense
                  class="white--text flex xs2"
                  color="primary"
                >
                  <v-badge
                    :content="items.length"
                    color="primary"
                    @click="basket()"
                    >Корзина</v-badge
                  >
                </v-btn>
              </template>
              <v-card>
                <v-card-title> Корзина </v-card-title>
                <v-card-text>
                  <h1>Общая сумма заказа: {{ sum }}</h1>
                  <v-card v-for="({ item }, i) in items" :key="i">
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-text>
                      <v-layout class="space-between align-center">
                        <img width="70" :src="item.picture[0].url" />

                        <v-spacer />
                        <span>{{ item.price * items[i].counter }} руб</span>
                        <v-btn icon @click="itemDelete(item, i)"
                          ><v-icon>mdi-delete</v-icon></v-btn
                        >
                      </v-layout>
                    </v-card-text>
                    <v-card-actions> </v-card-actions>
                  </v-card>
                </v-card-text>
                <v-container>
                  <template v-if="items.length !== 0">
                    <v-btn @click="() => (request = true)"
                      >Оформить заявку</v-btn
                    >
                    <div v-if="request">
                      <v-form method="post" @submit.prevent="send_request">
                        <v-text-field
                          name="post_name"
                          label="Имя"
                          v-model="post_name"
                        ></v-text-field>
                        <v-text-field
                          name="post_email"
                          label="Электронная почта"
                          v-model="post_email"
                        ></v-text-field>
                        <v-text-field
                          name="post_phone"
                          label="Телефон"
                          v-model="post_phone"
                        ></v-text-field>
                        <v-text-field
                          name="post_city"
                          label="Город доставки"
                          v-model="post_city"
                        ></v-text-field>
                        <v-text-field
                          name="post_street"
                          label="Улица"
                          v-model="post_street"
                        ></v-text-field>
                        <v-text-field
                          name="post_house"
                          label="Номер дома"
                          v-model="post_house"
                        ></v-text-field>
                        <v-text-field
                          name="post_home_number"
                          label="Адрес дома"
                          v-model="post_home_number"
                        ></v-text-field>
                        <v-text-field
                          name="post_address"
                          label="Адрес"
                          v-model="post_address"
                        ></v-text-field>
                        <v-text-field
                          name="post_comments"
                          label="Комментарий к заказу"
                          v-model="post_comments"
                        ></v-text-field>
                        <v-select
                          name="post_cash_or_card"
                          label="Картой или наличными"
                          :items="['Картой', 'Наличными']"
                          v-model="post_cash_or_card"
                        ></v-select>
                        <v-btn type="submit">Отправить</v-btn>
                      </v-form>
                    </div>
                  </template>
                </v-container>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-toolbar>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser","isSpecialUser"]),
  },
  data: () => ({
    login_dialog: false,
    user_dialog: false,
    basket_dialog: true,
    items: [],
    user_type: "usual",
    email: "",
    password: "",
    error: null,
    dialog: false,
    request: false,
    post_name: "",
    post_email: "",
    post_phone: "",
    post_city: "",
    post_street: "",
    post_home: "",
    post_home_number: "",
    post_address: "",
    post_comments: "",
    post_cash_or_card: "",
    request: false,
  }),
  mounted() {
    let script = document.createElement("script");
    script.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    document.head.appendChild(script);
  },
  computed: {
    sum({ items }) {
      return (
        items &&
        items.reduce((accumulator, element) => {
          return accumulator + element.item.price * element.counter;
        }, 0)
      );
    },
  },
  async created() {
    if(process.browser){
    const items = JSON.parse(localStorage.getItem("items")) || [];
    this.items = items;
    console.log(this.items);
  }
  },
  methods: {
    basket() {
      basket_dialog = true;
    },
    itemDelete(item, i) {
      this.items = this.items.filter((value, index) => index != i);
      localStorage.setItem("items", JSON.stringify(this.items));
    },
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
    async send_request() {
      var str = "Заказ:";
      for (var it of this.items) {
        str += `<p>Товар: ${it.item.name},Количество: ${it.counter} Цена: ${
          it.item.price * it.counter
        }</p>`;
      }

      var str = `<html>\n<body>${str}<p> имя : ${this.post_name}</p><p> почта : ${this.post_email} </p><p> телефон : ${this.post_phone}</p><p> город : ${this.post_city}</p><p> улица : ${this.post_street} </p><p> дом : ${this.post_home_number} </p><p> Адрес : ${this.post_address} </p><p> Комментарий к заказу: ${this.post_comments} </p><p> Наличными или картой: ${this.post_cash_or_card} </p></body></html>`;

      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "dmitrit.learn@gmail.com",
        Password: "56B2D6C56694C8BC367A7DBB971A6923F3BB",
        To: "Kirill_Duboiskiy@mail.ru",
        From: "dmitrit.learn@gmail.com",
        Subject: "Новый запрос",
        Body: str,
      }).then((message) => alert(message));
      this.request = false;
    },
  },
};
</script>
