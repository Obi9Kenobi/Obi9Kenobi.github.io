document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    name: form.name.value,
    surname: form.surname.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    rating1: Number(form.rating1.value),
    rating2: Number(form.rating2.value),
    rating3: Number(form.rating3.value),
  };

  console.log(data);

  displayData(data);
  showSuccessPopup();
});

function bindSlider(sliderId, outputId) {
  const slider = document.getElementById(sliderId);
  const output = document.getElementById(outputId);

  output.textContent = slider.value;

  slider.addEventListener("input", () => {
    output.textContent = slider.value;
  });
}

bindSlider("rating1", "r1Value");
bindSlider("rating2", "r2Value");
bindSlider("rating3", "r3Value");

function displayData(data) {
  const avg =
    (data.rating1 + data.rating2 + data.rating3) / 3;

  const result = document.getElementById("formResult");
  result.innerHTML = `
    Name: ${data.name}<br>
    Surname: ${data.surname}<br>
    Email: ${data.email}<br>
    Phone number: ${data.phone}<br>
    Address: ${data.address}<br>
    <strong class="avg-value">${avg.toFixed(1)}</strong>`;

  colorAverage(avg);
}

function colorAverage(avg) {
  const avgEl = document.querySelector(".avg-value");

  if (avg < 4) {
    avgEl.style.color = "red";
  } else if (avg < 7) {
    avgEl.style.color = "orange";
  } else {
    avgEl.style.color = "green";
  }
}
function showSuccessPopup() {
  const popup = document.createElement("div");
  popup.className = "success-popup";
  popup.textContent = "Form submitted successfully!";

  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 3000);
}
