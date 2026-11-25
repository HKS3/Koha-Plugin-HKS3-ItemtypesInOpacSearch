const container = document.createElement('div');
container.className = "col-sm col-md-3 col-lg-2 order-4 order-sm-5";
container.innerHTML = `
    <label for="select_itemtype" class="visually-hidden">Search by item type:</label>
    <select id="select_itemtype" class="form-select">
    </select>
`;

const submitParent = document.getElementById('searchsubmit').parentElement;
submitParent.parentElement.insertBefore(container, submitParent);

const params = new URLSearchParams(new URL(window.location).search);
const selected = params.get('x-hks3-limit');
const values = [
    ["",          'Gesamtsuche'],
    ["BK|REF",    'Suche nach Buch'],
    ["SE",        'Suche nach Beitrag'],
    ["BK|SE|REF", 'Suche nach physischen Ressourcen'],
    ["ON",        'Suche nach elektronischen Ressourcen'],
];

const select = document.getElementById('select_itemtype');
for (const pair of values) {
    const option = document.createElement('option');
    option.value = pair[0];
    option.textContent = pair[1];
    option.selected = pair[0] === selected;
    select.append(option);
}

const form   = document.getElementById('searchform');
form.addEventListener('formdata', (ev) => {
    const data = ev.formData;
    if (!select.value) return;
    data.append('advsearch', 1);
    data.append('x-hks3-limit', select.value);
    for (const itype of select.value.split('|')) {
        data.append('limit', `mc-itype,phr:${itype}`);
    }
});
