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


function infoApi() {
    const info = document.getElementById("contenido-info"); // gestion DOM

    info.innerHTML = " Cargando API... por favor tenga paciencia gracias ";// gestion DOM-creamos elemento

    // setTimeout(() => {
    info.innerHTML = ""; // gestion DOM - reasignamos valos 'nada' para que el mensaje desaparezca
    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
        .then((respuesta) => { //Promesas
            if (!respuesta.ok) {
                throw new Error(
                    "Error al cargar la API" + respuesta.statusText
                );
            }
            return respuesta.json();
        })
        .then((data) => {
            console.log(data);
            info.innerHtml = ""; // para vaciar el contenido previo
            if (data) {
                data.forEach(element => {
                    pintarElemento(element, info, true);

                });
            }
            else {
                info.innerHTML = "La info de la API no esta disponible";
            }


        })

        .catch((error) => {
            console.error("Error de carganda de la API", error);
            info.innerHTML =
                "Error, disculpe las molestias, intentelo de nuevo mas tarde";
        });
    // }, 2000);
}

function randomPhoto() {
    const photo = document.getElementById("contenido-photo"); // gestion DOM
    photo.innerHTML = "<span> </span>";// gestion DOM

    fetch("https://picsum.photos/200/300")
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






function pintarElemento(elemento, contenedorElemento, mostrarTodosLosAtributos) {
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
}