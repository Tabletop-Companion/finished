function func() {
     var rules1 = document.getElementsByName('rule1');

     let rules1Amount = 0;

     rules1.forEach((rates1)=>{
        if(rates1.checked) {
            alert(rates1.value);
        }
        else{
            rules1Amount += 1;
        }
      });

}