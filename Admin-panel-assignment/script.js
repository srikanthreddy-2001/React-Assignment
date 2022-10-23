var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

let table = document.getElementById("table-body");
let informationDetail = document.getElementById("info-content");

let List = new XMLHttpRequest();
List.open("GET", url, true);
List.send();

List.onreadystatechange = function () {
  if (List.readyState == 4) {
    const response = JSON.parse(List.responseText);
    for (i = 0; i < response.length; i++) {
      id = response[i]["id"];
      first = response[i]["firstName"];
      last = response[i]["lastName"];
      mail = response[i]["email"];
      phone = response[i]["phone"];
      address = response[i]["address"];
      description = response[i]["description"];
      showTable(id, first, last, mail, phone, address, description);
    }
  }
};

function showTable(id, first, last, mail, phone, address, description) {
  const row = document.createElement("tr");
  row.classList.add("data-row");
  row.id = id;
  row.addEventListener("click", function () {
    let element = document.getElementsByClassName("data-row");
    for (let i = 0; i < element.length; i++) {
      element[i].style.backgroundColor = "white";
    }
    document.getElementById(id).style.backgroundColor = "lightseagreen";
    let innerName =
      "<div><b>User selected:</b>" + first + " " + last + "</div>";
    let innerDescription =
      "<div><b> Description: </b><textarea cols='40' rows='5' readonly>" +
      description +
      "</textarea></div >";
    let street = "<div><b>Address:</b>" + address["streetAddress"] + "</div>";
    let city = "<div><b>City:</b>" + address["city"] + "</div>";
    let state = "<div><b>State:</b>" + address["state"] + "</div>";
    let zip = "<div><b>Zip:</b>" + address["zip"] + "</div>";
    let innerTotal = innerName + innerDescription + street + city + state + zip;
    
    informationDetail.innerHTML = innerTotal;
    informationDetail.style.display = "block";
  });
  columnOne = document.createElement("td");
  columnOne.classList.add("col1");
  columnOne.innerText = id;
  columnTwo = document.createElement("td");
  columnTwo.classList.add("col2");
  columnTwo.innerText = first;
  columnThree = document.createElement("td");
  columnThree.classList.add("col3");
  columnThree.innerText = last;
  columnFour = document.createElement("td");
  columnFour.classList.add("col4");
  columnFour.innerText = mail;
  columnFive = document.createElement("td");
  columnFive.classList.add("col5");
  columnFive.innerText = phone;
  row.appendChild(columnTwo);
  row.appendChild(columnThree);
  row.appendChild(columnFour);
  row.appendChild(columnFive);

  table.appendChild(row);
}

const searchBox = document.getElementById("search-box");
const searchElement = document.getElementsByClassName("data-row");

searchBox.addEventListener("input", function () {
  content = searchBox.value;
  for (let i = 0; i < searchElement.length; i++) {
    name = searchElement[i].getElementsByClassName("col2")[0].innerText;
    name = name.toLowerCase();
    if (!name.includes(content)) {
      searchElement[i].style.display = "none";
    } else {
      searchElement[i].style.display = "";
    }
  }
});
