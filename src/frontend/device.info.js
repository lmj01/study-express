class DeviceInfo {
    constructor() {
        this.ua = new UAParser();
        this.changeOrientation = false;
        if (window) {
            this.active();
            window.screen.orientation.addEventListener('change', ()=>{
                this.update();
            }); 
        } else {
            throw Error("只测试浏览器");
        } 
    }
    width() {
        return window.screen.width;
    }
    height() {
        return window.screen.height;
    }
    availWidth() {
        return window.screen.availWidth;
    }
    availHeight() {
        return window.screen.availHeight;
    }
    orientation() {
        return window.screen.orientation.type;
    }
    info() {
        let browser = this.ua.getBrowser();
        let engine = this.ua.getEngine();
        let os = this.ua.getOS();
        return `width:${this.width()}, 
            height:${this.height()}, 
            avail-width: ${this.availWidth()},
            avail-height: ${this.availHeight()},            
            orientation:${this.orientation()}, change:${this.changeOrientation},
            user-agent: ${window.navigator.userAgent},            
            browser: name:${browser.name}, version:${browser.version}, major:${browser.major},
            cpu: ${this.ua.getCPU().architecture},
            engine: name,${engine.name}, version:${engine.version}, 
            OS: name,${os.name}, version:${os.version}
            `;
    }
    update() {
        let div = document.getElementById('id-device-info');
        this.changeOrientation = !this.changeOrientation;
        div.innerText = this.info();
    }
    active() {
        let div = document.getElementById('id-device-info');
        if (div == undefined) {
            div = document.createElement('div');
            div.id = "id-device-info";
            div.style.zIndex = 1000;
            div.style.position = 'fixed';
            div.style.top = '20%';
            div.style.left = '10%';
            div.style.color = 'red';
            document.body.appendChild(div);    
        }
        div.innerText = this.info();
    }
}