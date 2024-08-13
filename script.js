const apiKey = 'YOUR_API_KEY'; // Replace with your API key from an exchange rate provider
const apiUrl = `https://api.exchangerate-api.com/v4/latest/`;

// Fetch available currencies and populate the select elements
fetch(`${apiUrl}USD`)
    .then(response => response.json())
    .then(data => {
        const currencySelects = document.querySelectorAll('select');
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            currencySelects.forEach(select => {
                const option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                select.appendChild(option);
            });
        });
    });

function convertCurrency() {
    const amount = document.getElementById('amountInput').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    fetch(`${apiUrl}${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = amount * rate;
            document.getElementById('result').innerText = 
                `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        });
}
