<template>
  <div>
    <v-container>
      <div class="row mt-4" v-if="items">
        <v-hover v-slot="{ hover }" v-for="item in items" :key="item.id">
          <v-card
            width="300px"
            :class="{ 'on-hover': hover }"
            :to="{ path: '/item/', query: { category_id: item.category_id } }"
          >
            <v-card-title>
              {{ item.name }}
            </v-card-title>
            <v-card-text>
              <v-img :src="item.picture[0].url"></v-img>
            </v-card-text>
            <v-card-actions>{{item.price}}</v-card-actions>
          </v-card>
        </v-hover>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "layout",
  data: () => ({
    items: [],
    category_id: 0,
  }),
  async created() {
    this.category_id = this.$route.query.category_id;
    const { data } = await this.$axios.get(
      `/subcategories/?category_id=${this.category_id}`
    );
    this.items = data;
    console.log(this.items);
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
