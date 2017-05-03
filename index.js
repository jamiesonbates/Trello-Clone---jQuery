(function() {
  'use strict';

// Read
const tasks = ['Do laundry', 'Do my homework', 'Think of 5 project ideas', 'Read tomorrow\'s lecture', 'Find time to shower', 'Do 30 minutes of Code Wars'];

const generateItem = function(value) {
  const $divContainer = $('<div>').addClass('item');
  const $li = $('<li>').text(value);
  const $divBtn = $('<div>');
  const $editBtn = $('<button>').text('Edit').addClass('edit-btn');
  const $delBtn = $('<button>').text('Delete').addClass('del-btn');

  $divContainer.append($li);
  $divBtn.append($editBtn);
  $divBtn.append($delBtn);
  $divContainer.append($divBtn);

  return $divContainer;
}

const populateList = function() {
  const $list = $('ul');

  for (const item of tasks) {
    const $divContainer = generateItem(item);

    $list.append($divContainer);
  }
}

populateList();

const generateForm = function(type, value) {
  const $form = $('<form>').attr('id', 'form-action');
  const $input = $('<input>').attr('type', 'text');
  const $button = $('<button>').attr('type', 'submit').addClass('add-btn').text(`${type}`);

  $input.attr('placeholder', `${type} item`);
  $input.attr('id', 'item-action');
  $input.attr('autocomplete', 'off');
  $input.val(value);
  $form.append($input);
  $form.append($button);

  return $form;
}

// Update
const startEdit = function($target) {
  const val = $target.children('li').text();

  $target.children('li').remove();
  $target.prepend('<input>').attr('type', 'text');
  $target.children('input').val(val);
  $target.children('div').children('button.edit-btn').text('Update');
  $target.addClass('editing');
}

const completeEdit = function($target, val) {
  $target.removeClass('editing');
  $target.children('div').children('button.edit-btn').text('Edit');
  $target.children('input').remove();
  $target.prepend($('<li>').text(val));
}

$('ul').on('click', '.edit-btn', (e) => {
  const $target = $(e.target).parents('.item');
  // Click selected btn
  if ($target.hasClass('editing')) {
    const val = $target.children('input').val();

    completeEdit($target, val);
  }
  else if ($('.editing').length > 0) {
    const $editing = $('.editing');
    const val = $editing.children('input').val();

    completeEdit($editing, val);
    startEdit($target);
  }
  else {
    startEdit($target);
  }
});

// Delete
const deleteItem = function() {
  $(this).parents('.item').remove();
}

$('ul').on('click', '.del-btn', deleteItem);

// Create
$('#add-item').submit((e) => {
  const $list = $('ul');
  const inputVal = $('#item-to-add')[0].value;
  const $item = generateItem(inputVal);

  $list.append($item);
  $('#item-to-add')[0].value = '';
  e.preventDefault();
});

})();
