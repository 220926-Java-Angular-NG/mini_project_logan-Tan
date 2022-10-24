//just used to reload if back is used
window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });



document.getElementById("post").addEventListener('click',async(event)=>{
    event.preventDefault();
    if(document.getElementById("uname").value != "" && document.getElementById("pw").value != "" && 
    document.getElementById("fname").value != "" && document.getElementById("lname") != "" && document.getElementById("email").value != ""){
        try{
            const raw_response=await
            fetch("http://localhost:8080/register", {
                method: "POST",
                headers:{
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    firstname: document.getElementById("fname").value,
                    lastname: document.getElementById("lname").value,
                    username: document.getElementById("uname").value,
                    passcode: document.getElementById("pw").value,
                    email: document.getElementById("email").value,
                    sign: document.getElementById("sign").value
                })
            })
            if(!raw_response.ok){
                alert(`error Status: ${raw_response.status}`);
            }
            const json_data = await raw_response.json();
            if(json_data.id != 0){
                window.history.pushState(null,null,'http://127.0.0.1:5500/FrontEnd/Hori.html');
                location.href = 'http://127.0.0.1:5500/FrontEnd/Hori.html';     
            }else{
                document.getElementById("comf").innerHTML = "Registration Failure, duplicate Username";
            }
        }catch(error){
            console.log(error);
        }
    } else{
        document.getElementById("comf").innerHTML = "All Fields needs to filled";
    }
});

document.getElementById("return").addEventListener('click',async(event)=>{
    window.history.pushState(null,null,'http://127.0.0.1:5500/FrontEnd/Hori.html');
    location.href = 'http://127.0.0.1:5500/FrontEnd/Hori.html';        
});

let signd = document.getElementById("sign");
function getsign(event){
    document.getElementById("sign").disabled = true;
    var date = new Date(document.getElementById("birthday").value);
    console.log(date);
    if(date != "Invalid Date"){
        var month = date.getMonth()+1;
        var day = date.getDate()+1;
        switch(month){
            case 1: // January
                if(day < 20){
                    signd.value = 'capricorn';
                }else{
                    signd.value = 'aquarius'
                }
                break;
            case 2:
                if(day < 19){
                    signd.value = 'aquarius';
                }else{
                    signd.value = 'pisces'
                }
                break;
            case 3:
                if(day < 21){
                    signd.value = 'pisces';
                }else{
                    signd.value = 'aries';
                }
                break;
            case 4:
                if(day < 19){
                    signd.value = 'aries';
                }else{
                    signd.value = 'taurus';
                }
                break;
            case 5:
                if(day < 21){
                    signd.value = 'taurus';
                }else{
                    signd.value = 'gemini';
                }
                break;
            case 6:
                if(day < 21){
                    signd.value = 'gemini';
                }else{
                    signd.value = 'cancer';
                }
                break;
            case 7:
                if(day < 23){
                    signd.value = 'cancer';
                }else{
                    signd.value = 'leo';
                }
                break;
            case 8:
                if(day < 23){
                    signd.value = 'leo';
                }else{
                    signd.value = 'virgo';
                }
                break;
            case 9:
                if(day < 23){
                    signd.value = 'virgo';
                }else{
                    signd.value = 'libra';
                }
                break;
            case 10:
                if(day < 23){
                    signd.value = 'libra';
                }else{
                    signd.value = 'scorpio';
                }
                break;
            case 11:
                if(day < 22){
                    signd.value = 'scorpio';
                }else{
                    signd.value = 'sagittarius';
                }
                break;
            case 12:
                if(day < 22){
                    signd.value = 'sagittarius';
                }else{
                    signd.value = 'capricorn';
                }
                break;
        }
    } else{
        document.getElementById("sign").disabled = false;
    }
}