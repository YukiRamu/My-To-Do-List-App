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
      UI._itemArray.unshift(itemObj); // add a new item into itemArray
      UI.createHTML(UI._itemArray);
    }

  }

  //#2: create HTML
  static createHTML = (itemArrayParam) => {

    //when the page is first loaded, no item is stored in the localStorage. itemArray is empty
    if (itemArrayParam.length !== 0) {
      const html = itemArrayParam.map((elem) => {
        return `
          <tr>
            <th>${itemArrayParam.indexOf(elem) + 1}</th>
            <th>${elem._item}</th>
            <th>${elem._priority}</th>
            <th><i class="far fa-trash-alt delete"></i></th>
          </tr>
          `
      }).join("");
      itemTable.innerHTML = html;
      UI.storeItem(itemArrayParam);
    }

  }

  //#3 store the itemArray to localStorage
  static storeItem = (itemArray) => {
    localStorage.setItem("toDoItem", JSON.stringify(itemArray));
  }

  //#4 clear user input fields
  static clearInput = () => {
    itemText.value = "";
    priority.value = "";
  }

  //#5 delete item
  static deleteItem = (target) => {

    if (target.className.includes("delete")) {
      target.parentElement.parentElement.remove(); //Remove element from DOM

      const targetIndex = target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent - 1; //find the index of array (= item No.)
      console.log("target index is ", targetIndex);
      UI._itemArray.splice(targetIndex, 1);//delete target from itemArray
      console.log("UI._itemArray ", UI._itemArray)

      //reload the page to update item No.
      window.location.reload();

      UI.storeItem(UI._itemArray); //store the latest itemArray into localStorage

    }
  }

}

//When the window is loaded - > display current to do items
document.addEventListener("DOMContentLoaded", UI.displayItem());

//Add button - > display to do items
addBtn.addEventListener("click", (e) => {
  //e.preventDefault();  //************for form control/

  //validation check for user input
  if ((itemText.value === "") || (priority.value === "")) {
    alert("Input both to do item and priority");
    //clear input
    UI.clearInput();
    return false;
  }
  //instantiate item
  const item = new Item(itemText.value, priority.value);

  //add an item to itemArray
  UI.displayItem(item);

  //clear input
  UI.clearInput();

});

//Delete button - > delete the row
itemTable.addEventListener("click", (event) => {
  UI.deleteItem(event.target); //target property can grab one part of element from the entire set of elements
})
