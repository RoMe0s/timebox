import Vue from 'vue'
import * as ajax from '../ajax.js'
import ConfirmVue from './ConfirmVue.vue'
import Alert from './vue-strap/src/Alert.vue'
import EmployeesListVue from './EmployeesListVue.js'

let AssistantCreateEmployee = Vue.component('assistant-create-employee', {
    template: '#create-employee-template',

    components: {ConfirmVue, Alert, EmployeesListVue},

    data() {
        return {
            showConfirm: false,
            isConfirm: false,
            showCreateEmplAlert: false,
            state: false,
            categories: [],
            employee: null
        }
    },

    create() {
    },

    methods: {
        trySendForm() {
            let form = $('#userInfoForm');
            form.validate();
            let isValid = form.valid();
            if (isValid) {
                this.showConfirm = true;
            } else {
                this.showConfirm = false;
            }
        },
        submitCreateEmpl() {
            let $form = $("form#userInfoForm"),
                formData = new FormData($form[0]);
            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                data: formData,
                contentType: false,
                processData: false
            }).done((res) => {
                if(res.redirect === undefined ||
                    res.redirect === null ||
                    !res.redirect.length) {

                    if (res) {
                        this.isConfirm = false;
                        this.state = false;
                    } else {
                        this.isConfirm = false;
                        this.showCreateEmplAlert = true;
                    }

                    $("#assistantAvatarCreatePreview").attr("src", "");

                    $("#userInfoForm").find("[name]").each(function() {

                        if(!$(this)[0].hasAttribute('type') || $(this).attr('type') !== 'hidden') {

                            $(this).val('');

                        }

                    });

                    this.$broadcast('userChanged');


                } else {

                    window.open(res.redirect, '_blank');

                    this.state = false;

                }
            })
            .fail(()=> {
                this.isConfirm = false;
            });
        },
        changeState() {

            if(this.state === false) {

                this.state = true;

                let $table = $("#employee-table");

                $("html, body").animate({
                    scrollTop: $table.offset().top + $table.height()
                }, 400);

            } else {

                this.state = false;

            }



        },
        showCategory(id) {

            for(let iterator in this.categories) {

                if(this.categories[iterator].id !== id) {

                    this.categories[iterator].show = false;

                } else {

                    if(this.categories[iterator].show === false) {

                        this.categories[iterator].show = true;

                    } else {

                        this.categories[iterator].show = false;

                    }

                }

            }

        },
        changeStatus(event) {

            let $element = $(event.target);

            let status = 'admin';

            if($element.is(":checked")) {

                status = 'employee'

            }

            $.ajax({
                url: '/office/employees/change_status',
                type: 'POST',
                data: {
                    status: status,
                    _token: ajax.getToken()
                }
            }).done(function(response) {

                if(response.redirect !== undefined &&
                    response.redirect !== null &&
                    !response.redirect.length) {

                    window.open(response.redirect, '_blank');

                }

                this.$broadcast('userChanged');

            }.bind(this));

        }
    },

    watch: {
        'isConfirm': function () {
            if (this.isConfirm == true) {
                this.submitCreateEmpl();
            }
        }
    },

    events: {

        getServicesCategories() {

            $.get('/office/start_assistant/getServicesCategories').done(function(response) {

                this.categories = response.data;

            }.bind(this));

        }

    }
});

export default AssistantCreateEmployee;