function init() {
    
    new Vue ({

        el: '#app',

        data: {
            search: '',

            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received',
                            menu: false
                        }
                    ],
                },

                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',
                            menu: false
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                            menu: false
                        }
                    ],
                },

                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received',
                            menu: false
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received',
                            menu: false
                        }
                    ],
                },

                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                            menu: false
                        }
                    ]
                },

                {
                    name: 'Pietro',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Successo qualcosa?',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Non mi va di studiare ancora',
                            status: 'received',
                            menu: false
                        }
                    ]
                },

                {
                    name: 'Clara',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Non puoi immaginare cosa sia successo?',
                            status: 'sent',
                            menu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Da non crederci',
                            status: 'received',
                            menu: false
                        }
                    ]
                }
            ],

            selectedContact: {},

            selectedIndex: 0,

            textMessage: ''
        },

        methods: {
            activeContact: function(contact, index) {
                this.selectedContact = contact;
                this.selectedIndex   = index;
            },

            getNewMessage: function(text, status) {
                const now   = new Date();

                let dd      = now.getDate();
                let mm      = now.getMonth() + 1;
                let yyyy    = now.getFullYear();
                let hours   = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();

                if(dd < 10) {
                    dd = '0' + dd;
                }

                if(mm < 10) {
                    mm = '0' + mm;
                }

                if(hours < 10) {
                    hours = '0' + hours;
                }

                if(minutes < 10) {
                    minutes = '0' + minutes;
                }

                if(seconds < 10) {
                    seconds = '0' + seconds;
                }

                let today = dd + '/' + mm + '/' + yyyy;
                
                const nowStr = today + ' '
                             + hours + ':'
                             + minutes + ':'
                             + seconds;
                
                return {
                    date  : nowStr,
                    text  : text,
                    status: status
                }
            },

            addNewMessage: function() {
                if (this.textMessage.length > 0 && this.textMessage.charAt(0) !== ' ') {


                    let contact    = this.selectedContact;
                    let newMessage = this.getNewMessage(this.textMessage, 'sent');

                    contact.messages.push(newMessage);
                    this.textMessage = '';
                    this.presetAnswerMessage();
                }
            },

            presetAnswerMessage: function() {  
                let presetAnswer = this.getNewMessage('ok', 'received');

                setTimeout(() => {
                    
                    this.selectedContact.messages.push(presetAnswer);
                }, 1000);
            },

            openDeleteMenu: function(message) {
                message.menu = !message.menu;
                console.log(message.menu, message.text);
            },

            deleteMessage: function(index) {

                this.selectedContact.messages.splice(index, 1);
            }
        },

        mounted() {
            this.selectedContact = this.filteredContacts[this.selectedIndex];
        },

        computed: {
            filteredContacts: function() {
                return this.contacts.filter(contact => {
                    return contact.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }            
        }
    })
}

document.addEventListener("DOMContentLoaded", init);