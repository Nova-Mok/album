document.querySelectorAll('*[data-title]').forEach(el => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = el.getAttribute('data-title');
    
    el.addEventListener('mousemove', () => {
        const top = $(el).offset().top + $(el).height() / 2 - $(tooltip).height() / 2;
        const left = $(el).offset().left - $(el).width() - $(tooltip).width() + 20;

        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.style.display = 'block';
    });
    el.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
    document.body.appendChild(tooltip);
});