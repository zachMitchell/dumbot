buttonContainer.onmouseover = function(){
    btnQm.classList.add('mouseover');
    btnQm.classList.remove('mouseout');
}
buttonContainer.onmouseout = function(){
    btnQm.classList.remove('release');
    btnQm.classList.remove('mouseover');
    btnQm.classList.add('mouseout');
}

//Button press
buttonContainer.addEventListener('mousedown',function(){
    // btnQm.classList.remove('mouseover');

    btnQm.classList.remove('release');
    btnQm.classList.add('press');
    btnTop.classList.add('press');
});
buttonContainer.addEventListener('mouseup',function(){
    btnQm.classList.remove('press');
    btnQm.classList.add('release');
    btnTop.classList.remove('press');
});