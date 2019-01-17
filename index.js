'use strict';

let generateItemHTML = entry => {
  return `<li>
            <span class="shopping-item">${entry}</span>
            <div class="shopping-item-controls">
              <button class="shopping-item-toggle">
                <span class="button-label">check</span>
              </button>
              <button class="shopping-item-delete">
                <span class="button-label">delete</span>
              </button>
            </div>
          </li>`;
};

let addShoppingItem = entry => {
  $('.shopping-list').append(generateItemHTML(entry));
};

let removeShoppingItem = entry => {
  entry.remove();
};

let toggleChecked = entry => {
  entry.toggleClass('shopping-item__checked');
};

function main() {
  //add event
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    let item = $(event.currentTarget)
      .find('#shopping-list-entry')
      .val();
    addShoppingItem(item);
    event.target.reset();
  });

  //check event
  $('ul').on('click', '.shopping-item-toggle', function(event) {
    let item = $(this)
      .closest('li')
      .find('.shopping-item');
    toggleChecked(item);
  });

  // delete event
  $('ul').on('click', '.shopping-item-delete', function(event) {
    removeShoppingItem($(this).closest('li'));
  });
}

$(main());
