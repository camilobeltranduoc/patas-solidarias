(() => {
  'use strict';

  // --- Validación genérica para formularios con Bootstrap ---
  const forms = document.querySelectorAll('.needs-validation, #donationForm');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      e.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      // Si es formulario de donación, usamos showAlert (definido más abajo)
      if (form.id === 'donationForm') {
        const amount = document.getElementById('donateAmount').value;
        showAlert(`¡Gracias! Donación de ${amount} CLP realizada con éxito.`, 'success');
        form.reset();
        form.classList.remove('was-validated');
      }
    }, false);
  });

  // Función para mostrar alertas de Bootstrap
  function showAlert(message, type = 'success') {
    const placeholder = document.getElementById('alertPlaceholder');
    if (!placeholder) return;
    placeholder.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
      `  ${message}`,
      '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>',
      '</div>'
    ].join('');
  }

  // --- Generar PDF de recibo con jsPDF ---
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const date     = btn.dataset.date;
      const campaign = btn.dataset.campaign;
      const amount   = btn.dataset.amount;

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Recibo de Donación', 20, 20);
      doc.setFontSize(12);
      doc.text(`Fecha: ${date}`, 20, 40);
      doc.text(`Campaña: ${campaign}`, 20, 50);
      doc.text(`Monto: ${amount}`, 20, 60);
      doc.text('¡Gracias por tu apoyo!', 20, 80);

      doc.save(`recibo-${date.replace(/\//g,'-')}.pdf`);
    });
  });

})();

// Recuperar contraseña: mostrar alerta al enviar
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (!forgotForm.checkValidity()) {
      forgotForm.classList.add('was-validated');
      return;
    }
    // Mostrar alerta
    const placeholder = document.getElementById('alertPlaceholder');
    placeholder.innerHTML = [
      `<div class="alert alert-info alert-dismissible fade show" role="alert">`,
      `  Hemos enviado un enlace de recuperación a tu correo.`,
      `  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>`,
      `</div>`
    ].join('');
    forgotForm.reset();
    forgotForm.classList.remove('was-validated');
  });
}


// Al hacer click en Adoptar…
document.querySelectorAll('.adopt-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = btn.closest('.col');
    const name = btn.dataset.name;
    // Poner el nombre en el modal
    document.getElementById('adoptName').textContent = name;
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('adoptModal'));
    modal.show();
    // Tras 2 seg eliminar la card y cerrar modal
    setTimeout(() => {
      modal.hide();
      // Animación de fade-out
      card.style.transition = 'opacity 0.6s';
      card.style.opacity = '0';
      setTimeout(() => card.remove(), 600);
    }, 2000);
  });
});
