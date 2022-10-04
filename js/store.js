// store back button
const storeBackButton = store.find('.back-button');
storeBackButton.on('click', () => {
    store.removeClass('show');
});

// store item click
store.find('.item .image-square').on('click', e => {
    const parent = e.currentTarget.parentElement;
    if (!$(parent).hasClass('linked')) {
        const cloneStoreItem = $(e.currentTarget).clone();



        store.find('.item').addClass('linked');

        const width = $(e.currentTarget).outerWidth();
        const height = $(e.currentTarget).outerHeight();
        const top = $(e.currentTarget).offset().top;
        const left = $(e.currentTarget).offset().left;
        const backButton = $('<div/>');
        backButton.addClass('back-button');
        backButton.html('Back<div class="back-icon"></div>');
        backButton.on('click', () => {
            store.find('.item').removeClass('linked');
            cloneStoreItem.css({
                'top': top + 'px',
                'left': left + 'px',
                'width': width + 'px',
                'height': height + 'px',
                'opacity': 0
            });
            store.find('.items').css({
                'width': '100%'
            });
            store.children('.title').css({
                'width': '100%'
            });
            cloneStoreItem.on('transitionend', () => {
                cloneStoreItem.remove();
            });
        });
        cloneStoreItem.append(backButton);

        cloneStoreItem.css({
            'position': 'absolute',
            'top': top + 'px',
            'left': left + 'px',
            'width': width + 'px',
            'height': height + 'px',
            'background-position': 'center center',
            'background-size': 'contain',
            'background-image': parent.style.backgroundImage,
            'background-repeat': 'no-repeat',
            'background-color': '#000',
            'margin': 0,
            'z-index': 5,
            'transition': 'all .5s'
        });

        cloneStoreItem.appendTo('body');
        requestAnimationFrame(() => {
            cloneStoreItem.css({
                'top': '0',
                'left': '50%',
                'height': '100%',
                'width': '50%'
            });
            store.children('.title').css({
                'width': '50%'
            });
            store.find('.items').css({
                'width': '50%'
            });
        });
    }
});

// arrows buttons
const storeRightArrow = store.find('.arrow-btn:not(.left)');
const storeLeftArrow = store.find('.arrow-btn.left');

function updateScroll() {
    if (store.find('.items')[0].scrollLeft == store.find('.items')[0].scrollWidth - store.find('.items').width())
        storeRightArrow.hide();

    if (store.find('.items')[0].scrollLeft == 0)
        storeLeftArrow.hide();
}

updateScroll();

storeRightArrow.on('click', () => {
    storeLeftArrow.show();
    store.find('.items').animate({
        scrollLeft: store.find('.items')[0].scrollLeft + $('.item').width() * 2
    }, 500, updateScroll);
});

storeLeftArrow.on('click', () => {
    storeRightArrow.show();
    store.find('.items').animate({
        scrollLeft: store.find('.items')[0].scrollLeft - $('.item').width() * 2
    }, 500, updateScroll);
});