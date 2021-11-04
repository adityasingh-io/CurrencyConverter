const transferBtn = document.querySelector(".transferBtn")

// User submitted values
const amount = document.querySelector("#amount");
const fromValue = document.querySelector("#from").value;
const toValue = document.querySelector("#to").value;

transferBtn.addEventListener("click", fetchResults)

function currencyCalc(from, to){
    console.log(amount.value * from.conversion_rates[toValue])
    console.log(from, to)
}

function fetchResults() {
    const API = "72601f3aa440257571a608be"
    const url = `https://v6.exchangerate-api.com/v6/${API}/latest/`
    Promise.all([ fetch(`${url}${fromValue}`), fetch(`${url}${toValue}`)])

    .then((responses) => {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    })

    .then((data) => {
        const fromValue = data[0];
        const toValue = data[1];
        currencyCalc(fromValue, toValue)
    })
}