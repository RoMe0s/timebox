<template>
    <div class="calendar_view">

        <!-- quest popup -->
        <div class="confirm_window" v-if="showConfirmPopup">
            <div class="overlay"></div>
            <div class="confirm_question">
                <div class="img_att">
                    <span class="circle_attention"></span>
                </div>
                <p>{{translatedText.dragg_quest}}</p>
                <div class="buttons">
                    <button @click="confirmPopup(false,null,null,true)" class="success">{{translatedText.yes_answer}}</button>
                    <button @click="confirmPopup(false,null,null,false,true)">{{translatedText.no_answer}}</button>
                </div>
            </div>
        </div>

        <!-- success popup -->
        <div class="confirm_window" v-if="showSuccessPopup">
            <div class="overlay" @click="showSuccessPopup = false"></div>
            <div class="confirm_question">
                <div class="img_att">
                    <span class="circle_success"></span>
                </div>
                <p>{{translatedText.dragg_success}}</p>
                <div class="buttons">
                    <button @click="showSuccessPopup = false" class="success">Ok</button>
                </div>
            </div>
        </div>

        <!-- error popup -->
        <div class="confirm_window" v-if="showErrorPopup">
            <div class="overlay" @click="closePopupErr()"></div>
            <div class="confirm_question">
                <div class="img_att">
                    <span class="circle_error"></span>
                </div>
                <p v-if="!validate.orderEmploye">{{translatedText.order_employee}}</p>
                <p v-if="!validate.orderOffice">{{translatedText.order_office}}</p>
                <div class="buttons">
                    <button @click="closePopupErr()" class="error">Ok</button>
                </div>
            </div>
        </div>

        <!-- add in calendar -->
        <div class="calendar_add" v-show="showCalendarForm">
            <div class="overlay" @click="clearFormFunc"></div>
            <div class="calendar_add_form">
                <div class="head">
                    <h1>{{translatedText.create_order}}</h1>
                    <button class="remodal-close" @click="clearFormFunc"><i></i></button>
                </div>
                <div class="main">
                    <div class="left">
                    <label for="clientList">
                        <input id="clientList" type="text" :placeholder="translatedText.check_client" class="client_check" v-model="getClientStr" @click="hideClientList = false;" @keyup="setHigLight(getClientStr,$event,'select_client')">
                        <span @click="clearClientInfo()" :class="{'close' : getClientStr.length}"></span>
                    </label>
                        <div class="select_client" v-if="!hideClientList">
                            <div class="single_client" v-for="client in clients | orderBy 'last_name' | filterBy getClientStr" @click="checkClient(client)">
                                <div class="avatar">
                                    <img src="/images/default_avatar.png" alt="" v-if="client.avatar_client == null">
                                    <img :src="client.avatar_client.path" alt="" v-if="client.avatar_client != null">
                                </div>
                                <div class="description">
                                    <p class="name">{{client.first_name + ' ' + client.last_name}}</p>
                                    <p class="small_info">
                                        <span v-if="client.mobile">{{client.mobile}}</span><span v-if="client.telephone"> | {{client.telephone}}</span><span v-if="client.email"> | {{client.email}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="add_client">
                                <button @click="newClientClick">{{translatedText.add_new_client}}</button>
                            </div>
                        </div>
                        <div class="client_info_block">
                            <input type="text" :placeholder="translatedText.first_name" :disabled="!newUser && !emailClient.length && !editForm" :class="{'error' : !validate.first_name}" v-model="firstName">
                            <input type="text" :placeholder="translatedText.last_name" :disabled="!newUser && !emailClient.length && !editForm" :class="{'error' : !validate.last_name}" v-model="lastName">
                            <input type="text" :placeholder="translatedText.phone" :disabled="!newUser && !emailClient.length && !editForm" v-model="phoneClient">
                            <input type="text" :placeholder="translatedText.mobile_phone" :disabled="!newUser && !emailClient.length && !editForm" v-model="mobileClient">
                            <input type="email" :placeholder="translatedText.email" class="email" :disabled="!newUser && !emailClient.length && !editForm" v-model="emailClient" @change="checkEmail(emailClient)" :class="{'error' : !validate.email}">
                            <textarea name="" id="" cols="30" rows="10" :placeholder="translatedText.comment" v-model="commentOrder"></textarea>
                        </div>
                    </div>
                    <div class="right">
                        <div class="check_service_all"> 
                            <label for="checkServiceInp">
                                    <input type="text" id="checkServiceInp" @click="tarifClick('s')" :placeholder="translatedText.check_category" v-model="checkTariff"  @keyup="setHigLight(checkTariff,$event,'service_hide_block')">
                                    <span  @click="tarifClick('s')" v-if="!checkTariff.length"></span>
                                    <span  @click="tarifClick('s','close')" v-if="checkTariff.length" :class="{'close' : checkTariff.length}"></span>
                            </label>
                            <div class="service_hide_block" v-if="!hideServiceBlock">
                                <div class="single_service" v-for="(value,key) in services | filterBy checkTariff" @click="getUserCheckService(key,value)">
                                    <p>{{value}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="check_service_all"> 
                            <label for="checkTarifInp">
                                    <input type="text" :class="{'error' : !validate.orderService}" id="checkTarifInp" :disabled="checkServices === null" v-model="checkService" :placeholder="translatedText.check_service" @click="tarifClick('t')"  @keyup="setHigLight(checkService,$event,'service_hide_block')">
                                    <span @click="tarifClick('t')" v-if="!checkService.length"></span>
                                    <span  @click="tarifClick('t','close')" v-if="checkService.length" :class="{'close' : checkService.length}"></span>
                            </label>
                            <div class="service_hide_block bottom" v-if="!hideTarifBlock && checkServices !== null">
                                <div class="single_tarif" v-for="checkServiced in checkServices | filterBy checkService" @click="checkEndDate(checkServiced)">
                                    <p>
                                        <span>{{checkServiced.service_name}}</span>
                                        <span>{{checkServiced.duration}} min</span>
                                        <span>{{checkServiced.price}} €</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <span class="line"></span>
                        <div class="empl_with_color">   
                            <div class="employer">
                                <label for="checkEmpl">
                                    <input type="text" id="checkEmpl" :class="{'error' : !validate.orderEmploye}" v-model="employId" :placeholder="translatedText.check_employee" @click="hideEmployeList = false;" @keyup="setHigLight(employId,$event,'select_employe')">
                                    <span @click="hideEmployeList = false;" v-if="!employId.length"></span>
                                    <span  @click="employId = ''" v-if="employId.length" :class="{'close' : employId.length}"></span>
                                </label>
                                <div class="select_employe" v-if="!hideEmployeList">
                                    <div class="single_client" v-for="employ in employees | filterBy employId in 'name'" @click="checkEmplFunc(employ)">
                                        <div class="avatar">
                                                <img src="/images/default_avatar.png" alt="" v-if="!employ.path">
                                                <img :src="employ.path" :alt="employ.name" v-if="employ.path">
                                        </div>
                                        <div class="description">
                                            <p class="name">{{employ.name + ' ' + employ.last_name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="collor_check">
                            <div class="right">
                               
                                <!-- <div id="colorPicker">
                                    <div :style="{'backgroundColor': getBackgroundColor2}"></div>
                                </div> -->
                                <div class="check_color" @click="hideColorPicker = false" :style="{'backgroundColor': getBackgroundColor2}"></div>
                                <div class="all_color" :class="{'active' : !hideColorPicker}">
                                    <span class="c4f71b0" @click="setColor('#4f71b0')"></span>
                                    <span class="f5d16e" @click="setColor('#f5d16e')"></span>
                                    <span class="c1bbcb6" @click="setColor('#1bbcb6')"></span>
                                    <span class="f66a55" @click="setColor('#f66a55')"></span>
                                    <span class="c995253" @click="setColor('#995253')"></span>
                                    <span class="ab86b7" @click="setColor('#ab86b7')"></span>
                                    <span class="c1aa890" @click="setColor('#1aa890')"></span>
                                    <span class="b91d43" @click="setColor('#b91d43')"></span>
                                    <span class="c99c0dd" @click="setColor('#99c0dd')"></span>
                                    <span class="d83d84" @click="setColor('#d83d84')"></span>
                                </div>
                            </div>
                        </div>
                        </div>
                        <span class="line"> </span>
                        <div class="date_check">
                            <date-picker :time.sync="startDate"></date-picker>
                            <label for="">
                                <input type="text" :class="{'error' : !validate.time}" class="itimepicker1" :class="{'error' : !validate.orderEmploye}" :value="startTime" v-model="startTime" @change="checkEndDate()">
                            </label>
                            <label for="">
                                <input type="text" class="itimepicker2" :value="endTime" v-model="endTime" disabled>
                            </label>
                            <p class="order_empl" v-if="!validate.orderEmploye && validate.orderOffice">{{translatedText.order_employee}}</p>
                            <p class="order_empl" v-if="!validate.orderOffice">{{translatedText.order_office}}</p>
                        </div>
                        <span class="line"></span>
                        <div class="checkboxes">
                            <label for="smsTrue"><input id="smsTrue" type="checkbox" v-model="smsSend">{{translatedText.sms_check}}</label>
                            <label for="emailTrue"><input id="emailTrue" type="checkbox" v-model="emailSend">{{translatedText.email_check}}</label>
                            <label for="notifyEmpl"><input type="checkbox" id="notifyEmpl" v-model="isEmplMail">{{translatedText.notif_employee}}</label>
                            <label for="notifyClient"><input type="checkbox" id="notifyClient" v-model="sendClientMail">{{translatedText.notif_client}}</label>
                            
                        </div>
                    </div>
                    
                </div>
                <div class="footer">
                    <div class="start_btn">
                        <button class="clear_all" @click="clearFormFunc('clear')">{{translatedText.clear_form}}</button>
                        <label for="deleteOrder" v-if="editForm"><input type="checkbox" id="deleteOrder" v-model="deleteOrder"> {{translatedText.delete_order}}</label>
                    </div>
                    <div class="right_btn">
                        <button class="cancel_btn" @click.prevent="clearFormFunc">{{translatedText.cancel_btn}}</button>
                        <button class="add_btn" :disabled="blockSendBtn" @click="sendForm">{{deleteOrder ? translatedText.delete_order : editForm ? translatedText.edit_btn : translatedText.add_btn}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="kalendar-carousel kalendar__carousel">
    
        <div v-for="employee in employeeslist" class="kalendar-carousel__block" :class="{'is-active' : employee.id === employeeActive}" data-employee-id="employee.id">
            <a href="javascript:void(0);" @click="getEvents(employee)">
                <div class="kalendar-carousel__name">{{employee.name}}</div>
                <img class="kalendar-carousel__img" :src="employee.path ? employee.path : '/images/default_avatar.png'" alt="">
            </a>
        </div>
    </div>
        <!-- <a
            @click.stop="openClearPopup"
            class="btn btn--green" id="kalendarTermin" href="javascript:void(0);">{{translatedText.add_order}}</a> -->
        <div id="calendar">
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import * as ajax from '../ajax.js';
    import myDatepicker from './vue-datepicker.vue';
    import * as lib  from '../lib.js'
    export default{
        components: {
            'date-picker': myDatepicker,
        },
        data(){
            return{
                employeeActive: this.employeeslist[0].id,
                services: null,
                eventsAll: null,
                eventUsers: [],
                showCalendarForm: false,
                clients: null,
                showAllColor: null,
                getBackgroundColor1: '#fff',
                getBackgroundColor2: '#4f71b0',
                startDate: '',
                getClientStr: '',
                hideClientList: false,
                newUser: false,
                firstName: '',
                lastName: '',
                emailClient: '',
                phoneClient: '',
                mobileClient: '',
                startTime: '',
                endTime: '',
                checkEmployee: this.employeeslist[0].id, 
                checkTarif: null,
                checkServices: null,
                emailSend: false,
                smsSend: false,
                commentOrder: '',
                checkService: '',
                checkTariff: '',
                hideTarifBlock: true,
                hideServiceBlock: true,
                validate: {
                    email: true,
                    orderEmploye: true,
                    emailClient: true,
                    orderService: true,
                    date: true,
                    time: true,
                    first_name: true,
                    last_name: true,
                    orderOffice: true
                },
                serviceCheck: null,
                eventId: 0,
                editForm: false,
                cartId: 0,
                userServiceGet: null,
                setNewUser: false,
                editView: '',
                clearForm: false,
                employees: null,
                hideEmployeList: true,
                employId: this.employeeslist[0].name + ' ' + this.employeeslist[0].last_name,
                translatedText: {
                    clear_form: 'Clea',
                    cancel_btn: 'Kantsel',
                    add_btn: 'Hinzufügen',
                    edit_btn: 'Bearbeiten',
                    add_new_client: 'Neuen Client hinzufügen',
                    check_client: 'Client überprüfen',
                    first_name: 'Vorname',
                    last_name: 'Nachname',
                    phone: 'Telefon',
                    mobile_phone: 'Mobiltelefon',
                    email: 'Email',
                    comment: 'Kommentar',
                    check_category: 'Überprüfen Kategorie',
                    check_service: 'Überprüfen Service',
                    check_employee: 'Überprüfen employe',
                    date: 'Datum',
                    sms_check: 'SMS',
                    email_check: 'Email',
                    notif_employee: 'Mitarbeiter benachrichtigen',
                    notif_client: 'Client benachrichtigen',
                    create_order: 'Auftrag anlegen',
                    dragg_quest: 'Sind Sie sicher, dass Sie eine Bestellung verschieben möchten?',
                    order_employee: 'Mitarbeiter beschäftigt zu diesem Zeitpunkt',
                    delete_order: 'Löschen bestellen',
                    add_order: 'Neue Termin',
                    dragg_success: 'Herzliche Glückwünsche . Anwendung ändern',
                    order_office: 'Salon funktioniert zu diesem Zeitpunkt nicht',
                    yes_answer: 'Ja',
                    no_answer: 'Nein',
                    timeOnlyTitle: 'Wählen Sie Zeit',
                    timeText: 'Zeit',
                    hourText: 'Uhr',
                    minuteText: 'Minuten',
                    secondText: 'Sekunden',
                    currentText: 'im Moment',
                    closeText: 'schließen',
                    dayMo: 'Mo',
                    dayTu: 'Di',
                    dayWe: 'Mi',
                    dayTh: 'Do',
                    dayFr: 'Fr',
                    daySa: 'Sa',
                    daySu: 'So',
                    monthJa: 'Januar',
                    monthFe: 'Februar',
                    monthMa: 'März',
                    monthAp: 'April',
                    monthMay: 'Mai',
                    monthJu: 'Juni',
                    monthJul: 'Juli',
                    monthAu: 'August',
                    monthSep: 'September',
                    monthOct: 'Oktober',
                    monthNow: 'November',
                    monthDec: 'Dezember',
                    whenTr: 'wann'
                },
                deleteOrder: false,
                showConfirmPopup: false,
                draggEvent: null,
                draggView: null,
                showSuccessPopup: false,
                showErrorPopup: false,
                sendClientMail: true,
                emailEmpl: this.employeeslist[0].email,
                isEmplMail: false,
                viewState: '',
                hideColorPicker: true,
                options: null,
                blockSendBtn: false,
            }
        },
        watch: {
            startTime: function(){
                setTimeout(() => {
                    this.checkEndDate();
                },1000);
                    
            },
            startDate: function(){
                this.checkEndDate();
            },
            checkService: function(){
                setTimeout(() => {
                    this.checkEndDate();
                },2000);  
            }
        },
        created(){
            this.getTrans();
        },
        ready(){
            this.options = {
                'week': [this.translatedText.dayMo, this.translatedText.dayTu, this.translatedText.dayWe, this.translatedText.dayTh, this.translatedText.dayFr, this.translatedText.daySa, this.translatedText.daySu],
                'month': [this.translatedText.monthJa,this.translatedText.monthFe ,this.translatedText.monthMa ,this.translatedText.monthAp ,this.translatedText.monthMay ,this.translatedText.monthJu,this.translatedText.monthJul ,this.translatedText.monthAu,this.translatedText.monthSep ,this.translatedText.monthOct ,this.translatedText.monthNow ,this.translatedText.monthDec],
                'placeholder': this.translatedText.whenTr
            };
            this.getEvents(this.employeeslist[0]);
            this.showServices(this.employeeslist[0].id);
            this.getClients();
            // this.getTimePicker();
            this.getUserClick();
            this.fullCalendarInit();
            this.colorPickerStart();
        },

        props: ['work-days','employeeslist'],

        methods: {
            fullCalendarInit(view = 'agendaWeek'){
                var vm = this;
                $('#calendar').fullCalendar({
                    customButtons: {
                        addOrder: {
                            text: '+ ' + vm.translatedText.add_order,
                            click: function() {
                                vm.openClearPopup();
                            }
                        }
                    },
                    header: {
                        left: 'addOrder today prev,next',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    timeFormat: '(HH:mm)',
                    slotLabelFormat: '(HH:mm)',
                    locale: this.$root.locale,
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    navLinks: true,
                    minTime: '08:00:00',
                    maxTime: '22:00:00',
                    slotDuration: '00:15:00',
                    defaultView: view,
                    allDaySlot: false,
                    height: 'auto',
                    // defaultView: 'agendaWeek',
                    events: this.eventUsers,
                    dayClick: function(date, allDay, jsEvent) {
                        vm.viewState = $('#calendar').fullCalendar('getView');
                        vm.showCalendarFormFunc(date, vm.viewState.type);
                    },
                    eventDrop: function(event, delta){
                        vm.viewState = $('#calendar').fullCalendar('getView');
                        vm.confirmPopup(vm.translatedText.dragg_quest,vm.viewState,event);
                    },
                    eventClick: function(event){
                        vm.viewState = $('#calendar').fullCalendar('getView');
                        vm.editFormFunc(event, vm.viewState.type);
                    }
                });
                
            },
            fullCalendarDestroy(view){
                $('#calendar').fullCalendar( 'destroy');
                if(view){
                    this.fullCalendarInit(view);
                }else{
                    this.fullCalendarInit();
                }
            },
            setColor(color){
                this.getBackgroundColor2 = color;
                this.hideColorPicker = true;
            },
            showServices(id) {
                this.checkTariff = '';
                this.checkService = '';
                this.checkServices = null;
                if(id){
                    var data = {
                        employee_id: id
                    };
                }else{
                    data = {

                    }
                }

              ajax.getServices(data)
                .done((services) => {
                  this.services = services;
                });
            },
            checkEmplFunc(empl){
                this.checkEmployee = empl.id;
                this.hideEmployeList = true;
                this.employId = empl.name + ' ' + empl.last_name;
                this.emailEmpl = empl.email;
                if(!this.clearForm){
                    this.showServices(empl.id);
                }
            },
            getEmployes(id){
                if(id){
                    var data = {
                        service_id: id
                    };
                }else{
                    data = {};
                }
                this.$http.post('/office/get_employees', data).then((response) => {
                    this.employees = null;
                    this.employees = response.data;
                },(response)=>{
                    // err
                });
            },
            getEvents(empl,view = false, email = false){
                console.log(email);
                if(typeof empl !== 'object') empl = {id: empl, email: email};
                this.emailEmpl = empl.email ? empl.email : this.emailEmpl;
                this.showServices(empl.id);
                let host = window.location.host;
                let subDomain = host.slice(0, host.indexOf('.'));
                let data = {
                    data: subDomain,
                    from: '01/01/2010',
                    to: '31/12/2050',
                    id: empl.id
                };
                this.$http.post('/office/get_calendar', data).then((response) => {
                    this.eventsAll = response.data;
                    this.eventUsers = [];
                    this.eventsAll.forEach(event => {
                        let dateEvent = event.date.split('/').reverse().join("-");
                        console.log(dateEvent);
                        this.eventUsers.push({
                            id: event.id,
                            title: event.first_name +' '+ event.last_name +'\n'+ event.service_name + '\n' + event.description,
                            start: dateEvent + 'T' + event.time_from,
                            end: dateEvent + 'T' + event.time_to,
                            backgroundColor: event.color
                        })
                    });
                    this.showServices(empl.id);
                    this.employeeActive = empl.id;
                    this.fullCalendarDestroy(this.viewState.type);
                    this.checkEmployee = empl.id;
                }, (response) => {
                    // err
                });
            },
            getClients(){
                this.$http.post('/office/kalendar/get_clients').then((response) => {
                    this.clients = response.data;
                }, (response) => {
                    // err
                });
            },
            showCalendarFormFunc(date){
                this.showServices(this.checkEmployee);
                this.getEmployes(false);
                this.startDate = date.format().split('T') ? date.format().split('T')[0] : date.format();
                let momentLocale = moment(date);
                momentLocale.locale('ru');
                this.startTime = momentLocale.format('LT') === '00:00' ? '08:00' : momentLocale.format('LT');
                this.employeeslist.forEach(employ => {
                    if(employ.id == this.checkEmployee){
                        this.employId = employ.name + ' ' + employ.last_name;
                        this.emailEmpl = employ.email;
                    }
                });
                this.showCalendarForm = true;
            },
            getTimePicker(startTime = false,){
                console.log($('input.timepicker1'));
                var vm = this;
                $('input.itimepicker1,input.itimepicker2').timepicker({
                    timeOnlyTitle: vm.translatedText.timeOnlyTitle,
                    timeText: vm.translatedText.timeText,
                    hourText: vm.translatedText.hourText,
                    minuteText: vm.translatedText.minuteText,
                    secondText: vm.translatedText.secondText,
                    currentText: vm.translatedText.currentText,
                    closeText: vm.translatedText.closeText,
                    hour: 8,
                    minute: 0,
                    hourMin: 8,
                    hourMax: 21,
                    stepMinute: 15,
                });
            },
            getUserClick(){
                var vm = this;
                $(document).click(function(e){
                  if ($(e.target).closest(".select_client,.client_check,#checkServiceInp,#checkTarifInp,.single_service,#checkEmpl,.select_employe,.check_color,.all_color").length) return;
                  vm.hideClientList = true;
                  vm.hideServiceBlock = true;
                  vm.hideTarifBlock = true;
                  vm.hideEmployeList = true;
                  vm.hideColorPicker = true;
                  e.stopPropagation();
                });
            },
            setHigLight(word,e,classElem){
                console.log(e);
                if(e.key !== 'Backspace' && e.key !== 'Control' && e.key !== 'F5' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Delete' && e.key !== 'Esc' && e.key !== 'F1' && e.key !== 'CapsLock' && e.key !== 'Meta' && e.key !== 'Enter' && word !== '') {
                        $('.' + classElem).off().removeHighlight();
                        $('.' + classElem).off().highlight(word);
                    }
            },
            getUserCheckService(key,value){
                this.checkServices = key;
                this.checkTariff = value;
                this.hideServiceBlock = true;
            },
            newClientClick(){
                this.newUser = true;
                this.hideClientList = true;
            },
            checkClient(client){
                this.getClientStr = client.first_name + ' ' + client.last_name; 
                this.hideClientList = true;
                this.firstName = client.first_name;
                this.lastName = client.last_name;
                this.emailClient = client.email;
                this.mobileClient = client.mobile;
                this.phoneClient = client.telephone === '' ? client.mobile : client.telephone;
            },
            sendForm(view = false){
                if(!this.validateData()) return;
                var data = {
                    vorname: this.firstName,
                    nachname: this.lastName,
                    phone: this.phoneClient,
                    mobil: this.mobileClient,
                    email: this.emailClient,
                    color: this.getBackgroundColor2,
                    description: this.commentOrder,
                    time_from: this.startTime,
                    time_to: this.endTime,
                    date: this.startDate.split('-').reverse().join("/"),
                    employee: this.checkEmployee,
                    send_sms: this.smsSend ? 1 : 0,
                    send_email: this.emailSend ? 1 : 0,
                    notify_empl: this.notifyEmpl ? 1 : 0,
                    notify_client: this.notifyClient ? 1 : 0,
                    action: this.deleteOrder ? 'delete' : this.editForm ? 'edit' : 'create',
                    isClientMail: this.sendClientMail ? 1 : 0,
                    emailEmpl: this.emailEmpl,
                    isEmplMail: this.isEmplMail ? 1 : 0
                };
                if(this.editForm){
                    data.cartId = this.cartId;
                    data.service = this.userServiceGet !== null ? this.userServiceGet.service_id : false;
                }else if(this.clearForm){
                    data.service = this.userServiceGet !== null ? this.userServiceGet.id : false;
                }else{
                    data.service = this.userServiceGet !== null ? this.userServiceGet.service_id : false;
                }
                if(this.setNewUser){
                    data.new = this.setNewUser;
                }
                this.$http.post('/office/add_calendar', data).then((response) => {
                    this.clearFormFunc();
                    this.getEvents(this.checkEmployee, this.viewState.type, this.emailEmpl);
                }, (response) => {
                    this.clearFormFunc();
                    this.getEvents(this.checkEmployee, this.viewState.type);
                });
            },
            checkEndDate(service = null,startTime = false){
                this.userServiceGet = service !== null ? service : this.userServiceGet;
                if(this.clearForm){
                    this.getEmployes(this.userServiceGet.id);
                }
                if(this.editForm){
                    this.getEmployes(this.userServiceGet.service_id);
                }
                this.checkService = service !== null ? service.service_name + ' - ' + service.price + ' €; ' + service.duration + 'min' : this.userServiceGet !== null ? this.userServiceGet.service_name + ' - ' + this.userServiceGet.price + ' €; ' + this.userServiceGet.duration + 'min' : '';
                this.hideTarifBlock = true;
                let data = {
                    duration: this.userServiceGet !== null ? this.userServiceGet.duration : 0,
                    start_time: this.startTime,
                    date: this.startDate.split('-').reverse().join("/"),
                    id: this.checkEmployee,
                    cartId: this.eventId
                }
                this.blockSendBtn = true;
                this.$http.post('/office/check_employee', data).then((response) => {
                    if(response.data.check){
                        this.endTime = response.data.end_time;
                        this.validate.orderEmploye = true;
                        this.validate.orderOffice = true;
                        this.blockSendBtn = false;
                    }else{
                        if(response.data.reason == 'worktime'){
                            this.validate.orderOffice = false;
                        }else{
                            this.validate.orderEmploye = false;
                        }

                    }
                },(response) =>{
                    // err
                });
            },
            tarifClick(str,close = false){
                if(str === 't'){
                    if(close){
                        this.checkService = '';
                        this.userServiceGet = null;
                        this.hideTarifBlock = true;
                        this.hideServiceBlock = true;
                        return;
                    }
                    this.hideTarifBlock = false;
                    this.hideServiceBlock = true;
                }else{
                    if(close){
                        this.checkTariff = '';
                        this.checkService = '';
                        this.checkServices = null;
                        this.hideTarifBlock = true;
                        this.hideServiceBlock = true;
                        this.userServiceGet = null;
                        return;
                    }
                    this.hideTarifBlock = true;
                    this.hideServiceBlock = false;
                }
            },
            checkEmail(email){
                let data = {
                    email: email
                }
                let isValid = lib.validateEmail(email);
                if(!isValid){
                    this.validate.email = false;
                    return;
                }
                this.$http.post('/office/check_email', data).then((response) => {
                    this.validate.email = true;
                    if(response.data[0] == 0){
                        this.setNewUser = true;
                    }else if(response.data[0] === 1){
                        this.validate.email = false;
                    }
                },(response) => {
                    // err
                });
            },
            editEvent(event = false, view = false){
                let data;
                if(event){
                    var stopDropable = false;
                    var timeTo;
                    let date = event.start.format().split('T');
                    let momentLocale = moment(event.start, "HH:mm");
                    momentLocale.locale('ru');
                    var dateStarte = momentLocale.format('LT');
                    var oneEvent;
                    this.eventsAll.forEach(eventA =>{
                                if(event.id === eventA.id){
                                    oneEvent = eventA;
                                }       
                            });
                    let dataCheck = {
                        duration: oneEvent.duration,
                        start_time: dateStarte,
                        date: date[0].split('-').reverse().join("/"),
                        id: this.checkEmployee,
                        cartId: oneEvent.id
                    }
                    this.$http.post('/office/check_employee', dataCheck).then((response) => {
                        if(response.data.check){
                            this.validate.orderOffice = true;
                            this.validate.orderEmploye = true;
                            var data = {
                                cartId: event.id,
                                date: date[0].split('-').reverse().join("/"),
                                time_from: dateStarte ? dateStarte : oneEvent.time_from,
                                time_to: response.data.end_time,
                                action: 'edit',
                                vorname: oneEvent.first_name,
                                nachname: oneEvent.last_name,
                                phone: oneEvent.telephone,
                                email: oneEvent.email,
                                color: oneEvent.color,
                                description: oneEvent.description,
                                employee: this.checkEmployee,
                                service: oneEvent.service_id,
                                send_email: oneEvent.send_email ? 1 : 0,
                                send_sms: oneEvent.send_sms ? 1 : 0,
                                isClientMail: 1,
                                emailEmpl: this.emailEmpl,
                                isEmplMail: 1
                            }
                            this.$http.post('/office/add_calendar', data).then((response) => {
                                this.showCalendarForm = false;
                                this.showSuccessPopup = true;
                                this.getEvents(this.checkEmployee, this.viewState.type);

                            }, (response) => {
                                this.showCalendarForm = false;
                                this.getEvents(this.checkEmployee, this.viewState.type);
                            });
                        }else{
                            if(response.data.reason == 'worktime'){
                                this.validate.orderOffice = false;
                            }else{
                                this.validate.orderEmploye = false;
                            }
                            this.showErrorPopup = true;
                            this.getEvents(this.checkEmployee, this.viewState.type);
                        }
                    },(response) =>{
                        // err
                    });
                    
                }
            },
            editFormFunc(event, view){
                let editEvent;
                this.showCalendarForm = true;
                this.eventsAll.forEach(eventA =>{
                    if(eventA.id === event.id){
                        editEvent = eventA;
                    }
                });
                this.startDate = editEvent.date;
                this.getClientStr = editEvent.first_name + ' ' + editEvent.last_name;
                this.hideClientList = false;
                this.newUser = false;
                this.firstName = editEvent.first_name;
                this.lastName = editEvent.last_name;
                this.emailClient = editEvent.email;
                this.phoneClient = editEvent.telephone;
                this.mobileClient = editEvent.mobile;
                this.checkTariff = editEvent.category_name;
                this.checkService = editEvent.service_name + ' - ' + editEvent.price + ' €;' + editEvent.duration + 'min';
                this.checkServices = [];
                this.checkServices.push({
                    category_id: editEvent.category_id,
                    category_name: editEvent.category_name,
                    duration: editEvent.duration,
                    price: editEvent.price,
                    service_id: editEvent.service_id,
                    service_name: editEvent.service_name
                });
                this.userServiceGet = editEvent;
                // time format start
                let momentLocale = moment(editEvent.time_from, "HH:mm");
                momentLocale.locale('ru');
                this.startTime = momentLocale.format('LT');

                let momentLocaleEnd = moment(editEvent.time_to, "HH:mm");
                momentLocale.locale('ru');
                this.endTime = momentLocaleEnd.format('LT');
                // time format end

                this.employeeslist.forEach(employ => {
                    if(employ.id == this.checkEmployee){
                        this.employId = employ.name + ' ' + employ.last_name;
                    }
                });
                this.getBackgroundColor2 = editEvent.color;
                this.emailSend = editEvent.send_email === '1' ? true : false;
                this.smsSend = editEvent.send_sms === '1' ? true : false;
                this.commentOrder = editEvent.description;
                this.hideTarifBlock = false;
                this.hideServiceBlock = false;
                // this.showServices(this.checkEmployee);
                this.eventId = editEvent.id;
                this.editForm = true;
                this.cartId = editEvent.id;
                this.isEmplMail = editEvent.is_empl_email === '1' ? true : false;
                this.sendClientMail = editEvent.is_client_email === '1' ? true : false;
            },
            clearFormFunc(typeClick = false){
                if(typeClick == 'clear'){
                    this.showCalendarForm = true;    
                }else{
                    this.showCalendarForm = false;
                    this.employId = '';
                }
                this.startDate = '';
                this.getClientStr = '';
                this.hideClientList = true;
                this.newUser = false;
                this.firstName = '';
                this.lastName = '';
                this.emailClient = '';
                this.phoneClient = '';
                this.mobileClient = '';
                this.startTime = '';
                this.endTime = '';
                this.checkTarif = null;
                this.checkServices = null;
                this.emailSend = false;
                this.smsSend = false;
                this.commentOrder = '';
                this.checkService = '';
                this.checkTariff = '';
                this.hideTarifBlock = true;
                this.hideServiceBlock = true;
                this.hideEmployeList = true;
                this.serviceCheck = null;
                this.eventId = 0;
                this.editForm = false;
                this.userServiceGet = null;
                this.editView = ''; 
                this.cartId = 0;
                this.clearForm = false;
                this.validate = {
                    email: true,
                    orderEmploye: true,
                    emailClient: true,
                    orderService: true,
                    date: true,
                    time: true,
                    first_name: true,
                    last_name: true,
                    orderOffice: true
                };
                this.setNewUser = false;
                this.getBackgroundColor2 = '#4f71b0';
                this.deleteOrder = false;
                this.sendClientMail = true;
                this.isEmplMail = false;
            },
            openClearPopup(){
                this.clearFormFunc();
                this.employees = null;
                this.services = null;
                this.clearForm = true;
                this.$http.post('/office/get_services').then((response) => {
                    console.log('response seervice', response);
                    this.services = response.data;
                    this.showCalendarForm = true;
                }, (response) => {
                    this.showCalendarForm = true;
                });
            },
            clearClientInfo(){
                this.hideClientList = true;
                this.firstName = '';
                this.lastName = '';
                this.emailClient = '';
                this.phoneClient = '';
                this.mobileClient = '';  
                this.getClientStr = '';              
            },
            colorPickerStart(){
                let vm = this;
                
                // $('#colorPicker').ColorPicker({
                //     color: vm.getBackgroundColor2,
                //     onShow: function (colpkr) {
                //         $(colpkr).fadeIn(500);
                //         return false;
                //     },
                //     onHide: function (colpkr) {
                //         $(colpkr).fadeOut(500);
                //         return false;
                //     },
                //     onChange: function (hsb, hex, rgb) {
                //         $('#colorPicker div').css('backgroundColor', '#' + hex);
                //         vm.getBackgroundColor2 = '#' + hex;
                //     }
                // });
            },
            validateData(){
                var checkValid = true;
                if(!this.firstName) {
                    this.validate.first_name = false;
                }else{
                    this.validate.first_name = true;
                }
                if(!this.lastName) {
                    this.validate.last_name = false;
                }else{
                    this.validate.last_name = true;
                }
                if(!this.startTime) {
                    this.validate.time = false;
                }else{
                    this.validate.time = true;
                }
                if(!this.checkEmployee) {
                    this.validate.orderEmploye = false;
                }else{
                    this.validate.orderEmploye = true;
                }
                if(!this.startDate) {
                    this.validate.date = false;
                }else{
                    this.validate.date = true;
                }
                if(!this.emailClient) {
                    this.validate.emailClient = false;
                }else{
                    this.validate.emailClient = true;
                }
                if(this.userServiceGet === null) {
                    this.validate.orderService = false;
                }else{
                    this.validate.orderService = true;
                }
                this.checkEmail(this.emailClient);
                Object.values(this.validate).forEach(data => {
                    if(!data){
                        checkValid = false;
                    }
                });
                if(checkValid){
                    return true;
                }else{
                    return false;
                }
            },
            getTrans(key){
                let data = {
                    lang: this.$root.locale
                }
                this.$http.post('/translate', data).then((response)=>{
                    this.translatedText = response.data;
                    this.getTimePicker();
                },(response)=>{

                });
            },
            confirmPopup(str,view,event,y = false,n = false){
                if(str){
                    this.showConfirmPopup = true;
                    this.draggEvent = event;
                    this.draggView = view;
                }
                if(y){
                    this.showConfirmPopup = false;
                    this.editEvent(this.draggEvent,this.draggView.type);
                    this.draggEvent = null;
                    this.draggView = null;
                }
                if(n){
                    this.showConfirmPopup = false;
                    this.fullCalendarDestroy(this.draggView.type);
                    this.draggEvent = null;
                    this.draggView = null;
                }
            },
            closePopupErr(){
                this.showErrorPopup = false;
                this.validate.orderEmploye = true;
                this.validate.orderOffice = true;
            }
        }

}
</script>