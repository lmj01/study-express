let conn = navigator.connection;
if (conn !== undefined) {
    conn.addEventListener('change', netSpeedInfo);
} 
function activeDetectSpeed() {
    netSpeedInfo();    
}
function deactiveDetectSpeed() {
    let div = document.getElementById('id-net-speed');
    if (div !== undefined) {
        document.body.removeChild(div);
    }
}
function netSpeedInfo() {
    let div = document.getElementById('id-net-speed');
    if (div == undefined) {
        div = document.createElement('div');
        div.id = "id-net-speed";
        div.style.zIndex = 1000;
        div.style.position = 'fixed';
        div.style.top = 0;
        div.style.color = 'red';
    }
    if (navigator.connection) {
        const {rtt, downlink, effectiveType, saveData} = navigator.connection;       
        div.innerText = `网络连接类型：${effectiveType}, 下载速度：${downlink}, 往返时间：${rtt}, 保护模式：${saveData}`;    
    } else {
        div.innerText = 'Network Information API不支持';
    }
    document.body.appendChild(div);
}
