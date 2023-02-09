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

        <div class="row-col">
            <colOne :cardList="notes1"></colOne>
            <colTwo :cardList="notes2"></colTwo>
            <colThree :cardList="notes3"></colThree>
            <colFour :cardList="notes4"></colFour>
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

Vue.component('colOne', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
        <cards
            v-for="formCards in cardList"
            :formCards="formCards">
        </cards>
    </div>
    `,
})

Vue.component('colTwo', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
        <cards
            v-for="formCards in cardList"
            :formCards="formCards">
        </cards>
    </div>
    `,
})

Vue.component('colThree', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
    <cards
        v-for="formCards in cardList"
        :formCards="formCards">
    </cards>
</div>
`,
})

Vue.component('colFour', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
        <cards
            v-for="formCards in cardList"
            :formCards="formCards">
        </cards>
    </div>
    `,
})

Vue.component('card-redact',{
    template:`
    <div class="notes1">
    <button type="submit" v-if="show === false" @click="$emit('Edit', isEdit())">Редактирование</button>
        <form class="text-form-card" v-if="show === true">
            <label for="names">Редактирование</label>
            <input v-model="names" id="names" type="text" :placeholder="formCards.names">
            <textarea v-model="description" :placeholder="formCards.description"></textarea>
            <p>Deadline: {{ formCards.deadline }}</p>
            <p>Дата создания: {{ formCards.dateCreate }}</p>
            <button type="submit" @click="$emit('Edit', isEdit())">Да</button>
            <button type="submit" @click="$emit('Edit', show = false)">Нет</button>
        </form>
    </div>
    `,
    data() {
        return {
            show: false,
            names: this.formCards.names,
            description: this.formCards.description,
        }
    },
    props: {
        formCards: Object,
    },
    methods: {
        isEdit() {
            if (this.show == false)
                this.show = true;
            else {
                if (this.names)
                    this.formCards.names = this.names;

                if (this.description)
                    this.formCards.description = this.description;

                this.show = false;
            }

            return this.show;
        }
    },
})

Vue.component('cards', {
    props:{
        formCards: Object,
        edit: Boolean
    },
    template:
        `
        <div class="notes1">
            <div class="conc" v-if="edit === false">
                <p>{{formCards.names}}</p>
                <p>{{formCards.description}}</p>
                <p>Дедлайн:{{formCards.deadline}}</p>
                <p>Дата создания:{{formCards.date}}</p>
                <button type="submit">
                Переместить
                </button>
                <card-redact :formCards="formCards" @Edit="edit = $event"></card-redact>
                </div>
                
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
            <form @submit.prevent="onForm"> 
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
                    date: new Date().toLocaleString(),
                    reason: null,
                    completed: null,
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
