document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'e10f5ee8a5b33d27e09a3819c0e32760';
    const cityName = '';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    $('#citySelect').on('change', function() {
        const selectedCity = $(this).val();
        const newApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`;

        $.ajax({
            url: newApiUrl,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.main && data.main.temp !== undefined) {
                    const tempCelsius = data.main.temp - 273.15;
                    const feelsLikeCelsius = data.main.feels_like - 273.15;

                    const weatherInfo = $('#weather-info');
                    weatherInfo.html(`
                        <p>City: ${data.name}</p>
                        <p>Temperature: ${tempCelsius.toFixed(2)}°C</p>
                        <p>Feels Like: ${feelsLikeCelsius.toFixed(2)}°C</p>
                        <p>Description: ${data.weather[0].description}</p>
                    `);
                } else {
                    console.error('Invalid weather data format:', data);
                }
            },
            error: function(error) {
                console.error('Error while retrieving weather data:', error);
            }
        });
    });

    $('#citySelect').trigger('change');
});
