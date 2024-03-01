let toDoDOM = document.querySelector("#task");
let ulDOM = document.querySelector("#list");
let toDoList = [];

function newElement() {
  if (toDoDOM.value !== undefined && toDoDOM.value !== "") {
    let liDOM = document.createElement("li");
    let spanDOM = document.createElement("span");

    spanDOM.textContent = "x";
    spanDOM.classList.add("close");
    spanDOM.addEventListener("click", (event) => removeElement(event)); //Tıklandığında fonksiyonu çağırıyor.

    liDOM.textContent = toDoDOM.value;
    liDOM.appendChild(spanDOM);
    liDOM.addEventListener("click", (event) =>
      checkedElement(event, "checked")
    );
    ulDOM.appendChild(liDOM);

    $(".success").toast("show"); // Başarılı mesajı ekranda gösterilir.

    toDoList.push(toDoDOM.value);
    let stringfyToDoList = JSON.stringify(toDoList);
    localStorage.setItem("toDoList", stringfyToDoList);
    toDoDOM.value = "";
  } else {
    $(".error").toast("show"); // Başarısız mesajı ekranda gösterilir.
  }
}

function removeElement(event) {
  let spanDOM = event.target;
  let liDOM = spanDOM.parentElement;
  let liDOMText = liDOM.textContent.trim();
  liDOM.classList.add("d-none"); // liDOM.remove(); da kullanılabilirdi.

  let locStorage = localStorage.getItem("toDoList");
  if (locStorage) {
    toDoList = JSON.parse(locStorage);
    let index = toDoList.indexOf(liDOMText.slice(0, -1));
    if (index !== -1) {
      toDoList.splice(index, 1);
      let stringfyToDoList = JSON.stringify(toDoList);
      localStorage.setItem("toDoList", stringfyToDoList);
    }
  }
}

function checkedElement(event, className) {
  let liDOM = event.target;
  if (liDOM.classList.contains(className)) {
    liDOM.classList.remove(className);
  } else {
    liDOM.classList.add(className);
  }
}

window.onload = function () {
  let locStorage = localStorage.getItem("toDoList");
  if (locStorage) {
    toDoList = JSON.parse(locStorage);
    toDoList.forEach(function (item) {
      let liDOM = document.createElement("li");
      let spanDOM = document.createElement("span");
      spanDOM.textContent = "x";
      spanDOM.className = "close";
      spanDOM.addEventListener("click", (event) => removeElement(event));

      liDOM.textContent = item;
      liDOM.appendChild(spanDOM);
      liDOM.addEventListener("click", (event) =>
        checkedElement(event, "checked")
      );
      ulDOM.appendChild(liDOM);
    });
  }
};
