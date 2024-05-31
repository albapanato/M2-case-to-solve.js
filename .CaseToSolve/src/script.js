//---------------- PARTE DEL CODIGO QUE LLAMADA A LA API ----------------------//
let data = [] // Almacenaremos la informacion de la API en este array vacio

/** FUNCION REFACTORIZADA, promesas dependientes de callingApi():  
 * fuction infoApi()
 * fuction randomApi()
 * fuction selector()
 * fuction seleccion(event)
  */


const callingApi = () => {

    fetch("https://jsonplaceholder.typicode.com/users/1/posts")

        // concatenacion de promesas
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
                console.log(`La llamada a sido realizada con exito, pero la api esta vacia, compruebe que la api con url "https://jsonplaceholder.typicode.com/users/1/posts" no ha sido borrada`)
                // mostrar mensaje de que la llamada a la api ha ido bien pero no hay datos
            }
            data = info
        })

        .catch((error) => {

            console.error("Error de carganda de la API", error);
            info.innerHTML =
                "Error, disculpe las molestias, intentelo de nuevo mas tarde";

        });
}

window.onload = () => {

    callingApi()

}

//-----PARTE DEL CODIGO PARA MOSTRAR LA TODA LA API Y PARA GESTIONAR LA ANIMACION DEL CONTENEDOR---------//

const boxInfo = document.querySelector(".box-info")
const frame = document.querySelector('.wrapper-contenido-info');
const info = document.getElementById("contenido-info");


async function infoApi() {

    boxInfo.style.boxShadow = '2px 4px 12px black';
    boxInfo.style.background = '#190065'
    boxInfo.style.height = '700px'
    frame.style.borderRadius = '35px 0px 35px 0px'
    frame.style.opacity = '95%'
    frame.style.boxShadow = '2px 4px 12px black';
    frame.style.background = '#9a9aeb'
    frame.style.display = 'block'
    frame.style.height = '550px'
    frame.style.transition = 'all 1.3s'
    info.style.transition = 'all 1.3s'
    info.style.height = '550px'
    info.innerHtml = ""; // para vaciar el contenido previo
    contenedorArrow.style.height = '600px';
    contenedorArrow.style.transition = 'all 1.3s'

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

        console.log('closing...')
        boxInfo.style.height = '80px'
        boxInfo.style.transition = 'all 1.3s'
        boxInfo.style.background = 'none'
        boxInfo.style.boxShadow = 'none';
        frame.style.height = '0'
        frame.style.boxShadow = 'none'
        frame.style.opacity = '0'
        frame.style.background = 'none'
        info.style.transition = 'all 1.1s'
        frame.style.transition = 'all 1.1s'
        info.style.boxShadow = 'none'
        info.style.display = 'none';
        frame.style.border = 'none';
        contenedorArrow.style.height = '0';
        contenedorArrow.innerHTML = '';
        contenedorArrow.style.transition = 'all 1.1s'

    }
}

//--------------- PARTE DEL CODIGO DE LAS FLECHAS ↑ Y ↓ --------------------//

const contenedorArrow = document.querySelector('.btnArrows')

function crearArrow() { // CREAR FLECHAS


    const btnUp = document.createElement('button');
    btnUp.className = 'btn-up'
    btnUp.innerText = '↑'
    contenedorArrow.appendChild(btnUp);


    btnUp.onclick = () => {
        scrollDataUp()
    }
    const btnDown = document.createElement('button');
    btnDown.className = 'btn-down'
    btnDown.innerText = '↓'
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
    const maximoScroll = info.scrollHeight - info.clientHeight;
    posicionamientoScroll = Math.min(posicionamientoScroll + desplazamientoPixeles, maximoScroll);
    info.style.top = -posicionamientoScroll + 'px';

}

//------------------ PARTE DEL CODIGO DONDE PINTAR Y CREAR ELEMENTOS ---------------------//

/**  FUNCION REFACTORIZADA:

function pintarElemento(elemento, contenedorElemento, mostrarTodosLosAtributos, section) {
    
    if (mostrarTodosLosAtributos) {
        const userElement = document.createElement("h2");
        const userid = elemento.userId;
        userElement.innerHTML = 'userId: ' + userid;
        contenedorElemento.appendChild(userElement);
    }
    
    const idElement = document.createElement("h3");
    const id = elemento.id;
    idElement.innerHTML = 'id: ' + id;
    contenedorElemento.appendChild(idElement);

    const titulo = document.createElement("h4");
    const title = elemento.title;
    titulo.innerHTML = 'title: ' + title;
    contenedorElemento.appendChild(titulo)
    
    if (mostrarTodosLosAtributos) {
        const descripcion = document.createElement("p");
        const body = elemento.body;
        descripcion.innerHTML = 'body: ' + body;
        contenedorElemento.appendChild(descripcion);
    }
    
function crearElemento() consiste en una logica para gestion los elementos del DOM, que luego será llamada en la function pintarElemento()

*/

function crearElemento(objeto, elementoHTML, atributo, contenedor) {

    const elementoCreado = document.createElement(elementoHTML);
    const valor = objeto[atributo];
    elementoCreado.innerHTML = `${atributo}: ` + valor;
    contenedor.appendChild(elementoCreado);
}



function pintarElemento(elemento, contenedorElemento, mostrarTodosLosAtributos) { // funcion dependiente de function crearElemento()

    if (mostrarTodosLosAtributos) {
        crearElemento(elemento, 'h2', 'userId', contenedorElemento)
    }
    crearElemento(elemento, 'h3', 'id', contenedorElemento)
    crearElemento(elemento, 'p', 'body', contenedorElemento)

    if (mostrarTodosLosAtributos) {
        crearElemento(elemento, 'h4', 'title', contenedorElemento)
    }

}


//--------------------------PARTE DEL CODIGO DE FOTO RANDOM ---------------------------------//

/**
 function randomPhoto() {
    const framePhoto = document.querySelector('.wrapper-contenido-photo');
    const photo = document.getElementById("contenido-photo");
     
    framePhoto.style.boxShadow = "2px 4px 12px black";
    framePhoto.style.background = '#190065'
    photo.style.justifyContent = 'center'
    photo.innerHTML = " Cargando imagen Random ... "
 
    setTimeout(() => {
        fetch("https://picsum.photos/300")
        .then((respuesta) => {
            if (respuesta.ok) {
                const img = document.createElement("img");// creamos elemento img
                img.src = respuesta.url;// asignamos src = url
                img.alt = "Random photo";// nombramos alt="Random photo" 
                img.style.boxShadow = '2px 4px 12px black';
                
                const img2 = document.createElement("img")
                img2.src = respuesta.url;// asignamos src = url
                img2.alt = "Random photo2";// nombramos alt="Random photo" 
                img2.style.boxShadow = '2px 4px 12px black';
                
                const img3 = document.createElement("img")
                img3.src = respuesta.url;// asignamos src = url
                img3.alt = "Random photo3";// nombramos alt="Random photo" 
                img3.style.boxShadow = '2px 4px 12px black';
                
                const img4 = document.createElement("img");// creamos elemento img
                img4.src = respuesta.url;// asignamos src = url
                img4.alt = "Random photo";// nombramos alt="Random photo" 
                img4.style.boxShadow = '2px 4px 12px black';
                
                photo.innerHTML = "";// vaciamos mensaje 'Cargando imagen random...'
                
                photo.appendChild(img);//decimos que contenido-photo va a tener un hijo img
                photo.appendChild(img2);
                photo.appendChild(img3);
                photo.appendChild(img4);

            } else {
                console.error("Error al obtener la foto");
            }
        })

        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
 
    }, 600)
}
 
FUNCION MODIFICADA PARA QUE APAREZCAN 4 IMAGENES DIFERENTES EN LUGAR DE 4 VECES LA MISMA FOTO
 */

const framePhoto = document.querySelector('.contenedor');
const photo = document.getElementById("contenido-photo");

function callingRandomPhotoAPI() {
    return fetch("https://picsum.photos/250").then(response => {
        if (response.ok) {
            return response.url;
        } else {
            throw new Error('Error al obtener la foto');
        }
    });
}

function createdImage(src, alt, clss) {
    const img = document.createElement("img");
    img.src = src// asignamos src = url
    img.alt = alt;// nombramos alt="Random photo" 
    img.className = clss;
    img.style.boxShadow = '2px 4px 12px black';
    return img;
}

function loadPhoto() {
    photo.innerHTML = "Cargando imagen..."
    Promise.all([
        callingRandomPhotoAPI(),
        callingRandomPhotoAPI(),
        callingRandomPhotoAPI(),
        callingRandomPhotoAPI(),
        callingRandomPhotoAPI()
    ])
        .then((urls) => {
            photo.innerHTML = "";
            urls.forEach((url, index, clss) => {
                const img = createdImage(url, `Radom photo ${index + 1}`, `imgClase${clss = index + 1}`);
                photo.appendChild(img);
            });
        })
        .catch((error) => {
            console.log('Error .catch al realizar la solicitud', error);
            photo.innerHTML = "Error al cargar las imagenes"
        })


}

//----------------- PARTE DEL CODIGO PARA MOSTAR INFORMACION RANDOM DE LA MISMA API----------------//

function randomInfo() {

    const frameInfo = document.querySelector('.wrapper-contenido-random')
    const random = document.querySelector('#contenido-random')

    random.innerText = '' // Para vaciar el contenido y vuelva hacer la animacion

    // frameInfo.style.background = '#190065'
    frameInfo.style.boxShadow = "2px 4px 12px black";
    random.style.boxShadow = "2px 4px 12px black";
    random.style.animation = '1.2s linear ddrandomInfo';
    random.style.marginTop = '15px';
    random.style.height = '150px';
    random.style.background = '#9a9aeb'
    random.style.borderRadius = '35px 0px 35px 0px';
    random.style.border = '2px solid #0d0d0e';


    setTimeout(() => {

        random.style.animation = 'none';
        random.innerText = ''; // vaciamos mensaje 'Obteniendo informacion random de los atributos id y title de la API'
        const lengthArray = data.length // variable con valor longitud del array
        const numRandom = sacarCalculoRandom(lengthArray) // variable con valor = metodo para hacer el calculo (longitud array)
        pintarElemento(data[numRandom], random) // llamamos a la funcion pintarElemento(array[resultado tipo number de el calculo numRandom], contenedor a ser pintado)

    }, 1500)

}

function sacarCalculoRandom(max) { // logica numero random
    return Math.floor(Math.random() * max);
}

//-------------- PARTE DEL CODIGO DEL SELECTOR DE LA API PARA MOSTRAR INFORMACION SELECCIONADA--------------///

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
    const contenedor = document.getElementById('div-selector')
    contenedor.style.height = '450px'
    contenedor.style.overflowY = 'scroll';
    console.log(opcion)


    if (opcion === 'userId') {
        crearElemento(elemento, 'p', 'userId', contenedorElemento)
        contenedor.style.background = '#0ae695'
    }
    if (opcion === 'id') {

        crearElemento(elemento, 'p', 'id', contenedorElemento)
        contenedor.style.background = '#3d0cd0'
    }
    if (opcion === 'body') {
        crearElemento(elemento, 'p', 'body', contenedorElemento)
        contenedor.style.background = '#0c40d0'
    }
    if (opcion === 'title') {
        crearElemento(elemento, 'p', 'title', contenedorElemento)
        contenedor.style.background = '#850cd0'
    }
}
