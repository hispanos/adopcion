document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    container.addEventListener('click', clickContainer)
});

const clickContainer = () => {
    const imgSmall = document.getElementById('logo-small');
    const imgBig = document.getElementById('logo-big');

    imgSmall.classList.add('hidden');
    imgBig.classList.remove('hidden');
}