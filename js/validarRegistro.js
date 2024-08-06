document.addEventListener('DOMContentLoaded', () => {
  const formularioRegistro = document.getElementById('registro-form');
  const passwordInput = document.getElementById('contraseña');
  const confirmPasswordInput = document.getElementById('confirmar-contraseña');
  const passwordConditionsMessage = document.getElementById('guiaContraseña');
  const validationIcon = document.querySelector('.icono-validacion');


  function validarFormularioRegistro(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contraseña').value;
    const confirmarContrasena = confirmPasswordInput.value;
    const aceptado = document.getElementById('aceptado').checked;

    if (!usuario || usuario.trim() === '') {
      mostrarAlerta('Por favor, introduce un nombre de usuario.', false);
      return;
    }

    if (!correo || !validarEmail(correo)) {
      mostrarAlerta('Por favor, introduce un correo electrónico válido.', false);
      return;
    }

    if (!contrasena || !validarContrasena(contrasena)) {
      mostrarAlerta('La contraseña debe tener al menos 8 caracteres, una letra minúscula, una mayúscula, un número y un símbolo especial.', false);
      return;
    }

    if (contrasena !== confirmarContrasena) {
      mostrarAlerta('Las contraseñas no coinciden.', false);
      return;
    }

    if (!aceptado) {
      mostrarAlerta('Debes aceptar las condiciones para registrarte.', false);
      return;
    }

    mostrarAlerta('¡Registro exitoso!', true);
  }

  function mostrarAlerta(mensaje, esCorrecto) {
    let tipo = esCorrecto ? 'success' : 'error';
    let titulo = esCorrecto ? '¡Registro exitoso!' : 'Error en el registro';
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      showConfirmButton: true,
      timer: 1000000,
      position: 'center'
    });
  }

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validarContrasena(contrasena) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{':;?/>.<,]).{8,}$/;
    return re.test(contrasena);
  }

  passwordInput.addEventListener('focus', function () {
    passwordConditionsMessage.style.display = 'block';
  });

  passwordInput.addEventListener('blur', function () {
    passwordConditionsMessage.style.display = 'none';
  });

  passwordInput.addEventListener('input', function() {
    const contrasena = passwordInput.value;
    if (validarContrasena(contrasena) && passwordInput === document.activeElement) {
      passwordConditionsMessage.textContent = '';
    }
  });

  const correoInput = document.getElementById('correo');

  correoInput.addEventListener('input', function() {
    if (correoInput.validity.valid) {
      validationIcon.textContent = '✔️';
      validationIcon.style.color = 'green';
    } else {
      validationIcon.textContent = '❌';
      validationIcon.style.color = 'red';
    }
  });

  formularioRegistro.addEventListener('submit', validarFormularioRegistro);
});