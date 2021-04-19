/* Variables */
const itemText = document.getElementById("item");
const priority = document.getElementById("priority");
const submitBtn = document.getElementById("submit");
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
  //methods : display item from local storage
  //************ need to be Static? */
  displayItem = () => {
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

    //#2: create HTML
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
  }
}

//store items

//Add button - > display to do items
//create an instance
const displayItem = new UI();
displayItem.displayItem();

//Delete button - > delete the row