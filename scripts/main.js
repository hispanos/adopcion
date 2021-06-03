const URI = window.location.pathname;
if(URI === '/' || URI === '/index.html') {
    setTimeout("window.location.href='./waiting-1.html'", 5000);
}