<template>
  <div id="party">
    <Calendar :events="events"></Calendar>
  </div>
</template>
<script>
export default {
  components: {
    Calendar: () =>
      import(/* webpackChunkName: "calendar" */ "../components/Calendar.vue")
  },
  data() {
    return {
      events: [
        {
          name: "Festa",
          start: "2020-1-1",
          end: "2020-1-7",
          color: "orange",
          details: "Hoje é festa lá no meu AP",
          heart: true
        },
        {
          name: "Festa",
          start: "2020-1-24",
          end: "2020-1-24",
          color: "cyan",
          details: "Hoje é festa lá no meu AP",
          heart: true
        },
        {
          name: "Festa",
          start: "2020-1-17 10:30",
          end: "2020-1-17 12:30",
          color: "blue",
          details: "Hoje é festa lá no meu AP",
          heart: true
        }
      ]
    };
  }
};
</script>
