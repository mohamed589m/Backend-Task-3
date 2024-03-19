    let form = document.getElementById("form1");
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherFun();
    form.reset();
    });

    const errorField = document.getElementById("error");
    const locationField = document.getElementById("location");
    const forecastField = document.getElementById("forecast");
    const latitudeField = document.getElementById("latitude");
    const longitudeField = document.getElementById("longitude");

    let weatherFun = async () => {
    try {
        const address = document.getElementById("address").value;
        const res = await fetch("http://localhost:3000/weather?address=" + address);
        const data = await res.json();
        if (data.error) {
        errorField.innerText = data.error;
        locationField.innerText = "";
        forecastField.innerText = "";
        latitudeField.innerText = "";
        longitudeField.innerText = "";
        } else {
        locationField.innerText = data.location;
        setTimeout(() => {
            forecastField.innerText = data.forecast;
        }, 500);
        setTimeout(() => {
            latitudeField.innerText = data.latitude;
        }, 1000);
        setTimeout(() => {
            longitudeField.innerText = data.longitude;
        }, 1500);
        errorField.innerText = "";
        }
    } catch (e) {
        console.log(e);
    }
    };
