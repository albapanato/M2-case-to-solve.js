//---------------- PARTE: LLAMADA A LA API ----------------------//
let data = []

const callingApi = () => {
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
    callingApi()
}

//------------------ PARTE: PINTAR Y CREAR ELEMENTOS ---------------------//

function crearElemento(objeto, elementoHTML, atributo, contenedor) {
    //logica para gestion elementos DOM para optimizar el codigo 


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
    crearElemento(elemento, 'p', 'body', contenedorElemento)
    if (mostrarTodosLosAtributos) {
        crearElemento(elemento, 'h4', 'title', contenedorElemento)
    }
}

//--------------------------PARTE: FULL API -------------------------//

const boxInfo = document.querySelector(".box-info")
const frame = document.querySelector('.wrapper-contenido-info');
const info = document.getElementById("contenido-info");

async function infoApi() {

    boxInfo.style.boxShadow = '2px 4px 12px black';
    boxInfo.style.background = '#e0b0ff'
    frame.style.boxShadow = '2px 4px 12px black';
    frame.style.background = '#090314'
    frame.style.height = '450px'
    info.style.height = '450px'
    info.innerHtml = ""; // para vaciar el contenido previo
    data.forEach(element => {
        pintarElemento(element, info, true); // Utilizamos funcion para 'pintar' los elementos en el DOM
    });
    crearArrow();
    // NOTA:  
    // console.log('computed', window.getComputedStyle(info)) -- saca mas propiedades css
    // console.log('computstyleed', info.style) -- que .style
    if (!info.style.display || info.style.display === 'none' || info.innerHTML === '') {
        info.style.display = 'block';

    } else {
        console.log('cerrado')
        boxInfo.style.background = 'none'
        boxInfo.style.boxShadow = 'none';
        frame.style.boxShadow = 'none'
        frame.style.background = 'none'
        info.style.boxShadow = 'none'
        info.style.display = 'none';
        frame.style.border = 'none';
        contenedorArrow.innerHTML = '';
    }
}

//--------------- PARTE: FLECHAS ↑ Y ↓ --------------------//

const contenedorArrow = document.querySelector('.btnArrows')

function crearArrow() { // CREAR FLECHAS
    const btnUp = document.createElement('button');
    btnUp.className = 'btn-up'
    btnUp.innerText = '↑'//meter si funciona ascii symbolos
    contenedorArrow.appendChild(btnUp);
    btnUp.onclick = () => {
        scrollDataUp()
    }
    const btnDown = document.createElement('button');
    btnDown.className = 'btn-down'
    btnDown.innerText = '↓'//meter si funciona ascii symbolos
    contenedorArrow.appendChild(btnDown);
    btnDown.onclick = () => {
        scrollDataDown()
    }
}

const desplazamientoPixeles = 340;
let posicionamientoScroll = 0;

function scrollDataUp() { // FUNCIONALIDAD FLECHAS
    console.log('arriba')
    posicionamientoScroll = Math.max(posicionamientoScroll - desplazamientoPixeles, 0)
    info.style.top = -posicionamientoScroll + 'px';
}

function scrollDataDown() {  // FUNCIONALIDAD FLECHAS
    console.log('abajo')
    const maximoScroll = info.scrollHeight - info.clientHeight;// Buscar ambos atributos
    posicionamientoScroll = Math.min(posicionamientoScroll + desplazamientoPixeles, maximoScroll);
    info.style.top = -posicionamientoScroll + 'px';
}

//--------------------------PARTE: PHOTO RANDOM ---------------------------------//

function randomPhoto() {
    const framePhoto = document.querySelector('.wrapper-contenido-photo');
    const photo = document.getElementById("contenido-photo");
    framePhoto.style.boxShadow = "2px 4px 12px black";
    framePhoto.style.background = '#e0b0ff'
    photo.style.justifyContent = 'center'
    fetch("https://picsum.photos/300")
        .then((respuesta) => {//Promesas
            if (respuesta.ok) {
                const img = document.createElement("img");// creamos elemento img
                img.src = respuesta.url;// asignamos src = url
                img.alt = "Random photo";// nombramos alt="Random photo" 
                img.style.boxShadow = '2px 4px 12px black';
                photo.innerHTML = "";// vaciamos mensaje 'Cargando imagen random...'
                photo.appendChild(img);//decimos que contenido-photo va a tener un hijo img
            } else {
                console.error("Error al obtener la foto");
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}

//----------------- PARTE: INFORMACION RANDOM ----------------//

function randomInfo() {
    const frameInfo = document.querySelector('.wrapper-contenido-random')
    const random = document.querySelector('#contenido-random')
    frameInfo.style.background = '#e0b0ff'
    frameInfo.style.boxShadow = "2px 4px 12px black";
    random.style.boxShadow = "2px 4px 12px black";
    random.style.background = '#090314'
    random.style.textAlign = 'center'; // Para centrar el mensaje siguiente
    random.innerText = 'Obteniendo informacion random de los atributos id y body de la API'
    random.style.margin = '20px'
    setTimeout(() => {

        random.innerText = ''; // vaciamos mensaje 'Obteniendo informacion random de los atributos id y title de la API'
        const lengthArray = data.length // variable con valor longitud del array
        const numRandom = sacarCalculoRandom(lengthArray) // variable con valor = metodo para hacer el calculo (longitud array)
        pintarElemento(data[numRandom], random) // llamamos a la funcion pintarElemento(array[resultado tipo number de el calculo numRandom], contenedor a ser pintado)
    }, 2000)
}


function sacarCalculoRandom(max) { // logica numero random
    return Math.floor(Math.random() * max);
}

//-------------- PARTE: SELECTOR DE LA API PARA MOSTRAR INFORMACION SELECCIONADA--------------///

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
                    // console.log(data);
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
