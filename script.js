document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();
    
    //setTimeout(showInfo,5000);

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo();

        showWarning('carregando...');
        document.querySelector('.spinner-border').style.display= 'block';

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&appid=30adbdaeef18d4b04ed368bdfe15ef2e&units=metric&lang=pt_br`);
        
        // transformando em objeto
        let json = await results.json();

        console.log(json);

        if(json.cod === 200){

            //Pega as informações da API
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                temp_max: json.main.temp_max,
                temp_min: json.main.temp_min,                
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                //windDirectionName: json.wind.direction.name,
                sky: json.weather[0].description,
            });

           
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
            document.querySelector('.spinner-border').style.display= 'none';
        }

    } else {
        //limpa o resultado se vazio
        clearInfo();
    }  
});




//habilita Informações em tela
function showInfo (obj){
    showWarning('');
    document.querySelector('.spinner-border').style.display= 'none';
    
    document.querySelector('.titulo').innerHTML = `${obj.name},${obj.country}`;
    document.querySelector('.tempInfo').innerHTML = `${Math.round(obj.temp)} <sup>ºC<sup>`;
    document.querySelector('.tMax').innerHTML = `max: ${Math.round(obj.temp_max)} <sup>ºC</sup><br>`;
    document.querySelector('.tMin').innerHTML = `min: ${Math.round(obj.temp_min)} <sup>ºC</sup>`;   
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    document.querySelector('.sky').innerHTML = `${obj.sky}`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;
    document.querySelector('.rosaDoVento').innerHTML = ` ${orientationAng(obj.windAngle)}`;
    document.querySelector('.resultado').style.display = 'block';
    

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

//Função para determinar direção vento
function orientationAng(angulo) {


   // angulo = obj.windAngle-90;

    if((angulo === 0) || (angulo === 360) || (angulo > 0) && (angulo < 45)){
        return "Norte";
    }else if((angulo > 315) && (angulo < 360)){
        return "Norte";
    }else if ((angulo > 45) && (angulo < 135) || (angulo === 90)){
        return "Leste";
    }else if ((angulo === 180) || (angulo > 135) && (angulo < 225)){
        return "Sul";
    }else if((angulo === 270) || (angulo > 225) && (angulo < 315)){
        return "Oeste";
    } 
 
    if (angulo === 45) {
     return "Nordeste";
    }
    if (angulo === 135) {
     return "Sudeste";
    }
    if (angulo === 225) {
     return "Sudoeste";
    }
    if (angulo === 315) {
     return "Noroeste";
    }
 
 }