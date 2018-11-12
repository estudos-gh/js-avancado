var list = [
    { "desc": "rice", "amount": "1", "value": "5.40" },
    { "desc": "beer", "amount": "12", "value": "1.99" },
    { "desc": "meat", "amount": "1", "value": "15.00" }   
];

function getTotal (list) {
    var total = 0;
    for(var key in list) {
        total += list[key].value * list[key].amount;
    }

    return total;
}

function setList(list) {
    var table = '<thead class="thead-default">\
        <tr>\
            <th>Descrição</th>\
            <th>Quantidade</th>\
            <th>Valor</th>\
            <th>Ação</th>\
        </tr>\
    </thead>';

    table += '<tbody>';

    for(var key in list) {
        table += '<tr>\
            <td scope="row">'+formatDesc(list[key].desc)+'</td>\
            <td>'+list[key].amount+'</td>\
            <td>'+formatValue(list[key].value)+'</td>\
            <td><button onclick="setUpdate('+key+');" class="btn btn-default">Edit</button> | <button onclick="deleteData('+key+');" class="btn btn-default">Delete</button></td>\
        </tr>';
    }

    table += '<tr>\
            <td scope="row"colspan="2">Total</td>\
            <td colspan="2">'+formatValue(getTotal(list))+'</td>\
        </tr>';

    table += '</tbody>';

    document.getElementById('listTable').innerHTML = table;
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatAmount(value) {
    return parseInt(value);
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "R$ " + str;

    return str;
}

function addData() {
    if(!validation()) {
        return ;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc": desc, "amount": amount, "value": value})

    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = '';
}

function updateData() {
    if(!validation()) {
        return ;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc": desc, "amount": amount, "value": value};

    resetForm();
    setList(list);
}

function deleteData(id) {
    if(confirm("Delete this item?")) {
        if (id === list.length - 1) {
            list.pop(); // Apaga o último elemento
        } else if ( id === 0 ) {
            list.shift(); //Apaga o primeiro elemento
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);

            list = arrAuxIni.concat(arrAuxEnd);

        }
    
        setList(list);
    }
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    var errors = "";
    document.getElementById("errors").style.display = "none";

    if(desc === "") {
        errors += "<p>Fill out description</p>";
    }

    if(amount === "") {
        errors += "<p>Fill out amount</p>";
    }else if(amount != parseInt(amount)) {
        errors += "<p>Fill out a valid amount</p>";
    }

    if(value === "") {
        errors += "<p>Fill out value</p>";
    }else if(value != parseFloat(value)) {
        errors += "<p>Fill out a valid value</p>";
    }

    if(errors != "") {
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").innerHTML = "<h3>Error: </h3>" + errors;
        return 0;
    }else {
        return 1;
    }
}

setList(list);
