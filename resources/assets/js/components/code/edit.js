import Vue from 'vue'
import CodeInfoVue from './info.js'

let CodeEditVue = Vue.component('code-edit-vue', {

    template: '#code-edit-template',

    components: {
        CodeInfoVue
    },

    props: {
        id: String,
        module: String
    },

    created() {

    },

    ready() {

    },

    data() {

        return {}

    },

    methods: {

        trySendForm(event, is_button = false) {

            let $form = is_button ? $(event.target).closest('form') : $(event.target);

            $form.validate({
                rules: {
                    code: {
                        required: true
                    },
                    category: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                    count: {
                        required: true
                    },
                    value: {
                        required: true
                    },
                    expired_at: {
                        required: true
                    },
                    from: {
                        required: true
                    },
                    to: {
                        required: true
                    }
                }
            });

            if ($form.valid()) {

                this.submitForm($form);

            }

        },

        submitForm($form) {

            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                data: $form.serialize()
            })
                .done((response) => {

                    if(response.status) {

                        window.location.href= response.redirect;

                    }

                })
                .error(() => {
                    console.log('error');
                });

        }

    },

    events: {},

    watch: {}

});

export default CodeEditVue;
