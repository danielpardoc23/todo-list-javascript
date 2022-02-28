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
        cadena += "<div class='col-lg-4'>"
                        + "<ul>"
                            + "<li><h3>" + list[i].name + "</h3></li>"
                            + "<li>" + list[i].description + "</li>"
                            + "<li>" + list[i].priority + "</li>"
                            + "<li>" + list[i].state + "</li>"
                        + "</ul>"
                + "</div>"
    }
    document.getElementById("listaPrincipal").innerHTML = cadena;
}

function addToStatedList(state){
    cadena = '';
    for(let i = 0; i < list.length; i++){
            if(list[i].state === state){
            cadena += "<div class='row' id='tarea'>"
                        + "<div class='col-lg-6'>"
                            + "<h5>" + list[i].name + "</h5>"
                            + "<ul>"
                                + "<li>" + list[i].description + "</li>"
                                + "<li>Prioridad: " + list[i].priority + "</li>"
                                + "<li>Estado: " + list[i].state + "</li>"
                            + "</ul>"
                            + "</div>"
                                + "<div class='col-lg-6'>"
                                + "<label id='etiqueta' for='" + list[i].name +"'>Nuevo estado: &nbsp;&nbsp;</label>"
                                + "<select id='" + list[i].name + "'>"
                                    + "<option value='created'>Created</option>"
                                    + "<option value='doing'>Doing</option>"
                                    + "<option value='done'>Done</option>"
                                + "</select><br>"
                                + "<button onclick='updateState(`" + list[i].name + "`)' class='btn btn-primary botonTareaEstado'>Actualizar estado</button><br>"
                                + "<button class='btn btn-danger botonTareaEliminar' onclick='deleteTask(`" + list[i].name + "`)'>Eliminar " + list[i].name + "</button>"
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
    mostrarTodasLasListas();
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

function addAllStatedLists(){
    addToStatedList("created");
    addToStatedList("doing");
    addToStatedList("done");
    addToStatedList("deleted");
}

function mostrarTodasLasListas(){
    mostrarLista();
    addAllStatedLists();
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
                list[i].state = "deleted";
            }
        }
    }
    mostrarTodasLasListas();
}

function deleteList(state){
    let ok = confirm("¿Quiere eliminar la lista " + state + "?");
    if(ok){
        for(let i = 0; i < list.length; i++){
            if(list[i].state === state){
                list.splice(i, 1);
            }
        }   
    }
    mostrarTodasLasListas();
}

function actualizarListas(state){
    let comparacion = state + "Nuevo";
    let nuevoEstado = document.getElementById(comparacion).value;
    for(let i = 0; i < list.length; i++){
        if(list[i].state === state){
            list[i].state = nuevoEstado;
        }
    }
    mostrarTodasLasListas();
}

mostrarTodasLasListas();