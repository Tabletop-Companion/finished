var counter =1;
setInterval(function(){
    document.getElementsById('radio' + counter).checked = true;
    counter++;
    if(counter > 3)
    {
        counter=1;
    }
}, 5000);