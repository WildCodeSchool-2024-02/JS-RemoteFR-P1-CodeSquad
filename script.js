/*Menu Burger*/

const links = document.querySelectorAll("nav li");

icons.addEventListener("click", () => {
  nav.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});


/*-----Formulaire-----*/

const message =
  "Merci pour votre message. Nous allons en prendre connaissance rapidement !";

document
  .getElementById("formulaire_Contact")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert(message);
  });