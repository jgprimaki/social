<template>
  <v-card max-width="500" class="ml-auto">
    <v-toolbar color="primary" dark>
      <v-toolbar-title v-if="firstAccess">
        {{ $t("user.welcome") }}
      </v-toolbar-title>
      <v-toolbar-title v-else>Perfil</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="canceled" icon dark>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <!--  -->
    <v-card-text>
      <v-alert
        v-if="firstAccess"
        color="error accent-2"
        dark
        icon="mdi-account-group"
        text
      >
        {{ $t("user.perfil") }}
      </v-alert>
      <!--  -->
      <ValidationObserver
        ref="form"
        @submit.prevent="onSubmit"
        tag="form"
        class="pt-3"
      >
        <v-row no-gutters>
          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              name="Nome Completo"
              rules="required|min:5"
            >
              <v-text-field
                v-model="form.name_complete"
                :error-messages="errors"
                label="Nome Completo*"
                prepend-icon="mdi-account"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <v-text-field
                v-model="form.email"
                :error-messages="errors"
                label="Email*"
                prepend-icon="mdi-email"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12">
            <ValidationProvider
              v-slot="{ errors }"
              name="Equipe"
              rules="required"
            >
              <v-combobox
                v-model="form.teams"
                :error-messages="errors"
                :items="teamItems"
                label="Selecione a sua equipe*"
                multiple
                small-chips
                clearable
                prepend-icon="mdi-account-group"
                item-text="name"
                item-value="id"
              ></v-combobox>
            </ValidationProvider>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-menu
              ref="menuBirthday"
              v-model="menuBirthday"
              :close-on-content-click="false"
              min-width="290px"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Data de nascimento"
                  rules="required"
                >
                  <v-text-field
                    v-model="birthdayFormatted"
                    :error-messages="errors"
                    label="Data de nascimento*"
                    prepend-icon="mdi-cake-variant"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker
                ref="pickerBirthday"
                v-model="form.birthday"
                :max="today"
                @change="$refs.menuBirthday.save(form.birthday)"
                locale="pt"
                min="1960-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              name="Ramal"
              rules="required|numeric"
            >
              <v-text-field
                v-model="form.phone"
                :error-messages="errors"
                label="Ramal ou celular*"
                prepend-icon="mdi-phone"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-checkbox
              v-model="form.studying"
              :error-messages="errors"
              class="mx-2 mt-2"
              label="Recebe auxílio educação?"
              color="primary"
              v-on="on"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              name="PIS"
              rules="numeric|max:12|min:12"
            >
              <v-text-field
                v-model="form.pis"
                :counter="piss_max"
                :error-messages="errors"
                label="PIS"
                hint="Número PIS do seu cartão ponto"
                prepend-icon="mdi-account-card-details-outline"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="canceled" color="red darken-1" dark text>
            <v-icon>mdi-close-box-outline</v-icon>Cancelar
          </v-btn>
          <v-btn type="submit" color="green darken-1" dark text>
            <v-icon>mdi-upload</v-icon>Atualizar
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script src="./user.controller.js"></script>
