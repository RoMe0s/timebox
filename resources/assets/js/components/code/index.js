import Vue from 'vue'

let CodeIndexVue = Vue.component('code-index-vue', {

    template: '#code-index-template',

    components: {},

    props: {
        module: String
    },

    data() {
    
        return {
        
            loaded: false,
            list: []
        
        }
    
    },

    created() {

        this.init();
    
    },

    ready() {
    
    },

    methods: {
    
        init() {
        
            this.$http.get(`/backend/${this.module}/getList`)
                .then((response) => {
                
                    this.list = response.data;
                
                })
                .catch(() => {

                    console.log('error');

                });
        
        },

        deleteRow(id, event) {

            this.$http.delete(`/backend/${this.module}/${id}`)
                .then((response) => {

                    $(event.target).closest('tr').remove();

                })
                .catch(() => {
                    console.log('error');
                });

        }
    
    },

    events: {
    
    
    },

    watch: {
    
    }

});

export default CodeIndexVue;
