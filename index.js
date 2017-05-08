(function() {
  'use strict';

// Read
const lists = [
  {
    title: 'My List',
    tasks: ['Do your homework', 'Go to school', 'Eat dinner', 'Go to the gym', 'Write in journal']
  },
  {
    title: 'Your List',
    tasks: ['Go shopping', 'Go to soccer game']
  }
];

const generateItem = function(value) {
  const $itemDiv = $('<div>').addClass('item');
  const $li = $('<li>').text(value);
  const $btnContainer = $('<div>');
  const $editBtn = $('<button>').addClass('btn edit-btn');
  const $icon = $('<i>').addClass('fa fa-pencil');

  $itemDiv.append($li);
  $editBtn.append($icon);
  $btnContainer.append($editBtn);
  $itemDiv.append($btnContainer);

  return $itemDiv;
}

const createAddForm = function() {
  const $toolsDiv = $('<div>').addClass('tools');
  const $form = $('<form>');
  const $input = $('<input>')
    .attr('type', 'text')
    .attr('placeholder', 'Add item')
    .attr('autocomplete', 'off');
  const $button = $('<button>')
    .attr('type', 'submit')
    .addClass('btn add-btn')
    .text('Add');

  $form.append($input);
  $form.append($button);
  $toolsDiv.append($form);

  return $toolsDiv;
}

const createAddPrompt = function() {
  const $button = $('<button>').addClass('add-item').text('Add an item...');

  return $button;
}

const createList = function(list) {
  const $listDiv = $('<div>').addClass('list');
  const $headerDiv = $('<div>').addClass('list-header');
  const $h2 = $('<h2>').text(list.title);
  const $list = $('<ul>');

  $headerDiv.append($h2);
  $listDiv.append($headerDiv);

  for (const item of list.tasks) {
    const $divContainer = generateItem(item);

    $list.append($divContainer);
  }

  $listDiv.append($list);
  $listDiv.append(createAddPrompt());

  return $listDiv;
}

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

const populateLists = function(lists) {
  for (const list of lists) {
    const $list = createList(list);

    $('.all-lists').append($list);
  }
}

populateLists(lists);

// Update
const startEdit = function($target) {
  const val = $target.children('li').text();

  $target.children('li').remove();
  $target.prepend('<input>').attr('type', 'text');
  $target.children('input').val(val);
  $target.children('div').children('button.edit-btn').text('Update');
  $target.addClass('editing');
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

const completeEdit = function($target, val) {
  $target.removeClass('editing');
  $target.children('div').children('button.edit-btn').text('Edit');
  $target.children('input').remove();
  $target.prepend($('<li>').text(val));
}

const inHover = function() {
  if ($(this).hasClass('editing')) {
    return;
  }

  const $button = $('<button>');
  const $i = $('<i>');

  $i.addClass('fa');
  $i.addClass('fa-pencil');
  $button.append($i);
  $button.addClass('btn edit-btn');
  $(this).append($button);
}

const outHover = function() {
  $('.edit-btn').remove();
}

$('.item').hover(inHover, outHover);

$('ul').on('click', '.edit-btn', (e) => {
  let $button = $(e.target);

  if ($button.hasClass('fa')) {
    $button = $button.parents('button');
  }

  $button.parents('.item').addClass('editing');
  $button.siblings('.hide').removeClass('hide');
  $button.siblings('li').addClass('hide');
  $('.edit-btn').remove();
});

$('button.add-item').on('click', (e) => {
  $(e.target).addClass('hide');
  $(e.target).siblings('form').removeClass('hide');
});

$('button#exit-edit-form').on('click', (e) => {
  e.preventDefault();

  const $item = $(e.target).parents('.item');

  $item.removeClass('editing');
  $item.children('li').removeClass('hide');
  $item.children('form').addClass('hide');
});

$('button#exit-add-form').on('click', (e) => {
  e.preventDefault();

  const $tools = $(e.target).parents('.tools');

  $tools.children('.add-item').removeClass('hide');
  $tools.children('form').addClass('hide');
});

})();
