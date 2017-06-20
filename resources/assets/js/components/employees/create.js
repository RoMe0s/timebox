/**
 * Created by rome0s on 6/19/17.
 */
import Vue from 'vue'
import EmployeeInfoNewVue from './info.js'
import ConfirmVue from './../../vuecomponents/ConfirmVue.vue'
import Alert from './../../vuecomponents/vue-strap/src/Alert.vue'

let EmployeeCreateNewVue = Vue.component('employee-create-new-vue', {

    template: "#employee-create-new-template",

    components: {
        EmployeeInfoNewVue,
        ConfirmVue,
        Alert
    },

    props: ['edit'],

    data() {
        return {
            showConfirm: false,
            isConfirm: false,
            showCreateEmplAlert: false,
            form: null
        }
    },

    ready() {

        if(this.edit !== undefined) {

            this.$broadcast('getUserinfo');

        }

    },

    methods: {

        trySendForm(e, isButton = false) {

            let form = !isButton ? $(e.target) : $(e.target).closest('form');
            form.validate({
                rules: {
                    name: {
                        required: true
                    },
                    firstname: {
                        required: true
                    },
                    last_name: {
                        required: true
                    },
                    lastname: {
                        required: true
                    },
                    telnumber: {
                        required: true,
                        maxlength: 15,
                        minlength: 5,
                        number: true
                    },
                    phone: {
                        required: true,
                        maxlength: 15,
                        minlength: 5,
                        number: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    gender: {
                        required: true
                    },
                    birthday: {
                        required: true
                    },
                    group: {
                        required: true
                    }
                }
            });
            let isValid = form.valid();
            if (isValid) {

                this.form = form;

                if(!this.edit) {

                    this.showConfirm = true;

                } else {

                    this.isConfirm = true;

                }

            } else {

                this.showConfirm = false;

            }

        },

        sendForm() {

            let $form = this.form,
                formData = new FormData($form[0]);

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                data: formData,
                contentType: false,
                processData: false
            }).done((res) => {

                if(res.status) {

                    this.isConfirm = false;
                    this.state = false;

                    if(res.redirect !== undefined &&
                    res.redirect !== null &&
                    res.redirect.length) {


                        window.location.href = res.redirect;


                    }

                } else {

                    this.isConfirm = false;
                    this.showCreateEmplAlert = true;

                }

            })
                .fail((err) => {
                    this.isConfirm = false;
                    throw new Error(err);
                });

        }

    },

    events: {},

    watch: {
        'isConfirm': function () {
            console.log(this.form);
            if (this.isConfirm == true && this.form != null) {
                this.sendForm();
            }
        }
    }

});

export default EmployeeCreateNewVue;