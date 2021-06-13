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

            // Object of the selected contact from filteredContact list
            selectedContact: {},
            
            // Index of the selected contact referring to filteredContact list
            selectedIndex: 0,

            //input for new chat messages
            textMessage: '',

            showMenu: {
                messageIndex: 0,
                show: false
            }
        },

        methods: {
            // Take information from the contact you've clicked on
            // @param {object} contact [get the contact object you've clicked on]
            // @param {number} index [get the index of the contact object you've clicked on]
            activeContact: function(contact, index) {
                
                // Store selected contact object inside a new variable
                this.selectedContact = contact;

                // Store the index of the selected contact inside a new variable
                this.selectedIndex   = index;
            },

            // Create the object of the messages you sent and receive
            // @param {string} text [text of the new message taken fron the input this.textMessage]
            // @param {string} status [define if the message is sent of received]
            getNewMessage: function(text, status) {

                // Take the time informations
                // to make the date we need to visualize
                const now   = new Date();

                let dd      = now.getDate();
                let mm      = now.getMonth() + 1;
                let yyyy    = now.getFullYear();
                let hours   = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();

                // We want a dd/mm/yyyy so we add a 0 to 1 digit numbers
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

                // Take today date
                let today = dd + '/' + mm + '/' + yyyy;
                
                // Take seconds precise date
                const nowStr = today + ' '
                             + hours + ':'
                             + minutes + ':'
                             + seconds;
                
                // Return message object with seconds precise date
                // and status from input parameters ('sent' or 'received')
                return {
                    date  : nowStr,
                    text  : text,
                    status: status
                }
            },

            // Add new message to the selected chat
            addNewMessage: function() {

                // If input on contact search bar is not empty or start with a spacebar value
                if (this.textMessage.length > 0 && this.textMessage.charAt(0) !== ' ') {

                    // Get the contact selected
                    let contact    = this.selectedContact;
                    // Create the message to send
                    let newMessage = this.getNewMessage(this.textMessage, 'sent');

                    // Push inside the contact messages object the new message
                    contact.messages.push(newMessage);

                    // Eliminate sent text from input bar
                    this.textMessage = '';
                    // Call the function that makes you have a preset answer to the message you've already sent
                    this.presetAnswerMessage();
                }
            },

            // Create a preset answer to a send message
            presetAnswerMessage: function() {  

                // Get the index of the selected contact to avoid bug
                // when you change chat before the answer ha sended
                const replyIndex = this.selectedIndex;
                // Create the answer using getNewMessage
                let presetAnswer = this.getNewMessage('ok', 'received');

                // Wait a second to push the answer message
                setTimeout(() => {
                    
                    // Push the preset answer inside the message object of the selected contact
                    this.filteredContacts[replyIndex].messages.push(presetAnswer);
                }, 1000);
            },
            

            // Open the delete dropdown menu of the choosen message
            // @param {number} index [index of the selected message inside messages array]
            openDeleteMenu: function(index) {
                if(this.showMenu.messageIndex == index) {
                    this.showMenu.show = !this.showMenu.show;
                } else {
                    this.showMenu.messageIndex = index;
                    this.showMenu.show = true;
                }
            },

            // Close delete message dropdown menu when click outside
            closeMenu: function(){
                if(this.showMenu.show == true) {
                    this.showMenu.show = false;
                }
            },

            // Delete the selected message from the messages array of the selected contact
            // @param {number} index [index of the selected message inside messages array]
            deleteMessage: function(index) {
                this.selectedContact.messages.splice(index, 1);
            }
        },

        mounted() {
            // Get a first selected contact to visualize a chat and don't get errors
            this.selectedContact = this.filteredContacts[this.selectedIndex];
        },

        computed: {
            // Get a filtered contact list based on the contact input "search" bar 
            filteredContacts: function() {
                // Get the full filteredContact list
                return this.contacts.filter(contact => {
                    // Control if your "search" match with some contact names
                    return contact.name.toLowerCase().includes(this.search.toLowerCase())
                });
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", init);