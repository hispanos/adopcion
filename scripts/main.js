const URI = window.location.pathname;
if(URI === '/' || URI === '/index.html' || URI === '/adopcion/' || URI === 'adopcion/index.html') {
    setTimeout("window.location.href='./waiting-1.html'", 5000);
}
