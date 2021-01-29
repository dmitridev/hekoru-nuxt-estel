<template>
<div>
                    <v-layout >
                        <v-card class="ma-2" width="256">
                            <v-navigation-drawer permanent>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="title">
                                            Категории
                                        </v-list-item-title>

                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list dense nav>

                                    <v-list-item v-for="item in items" :key="item.title" :to="`category/${item.category_id}`">
                                        <v-menu v-model="menu[item.id]" nudge-top="40" offset-x open-on-hover>
                                          <template v-slot:activator="{on,attrs}">
                                        <v-list-item-icon>
                                            <v-icon>mdi-ticket</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title v-on="on">{{item.name}}</v-list-item-title>
                                        </template>
                                        <v-card width="320" class="pb-2">
                                          <v-card-title>{{item.name}}</v-card-title>
                                        <v-card-text>
                                          <v-flex row class="mx-auto">
                                          <v-card class="ma-2" v-for="(cat,i) in subcategories[item.category_id]" :key="i" width="120" :to="`category/${item.category_id}`">
                                            <v-card-title style="font-size:10px">{{cat.name}}</v-card-title>
                                                  <v-card-text class="align-center">
                                                    <v-img width="100px" :src="cat.picture[0].url"></v-img>
                                                    <v-btn text :to="{name: 'item', query: {category_id:cat.category_id}}" style="font-size:10px">Перейти</v-btn>
                                                  </v-card-text>
                                          </v-card>
                                          </v-flex>
                                        </v-card-text>
                                        </v-card>
                                      </v-menu>
                                    </v-list-item>

                                </v-list>
                            </v-navigation-drawer>
                        </v-card>
                        <v-card class="ma-2" width="100%">
                            <v-card-title>
                                <v-tabs>
                                    <v-tab>Блок-1</v-tab>
                                    <v-tab>Блок-2</v-tab>
                                    <v-tab>Блок-3</v-tab>
                                    <v-tab>Блок-4</v-tab>
                                    <v-tab>Блок-5</v-tab>
                                </v-tabs>
                            </v-card-title>
                            <v-card-text>
                                <v-carousel dark v-model="model">
                                    <v-carousel-item v-for="(color, i) in images" :key="color">
                                        <v-img :src="images[i]"></v-img>
                                    </v-carousel-item>
                                </v-carousel>
                                <div class="brands">
                                    <img width="100" v-for="item in brands" class="mr-5" :src="item"></img>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-layout>
                    </div>
</template>

<script>
export default {
  async created() {
    const { data } = await this.$axios.get("/categories");
    console.log(data);
    this.items = data;
    const forSlider = await this.$axios.get("/for-sliders");
    this.images = forSlider.data[0].pictures.map((e) => e.url);

    const brands = await this.$axios.get("/bottom-buttons");
    this.brands = brands.data[0] && brands.data[0].pictures.map((e) => e.url);
    this.items.forEach(async (item) => {
      const subcategories = await this.$axios.get(
        "/subcategories?category_id=" + item.category_id
      );

      if (subcategories.data) {
        this.subcategories.push(subcategories.data);
      } else return [];
    });
  },
  layout: "layout",
  data() {
    return {
      menu: [false, false, false, false, false],
      subcategories: [],
      dropdown_menu: false,
      items: [],
      model: 0,
      brands: [],
      images: [],
    };
  },
};
</script>

<style scoped>
.brands {
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
</style>
