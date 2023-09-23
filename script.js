let containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "container-fluid");
containerDiv.setAttribute("id", "mainClass");
let rowdiv = document.createElement("div");
rowdiv.setAttribute("class", "row m-1 mt-2 gy-2");
rowdiv.setAttribute("id", "rowdiv");
containerDiv.appendChild(rowdiv);
document.body.appendChild(containerDiv);

let namearray = [];
let capitalarray = [];
let regionarray = [];
let codearray = [];
let flagarray = [];

fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((country) => {
      namearray.push(country.name.common);
      capitalarray.push(country.capital);
      regionarray.push(country.region);
      codearray.push(country.cca3);
      flagarray.push(country.flags.png);
    });
    for (let i = 0; i < namearray.length; i++) {
      let coldiv = document.createElement("div");
      coldiv.setAttribute("class", "col-lg-4 col-sm-12");
      rowdiv.appendChild(coldiv);
      let carddiv = document.createElement("div");
      carddiv.setAttribute("class", "card text-center");
      coldiv.appendChild(carddiv);
      let namediv = document.createElement("div");
      namediv.setAttribute("class", "card-header bg-dark text-white");
      namediv.textContent = `${namearray[i]}`;
      carddiv.appendChild(namediv);
      let bodydiv = document.createElement("div");
      bodydiv.setAttribute("id", `body${i}`);
      bodydiv.setAttribute("class", "card-body text-white fw-medium");
      bodydiv.setAttribute(
        "style",
        "background-image: linear-gradient(to right,#D8C6A1,#445655);"
      );

      let img = document.createElement("img");
      img.setAttribute("src", `${flagarray[i]}`);
      img.setAttribute("height", "200px");
      img.setAttribute("width", "75%");
      bodydiv.appendChild(img);

      let p1 = document.createElement("p");
      p1.setAttribute("class", "card-text mt-4");
      p1.textContent = `Capital : ${capitalarray[i]}`;
      bodydiv.appendChild(p1);
      let p2 = document.createElement("p");
      p2.setAttribute("class", "card-text");
      p2.textContent = `Region : ${regionarray[i]}`;
      bodydiv.appendChild(p2);
      let p3 = document.createElement("p");
      p3.setAttribute("class", "card-text");
      p3.textContent = `Country Code : ${codearray[i]}`;
      bodydiv.appendChild(p3);
      let a = document.createElement("a");
      a.setAttribute("id", `${i}`);
      a.setAttribute(
        "class",
        "btn btn-primary border border-light text-white fw-medium"
      );
      a.textContent = `Click for Weather`;
      bodydiv.appendChild(a);
      carddiv.appendChild(bodydiv);
    }

    for (let i = 0; i < namearray.length; i++) {
      let id0 = document.getElementById(`${i}`);
      let bid = document.getElementById(`body${i}`);
      id0.addEventListener("click", () =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${capitalarray[i]}&appid=37535e05ad275688e5f46c32751e7a40`
        )
          .then((response) => response.json())
          .then((data) => {
            id0.removeAttribute("class", "btn-primary");
            id0.setAttribute(
              "class",
              "btn border border-light text-white fw-medium"
            );
            id0.innerText = `Main : ${data.weather[0].main},
           Description: ${data.weather[0].description},
           Temperature : ${data.main.temp}K,
           Pressure : ${data.main.pressure}hPa,
           Humidity : ${data.main.humidity}%`;
            let a = document.createElement("button");
            a.setAttribute("class", "btn btn-primary m-2 d-block mx-auto");
            a.setAttribute("id", `id${i}`);
            a.textContent = "back";
            bid.appendChild(a);
            let id1 = document.getElementById(`id${i}`);
            id1.addEventListener("click", () => {
              id0.innerText = "Click for Weather";
              id0.setAttribute(
                "class",
                "btn-primary btn border border-light text-white fw-medium"
              );
              bid.removeChild(a);
            });
          })
          .catch(() => {
            id0.innerText = "Data not found";
            let a = document.createElement("button");
            a.setAttribute("class", "btn btn-primary m-2 d-block mx-auto");
            a.setAttribute("id", `id${i}`);
            a.textContent = "back";
            bid.appendChild(a);
            let id1 = document.getElementById(`id${i}`);
            id1.addEventListener("click", () => {
              id0.innerText = "Click for Weather";
              id0.setAttribute(
                "class",
                "btn-primary btn border border-light text-white fw-medium"
              );
              bid.removeChild(a);
            });
          })
      );
    }
  });
