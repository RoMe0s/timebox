import Vue from 'vue'
import ConfirmVue from './ConfirmVue.vue'

let EmployeesListVue = Vue.component('employees-list-vue', {
  template: '#employees-list-template',

  components: {ConfirmVue},

  data() {
    return {
      showAlertSuccess: true,
      showConfirm: false,
      isConfirm: false
    }
  },

  ready() {
    setTimeout(() => {
      this.showAlertSuccess = false;
    }, 3000);
  },

  methods: {
    deleteEmployee(link) {
      let text = '';
      let isConfirm;
      let locale = this.$root.locale;

      switch (locale) {
        case 'ru':
          text = 'Вы действительно желаете удалить сотрудника? В связи с этим будут удалены все  заказы. вы согласны с этим?';
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
        location.href = link;
      }
    },
    addEmployee(yes = 0) {
      if (+yes) {
        location.href = '/office/employees/create';
      } else {
        this.showConfirm = true;
      }
    }
  },

  watch: {
    'isConfirm': function () {
      if (this.isConfirm) {
        location.href = '/office/tariff';
      }
    }
  }

});

export default EmployeesListVue;