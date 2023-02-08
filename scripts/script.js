

Vue.component('KanbanBoard',{
    template:
    `
    <div class="all">
        <div class="all-notes">
            <div class="row" >
                <div class="note1">

                </div>
                <div class="note2">

                </div>
                <div class="note3">

                </div>
                <div class="note4">

                </div>
            </div>
        </div>
    </div>
`,
})

Vue.component('cards',{

    template:
        `
        <div class="card">
            <div class="conc" >
                    <p></p>
                    <ul>
                        {{formCards.date}}
                        <input v-model="names" id="name" type="text" placeholder="name" class="input-name"><br>
                        <textarea v-model="description" id="description" type="text" placeholder="description" class="input-description"></textarea>
                        <input v-model="deadline" id="deadline" type="text" placeholder="deadline" class="input-deadline">
                    </ul>
                    
            </div>
        </div>  
    `,
    data(){
        return{
            names: null,
            errors: [],
        }
    },
    methods:{
        onForm(){
            
        },

    }
})

Vue.component('form-cards', {


    template:
    `
        </div>
        <div class="all-form-cards">
        <div class="center">
        <form > 
                <label for="name">Имя заметки</label>
                <input v-model="names" id="name" type="text" placeholder="name" class="input-name"><br>
                <button type="submit" class="button-submit" :disabled="!check">Add notes</button>
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
})

let app = new Vue({
    el: '#app',
})
