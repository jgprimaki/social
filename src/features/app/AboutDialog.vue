<template>
  <v-row justify="center" align="center">
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card flat>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Sobre o DynaSocial</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click.stop="$emit('update:dialog', false)" icon dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Items -->
        <v-card-text>
          <v-row class="mt-5">
            <!-- Objetivo -->
            <v-col cols="12">
              <v-card :width="widthCard" class="mx-auto">
                <v-card-title>Objetivo</v-card-title>
                <v-card-text
                  >O DynaSocial surgiu com a ideia de centralizar todas as
                  informações e ações que a Dynamix tem a oferecer. Desde
                  notificações de aniversariantes do dia, até agendamento de
                  reuniões e visualização do relatório de ponto.</v-card-text
                >
              </v-card>
            </v-col>

            <!-- Tecnologias -->
            <v-col cols="12">
              <v-card :width="widthCard" class="mx-auto">
                <v-card-title>Tecnologias</v-card-title>
                <v-card-text>
                  <a href="https://vuejs.org/">Vue.js</a>: The Progressive
                  JavaScript Framework<br />
                  <a
                    href="https://blog.codecasts.com.br/por-que-vue-js-e-nao-react-d5b58c09d193"
                    >Por que Vue.js?</a
                  >
                  Neste artigo aborda um tema que divide opniões: Qual framework
                  usar? Aonde vivem? Do que se alimentam? <br />
                  O Vue.js foi utilizado no DynaSocial por sua simplicidade,
                  flexibilidade, organização e principalmente seu ecocistema
                  completo(citado abaixo), onde quem consegue um pouco de
                  JavaScript e ou mexeu com Angular ou React, consegue
                  facilmente dar manutenção em um código Vue.
                  <br />
                  Outro ponto, é sua eficiencia em criar um ambiente completo
                  para o desenvolvimento e implatação da aplicação.
                  <br />
                  <a href="https://cli.vuejs.org/">Vue CLI</a>: Standard Tooling
                  for Vue.js Development<br />
                  <a href="https://router.vuejs.org/">Vue Router</a>: Make
                  building Single Page Applications with Vue Router a breeze<br />
                  <a href="https://vuetifyjs.com/pt-BR/">Vuetify</a>: Vuetify is
                  a Vue UI Library with beautifully handcrafted Material
                  Components<br />
                  <a href="https://vuex.vuejs.org/">Vuex</a>: State management
                  pattern + library for Vue.js applications <br />
                  <a href="https://vue-apollo.netlify.com/">Vue Apollo</a>:
                  Integrate GraphQL in your Vue.js apps <br />
                  <a href="https://logaretm.github.io/vee-validate/"
                    >VeeValidate</a
                  >: Template Based Form Validation Framework for Vue.js <br />
                  <a
                    href="https://github.com/justinkames/vuejs-logger#introduction"
                    >VueLogger</a
                  >: Tool that enables configurable logging for Vue applications
                  <br />
                  <a href="https://logaretm.github.io/vee-validate/"
                    >Vue.js devtools</a
                  >: Debugging tools of props vue in browser
                  <br />
                  <br />
                  <a
                    href="https://blog.rocketseat.com.br/as-melhores-features-do-es6-es7-e-es8/"
                    >Es9</a
                  >: ECMAScript is a scripting-language specification
                  standardized by Ecma International.<br />
                  <a href="https://github.com/axios/axios">Axios</a>: Promise
                  based HTTP client for the browser and Node.js<br />
                  <a href="https://moment.github.io/luxon/">Luxon</a>: A
                  powerful, modern, and friendly wrapper for Javascript dates
                  and times<br />
                  <a
                    href="https://mailchimp.com/developer/guides/get-started-with-mailchimp-api-3/"
                    >Api MailChimp</a
                  >: Our all‑in‑one Marketing Platform has the tools you need to
                  grow—no coding or design skills required.
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Tecnologias DynaSocial API -->
            <v-col cols="12">
              <v-card :width="widthCard" class="mx-auto">
                <v-card-title>Tecnologias DynaSocial API</v-card-title>
                <v-card-text>
                  <a href="https://nodejs.org/en/">Node.js</a>: Node.js is a
                  JavaScript runtime built on Chrome's V8 JavaScript engine<br />
                  <a href="https://koajs.com/">Koa</a>: Next generation web
                  framework for Node.js<br />
                  <a href="https://github.com/axios/axios">Axios</a>: Promise
                  based HTTP client for the browser and Node.js<br />
                  <a href="https://graphql.org/">GraphQL</a>: A query language
                  for your API<br />
                  <a
                    href="https://graphql.org/graphql-js/running-an-express-graphql-server/"
                    >Express GraphQL</a
                  >: The simplest way to run a GraphQL API server is to use
                  Express, a popular web application framework for Node.js
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Equipe -->
            <v-col cols="12">
              <v-card :width="widthCard" class="mx-auto">
                <v-card-title>Equipe</v-card-title>
                <v-card-text
                  >Guilherme Trocatti
                  <v-chip small class="ma-2" color="primary">
                    Desenvolvedor
                  </v-chip>
                  <br />
                  Jonathan Gomes Primaki
                  <v-chip small class="ma-2" color="primary">
                    Desenvolvedor </v-chip
                  ><br />
                  Rafael Schleuss
                  <v-chip small class="ma-2" color="green">
                    Infra
                  </v-chip>
                  <br />
                  Amanda Veronica Kaltz
                  <v-chip small class="ma-2" color="info">
                    Testes
                  </v-chip>
                  <br />
                  Vinicius Ferneda de Lima
                  <v-chip small class="ma-2" color="error">
                    Palpiteiro
                  </v-chip>
                  <br />
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Features -->
            <v-col cols="12">
              <v-card :width="widthCard" class="mx-auto">
                <v-card-title>Features</v-card-title>
                <v-card-text>
                  <v-list subheader dense disabled="">
                    <v-list-item-group multiple>
                      <v-list-item
                        v-for="item in features"
                        :key="item.title"
                        dense
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            class="subtitle-2"
                            v-text="item.title"
                          ></v-list-item-title>
                        </v-list-item-content>
                        <!-- icon -->
                        <v-list-item-icon>
                          <v-icon
                            :color="item.active ? 'success accent-4' : 'grey'"
                            >mdi-check</v-icon
                          >
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Release -->
            <v-col cols="12">
              <v-card :width="widthCard" class="mx-auto">
                <v-card-title>Release 0.1.0</v-card-title>
                <v-card-text>
                  <ul>
                    <li>
                      Dashboards
                      <ul>
                        <li>Reuniões do dia</li>
                        <li>Aniversariantes do mês</li>
                        <li>Último Readme postado</li>
                        <li>Próxima confraternização</li>
                      </ul>
                    </li>
                    <li>
                      Agendamento de reuniões
                      <ul>
                        <li>Cadastro por sala, período e dia</li>
                        <li>Cancelamento</li>
                        <li>Notificação por participantes</li>
                        <li>Validações</li>
                      </ul>
                    </li>
                    <li>
                      Ramais
                      <ul>
                        <li>Filtro por nome ou ramal</li>
                        <li>Ordenação e páginação</li>
                      </ul>
                    </li>
                    <li>
                      Readme
                      <ul>
                        <li>Ordenação, readme mais recene</li>
                        <li>Páginação</li>
                      </ul>
                    </li>
                    <li>
                      Aniversariantes
                      <ul>
                        <li>Calendário com os aniversariantes</li>
                      </ul>
                    </li>
                    <li>Notificações reativas</li>
                    <li>Atualização de perfil</li>
                    <li>Autenticação Keycloak</li>
                    <li>Sobre o DynaSocial</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- Actions -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click.stop="$emit('update:dialog', false)"
            color="red darken-1"
            dark
            fab
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      widthCard: 700,
      features: [
        { title: "Dashboards", active: true },
        { title: "Agendameto de reuniões", active: true },
        { title: "Ramais", active: true },
        { title: "Readme", active: true },
        { title: "Aniversariantes", active: true },
        { title: "Notificações reativas", active: true },
        { title: "Atualização de perfil", active: true },
        { title: "Autenticação Keycloak", active: true },
        { title: "Relatório ponto", active: false },
        { title: "Cadastro/Calendário dia da cuca", active: false },
        { title: "Cadastro de equipes", active: false },
        { title: "Agendamento de férias", active: false },
        { title: "Ranking dos projetos", active: false },
        { title: "Cadastro de confraternizações", active: false },
        { title: "Feed de noticias", active: false },
        { title: "Migração do DynaClub", active: false }
      ]
    };
  },
  props: {
    dialog: Boolean
  }
};
</script>
