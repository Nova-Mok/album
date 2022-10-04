(function() {
    const connectButton = document.querySelector('#connectButton');
    connectButton.addEventListener('click', () => {
        // connectButton.innerHTML = getLoadingElement();
        // $(connectButton).hide();
        // const loaderElement = document.createElement('span');
        connectButton.innerHTML = getLoadingElement();
        connectButton.disabled = 'disabled';
        setTimeout(() => {
            window.location.href = '/index_b.html'
        }, 2000);
        // connectButton.parentElement.appendChild(loaderElement);
    });

    const documentsButton = document.querySelector('#documentsButton');
    const documentsDiv = document.querySelector('.documents');

    documentsButton.addEventListener('click', () => {
        documentsDiv.style.display = 'block';
        requestAnimationFrame(() => {
            documentsDiv.querySelectorAll('.content p').forEach((p, i) => {
				p.style.transitionDelay = (0.1 + 0.25 * i) + 's';
			});
            documentsDiv.classList.add('show');
        });
    });

    const documentsBackButton = documentsDiv.querySelector('.back-button');
    documentsBackButton.addEventListener('click', () => {
        documentsDiv.querySelectorAll('.content p').forEach((p, i) => {
            p.removeAttribute('style');
        });
        documentsDiv.classList.remove('show');
    });

    const images = document.querySelectorAll('.images>div');
    images.forEach(el => {
        const image = el.querySelector('div');
        el.addEventListener('click', () => {
            const imageClone = document.createElement('div');
            imageClone.style.position = 'absolute';
            imageClone.style.top = el.offsetTop + 'px';
            imageClone.style.left = el.offsetLeft + 'px';
            imageClone.style.width = el.clientWidth + 'px';
            imageClone.style.height = el.clientHeight + 'px';
            imageClone.style.transition = 'top 1s, left 1s, width 1s, height 1s, opacity 1s';
            imageClone.style.zIndex = 2;
            imageClone.style.backgroundImage = image.style.backgroundImage;
            imageClone.style.backgroundPosition = 'center';
            imageClone.style.backgroundSize = 'contain';
            imageClone.style.backgroundRepeat = 'no-repeat';
            imageClone.style.backgroundColor = '#000A';

            requestAnimationFrame(() => {
                imageClone.style.top = '0';
                imageClone.style.left = '0';
                imageClone.style.width = '100%';
                imageClone.style.height = '100%';
            });

            const backButton = document.createElement('div');
            backButton.classList.add('back-button');
            backButton.innerHTML = 'Back<div class="back-icon"></div>';
            backButton.addEventListener('click', () => {
                imageClone.style.top = el.offsetTop + 'px';
                imageClone.style.left = el.offsetLeft + 'px';
                imageClone.style.width = el.offsetWidth + 'px';
                imageClone.style.height = el.offsetHeight + 'px';
                imageClone.style.opacity = '0';
                backButton.remove();
                imageClone.addEventListener('transitionend', e => {
                    if (e.target == imageClone)
                        imageClone.remove();
                });
            });
            imageClone.appendChild(backButton);

            document.body.appendChild(imageClone);
        });
    });
})();