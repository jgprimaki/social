<template>
  <div class="mt-3">
    <v-expansion-panels :focusable="true" :hover="true">
      <v-expansion-panel @click="expand = !expand">
        <v-expansion-panel-header disable-icon-rotate>
          <template v-slot:actions>
            <v-icon v-if="!expand" color="primary">mdi-calendar-plus</v-icon>
            <v-icon v-else color="primary">mdi-calendar-minus</v-icon>
          </template>
          Novo Agendamento
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ValidationObserver
            ref="form"
            @reset.prevent="onReset"
            @submit.prevent="onSubmit"
            tag="form"
          >
            <v-row>
              <v-col cols="12" lg="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Nome"
                  rules="required"
                >
                  <v-text-field
                    v-model="form.topic"
                    :error-messages="errors"
                    label="Nome*"
                    prepend-icon="mdi-marker-check"
                    hint="Equipe, Assuntou ou Tópico"
                    persistent-hint
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" lg="3">
                <v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  min-width="290px"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Data"
                      rules="required"
                    >
                      <v-text-field
                        v-model="dateFormatted"
                        :error-messages="errors"
                        label="Data*"
                        readonly
                        prepend-icon="mdi-calendar"
                        v-on="on"
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker
                    v-model="form.dates"
                    :min="today"
                    locale="pt"
                    no-title
                    reactive
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" lg="3">
                <v-menu
                  ref="menuTimeStart"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.timeStart"
                  max-width="290px"
                  min-width="290px"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Hora Inicial"
                      rules="required"
                    >
                      <v-text-field
                        v-model="form.timeStart"
                        :error-messages="errors"
                        label="Hora Inicial*"
                        prepend-icon="mdi-clock-outline"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-time-picker
                    v-model="form.timeStart"
                    :allowed-minutes="allowedStep"
                    :max="form.timeEnd"
                    @click:minute="$refs.menuTimeStart.save(form.timeStart)"
                    full-width
                    format="24hr"
                    scrollable
                  ></v-time-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" lg="3">
                <v-menu
                  ref="menuTimeEnd"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.timeEnd"
                  max-width="290px"
                  min-width="290px"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Hora Final"
                      rules="required"
                    >
                      <v-text-field
                        v-model="form.timeEnd"
                        :error-messages="errors"
                        label="Hora Final*"
                        prepend-icon="mdi-clock-outline"
                        autocomplete="off"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-time-picker
                    v-model="form.timeEnd"
                    :allowed-minutes="allowedStep"
                    :min="timeEndMin"
                    @click:minute="$refs.menuTimeEnd.save(form.timeEnd)"
                    full-width
                    scrollable
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" lg="6">
                <v-combobox
                  v-model="form.members"
                  :items="memberItems"
                  :loading="loadingMembers"
                  label="Selecione os participantes"
                  multiple
                  small-chips
                  clearable
                  prepend-icon="mdi-account-group"
                  item-text="name_complete"
                  item-value="id"
                  hide-selected
                ></v-combobox>
              </v-col>

              <v-col cols="12" lg="6">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Observação"
                  :rules="'max:' + max"
                >
                  <v-text-field
                    v-model="form.note"
                    :counter="max"
                    :error-messages="errors"
                    label="Observação"
                    autocomplete="off"
                    prepend-icon="mdi-comment-multiple-outline"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="6" lg="4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Sala"
                  rules="required"
                >
                  <v-radio-group
                    v-model="form.room"
                    :error-messages="errors"
                    row
                  >
                    <v-radio
                      :value="1"
                      :label="$t('meeting.room.conf')"
                      color="primary"
                    ></v-radio>
                    <v-radio
                      :value="2"
                      :label="$t('meeting.room.floor')"
                      color="primary"
                    ></v-radio>
                  </v-radio-group>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <v-color-picker
                  v-model="form.color"
                  swatches-max-height="75"
                  hide-inputs
                  hide-canvas
                  hide-mode-switch
                  show-swatches
                  disabled
                  flat
                ></v-color-picker>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="text-right" cols="12">
                <v-btn class="mr-4" type="submit" color="success">
                  <v-icon>mdi-calendar-edit</v-icon>Agendar
                </v-btn>
                <v-btn type="reset" color="error">
                  <v-icon>mdi-eraser</v-icon>Limpar
                </v-btn>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss">
.v-color-picker__controls {
  display: none;
}
.v-color-picker__swatches > div {
  padding: 0;
}

.v-color-picker {
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
}
</style>

<script src="./newMeeting.js"></script>
