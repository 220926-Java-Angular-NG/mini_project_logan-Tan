
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

var para = new URLSearchParams(window.location.search);
let id = para.get("ID");
let sign = para.get("Sign");
var mood;

document.getElementById("hori").addEventListener('click',async(event)=>{
    event.preventDefault();
    if(sign){
        try{
            const raw_response=await
            fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
            if(!raw_response.ok){
                alert(`error Status: ${raw_response.status}`);
            }
            const json_data = await raw_response.json();
            document.getElementById("horoscope").innerHTML = `Horoscope: ${json_data.horoscope}`;
            mood = json_data.meta.mood;
        }catch(error){
            console.log(error);
        }
        try{
            const raw_response=await
            fetch('http://localhost:8080/adjustmood', {
                method: "post",
                headers:{
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    id: `${id}`,
                    mood: `${mood}`
                })
            });
        }catch(error){
            console.log(error);
        }
    }
});

document.getElementById("getmood").addEventListener('click',async(event)=>{
    if(!mood){
        try{
            const raw_response=await
            fetch('http://localhost:8080/getmood', {
                method: "post",
                headers:{
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    id: `${id}`,
                })
            });
            const json_data = await raw_response.json();
            if(json_data.mood != undefined){
                document.getElementById("mood").innerHTML = json_data.mood;
            }else{
                document.getElementById("mood").innerHTML = "No Mood has been Found yet";
            }
        }catch(error){
            console.log(error);
        }
    } else{
        document.getElementById("mood").innerHTML = mood;
    }
});

document.getElementById("return").addEventListener('click',async(event)=>{
    window.history.pushState(null,null,'http://127.0.0.1:5500/FrontEnd/Hori.html');
    location.href = 'http://127.0.0.1:5500/FrontEnd/Hori.html';        
});