const textarea = document.getElementById('descriptionInput');
const deadLine = document.getElementById('dateInput');
const btnAgregar = document.getElementById('submitButton');

const listaTareasHTML = document.getElementById('list');

const listaTareasCompletadas = document.createElement('ul');
listaTareasCompletadas.id = 'completedList';

let listaTareas = [];
let listaCompletados = []

// funcion agregar tareas

function agregarTareas() {
    const objetoTarea = {
        tarea: textarea.value,
        fechaLimite: deadLine.value,
    }

    listaTareas.push(objetoTarea); // añadimos el objetoTarea al array vacio llamado listaTareas

}

//funcion para cojer las tareas completadas del array listaTareas
function completarTarea(index) {
    const tareaCompletada = listaTareas.splice(index, 1)[0]; // Remueve la tarea de la lista de tareas pendientes
    listaCompletados.push(tareaCompletada); // Agrega la tarea completada a la lista de tareas completadas
    mostarListadoTareas();
}


function mostarListadoTareas() {

    listaTareasHTML.innerHTML = ''; // si no vaciamos la lista antes de añadirlo una nueva tarea se repetira la lista completa -


    listaTareas.forEach((task, index) => {
        const liElement = document.createElement('li'); // creamos elemento li
        liElement.className = 'item'; // le damos una clase

        const nameElement = document.createElement('p'); // creamos parrafo del valor del text area
        nameElement.innerText = task.tarea; // pintamos el parrafo

        const dateElement = document.createElement('p'); // creamos parrafo del valor de la fecha
        dateElement.innerText = task.fechaLimite; // pintamos el parrafo

        liElement.appendChild(nameElement);
        liElement.appendChild(dateElement);


        listaTareasHTML.appendChild(liElement)

        const btnCompletado = document.createElement('button');
        btnCompletado.innerText = 'COMPLETADO'// Funciona

        btnCompletado.onclick = () => {
            completarTarea();
            mostarListadoTareas();
            // mostrarTareasCompletadas();

        }

        listaTareasHTML.appendChild(btnCompletado);

    })

}

// function mostrarTareasCompletadas() {




// }





btnAgregar.onclick = e => {

    e.preventDefault(); // Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.

    agregarTareas();
    mostarListadoTareas();


}





