const framePhoto = document.querySelector('.wrapper-contenido-photo');
const photo = document.getElementById("contenido-photo");

function callingRandomPhotoAPI() {
    return fetch("https://picsum.photos/300")
        .then(response => {
            if (response.ok) {
                return response.url;

            } else {
                throw new Error('No se ha obtenido la url correctamente')
            }
        });
}



function randomPhoto(src, alt) {

    framePhoto.style.boxShadow = "2px 4px 12px black";
    framePhoto.style.background = '#190065'
    photo.style.justifyContent = 'center'
    const img = document.createElement("img");
    img.src = src// asignamos src = url
    img.alt = alt;// nombramos alt="Random photo" 
    img.style.boxShadow = '2px 4px 12px black';
    return img;
    // photo.innerHTML = " Cargando imagen Random ... "

    // setTimeout(() => {
    //     fetch("https://picsum.photos/300")

    //     if

    //         // .then((respuesta) => {
    //         //     if (respuesta.ok) {
    //         //         const img = document.createElement("img");// creamos elemento img
    //         //         img.src = respuesta.url;// asignamos src = url
    //         //         img.alt = "Random photo";// nombramos alt="Random photo" 
    //         //         img.style.boxShadow = '2px 4px 12px black';
    //         //         const img2 = document.createElement("img")
    //         //         img2.src = respuesta.url;// asignamos src = url
    //         //         img2.alt = "Random photo2";// nombramos alt="Random photo" 
    //         //         img2.style.boxShadow = '2px 4px 12px black';
    //         //         const img3 = document.createElement("img")
    //         //         img3.src = respuesta.url;// asignamos src = url
    //         //         img3.alt = "Random photo3";// nombramos alt="Random photo" 
    //         //         img3.style.boxShadow = '2px 4px 12px black';
    //         //         const img4 = document.createElement("img");// creamos elemento img
    //         //         img4.src = respuesta.url;// asignamos src = url
    //         //         img4.alt = "Random photo";// nombramos alt="Random photo" 
    //         //         img4.style.boxShadow = '2px 4px 12px black';
    //         //         photo.innerHTML = "";// vaciamos mensaje 'Cargando imagen random...'
    //         //         photo.appendChild(img);//decimos que contenido-photo va a tener un hijo img
    //         //         photo.appendChild(img2);
    //         //         photo.appendChild(img3);
    //         //         photo.appendChild(img4);

    //         //     } else {
    //         //         console.error("Error al obtener la foto");
    //         //     }
    //         // })

    //         // .catch((error) => {
    //         //     console.error("Error en la solicitud:", error);
    //         // });

    // }, 600)
}

Promise.all([callingRandomPhotoAPI(), callingRandomPhotoAPI(), callingRandomPhotoAPI(), callingRandomPhotoAPI()])
    .then(urls => {
        photo.innerHTML = ""
        urls.forEach((url, index) => {
            const img = document.createElement(url, `Random photo ${index + 1}`);// creamos elemento img
            photo.appendChild(img);

        });


    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        photo.innerHTML = "Error al cargar las imágenes.";
    });

