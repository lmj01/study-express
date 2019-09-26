let vm = new Vue({
    el:'#app',
    methods: {
        register: function() {            
            let args = {
                'nickname': document.getElementById('nickname').value,
                'password':document.getElementById('password').value,
                'sex':document.getElementById('sex').value
            }
            let argFD = new FormData();
            for (let o in args) {
                argFD.append(o, args[o]);
            }

            http.post('register', argFD, data=>{
                console.log('formdata', data);
            });
            http.post('register', args, data=>{
                console.log('json', data);
            })
        }
    }
});