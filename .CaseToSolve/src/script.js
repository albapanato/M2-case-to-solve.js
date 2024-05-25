// url de la API-OFRECIDA EN EL CASE TO SOLVE:https:jsonplaceholder.typicode.com/albums/1/photos
// url de API-photos:https://picsum.photos/200/300
// url de API- https://lorem-json.com/api/json

//Funcionalidad botones

//agregar text botones "utilizar simbolos ASCII" -- https://read.pubwriter.com/fancy

// utilizar almenos una de cada, promesas controladas con setTimeOut, funciones(funcion flecha, funcion constructora, con parametros, con ...rest ), alguna funcion de array(recorrer array o filtrar,etc),bucle, alguna matematica simple(contador,++,-- en botones)

/**modificar HTML desde JS ejemplo:
 
    var contenido = document.getElementById("contenido");

      function obtener() {
        contenido.innerHTML = "<p>algo</p>"; // creas un parrafo
      }
 *  */


let data = []
const obtenerInfo = () => {
    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(
                    "Error al cargar la API" + respuesta.statusText
                );
            }
            return respuesta.json();
        })
        .then((info) => {
            if (!info || info.length === 0) {
                // mostrar mensaje de que la llamada a la api ha ido bien pero no hay datos
            }
            data = info
        }).catch((error) => {
            console.error("Error de carganda de la API", error);
            info.innerHTML =
                "Error, disculpe las molestias, intentelo de nuevo mas tarde";
        });
}

window.onload = () => {
    obtenerInfo()
}

// 1. Obtener datos de la API:


function mostrarDadta() {
    console.log(data)
}


async function infoApi() {
    const info = document.getElementById("contenido-info"); // gestion DOM

    //Estilo al contenedor de la API desde JS
    info.style.border = '5px solid #0b5ed7'
    info.style.borderRadius = '5px'
    info.style.padding = '20px'
    info.style.maxHeight = '450px'

    info.style.overflow = 'scroll'

    info.innerHtml = ""; // para vaciar el contenido previo
    data.forEach(element => {

        pintarElemento(element, info, true); // Utilizamos funcion para 'pintar' los elementos en el DOM

    });

    console.log('computed', window.getComputedStyle(info))
    console.log('computstyleed', info.style)


    if (!info.style.display || info.style.display === 'none' || info.innerHTML === '') {
        info.style.display = 'block';
    } else {
        console.log('entra')
        info.style.display = 'none';
    }
}

function randomPhoto() {
    const photo = document.getElementById("contenido-photo"); // gestion DOM
    photo.innerHTML = "<span> </span>";// gestion DOM

    //Estilo a la imagen desde JS


    photo.style.padding = '20px'
    photo.style.justifyContent = 'center'
    // photo.style.marginTop = '20px'

    fetch("https://picsum.photos/300")
        .then((respuesta) => {//Promesas
            if (respuesta.ok) {
                const img = document.createElement("img");// gestion DOM
                img.src = respuesta.url;// gestion DOM
                img.alt = "Random photo";// gestion DOM

                photo.innerHTML = "";// gestion DOM
                photo.appendChild(img);//agregamos hijo
            } else {
                console.error("Error al obtener la foto");
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}


function randomInfo() {

    const random = document.querySelector('#contenido-random')
    random.style.textAlign = 'center'
    random.style.width = '300px'
    random.innerHTML = '';

    const lengthArray = data.length
    const numRandom = getRandomInt(lengthArray)
    pintarElemento(data[numRandom], random)
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function crearElemento(objeto, elementoHTML, atributo, contenedor) {

    const elementoCreado = document.createElement(elementoHTML);
    const valor = objeto[atributo];
    elementoCreado.innerHTML = `${atributo}: ` + valor;
    contenedor.appendChild(elementoCreado);
}




function pintarElemento(elemento, contenedorElemento, mostrarTodosLosAtributos) {

    if (mostrarTodosLosAtributos) {
        crearElemento(elemento, 'h2', 'userId', contenedorElemento)
    }
    crearElemento(elemento, 'h3', 'id', contenedorElemento)
    crearElemento(elemento, 'h4', 'title', contenedorElemento)
    if (mostrarTodosLosAtributos) {
        crearElemento(elemento, 'p', 'body', contenedorElemento)
    }
}



function selector() {

    const contenedor = document.getElementById('div-selector')
    console.log(contenedor);

    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(' Error al cargar la APi', console.error)
            }
            return respuesta.json();
        })
        .then((data) => {
            contenedor.innerHTML = '';
            if (data) {
                data.forEach(element => {
                    console.log(data);

                    pintarElemento(element, contenedor, false, true);
                })

            }
            else {
                contenedor.innerHTML = 'has pinchado'
            }


        })
        .catch((error) => {
            console.error("Error de carga de la API", error);
            contenedor.innerHTML = "Error, disculpe las molestias, inténtelo de nuevo más tarde";
        });
}


function seleccion(event) {
    console.log(event)

    const opcionSeleccionada = event.target.value;
    const contenedor = document.getElementById('div-selector')
    contenedor.innerHTML = '';
    data.forEach((element) => {
        pintarSeleccion(element, contenedor, opcionSeleccionada);

    });



}

function pintarSeleccion(elemento, contenedorElemento, opcion) {
    console.log(opcion)

    if (opcion === 'userId') {
        crearElemento(elemento, 'p', 'userId', contenedorElemento)
    }
    if (opcion === 'id') {

        crearElemento(elemento, 'p', 'id', contenedorElemento)
    }
    if (opcion === 'body') {
        crearElemento(elemento, 'p', 'body', contenedorElemento)
    }
    if (opcion === 'title') {
        crearElemento(elemento, 'p', 'title', contenedorElemento)
    }
}