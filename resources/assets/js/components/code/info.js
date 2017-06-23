import Vue from 'vue'

let CodeInfoVue = Vue.component('code-info-vue', {

    template: '#code-info-template',

    components: {},

    props: {
        id: String,
        module: String
    },

    created() {

        this.getData();

    },

    ready() {
    
    },

    data() {
    
        return {
        
            info: {},
            categories: {},
            types: {},
            count: {},
            showing_count: {},

            code: "",
            category: "",
            type: "",
            selected_count: "",
            period: "",

            show_count: false,
            show_period: false,
            show_value: false,

            value_label: false,
            default_value_label: "value",

            translations: {
                value: "",
            },

            settings: {
                sms: {
                    present: {
                        count: false,
                        period: false,
                        value: true
                    },
                    discount: {
                        count: {
                            percent: false,
                            currency: false
                        },
                        period: true,
                        value: true
                    }
                },
                tariff: {
                    present: {
                        count: false,
                        period: true,
                        value: false
                    },
                    discount: {
                        count: {
                            percent: false,
                            currency: false
                        },
                        period: true,
                        value: true
                    }
                },
                employee: {
                    present: {
                        count: {
                            considered: "considered"
                        },
                        period: true,
                        value: true
                    },
                    discount: {
                        count: {
                            percent: false,
                            currency: false
                        },
                        period: true,
                        value: true
                    }
                }
            },

            // options
            show_individual_calendar: false

        };

    },

    methods: {

        generateCode(event, length = 10) {

            let result = '',
                chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for(let i = length; i > 0; --i)  {

                result += chars[Math.floor(Math.random() * chars.length)];

            }

            this.code = result;

        },

        getData() {

            this.$http.get(`/backend/${this.module}/getData`, {id: this.id})
                .then((response) => {

                    this.categories = response.data.categories;

                    this.types = response.data.types;

                    this.count = response.data.count;

                    this.info = response.data.info;

                    this.translations = response.data.translations;

                    this.code = this.info.code;

                    this.category = this.info.category;

                    this.type = this.info.type;

                    this.period = this.info.period;

                    this.selected_count = this.info.count;

                    if(this.code.length) {

                        this.sortCount();

                    }

                    this.getValueLabel();

                })
                .catch(() => {

                    console.log('error');

                });

        },

        sortCount() {

            this.showing_count = {};

            this.show_count = false;

            let counter = false,
                keys = false;

            try {

                keys = Object.keys(this.settings[this.info.category][this.info.type]['count']);

            } catch (err) {

                keys = [];

            }

            for(let index in this.count) {

                if(keys.indexOf(index) >= 0) {

                    this.showing_count[index] = this.count[index];

                    counter = true;

                }

            }

            if(counter) {

                this.show_count = true;

            } else {

                this.selected_count = null;

            }

            this.getValueLabel();

            this.showPeriod();

            this.showValue();

        },

        showPeriod() {

            let show_period;

            try {

                show_period = this.settings[this.info.category][this.info.type]['period'];

            } catch (err) {

                show_period = false;

            }

            this.show_period = show_period;

        },

        showValue() {

            let show_value;

            try {

                show_value = this.settings[this.info.category][this.info.type]['value'];

            } catch (err) {

                show_value = false;

            }

            this.show_value = show_value;

        },

        getValueLabel() {

            let label;

            try {

                label = this.settings[this.info.category][this.info.type]['count'][this.info.count];
                
                label = this.translations[label];

            } catch(err) {

                label = this.default_value_label;

            }

            if(label === undefined || typeof label !== 'string') {

                label = this.translations[this.default_value_label];

            }

            this.value_label = label;

        }
    
    },

    events: {
    
    
    },

    watch: {

        "code": function(value) {

            this.info.code = value;

        },

        "category": function(value) {

            this.info.category = value;

            this.sortCount();

        },

        "type": function(value) {

            this.info.type = value;

            this.sortCount();

        },

        "selected_count": function(value) {

            this.info.count = value;

            this.getValueLabel();

        },

        "period": function(value) {

            this.info.period = value;

            if(value == 0) {

                this.show_individual_calendar = true;

            } else {

                this.show_individual_calendar = false;

            }

        }

    },

    computed: {

    }

});

export default CodeInfoVue;
