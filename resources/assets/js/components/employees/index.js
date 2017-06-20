import Vue from 'vue'
import * as ajax from './../../ajax.js';
import ConfirmVue from './../../vuecomponents/ConfirmVue.vue';

let EmployeeIndex = Vue.component('employees-index', {

    template: '#employees-index',

    components: {
        ConfirmVue
    },

    data: function() {
        return {
            list: []
        }
    },

    created: function() {
        // this.refreshTable();
    },

    methods: {
        refreshTable() {
          $.get('/office/start_assistant/get_employees_list')
            .done(function(response) {
            
                this.list = response.data;
            
            }.bind(this));
        },
        deleteEmployee(link) {
            let text = '';
            let isConfirm;
            let locale = this.$root.locale;

            switch (locale) {
                case 'ru':
                    text = 'Вы действительно желаете удалить сотрудника? В связи с этим будут удалены все заказы. вы согласны с этим?';
                    break;
                case 'de':
                    text = 'Sind Sie sicher, dass Sie einen Mitarbeiter zu löschen? In diesem Zusammenhang werden alle Aufträge gelöscht. gehen Sie mit dem zustimmen?';
                    break;
                case 'en':
                    text = 'Are you sure you want to delete an employee? In this regard, all orders will be deleted. do you agree with that?';
                    break;
            }

            isConfirm = confirm(text);

            if (isConfirm) {

                $.get(link)
                    .done(() => {

                        window.location.reload();

                        // this.refreshTable();

                });

            }

        },
        addEmployee(event, can_add = 0) {
        
            if(can_add === 1) {
            
                window.location.href = $(event.target).attr("href");
            
            } else {
            
                window.location.href = '/office/tariff';
            
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

                    window.location.href = response.redirect;

                } else {

                    window.location.reload();

                }

            }.bind(this));

        }
    },

    events: {

    },

    watch: {

    }


});

export default EmployeeIndex;
