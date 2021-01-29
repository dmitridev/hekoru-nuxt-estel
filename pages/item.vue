<template>
  <v-layout>
    <v-card class="ma-2" width="256">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Категории </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item
            v-for="item in categories"
            :key="item.title"
            :to="{
              path: '/category/',
              query: { category_id: item.category_id },
            }"
          >
            <v-list-item-icon>
              <v-icon>mdi-ticket</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-container>
      <div class="row mt-4" v-if="items">
        <v-dialog
          v-model="item_dialog[i]"
          width="1000"
          v-for="(item, i) in items"
          :key="item.id"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card class="description" v-on="on" v-bind="attrs" width="300px">
              <v-card-title>
                {{ item.name }}
              </v-card-title>
              <v-card-text>
                <v-img :src="item.picture[0].url"></v-img>
              </v-card-text>
              <v-card-actions class="justify-end">Цена:{{item.price}}руб</v-card-actions>
            </v-card>
          </template>
          <v-card>
            <v-card-title>Описание товара</v-card-title>
            <v-card-text>
              <v-layout>
                <div class="flex xs3">
                  <v-img :src="item.picture[0].url"></v-img>
                </div>
                <div class="flex xs9">
                  <v-flex class="mb-3">
                    <h1>{{ item.name }}</h1>
                  </v-flex>
                  <v-row outlined class="ma-10 pa-10">
                    <v-btn
                      icon
                      @click="() => (counter !== 1 ? counter-- : counter)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-text-field
                      dense
                      hide-details
                      filled
                      class="flex xs2"
                      width="30"
                      v-model="counter"
                    ></v-text-field>
                    <v-btn icon @click="() => counter++">
                      <v-icon>mdi-plus</v-icon> </v-btn
                    ><v-spacer />
                    <h1>Цена:{{ item.price ? item.price * counter : 0 }}руб</h1>
                    <div v-if="$store.getters['isSpecialUser']">
                      <h4>
                        Для профессионалов:
                        {{
                          item.special_price ? item.special_price * counter : 0
                        }}руб
                      </h4>
                    </div>
                  </v-row>
                </div>
              </v-layout>
            </v-card-text>
            <v-card-actions class="flex">
              <v-layout class="justify-end">
                <v-btn text @click="inBasket(item, counter)">В корзину</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import price from "../components/price.vue";
export default {
  layout: "layout",
  data: () => ({
    items: [],
    counter: 1,
    item_dialog: [],
  }),
  async created() {
    const category_id = this.$route.query.category_id;
    const { data } = await this.$axios.get(
      `/items/?category_id=${category_id}`
    );

    const categories = await this.$axios.get("/categories");

    this.categories = categories.data;

    var item = this.$store.getters["isSpecialUser"];
    console.log(item);
    console.log(data);
    this.items = data;
    this.item_dialog.fill(false, 0, this.items.length);
  },
  methods: {
    inBasket(item, counter) {
      const basketItems = JSON.parse(localStorage.getItem("items")) || [];
      console.log(basketItems);
      basketItems.push({ item: item, counter: counter });
      localStorage.items = JSON.stringify(basketItems);
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.v-card.description {
  transition: opacity 0.4s ease-in-out;
}

.v-card.description:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
