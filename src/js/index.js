var myStorage = window.localStorage;

var select = document.getElementById('tipo_gasto');
var descItem = document.getElementById('descItem');
var priceItem = document.getElementById('priceItem');
var list = [];

document.getElementById('salvar').addEventListener('click', (e) => {
    e.preventDefault();
    add_list();
});

loadTasks();

var options = [
    { id: 1, name: 'Carboidratos' },
    { id: 2, name: 'Proteinas' },
    { id: 3, name: 'Lanche Maria' },
    { id: 4, name: 'Temperos & Molhos' },
    { id: 5, name: 'Besteiras' }
];

options.forEach(element => {
    select[element.id] = new Option(element.name, element.id)
});


function add_list() {
    let obj = { id: list.length, descItem: descItem.value, priceItem: priceItem.value };
    list.push(obj);

    descItem.value = "";
    priceItem.value = "";
    updateScreen();
    myStorage.setItem("items", JSON.stringify(list))
}

function updateScreen() {
    var lista = "<ul>"
    var total = 0;

    list.forEach((item => {

        lista += "<li id-data=" + item.id + ">" + item.descItem + 'Valor: ' + item.priceItem + "<button onclick=deleteItem(this) id-data=" + item.id + ">" + "Apagar</button>" + "</li>"
        total += parseFloat(item.priceItem);
    }))

    lista += "</ul>"

    document.getElementById("list").innerHTML = lista

    if (total == 0) {

        document.getElementById('itemsTotal').innerHTML = 'R$ 0,00';
    } else {
        document.getElementById('itemsTotal').innerHTML = 'R$ ' + total;
    }
}

function deleteItem(element) {

    list = list.filter(item => item.id != element.getAttribute("id-data"));

    updateScreen();
    myStorage.setItem("items", JSON.stringify(list))
}

function loadTasks() {

    let Itemsstr = myStorage.getItem("items");

    if (Itemsstr) {
        list = JSON.parse(Itemsstr);
    }

    updateScreen();
}
