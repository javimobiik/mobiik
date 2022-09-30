window.onload = function(e){ 
    apiPetition();
}

function apiPetition(){
    axios({
        method: 'get',
        url: "https://dog.ceo/api/breeds/image/random",
    }).then((response) => {
        console.log(response);
        document.body.style.backgroundImage = `url(${response.data.message})`;
        count();
    })

    axios({
        method: 'get',
        url: "https://randomuser.me/api/",
    }).then((response) => {
        console.log(response);
        var data = response.data.results[0];
        document.getElementById("username").innerText = data.name.first;
        document.getElementById("profile-picture").setAttribute("src", data.picture.large);
    })
}

function count(){
    var timeleft = 5;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        apiPetition();
    }
        document.getElementById("progressBar").value = 5 - timeleft;
        timeleft -= 1;
    }, 1000);
}