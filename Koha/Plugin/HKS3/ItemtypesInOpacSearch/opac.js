const container = document.createElement('div');
container.className = "col-sm col-md-3 col-lg-2 order-4 order-sm-5";
container.innerHTML = `
    <input type="hidden" name="advsearch" value="1" />
    <label for="select_itemtype" class="visually-hidden">Search by item type:</label>
    <select name="x-hks3-limit" id="select_itemtype" class="form-select">
    </select>
`;

const submitParent = document.getElementById('searchsubmit').parentElement;
submitParent.parentElement.insertBefore(container, submitParent);

const params = new URLSearchParams(new URL(window.location).search);
const selected = params.get('x-hks3-limit');
const values = [
    ["",          'Suche nach allem'],
    ["BK|REF",    'Suche nach Buch'],
    ["SE",        'Such nach Beitrag'],
    ["BK|SE|REF", 'Such nach physischen Ressourcen'],
    ["ON",        'Such nach digitalen Ressourcen'],
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
    for (const itype of select.value.split('|')) {
        data.append('limit', `mc-itype,phr:${itype}`);
    }
});
