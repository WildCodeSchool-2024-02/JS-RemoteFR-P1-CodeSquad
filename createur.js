
let d1 = document.getElementById("d1");

let p1 = document.getElementById("p1");

p1.style.display= "none";
p2.style.display= "none";
p3.style.display= "none";
p4.style.display= "none";

d1.addEventListener("mouseover", () => {p1.style.display = "block";});
d1.addEventListener("mouseout", () => {p1.style.display = "none";});

d2.addEventListener("mouseover", () => {p2.style.display = "block";});
d2.addEventListener("mouseout", () => {p2.style.display = "none";});

d3.addEventListener("mouseover", () => {p3.style.display = "block";});
d3.addEventListener("mouseout", () => {p3.style.display = "none";});

d4.addEventListener("mouseover", () => {p4.style.display = "block";});
d4.addEventListener("mouseout", () => {p4.style.display = "none";});