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
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
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
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
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
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
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
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
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
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Non mi va di studiare ancora',
                            status: 'received'
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
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Da non crederci',
                            status: 'received'
                        }
                    ]
                }
            ],

            selectedContact: {

            },

            selectedIndex: 0,

            newMessage: {
                date: '10/01/2020 15:50:00',
                text: '',
                status: 'sent'
            },
            
            needAnswer: false
        },

        methods: {
            test: () => {
                
                console.log('Hello Boolzap');
            },

            activeContact: function(contact, index) {
                this.selectedContact = contact;

                for (let i = 0; i < this.contacts.length; i++) {
                    const elem = this.contacts[i];
                    
                    if (contact.name == elem.name) {
                        
                        this.contacts.visible = true;
                        this.selectedIndex = index;
                    } else {

                        this.contacts.visible = false;
                    }
                }
                console.log(contact.visible, this.selectedIndex);
            },

            addNewMessage: function() {
                if (this.newMessage.text.length > 0 && this.newMessage.text.charAt(0) !== ' ') {

                    let newMessage = Object.assign({}, this.newMessage);
                    this.contacts[this.selectedIndex].messages.push(newMessage);
                    this.newMessage.text = '';
                    this.presetAnswerMessage();
                }
            },

            presetAnswerMessage: function() {    
                let presetAnswer = {
                    date: '10/01/2020 15:50:00',
                    text: 'ok',
                    status: 'received'
                }

                setTimeout(() => {
                    
                    this.contacts[this.selectedIndex].messages.push(presetAnswer);
                }, 1000);
            }
        },

        mounted() {
            this.selectedContact = this.contacts[this.selectedIndex];
            this.test();
            this.filteredContacts();
        },

        computed: {
            filteredContacts() {
                return this.contacts.filter(contact => {
                    return contact.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", init);