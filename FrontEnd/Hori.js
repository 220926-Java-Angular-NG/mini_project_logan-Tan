let test = document.getElementById("output");
let horo = document.getElementById("horoscope");
let comf = document.getElementById("comf");
var sign = "pisces";
document.getElementById("get").addEventListener('click',async()=>{
    try{
        const raw_response=await
        fetch("http://localhost:8080/test")
        if(!raw_response.ok){
            alert(`error Status: ${raw_response.status}`);
        }
        const json_data = await raw_response.json();
        test.innerHTML = `Name: ${json_data.firstname}`;
    }catch(error){
        console.log(error);
    }


});
document.getElementById("post").addEventListener('click',async()=>{
    try{
        const raw_response=await
        fetch("http://localhost:8080/register", {
            method: "POST", 
            body: JSON.stringify({
                firstname: "Logan",
                lastname: "Tan",
                username: "SD",
                passcode: "password",
                sign: "pisces"
            }),headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
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
document.getElementById("hori").addEventListener('click',async()=>{
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