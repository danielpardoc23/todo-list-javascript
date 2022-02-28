const list = [
    {
        name:'Tarea1',
        description:'Tarea número 1',
        priority:1,
        state:'created'
    },
    {
        name:'Tarea2',
        description:'Tarea número 2',
        priority:1,
        state:'doing'
    },
    {
        name:'Tarea3',
        description:'Tarea número 3',
        priority:4,
        state:'done'
    },
    {
        name:'Tarea4',
        description:'Tarea número 4',
        priority:3,
        state:'deleted'
    },
    {
        name:'Tarea5',
        description:'Tarea número 5',
        priority:4,
        state:'created'
    },
    {
        name:'Tarea6',
        description:'Tarea número 6',
        priority:3,
        state:'doing'
    },
    {
        name:'Tarea7',
        description:'Tarea número 7',
        priority:2,
        state:'done'
    },
    {
        name:'Tarea8',
        description:'Tarea número 8',
        priority:1,
        state:'deleted'
    }
]

function mostrarLista(){
    let cadena = "";
    for(let i = 0; i < list.length; i++){
        cadena += "<div class='col-lg-4 tareaListaPrincipal'>"
                        + "<ul>"
                            + "<li><h3>" + list[i].name + "</h3></li>"
                            + "<li>" + list[i].description + "</li>"
                            + "<li>Prioridad: " + list[i].priority + "</li>"
                            + "<li>Estado: " + list[i].state + "</li>"
                        + "</ul>"
                + "</div>"
    }
    document.getElementById("listaPrincipal").innerHTML = cadena;
}

function addToStatedList(state){
    cadena = '';
    for(let i = 0; i < list.length; i++){
            if(list[i].state === state){
            cadena += "<div draggable='true' class='row tarea' id='tarea'>"
                        + "<div class='col-lg-7'>"
                            + "<h5>" + list[i].name + "</h5>"
                            + "<div class='statedList'>"
                                + "<span>" + list[i].description + "</span><br>";
                                if(list[i].priority === 1){
                                    cadena += "<span>Prioridad: " + list[i].priority + "&nbsp;<button onclick='lessPriority(`" + list[i].name + "`)'>&#x2193;</button></span><br>";
                                }else if(list[i].priority === 4){
                                    cadena += "<span>Prioridad: " + list[i].priority + "&nbsp;<button onclick='morePriority(`" + list[i].name + "`)'>&#x2191;</button></span><br>"
                                }else{
                                    cadena += "<span>Prioridad: " + list[i].priority + "&nbsp;<button onclick='morePriority(`" + list[i].name + "`)'>&#x2191;</button> <button onclick='lessPriority(`" + list[i].name + "`)'>&#x2193;</button></span><br>";
                                }
                                cadena += "<span>Estado: " + list[i].state + "</span>"
                            + "</div>"
                            + "</div>"
                                + "<div class='col-lg-5'>";
                                if(list[i].state !== "deleted"){
                                    cadena += "<label id='etiqueta' for='" + list[i].name +"'>Nuevo estado: &nbsp;&nbsp;</label>"
                                + "<select id='" + list[i].name + "'>";
                                    if(list[i].state === 'created'){
                                        cadena += "<option value='created' selected>Created</option>"
                                                + "<option value='doing'>Doing</option>"
                                                + "<option value='done'>Done</option>"
                                    }else if(list[i].state === 'doing'){
                                        cadena += "<option value='created'>Created</option>"
                                                + "<option value='doing' selected>Doing</option>"
                                                + "<option value='done'>Done</option>"
                                    }else if(list[i].state === 'done'){
                                        cadena += "<option value='created'>Created</option>"
                                                + "<option value='doing'>Doing</option>"
                                                + "<option value='done' selected>Done</option>"
                                    }
                                    
                                cadena += "</select><br>"
                                        + "<button onclick='updateState(`" + list[i].name + "`)' class='btn btn-primary botonTareaEstado'>Actualizar</button><br>"
                                }
                                cadena += "<button class='btn btn-danger botonTareaEliminar' onclick='deleteTask(`" + list[i].name + "`)'>&#128465;</button>"
                            + "</div>"
                    + "</div>";
        }
    }
    let sitio = document.getElementById(state);
    sitio.innerHTML = cadena;
}

function orderList(){
    for(let i = 0; i < list.length; i++){
        for(let j = 0; j < list.length; j++){
            if(list[i].priority < list[j].priority){
                let aux = list[i];
                list[i] = list[j];
                list[j] = aux; 
            }
        }
    }
}

function addTask(){
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let prioridad = document.getElementById("prioridad").value;
    let estado = document.getElementById("estado").value;
    let valido = true;
    for(let i = 0; i < list.length; i++){
        if(list[i].name === nombre){
            valido = false;
        }
    }
    if(valido){
        let nuevaTarea = {
            name: nombre,
            description: descripcion,
            priority: prioridad,
            state: estado
        }
        list.push(nuevaTarea);
        document.getElementById("alerta").style.display = "none";
    }else{
        document.getElementById("alerta").style.display = "block";
    }
    mostrarTodasLasListas();
}

function updateState(name){
    for(let i = 0; i < list.length; i++){
        if(name === list[i].name){
            let nuevoEstado = document.getElementById(name).value;
            list[i].state = nuevoEstado;
        }
    }
    mostrarTodasLasListas();
}

function deleteTask(name){
    let ok = confirm("¿Quiere eliminar la tarea " + name + "?");
    if(ok){
        for(let i = 0; i < list.length; i++){
            if(name === list[i].name){
                if(list[i].state === "deleted"){
                    list.splice(i, 1);
                }else{
                    list[i].state = "deleted";
                }
            }
        }
    }
    mostrarTodasLasListas();
}

function deleteList(state){
    let ok = confirm("¿Quiere vaciar la lista " + state + "?");
    if(ok){
        for(let i = 0; i < list.length; i++){
            if(list[i].state === state){
                list[i].state = "deleted";
            }
        }
    }
    mostrarTodasLasListas();
}

function ocultar(state){
    let contenedor = document.getElementById(state);
    let estilos = window.getComputedStyle(contenedor);
    let display = estilos.getPropertyValue('display');
    if(display === "block"){
        contenedor.style.display = 'none';
    }else{
        contenedor.style.display = 'block';
    }
}

function morePriority(name){
    for(let i = 0; i < list.length; i++){
        if(list[i].name === name){
            list[i].priority--;
        }
    }
    mostrarTodasLasListas();
}

function lessPriority(name){
    for(let i = 0; i < list.length; i++){
        if(list[i].name === name){
            list[i].priority++;
        }
    }
    mostrarTodasLasListas();
}

function addAllStatedLists(){
    addToStatedList("created");
    addToStatedList("doing");
    addToStatedList("done");
    addToStatedList("deleted");
}

function mostrarTodasLasListas(){
    orderList();
    mostrarLista();
    addAllStatedLists();
}

mostrarTodasLasListas();