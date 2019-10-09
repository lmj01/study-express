// pie process
class PieProgress {
    constructor() {
        this.el = document.getElementById('id-pie-progress');
        this.path = document.querySelector('pie-svg-path');
        this.text = document.getElementById('pie-svg-text');
    }
    begin() {
        this.el.classList.add('animate');
    }
    end() {
        this.el.classList.remove('animate');
    }
    draw(per) {
        let alpha = per * 360;
        alpha %= 360;
        let r = (alpha * Math.PI / 180),
            x = Math.sin(r) * 50,
            y = Math.cos(r) * -50,
            mid = (alpha > 180) ? 1 : 0,
            animate = 'M 0 0 v -50 A 50 50 1 ' +
                mid + ' 1 ' + x + ' ' + y + ' z';
        this.path.setAttribute('d', animate);
    }
    reset() {
        let animate = 'M 0 0 v -50 A 50 50 1 0 1 0 -50 z';
        this.path.setAttribute('d', animate);
    }
}
function activePieProgress() {
    setupPieProgress();    
}
function deactivePieProgress() {
    let div = document.getElementById('id-pie-progress');
    if (div !== undefined) {
        document.body.removeChild(div);
    }
}
function setupPieProgress() {
    let div = document.getElementById('id-pie-progress');
    if (div == undefined) {
        div = document.createElement('div');
        div.id = "id-pie-progress";
        div.style.zIndex = 1000;
        div.style.position = 'fixed';
        div.style.top = 0;
        div.style.color = 'red';
    }
    document.body.appendChild(div);
}
