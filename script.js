let usuarios = {}; // Objeto para almacenar usuarios y sus contraseñas
let usuarioActivo = null; // Usuario actualmente logueado

// Cambia la pantalla visible
function mostrarPantalla(id) {
    const pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(pantalla => pantalla.classList.remove('activa'));
    document.getElementById(id).classList.add('activa');

    // Si la pantalla es de información médica, mostrar datos
    if (id === 'informacion') {
        mostrarInformacion();
    }
}

// Abre o cierra el menú desplegable
function toggleMenu() {
    const menu = document.getElementById('menuContent');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Registra un nuevo usuario
// Registra un nuevo usuario
function registrarUsuario(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuarioRegistro').value.trim();  // .trim() elimina espacios adicionales
    const contraseña = document.getElementById('contraseñaRegistro').value.trim();

    // Comprobar si el usuario ya existe
    if (usuarios[usuario]) {
        alert('El usuario ya existe. Por favor, elija otro.');
    } else {
        // Si el usuario no existe, lo registramos
        usuarios[usuario] = { contraseña, datos: {} }; // Crear usuario con contraseña y datos vacíos
        alert('Usuario registrado con éxito.');
        mostrarPantalla('ingreso'); // Redirigir al formulario de inicio de sesión
    }
}


// Inicia sesión de un usuario
function iniciarSesion(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuarioLogin').value;
    const contraseña = document.getElementById('contraseñaLogin').value;

    if (usuarios[usuario] && usuarios[usuario].contraseña === contraseña) {
        usuarioActivo = usuario;
        alert(`Bienvenido, ${usuario}`);
        mostrarPantalla('informacion');
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Muestra la información médica
function mostrarInformacion() {
    const datos = document.getElementById('datosUsuario');
    const info = usuarios[usuarioActivo].datos;

    datos.innerHTML = `
        <p><strong>Nombre:</strong> ${info.nombre || '<em>No registrado</em>'}</p>
        <p><strong>Tipo de Sangre:</strong> ${info.tipoSangre || '<em>No registrado</em>'}</p>
        <p><strong>IPS/EPS:</strong> ${info.ips || '<em>No registrado</em>'}</p>
        <p><strong>Teléfono:</strong> ${info.telefono || '<em>No registrado</em>'}</p>
        <p><strong>Enfermedades:</strong> ${info.enfermedades || '<em>No registradas</em>'}</p>
    `;
}

// Edita la información médica
function editarInformacion(event) {
    event.preventDefault();
    const datos = usuarios[usuarioActivo].datos;

    datos.nombre = document.getElementById('editarNombre').value || datos.nombre;
    datos.tipoSangre = document.getElementById('editarTipoSangre').value || datos.tipoSangre;
    datos.ips = document.getElementById('editarIps').value || datos.ips;
    datos.telefono = document.getElementById('editarTelefono').value || datos.telefono;
    datos.enfermedades = document.getElementById('editarEnfermedades').value || datos.enfermedades;

    alert('Información actualizada con éxito.');
    mostrarPantalla('informacion');
}

// Función para gestionar el acceso a las opciones del menú
function acceder(opcion) {
    const contenidoModal = document.getElementById('contenidoModal');
    
    if (!usuarioActivo) {
        alert('Por favor, inicia sesión primero.');
        mostrarPantalla('ingreso'); // Redirigir a inicio de sesión
    } else {
        // Si el usuario ya está logueado, se redirige a la información médica
        mostrarPantalla('informacion');
    }

    contenidoModal.innerHTML = `<h3>${opcion.charAt(0).toUpperCase() + opcion.slice(1)}</h3><p>Aquí va el contenido de la sección de ${opcion}.</p>`;
    document.getElementById('modal').style.display = 'block'; // Mostrar el modal
}

// Cerrar el modal
function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}