let vm = new Vue({
    el:'#app',
    methods: {
        register: function() {
            console.log('register click');
            let args = {
                nickname: document.getElementById('nickname').value,
                password: document.getElementById('password').value
            }
            http.post('register', args, (data)=>{
                console.log(data);
            });
        }
    }
});