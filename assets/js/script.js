function init() {
    
    new Vue ({

        el: '#app',

        data: {

        },

        methods: {
            test: () => {
                
                console.log('Hello Boolzap');
            }
        },

        mounted() {

            this.test();
        } 
    });
}

document.addEventListener("DOMContentLoaded", init);