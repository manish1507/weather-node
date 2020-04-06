console.log("client side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";
  fetch("/weather?address=" + search.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent =
          "temperature: " + data.temperature + " celsisus";
      }
    });
  });
});
