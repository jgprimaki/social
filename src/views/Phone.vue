<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-file-document-box-search-outline"
        label="Pesquise pelo ramal ou nome..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :search="search"
      locale="pt"
      hide-default-header
    >
      <template v-slot:item.phone="{ item }">
        <v-icon class="mr-2" color="primary">mdi-phone</v-icon>
        {{ item.phone }} -
        {{ item.name_complete }}
      </template>
      <template v-slot:item.name_complete></template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-text>
      Transferência: Flash + ramal <br />
      Puxar ligação: 55
    </v-card-text>
  </v-card>
</template>

<script>
import UserService from "../models/user.gql";
import PhoneService from "../services/phone.services.js";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Ramais",
          align: "left",
          value: "phone"
        },
        {
          text: "Nome",
          align: "left",
          value: "name_complete"
        }
      ],
      items: PhoneService
    };
  },
  apollo: {
    items: {
      query: UserService.getUsersPhones,
      update(data) {
        const _data = data.users.filter(u => u.phone);
        const items = this.items.filter(i => i.name_complete);

        // TODO Depois que os usuarios estiverem cadastrados, essa etapa deverá ser removida
        _data.forEach(d => {
          items.forEach((i, idx) => {
            const data_name = d.name_complete.split(" ")[0];
            const item_name = i.name_complete;
            if (data_name === item_name) {
              items.splice(idx, 1);
            }
          });
        });
        // end

        return [..._data, ...items];
      }
    }
  }
};
</script>
