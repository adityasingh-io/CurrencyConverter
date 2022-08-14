const transferBtn = document.querySelector(".transferBtn");

// User submitted values Element
const amount = document.querySelector("#amount");
const fromEl = document.querySelector("#from");
const toEl = document.querySelector("#to");

// This Fetch is to dynamically get the Currency List for DropDown
function firstFetch() {
  const API = "72601f3aa440257571a608be";
  const url = `https://v6.exchangerate-api.com/v6/${API}/latest/INR`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const currencies = data.conversion_rates;
      addUI(currencies);
    });
}

// Running in the start to fetch currencies
firstFetch();

// Adding Options to the Currency List
function addUI(currencies) {
  Object.keys(currencies).forEach((el) => {
    fromEl.add(new Option(el, el), undefined);
    toEl.add(new Option(el, el), undefined);
  });
}

transferBtn.addEventListener("click", fetchResults);

// Get the selected currencies and their values
function fetchResults() {
  const API = "72601f3aa440257571a608be";
  const url = `https://v6.exchangerate-api.com/v6/${API}/latest/`;
  Promise.all([fetch(`${url}${fromEl.value}`), fetch(`${url}${toEl.value}`)])

    .then((responses) => {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })

    .then((data) => {
      const fromEl = data[0];
      const toEl = data[1];
      currencyCalc(fromEl, toEl);
    })

    .finally((data) => {
      console.log("this is the loader");
    });
}

function currencyCalc(from, to) {
  console.log(amount.value * from.conversion_rates[toEl.value]);
}

// Testing
