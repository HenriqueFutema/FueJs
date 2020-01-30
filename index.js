import { Fue } from "./fue";

const fue = new Fue({
  el: "#app",
  data: {
    name: "Henrique",
    count: 1,
    users: [
      { id: 1, name: "João" },
      { id: 2, name: "Pedro" },
      { id: 3, name: "Paulo" }
    ]
  },
  methods: {
    click: function() {
      console.log("aaaaa");
      console.log(fue.data.name);
      meuComponent();
    }
  }
});

const meuComponent = () =>
  Fue.newComponent({
    el: "#app",
    name: "newComponent",
    html: "<p>call me by: {{ test }} <span>works!</span></p>",
    data: { test: "aaaa" }
  });
