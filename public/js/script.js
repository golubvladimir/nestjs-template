window.onload = function() {
  addOpenEvents();

  // add event to filter
  const filter = document.querySelector('.filter__active');

  filter.addEventListener('change', async (event) => {
    const { data } = await axios.get(
      '/data',
      {
        params: {
          filter: event.target.value
        }
      }
    )

    const tableBody = document.querySelector('.table__body');

    tableBody.innerHTML = showItems(data);

    addOpenEvents();
  });
}

function showItems(items) {
  let text = ''

  items.map(item => {
    text += `<div
      class="table__row"
    >
      <div class="table__cell">
          ${ item.id }
      </div>
      <div class="table__cell">
          ${ item.balance }
      </div>
      <div class="table__cell">
          ${ item.name }
      </div>
      <div class="table__cell">
          ${ item.email }
      </div>
    </div>`;

    if (item.items) {
      text += `<div class="table__body" style="display: none;">
        ${ showItems(item.items) }
      </div>`
    }
  });

  return text;
}

function addOpenEvents() {
  const rows = document.getElementsByClassName('table__row');

  for(let i = 1; i < rows.length; i++) {
    if (rows[i].nextElementSibling && rows[i].nextElementSibling.className === 'table__body') {
      rows[i].addEventListener('click', () => {
        if (rows[i].nextElementSibling.style.display === 'none') {
          rows[i].nextElementSibling.style.display = 'block';
        } else {
          rows[i].nextElementSibling.style.display = 'none';
        }
      })
    }
  }
}