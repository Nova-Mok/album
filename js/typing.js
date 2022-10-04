document.querySelectorAll('.typing').forEach(typingEl => {
    const typingText = typingEl.innerText;
    var i = 0;
    var d = Date.now();
    typingEl.innerHTML = '';
    (function type() {
        const now = Date.now();
        if (i < typingText.length) {
            if (now - d > 75) {
                typingEl.innerHTML += typingText[i++];
                d = now;
            }
            requestAnimationFrame(type);
        }
    })();
})