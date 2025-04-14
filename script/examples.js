const seeBtn = document.getElementById('see-examples-btn');
const iframeWrapper = document.getElementById('iframe-wrapper');
const buttonContainer = document.getElementById('button-container');
const backBtn = document.getElementById('back-btn');

seeBtn.addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    iframeWrapper.classList.add('expanded');

    setTimeout(() => {
        document.getElementById('examples').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
});

backBtn.addEventListener('click', () => {
    iframeWrapper.classList.remove('expanded');

    setTimeout(() => {
        buttonContainer.style.display = 'block';
        document.getElementById('examples').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
});

backBtn.addEventListener('click', () => {
    // zacznij animację zanikania
    iframeWrapper.classList.remove('visible');

    // hide iframe and show button
    setTimeout(() => {
        iframeWrapper.classList.add('hidden');
        buttonContainer.style.display = 'block';

        document.getElementById('examples').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
});