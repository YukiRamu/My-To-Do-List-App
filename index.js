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

//action
class UI {
  //methods : display item from local storage when the page is loaded
  static displayItem = () => {
    //test data
    const items = [{
      item: "shopping",
      priority: "medium"
    },
    {
      item: "studing JavaScript",
      priority: "high"
    },
    {
      item: "laundry",
      priority: "low"
    }]
    //#1: get the data from localstorage and assign it to itemArray
    const itemArray = items; // will be changed to getting from local storage
    UI.createHTML(itemArray);
  }

  //#2: create HTML
  static createHTML = (itemArray) => {
    const html = itemArray.map((elem) => {
      return `
        <tr>
          <th>${elem.item}</th>
          <th>${elem.priority}</th>
          <th><button type="button"><i class="far fa-trash-alt"></i></button></th>
        </tr>
        `
    }).join("");

    itemTable.innerHTML = html;
    return itemArray;
  }

}

//When the window is loaded - > display current to do items
document.addEventListener("DOMContentLoaded", UI.displayItem);

//Add button - > display to do items
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //instantiate item
  const item = new Item(itemText.value, priority.value);
  console.log(item)

});

//store items
//localStorage.setItem("toDoItem", JSON.stringify(itemArray));

//Delete button - > delete the row