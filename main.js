const username = document.getElementById("name");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/").then((res) => {
    res.json();
    console.log(res);
  });
});
