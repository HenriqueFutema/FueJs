import { Fue } from "./fue";

const fue = new Fue({
    el: '#app',
    data:{
        name: 'Henrique',
        count: 1
    },
    methods:{
        click: function(){
            console.log("aaaaa")
            meuComponent()
            console.log(fue.data.count)
        }
    }
})

const meuComponent = () => Fue.newComponent({ el: '#app', name: 'newComponent', html: '<p>call me by: {{ test }} <span>works!</span></p>', data:{test: 'aaaa'}})
