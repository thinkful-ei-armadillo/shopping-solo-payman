'use strict';

const STORE = {
  items: [],
  hideChecked: false
};

function generateItemElement(item) {
  return `
    <li class="js-item-index-element" data-item-index="${item.id}">
      <span class="shopping-item js-shopping-item ${
        item.checked ? 'shopping-item__checked' : ''
      }">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  let items = [...shoppingList];
  if (STORE.hideChecked) {
    items = items.filter(function(element) {
      return element.checked === false;
    });
  }

  const itemsHTML = items.map(item => generateItemElement(item));

  return itemsHTML.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  STORE.items.push({ name: itemName, checked: false, id: cuid() });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
  renderShoppingList();
}

function deleteListItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function getItemIndexFromElement(item) {
  const itemID = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');

  STORE.items.find(i => i.id === itemID);

  return -1;
}

function toggleHideChecked() {
  STORE.hideChecked = !STORE.hideChecked;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

function handleClickCheckedFilter() {
  $('.js-hide-checked').click(event => {
    toggleHideChecked();
    renderShoppingList();
  });
}
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleClickCheckedFilter();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
