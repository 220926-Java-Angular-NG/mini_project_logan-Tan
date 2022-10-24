let test = document.getElementById("output");
let horo = document.getElementById("horoscope");
let comf = document.getElementById("comf");
var sign = "pisces";

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

document.getElementById("login").addEventListener('click',async(event)=>{
    event.preventDefault();
    if(document.getElementById("uname").value == "" || document.getElementById("pw").value == ""){
        console.log("Fields can't be empty")
    }else{
        try{
            const raw_response=await
            fetch("http://localhost:8080/login", {
                method: "POST",
                headers:{
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    username: `${document.getElementById("uname").value}`,
                    passcode: `${document.getElementById("pw").value}`
                })
            })
            if(!raw_response.ok){
                alert(`error Status: ${raw_response.status}`);
            }
            const json_data = await raw_response.json();
            if(json_data.id != 0){ // id 0 is never used
                var para = new URLSearchParams();
                para.append("ID",`${json_data.id}`);
                para.append("Sign",`${json_data.sign}`);
                window.history.pushState(null,null,'http://127.0.0.1:5500/FrontEnd/Hompage.html');
                location.href = 'http://127.0.0.1:5500/FrontEnd/Hompage.html?' + para.toString();
            }else{
                document.getElementById("out").innerHTML = "Wrong Username or password"
            }
        }catch(error){
            console.log(error);
        }
    }
});

document.getElementById("Register").addEventListener('click',async(event)=>{
    window.history.pushState(null,null,'http://127.0.0.1:5500/FrontEnd/Register.html');
    location.href = 'http://127.0.0.1:5500/FrontEnd/Register.html';

});
document.getElementById("hori").addEventListener('click',async(event)=>{
    event.preventDefault();
    if(sign){
        try{
            const raw_response=await
            fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${this.sign}/today`)
            if(!raw_response.ok){
                alert(`error Status: ${raw_response.status}`);
            }
            const json_data = await raw_response.json();
            horo.innerHTML = `Name: ${json_data.horoscope}`;
        }catch(error){
            console.log(error);
        }
    }

});