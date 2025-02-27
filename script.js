document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var messageBox = document.getElementById('message');

    // Limpiar mensaje previo
    messageBox.innerHTML = '';

    // Validación simple
    if (!email) {
        messageBox.innerHTML = 'Por favor, introduce un correo electrónico.';
        messageBox.style.color = '#f44336'; // Rojo
        return;
    }

    // Enviar solicitud AJAX al servidor
    fetch('http://servidor.ieshlanz.es:8000/crud/restablecer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageBox.innerHTML = 'Se ha enviado un enlace para restablecer tu contraseña a tu correo.';
            messageBox.style.color = '#4CAF50'; // Verde
        } else {
            messageBox.innerHTML = 'Hubo un error al enviar el correo. Intenta nuevamente.';
            messageBox.style.color = '#f44336'; // Rojo
        }
    })
    .catch(error => {
        messageBox.innerHTML = 'Error de conexión. Intenta nuevamente más tarde.';
        messageBox.style.color = '#f44336'; // Rojo
    });
});
