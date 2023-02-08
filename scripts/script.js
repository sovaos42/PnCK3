let eventBus = new Vue()

Vue.component('notes',{

     data(){
        return{
            notes1:[],
            notes2:[],
            notes3:[], 
            notes4:[],           
        }
    },
    template:
    `
    <div class="all">
        <div class="all-notes">
            <div class="row" >
                <div class="note1">
                    <cards v-for="formCards in notes1" :formCards="formCards"></cards>
                </div>
                <div class="note2">
                    <cards></cards>
                </div>
                <div class="note3">
                    <cards></cards>
                </div>
                <div class="note4">
                    <cards></cards>
                </div>
            </div>
            <div class="forma">
            <form-cards></form-cards>
            </div>
        </div>
    </div>
`,

 mounted() {
        eventBus.$on('notes-form', formCards =>{
            this.notes1.push(formCards)
               
        })
    },
})

Vue.component('cards', {
    props:{
        formCards: Object
    },
    template:
        `
        <div class="card">
            <div class="conc" >
                <p>{{formCards.names}}</p>
                <p>{{formCards.description}}</p>
                <p>Дедлайн:{{formCards.deadline}}</p>
                <p>Дата создания:{{formCards.date}}</p>
            </div>
        </div>  
    `,

})

Vue.component('form-cards', {
    data(){
        return{
            names: null,
            description: null,
            deadline: null,
            date: null,
            errors:[]
        }
    },

    template:
    `
        </div>
        <div class="all-form-cards">
        <div class="center">
            <form> 
                <label for="names"> Заголовок </label>
                <input v-model="names" id="names" type="text" placeholder="names"><br>
                <textarea v-model="description"  placeholder="description"></textarea>
                <input v-model="deadline" type="date">
                <button type="submit">Создать</button>
            </form>
            </div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
                </p>
            
        </div>
    `,
     methods:{
        onForm(){
            if(this.names && this.description && this.deadline){
                let formCards = {
                    names: this.names,
                    description: this.description,
                    deadline: this.deadline,
                    date: new Date().toLocaleString()
                }
                eventBus.$emit('notes-form', formCards)

                this.names = null
                this.description = null
                this.deadline = null
            }
            else{
                
                if(!this.names) this.errors.push("Введите заголовок.")
                if(!this.description) this.errors.push("Заполните описание.")
                if(!this.deadline) this.errors.push("Выберите дедлайн.")
            }
        },

    }
})

let app = new Vue({
    el: '#app',
})
