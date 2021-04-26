
document.addEventListener("DOMContentLoaded", webPage)
function webPage() {

    //const btn = document.querySelector('#btn1');
    //register an event listener to the button with id btn
    const btnn = document.getElementById('btn1');
	
    if (btnn != undefined)
        btnn.addEventListener("click", ruleClick);

    function ruleClick() {
        //var rules1 = document.getElementsByName('rule1');
        //var rules2 = document.getElementsByName('rule2');
        //var rules3 = document.getElementsByName('rule3');
        //var rules4 = document.getElementsByName('rule7');
        var rules5 = document.getElementsByName('rule5');
        var rules6 = document.getElementsByName('rule6');
        var rules7 = document.getElementsByName('rule7');


        //------------------Rule1---------------------
        //let rateCheck = false
        // let rules1Amount = 0;

        // rules1.forEach((rates1)=>{
        //   if(!rates1.checked) {
        //     rules1Amount += 1;
        //   }
        // });
        /*
        let rules1Amount = 0;

        rules1.forEach((rates1)=>{
        if(rates1.checked) {
        var val = rates1.value ;
        localStorage.setItem("textValue", val);
        }
        else{
        rules1Amount += 1;
        }
        });


        //-------------------Rule2-----------------
        let rules2Amount = 0;

        // rules2.forEach((rates2)=>{
        //   if(!rates2.checked) {
        //     rules2Amount += 1;
        //   }
        // });

        rules2.forEach((rates2)=>{
        if(rates2.checked) {
        var val2 = rates2.value ;
        localStorage.setItem("textValue2", val2);
        }

        else{
        rules2Amount += 1;
        }
        });


        //-------------------Rule3-----------------
        let rules3Amount = 0;

        // rules3.forEach((rates3)=>{
        //   if(!rates3.checked) {
        //     rules3Amount += 1;
        //   }
        // });

        rules3.forEach((rates3)=>{
        if(rates3.checked) {
        var val3 = rates3.value ;
        localStorage.setItem("textValue3", val3);
        }

        else{
        rules3Amount += 1;
        }
        });
         
        //-------------------Rule4-----------------
        let rules4Amount = 0;

        // rules4.forEach((rates4)=>{
        //   if(!rates4.checked) {
        //     rules4Amount += 1;
        //   }
        // });

        rules4.forEach((rates4) => {
            if (rates4.checked) {
                var val4 = rates4.value;
                localStorage.setItem("textValue4", val4);
            } else {
                rules4Amount += 1;
            }
        });
*/
        //-------------------Rule5-----------------
        let rules5Amount = 0;

        // rules5.forEach((rates5)=>{
        //   if(!rates5.checked) {
        //     rules5Amount += 1;
        //   }
        // });

        rules5.forEach((rates5) => {
            if (rates5.checked) {
                var val5 = rates5.value;
                localStorage.setItem("textValue5", val5);
            } else {
                rules5Amount += 1;
            }
        });

        //-------------------Rule6-----------------
        let rules6Amount = 0;

        // rules6.forEach((rates6)=>{
        //   if(!rates6.checked) {
        //     rules6Amount += 1;
        //   }
        // });

        rules6.forEach((rates6) => {
            if (rates6.checked) {
                var val6 = rates6.value;
                localStorage.setItem("textValue6", val6);
            } else {
                rules6Amount += 1;
            }
        });
        
        //-------------------Rule7-----------------
        let rules7Amount = 0;

        // rules7.forEach((rates7)=>{
        //   if(!rates7.checked) {
        //     rules7Amount += 1;
        //   }
        // });

        rules7.forEach((rates7)=>{
        if(rates7.checked) {
        var val7 = rates7.value ;
        localStorage.setItem("textValue7", val7);
        }

        else{
        rules7Amount += 1;
        }
        });
        
        if (rules7Amount != rules7.length && rules5Amount != rules5.length && rules6Amount != rules6.length) {
            location.replace("./playGame.php");
        }

        if (rules7Amount == rules7.length || rules5Amount == rules5.length || rules6Amount == rules6.length) {
            alert("Please select all the  rules to enter the game");
        }

    }
}