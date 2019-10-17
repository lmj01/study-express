(function(doc, win){
    let rootEl = doc.documentElement,
        isMobile = navigator.userAgent.match(/iphone|ipad|android/gi),
        dpr = Math.min(win.devicePixelRatio, 3),
        scale = 1 / dpr,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    
    rootEl.dataset.dpr = dpr;
    let mobileName = isMobile ? isMobile[0] : 'not iphone,ipad,android';
    let div = document.createElement('div');
    div.id = "id-net-speed";
    div.style.zIndex = 1000;
    div.style.position = 'fixed';
    div.style.bottom = 0;
    div.style.color = 'red';
    div.innerText = `mobile type: ${mobileName}`;    
    doc.body.appendChild(div);

    let metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'width=device-width,initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=no';
    rootEl.firstElementChild.appendChild(metaEl);

    function reCalculate() {
        let width = rootEl.clientWidth;
        if (width / dpr > 640) {
            width = 640 * dpr;
        }
        rootEl.style.fontSize = 20 * (width / 750) + 'px';
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, reCalculate, false);
})(document, window);