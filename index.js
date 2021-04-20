/* This application covers Object-oriented programming with JavaScript */
/* Variables */
const itemText = document.getElementById("item");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("add");
const itemTable = document.getElementById("itemTable");

/* Class */
//item
class Item {
  constructor(item, priority) {
    this._item = item;
    this._priority = priority;
  }
}

//UI
class UI {
  constructor() {
    this._itemArray = [];
  }
  //methods 
  static displayItem = (itemObj) => {

    //#1: get the data from localstorage and assign it to itemArray
    UI._itemArray = JSON.parse(localStorage.getItem("toDoItem"));

    /* ================== Exception Handling ================== */
    if ((UI._itemArray === null) && (itemObj === undefined)) {
      //case1: when the page is first loaded and no item is stored in the localStorage
      UI._itemArray = Object.entries({}); //store empty array into the localStorage
      localStorage.setItem("toDoItem", JSON.stringify(UI._itemArray));
    } else if ((UI._itemArray.length !== 0) && (itemObj === undefined)) {
      //case2: when the page is just refresed after one or more item is added
      UI.createHTML(UI._itemArray);
    } else if (itemObj === undefined) {
      //case3: when the page is just refreshed after the case1 (no item is still added)
      UI.createHTML(UI._itemArray);
      /* ================== Exception Handling ================== */
    } else {
      //Normal case
      console.log("hihi ")
      UI._itemArray.unshift(itemObj); // add a new item into itemArray
      UI.createHTML(UI._itemArray);
    }

  }

  //#2: create HTML
  static createHTML = (itemArray) => {

    //when the page is first loaded, no item is stored in the localStorage. itemArray is empty
    if (itemArray.length !== 0) {
      const html = itemArray.map((elem) => {
        return `
          <tr>
            <th>${elem._item}</th>
            <th>${elem._priority}</th>
            <th><button type="button"><i class="far fa-trash-alt"></i></button></th>
          </tr>
          `
      }).join("");
      itemTable.innerHTML = html;
      UI.storeItem(itemArray);
    }

  }

  //#3 store the itemArray to localStorage
  static storeItem = (itemArray) => {
    localStorage.setItem("toDoItem", JSON.stringify(itemArray));
    console.log(localStorage);
  }
}

//When the window is loaded - > display current to do items
document.addEventListener("DOMContentLoaded", UI.displayItem());

//Add button - > display to do items
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //validation check for user input
  if ((itemText.value === "") || (priority.value === "")) {
    alert("Input both to do item and priority");
    //clear input
    itemText.value = "";
    priority.value = "";
    return false;
  }
  //instantiate item
  const item = new Item(itemText.value, priority.value);

  //add an item to itemArray
  UI.displayItem(item);

  //clear input
  itemText.value = "";
  priority.value = "";

});

//Delete button - > delete the row