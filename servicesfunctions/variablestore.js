const apiUrlfin = 'http://localhost:3000/';
const apiUrlfine = 'https://nuance-doud.adaptable.app/';
const tunalS = "https://liveshopping.adaptable.app/"
const tunals = "http://localhost:3000/";
const cinetpay = 'https://api-checkout.cinetpay.com/v2/payment';

const requesttoBackend = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        return false
    }

    return responseData;
};