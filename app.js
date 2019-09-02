window.addEventListener('load', () => {
    let long;
    let lat;
    let tempertureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4ce103b4d629fa5f979fd69fb275bfce`;
            fetch(api).then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const temperature = Math.floor((data.main.temp - 273.15) * 9 / 5 + 32);
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const city = data.name;
                temperatureDegree.textContent = temperature;
                tempertureDescription.textContent = description;
                locationTimezone.textContent = city;

                setIcons(icon, document.querySelector('.icon'));
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});