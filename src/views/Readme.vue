<template>
  <div id="readme">
    <v-progress-linear
      :active="isLoading"
      :indeterminate="isLoading"
      absolute
      top
    ></v-progress-linear>
    <template v-if="readme && !isLoading">
      <v-slide-x-transition group>
        <v-pagination
          key="pagination-top"
          v-model="pagination.page"
          :length="pagination.total"
          :total-visible="pagination.visible"
          class="mb-3"
        ></v-pagination>

        <v-responsive key="readme" class="d-flex text-center sbb">
          <div v-html="readme"></div>
        </v-responsive>

        <v-pagination
          key="pagination-bottom"
          v-model="pagination.page"
          :length="pagination.total"
          :total-visible="pagination.visible"
          class="mt-3"
        ></v-pagination>
      </v-slide-x-transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sbb {
  margin: auto;
  width: 70% !important;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      readme: "",
      pagination: {
        page: 1,
        total: 2,
        visible: 8
      },
      isLoading: true
    };
  },
  watch: {
    "pagination.page"(newPage) {
      this.onPageChange(newPage);
    }
  },
  methods: {
    onPageChange(page) {
      this.getReadmes(page);
      this.hiddenItems();
    },

    hiddenItems() {
      requestAnimationFrame(() => {
        const templatePreheader = document.querySelector("#templatePreheader");
        if (templatePreheader) templatePreheader.hidden = true;

        const templateHeader = document.querySelector("#templateHeader");
        if (templateHeader) templateHeader.children[1].hidden = true;

        const canspamBarWrapper = document.querySelector("#canspamBarWrapper");
        if (canspamBarWrapper) canspamBarWrapper.parentElement.hidden = true;
      });
    },

    async getReadmes(page = this.pagination.page) {
      this.isLoading = true;

      const offset = page > 0 ? page - 1 : 0;
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_PATH}/readmes`,
        {
          params: {
            offset
          }
        }
      );

      const { document, total_items } = response.data;

      this.readme = document;
      this.pagination.total = total_items;

      this.hiddenItems();

      this.isLoading = false;
    }
  },
  async created() {
    await this.getReadmes();
  }
};
</script>
