import { Fue } from "./fue";

const fue = new Fue({
    el: '#app',
    data:{
        name: 'Henrique',
        count: 1
    },
    methods:{
        click(){
            console.log("aaaaa")
            console.log(this.data.count)
        }
    }
})
