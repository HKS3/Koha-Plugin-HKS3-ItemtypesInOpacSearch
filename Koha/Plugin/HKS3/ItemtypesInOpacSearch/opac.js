const container = document.createElement('div');
container.className = "col-sm col-md-3 col-lg-2 order-4 order-sm-5";
container.innerHTML = `
    <input type="hidden" name="advsearch" value="1" />
    <label for="select_itemtype" class="visually-hidden">Search by item type:</label>
    <select id="select_itemtype" class="form-select">
        <option value="">Suche nach allem</option>
        <option value="BK|REF">Suche nach Buch</option>
        <option value="SE">Such nach Beitrag</option>
        <option value="BK|SE|REF">Such nach physischen Ressourcen</option>
        <option value="ON">Such nach digitalen Ressourcen</option>
    </select>
`;

const submitParent = document.getElementById('searchsubmit').parentElement;
submitParent.parentElement.insertBefore(container, submitParent);

const form   = document.getElementById('searchform');
const select = document.getElementById('select_itemtype');

form.addEventListener('formdata', (ev) => {
    const data = ev.formData;
    if (!select.value) return;
    for (const itype of select.value.split('|')) {
        data.append('limit', `mc-itype,phr:${itype}`);
    }
});
