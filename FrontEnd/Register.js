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
    try{
        const raw_response=await
        fetch("http://localhost:8080/register", {
            method: "POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                firstname: document.getElementById("fname"),
                lastname: "Tan",
                username: "SD",
                passcode: "password",
                email:"lt042@m.m",
                sign: "pisces"
            })
        })
        if(!raw_response.ok){
            alert(`error Status: ${raw_response.status}`);
        }
        const json_data = await raw_response.json();
        comf.innerHTML = `Name: ${json_data.firstname}`;
    }catch(error){
        console.log(error);
    }
});

document.getElementById("return").addEventListener('click',async(event)=>{
    window.history.pushState(null,null,'http://127.0.0.1:5500/FrontEnd/Hori.html');
    location.href = 'http://127.0.0.1:5500/FrontEnd/Hori.html';        
});