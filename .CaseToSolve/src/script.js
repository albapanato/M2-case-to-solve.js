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



// 1. Obtener datos de la API:


let cargarApi = false; // Creamos la variable para resetear la API si ya se hubiese cargado

function infoApi() {
    const info = document.getElementById("contenido-info"); // gestion DOM

    if (!cargarApi) {// Aqui le decimo que si !false, osea si es true, haz toda la logica de dentro

        //Estilo al contenedor de la API desde JS
        info.style.border = '5px solid #0b5ed7'
        info.style.borderRadius = '5px'
        info.style.padding = '20px'
        // info.style.maxHeight = '650px'
        info.style.overflow = 'scroll'
        // info.style.justifyContent = 'center'


        info.innerHTML = ""; // gestion DOM - reasignamos valos 'nada' para que el mensaje desaparezca

        fetch("https://jsonplaceholder.typicode.com/users/1/posts")
            .then((respuesta) => { //Promesas
                if (!respuesta.ok) { //Si la respuesta no es correcta lanza un error
                    throw new Error(
                        "Error al cargar la API" + respuesta.statusText
                    );
                }
                return respuesta.json();// Si la respuesta es correcta convierte los datos a JSON
            })
            .then((data) => {
                console.log(data);
                info.innerHtml = ""; // para vaciar el contenido previo
                if (data) {
                    data.forEach(element => {

                        pintarElemento(element, info, true); // Utilizamos funcion para 'pintar' los elementos en el DOM

                    });
                }
                else { // Si pintarElementos() fallara, saldria este error.
                    info.innerHTML = "La info de la API no esta disponible";
                }

                // Una vez la este todo 'pintado y haya ido bien, pasamos caragarApi a true, para que mas adelante cuando la api este 'pintada' que haga la parte siguiente de la logica.
                cargarApi = true;

            })

            .catch((error) => {
                console.error("Error de carganda de la API", error);
                info.innerHTML =
                    "Error, disculpe las molestias, intentelo de nuevo mas tarde";
            });


    } else { // hace que el resultado alterne entre mostrar(true) o ocultar(false)

        if (info.style.display === 'none' || info.innerHTML === '') {
            info.style.display = 'grid';
        } else {// si cargarApi = true, le quitamos el display haciendo que desaparezca.
            info.style.display = 'none';
        }

    }

}

function randomPhoto() {
    const photo = document.getElementById("contenido-photo"); // gestion DOM
    photo.innerHTML = "<span> </span>";// gestion DOM

    //Estilo a la imagen desde JS


    photo.style.padding = '20px'
    photo.style.justifyContent = 'center'
    photo.style.marginTop = '20px'

    fetch("https://picsum.photos/200")
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

    random.style.padding = '20px'
    random.style.justifyContent = 'center'
    random.style.marginTop = '20px'
    random.innerHTML = '';


    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
        .then((respuesta) => { //Promesas
            if (!respuesta.ok) {
                throw new Error(
                    "Error al cargar la API" + respuesta.statusText
                );
            }
            return respuesta.json();
        })
        .then((arrayElementos) => {
            const lengthArray = arrayElementos.length
            const numRandom = getRandomInt(lengthArray)
            pintarElemento(arrayElementos[numRandom], random)
        })
}




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}






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

    if (section) {

    }

}