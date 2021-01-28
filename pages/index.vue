<template>
                    <v-layout>
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
                                    <v-list-item v-for="item in items" :key="item.title" :to="{path: '/category/',query:{category_id: item.category_id}}">
                                        <v-list-item-icon>
                                            <v-icon>mdi-ticket</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>{{item.name}}</v-list-item-title>
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
</template>

<script>
export default {
  async created() {
    const { data } = await this.$axios.get("/categories");
    console.log(data);
    this.items = data;
    const forSlider = await this.$axios.get("/for-sliders");
    this.images = forSlider.data[0].pictures.map((e) => e.url);
    console.log(this.images);
    const brands = await this.$axios.get("/bottom-buttons");
    this.brands = brands.data[0].pictures.map((e) => e.url);
  },
  layout: "layout",
  data() {
    return {
      menu: [false, false, false, false, false],
      items: [],
      model: 0,
      brands: [],
      images: [
        "images/slider-1.jpg",
        "images/slider-2.jpg",
        "images/slider-3.jfif",
      ],
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
