'use strict';

const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const results = document.querySelector('#results');
const empty = document.querySelector('#empty');
const cards = [...document.querySelectorAll('#cards .card')];
const buttons = [...filters.querySelectorAll('button')];
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
let category = 'Todos';

function render() {
  const terms = normalize(search.value).split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    const matches = (category === 'Todos' || card.dataset.cat === category) &&
      terms.every(term => normalize(card.dataset.key).includes(term));
    card.hidden = !matches;
    if (matches) count++;
  }
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.cat === category));
  results.textContent = `${count} ${count === 1 ? 'entrada' : 'entradas'} no catálogo`;
  empty.hidden = count !== 0;
}

filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-cat]');
  if (button) {
    category = button.dataset.cat;
    render();
  }
});
search.addEventListener('input', render);
document.querySelector('#clear').addEventListener('click', () => {
  search.value = '';
  category = 'Todos';
  render();
  search.focus();
});
render();
