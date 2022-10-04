var wrapperSquareEl = $('.wrapper-square-element');
var book = $('.bk-book');
var bookPage = book.children('div.bk-page');
var viewBookLink = book.find('.bk-bookview');
var viewBackLink = book.find('.bk-bookback');
var bookRightArrow = $('.wrapper-square').find('.arrow-btn');
var bookLeftArrow = $('.wrapper-square').find('.arrow-btn.left');

wrapperSquareEl.on('mousemove', () => {
    if (!wrapperSquareEl.hasClass('hover')) {
        wrapperSquareEl.addClass('hover');
        bookRightArrow.show();
        bookLeftArrow.show();
        requestAnimationFrame(() => {
            bookRightArrow.css({
                'right': '-50%'
            });
            bookLeftArrow.css({
                'left': '-50%'
            });

            $('.sticker').on('click', e => {
                bookDefault();
                bookLeftArrow.hide();
                bookRightArrow.hide();
            
                const cloneSticker = $(e.currentTarget).clone();
                $(e.currentTarget).css({'opacity': 0});
            
                const width = $(e.currentTarget).outerWidth();
                const height = $(e.currentTarget).outerHeight();
                const top = $(e.currentTarget).offset().top;
                const left = $(e.currentTarget).offset().left;
                const backButton = $('<span/>');
                backButton.addClass('note');
                backButton.addClass('top-right');
                backButton.text('back');
                backButton.css({'font-size': '20px', 'cursor': 'pointer'});
                backButton.on('click', () => {
                    cloneSticker.css({
                        'top': top + 'px',
                        'left': left + 'px',
                        'width': width + 'px',
                        'height': height + 'px',
                        'opacity': 0
                    });
                    cloneSticker.on('transitionend', () => {
                        cloneSticker.remove();
                        $(e.currentTarget).css({'opacity': 1});
                    });
                    bookLeftArrow.show();
                    bookRightArrow.show();
                    bookInside();
                });
                cloneSticker.append(backButton);
            
                const buyContainer = $('<div/>');
                buyContainer.css({
                    'position': 'absolute',
                    'top': '15px',
                    'left': 0,
                    'text-align': 'center'
                });

                const buyButton = $('<button/>');
                
               
                buyButton.css({
                    'font-family': '"Cuprum", sans-serif',
                    'color': '#A00A',
                    'font-weight': 'bolder',
                    'box-shadow': 'none',
                    'line-height': '10px',
                    'background-color': '#FFF',
                   
                    
                })
                buyButton.off('click', () => {
                    alert('buy functionality here');
                });
                buyContainer.append(buyButton);
                cloneSticker.append(buyContainer);
                            
                cloneSticker.css({
                    'position': 'absolute',
                    'top': top + 'px',
                    'left': left + 'px',
                    'width': width + 'px',
                    'height': height + 'px',
                    'background-position': 'center center',
                    'background-size': 'contain',
                    'margin': 0
                });
            
                cloneSticker.appendTo('body');
                requestAnimationFrame(() => {
                    cloneSticker.css({
                        'top': '3%',
                        'left': '3%',
                        'height': '94%',
                        'width': '44%',
                        'transform': 'rotate(1deg)'
                    });
                });
            });
        });
    }
});

var bookDefault = function () {
    book.data({
            opened: false,
            flip: false
        })
        .removeClass('bk-viewback bk-viewinside')
        .addClass('bk-bookdefault');
};
var bookBack = function () {
    book.data({
            opened: false,
            flip: true
        })
        .removeClass('bk-viewinside bk-bookdefault')
        .addClass('bk-viewback');
};
var bookInside = function () {
    book.data({
            opened: true,
            flip: false
        })
        .removeClass('bk-viewback bk-bookdefault')
        .addClass('bk-viewinside');
};

bookInside();

viewBackLink.on('click', function () {
    if (book.data('flip')) {
        bookDefault();
    } else {
        bookBack();
    }
    return false;
});

viewBookLink.on('click', function () {
    bookInside();
    return false;
});

//Bookblock clone and setup
var bookBlock = $('.bb-bookblock');
var backCover = bookBlock.parents('.bk-book').find('.bk-cover-back');
var backCoverBookBlock = bookBlock.clone();
backCoverBookBlock.appendTo(backCover);

var bookBlockFirst = function () {
    bookBlock.bookblock('first');
    backCoverBookBlock.bookblock('first');
}
var bookBlockLast = function () {
    bookBlock.bookblock('last');
    backCoverBookBlock.bookblock('last');
}

var bookBlockLastIndex = bookBlock.children().length - 1;
var bookBlockNext = function () {
    if (book.hasClass('bk-viewinside')) {
        if (book.data('flip'))
            return bookDefault();
        bookBlock.bookblock('next');
        backCoverBookBlock.bookblock('next');
    }
}
var bookBlockPrev = function () {
    if (book.hasClass('bk-viewinside')) {
        if (book.data('flip'))
            return bookBlockLast() + bookInside();
        bookBlock.bookblock('prev');
        backCoverBookBlock.bookblock('prev');
    }
}

bookLeftArrow.on('click', () => {
    bookBlockPrev();
});

bookRightArrow.on('click', () => {
    bookBlockNext();
});

bookBlock.children().add(backCoverBookBlock.children()).on({
    'swipeleft': function (event) {
        bookBlockNext();
        return false;
    },
    'swiperight': function (event) {
        bookBlockPrev();
        return false;
    }
});

bookBlock.bookblock({
    speed: 800,
    shadow: true
});
backCoverBookBlock.bookblock({
    speed: 800,
    shadow: false
});

var throttleFunc = function (func, limit, limitQueue) {
    var lastTime = +new Date;
    var queued = 0;
    return function throttledFunc() {
        var now = +new Date;
        var args = Array.prototype.slice.call(arguments);
        if (now - lastTime > limit) {
            func.apply(this, args);
            lastTime = +new Date;
        } else {
            var boundFunc = throttledFunc.bind.apply(throttledFunc, [this].concat(args));
            queued++;
            if (queued < limitQueue)
                window.setTimeout(boundFunc, lastTime + limit - now);
        }
    }
}

$(document).keydown(throttleFunc(function (e) {
    var keyCode = e.keyCode || e.which,
        arrow = {
            left: 37,
            up: 38,
            right: 39,
            down: 40
        };

    if (wrapperSquareEl.hasClass('hover')) {
        switch (keyCode) {
            case arrow.left:
                bookBlockPrev();
                break;
            case arrow.right:
                bookBlockNext();
                break;
        }
    }
}, 500, 2));

// store button
const marketBtn = $('.market-button');
const store = $('.store');
marketBtn.on('click', () => {
    store.show();
    requestAnimationFrame(() => {
        store.addClass('show');
    });
});