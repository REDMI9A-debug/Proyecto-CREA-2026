// --- 1. SEGURO DE CARGA ---
// Esperamos a que todo el HTML esté listo antes de buscar los botones
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2. MODAL DE LA CASA DE OLMEDO (BOTÓN VERDE) ---
    // IDs exactos de tu index.html: abrirModal, cerrarModal, modalOlmedo
    const btnVerde = document.getElementById('abrirModal');
    const btnX = document.getElementById('cerrarModal');
    const ventanaModal = document.getElementById('modalOlmedo');

    if (btnVerde && ventanaModal) {
        btnVerde.onclick = function(e) {
            e.preventDefault(); // Evita que la página salte
            ventanaModal.style.display = 'flex'; 
            console.log("Modal Olmedo abierto");
        };
    }

    if (btnX && ventanaModal) {
        btnX.onclick = function() {
            ventanaModal.style.display = 'none';
        };
    }

    // --- 3. CIERRE GLOBAL (CLIC AFUERA) ---
    window.onclick = function(event) {
        if (event.target == ventanaModal) {
            ventanaModal.style.display = 'none';
        }
        const modalMapa = document.getElementById('modal-mapa');
        if (event.target == modalMapa) {
            modalMapa.style.display = 'none';
        }
    };
});

// --- 4. FUNCIÓN PARA LAS 6 CARDS DE TURISMO ---
// Esta función queda fuera del DOMContentLoaded para que el HTML la encuentre
function abrirMapa(lugar) {
    const modalGeneral = document.getElementById('modal-mapa');
    
    const datos = infoLugares[lugar];
    if (datos && modalGeneral) {
        document.getElementById('modal-img').src = datos.img; 
        document.getElementById('modal-titulo').innerText = datos.titulo;
        document.getElementById('modal-descripcion').innerText = datos.desc;
        modalGeneral.style.display = 'flex'; 
    }
};

const infoLugares = {
        'salto': {
            img: 'playairresistible.png', 
            titulo: 'Playas del Salto',
            desc: 'Nuestra joya de agua dulce. Disfruta de deportes acuáticos y regatas.',
            maps: 'https://maps.app.goo.gl/vm8qYZRScXA6HJkZ7'
        },
        'malecon': {
            img: 'malecon9octubre.png',
            titulo: 'Malecón 9 de Octubre',
            desc: 'Un paseo hermoso junto al río para disfrutar de la gastronomía.',
            maps: 'https://www.google.com/maps/search/?api=1&query=Malecon+9+de+Octubre+Babahoyo'
        },
        'olmedo': {
            img: 'casadeolmedo2.png',
            titulo: 'Casa de Olmedo',
            desc: 'Museo histórico donde se firmó el tratado de la Virginia.',
            maps: 'https://www.google.com/maps/search/?api=1&query=Casa+de+Olmedo+Babahoyo'
        },
        'cachari': {
            img: 'cerrocachari.png',
            titulo: 'Cerro Cacharí',
            desc: 'Aventura y leyendas con vistas panorámicas de la llanura.',
            maps: 'https://www.google.com/maps/search/?api=1&query=Cerro+Cachari+Babahoyo'
        },
        'catedral': {
            img: 'actualidadbabah.png', 
            titulo: 'Iglesia Catedral',
            desc: 'Ícono arquitectónico famoso por su mural de mosaicos.',
            maps: 'https://www.google.com/maps/search/?api=1&query=Catedral+de+Babahoyo'
        },
        'parque': {
            img: 'parque24mayo.png',
            titulo: 'Parque 24 de Mayo',
            desc: 'Punto de encuentro tradicional bajo árboles centenarios.',
            maps: 'https://www.google.com/maps/search/?api=1&query=Parque+24+de+Mayo+Babahoyo'
        }
    };

function cerrarMapa() {
    const modalGeneral = document.getElementById('modal-mapa');
    if (modalGeneral) modalGeneral.style.display = 'none';
}