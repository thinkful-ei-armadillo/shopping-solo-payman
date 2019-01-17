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

function main() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    let item = $(event.currentTarget)
      .find('#shopping-list-entry')
      .val();
    addShoppingItem(item);
  });
}

$(main());
