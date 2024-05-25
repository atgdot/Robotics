function init() {
    updateBackgroundImage();
    updateWeatherInfo();
}

// Function to update the background image based on the time of day
function updateBackgroundImage() {
    const hours = new Date().getHours();
    const backgroundImage = document.getElementById('backgroundImage');
    const backgroundImage2 = document.getElementById('backgroundImage2');
    
    if (hours >= 6 && hours < 25) {
        backgroundImage.src = 'Images/m.jpg'; // Change to your day image path
        backgroundImage2.src = 'Images/m.jpg'; // Change to your day image path
    }
    else if (hours >= 16 && hours < 20){
        backgroundImage.src = 'Images/IMG_20230224_185659.jpg'; // Change to your day image path
        backgroundImage2.src = 'Images/IMG_20230224_185659.jpg'; 
    } 
    else {
        backgroundImage.src = 'Images/Night.png'; // Change to your night image path
        backgroundImage2.src = 'Images/Night.png'; // Change to your night image path
    }
}

// Function to update the current time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('currentTime').innerText = `${hours}:${minutes} | H32° L19°`;
}
function updateWeatherInfo() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'arduinoP&T_data.csv', false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                
                // Parse CSV data
                const data = parseCSV(allText);
                const lastRow = data[data.length - 1];
                console.log(lastRow);
                
                document.getElementById('temperature').innerText = `${lastRow['Temperature']}°C`;
                document.getElementById('pressure').innerText = `${lastRow['Pressure']}`;
                document.getElementById('humidity').innerText = `${lastRow['Humidity']}`;
                document.getElementById('lightIntensity').innerText = `${lastRow['Light Intensity']}`;
            }
        }
    };
    rawFile.send(null);
}


// Utility function to parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const data = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
    return data;
}
// Initial calls to update the time and weather info
// updateBackgroundImage();
updateTime();
// updateWeatherInfo();

// Update the time every minute
setInterval(updateTime, 60000);

// Optionally, update the weather info periodically
// setInterval(updateWeatherInfo, 10000); // Every 10 minutes
