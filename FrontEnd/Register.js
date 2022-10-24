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