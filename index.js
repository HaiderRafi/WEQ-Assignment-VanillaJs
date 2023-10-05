let tableHospital = document.querySelector("#tableHospital tbody");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let countDiv = document.querySelector("#count");
let hospitalData; // Store the fetched data globally

let count = 1;
countDiv.innerHTML = count;

//api function
async function apiCall() {
  let temp = await fetch("WEQ.json");
  hospitalData = await temp.json();
  createTable(hospitalData); //calling table function
}

apiCall();

function createTable(hospitalData) {
  // Clear existing table rows
  tableHospital.innerHTML = "";

  hospitalData?.slice(count * 10 - 10, count * 10).map((data) => {
    //pagination by using slice
    tableHospital.innerHTML += `
        <tr>
        <td>${data["Sr. No."]}</td>
        <td>${data.Hospital}</td>
        <td>${data.City}</td>
        <td>${data.State}</td>
        <td>${data.Address}</td>
        <td>${data.Pin}</td>
        </tr>`;
  });
}

prev.addEventListener("click", () => {
  if (count > 1) {
    count--;
    countDiv.innerHTML = count;
    createTable(hospitalData); // Pass hospitalData as an argument
  }
});

next.addEventListener("click", () => {
  if (count < Math.ceil(hospitalData.length / 10)) {
    count++;
    countDiv.innerHTML = count;
    createTable(hospitalData); // Pass hospitalData as an argument
  }
});

// Initial table creation
createTable(hospitalData);
