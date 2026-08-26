document.addEventListener('DOMContentLoaded', () => {
  // Configuración de imágenes en carpeta única /img
  const galleryData = {
    albanileria: {
      title: "Albañilería",
      images: [
        "img/albanileria-1.jpg",
        "img/albanileria-2.jpg",
        "img/albanileria-3.jpg",
        "img/albanileria-4.jpg",
        "img/albanileria-5.jpg"
      ]
    },
    fontaneria: {
      title: "Fontanería",
      images: [
        "img/fontaneria-1.jpg",
        "img/fontaneria-2.jpg",
        "img/fontaneria-3.jpg",
        "img/fontaneria-4.jpg",
        "img/fontaneria-5.jpg"
      ]
    },
    electricidad: {
      title: "Electricidad",
      images: [
        "img/electricidad-1.jpg",
        "img/electricidad-2.jpg",
        "img/electricidad-3.jpg",
        "img/electricidad-4.jpg",
        "img/electricidad-5.jpg"
      ]
    },
    solado: {
      title: "Solado",
      images: [
        "img/solado-1.jpg",
        "img/solado-2.jpg",
        "img/solado-3.jpg",
        "img/solado-4.jpg",
        "img/solado-5.jpg"
      ]
    },
    alicatado: {
      title: "Alicatado",
      images: [
        "img/alicatado-1.jpg",
        "img/alicatado-2.jpg",
        "img/alicatado-3.jpg",
        "img/alicatado-4.jpg",
        "img/alicatado-5.jpg"
      ]
    },
    termos: {
      title: "Termos y Calentadores",
      images: [
        "img/termos-1.jpg",
        "img/termos-2.jpg",
        "img/termos-3.jpg",
        "img/termos-4.jpg",
        "img/termos-5.jpg"
      ]
    },
    carpinteria: {
      title: "Carpintería",
      images: [
        "img/carpinteria-1.jpg",
        "img/carpinteria-2.jpg",
        "img/carpinteria-3.jpg",
        "img/carpinteria-4.jpg",
        "img/carpinteria-5.jpg"
      ]
    },
    pladur: {
      title: "Pladur",
      images: [
        "img/pladur-1.jpg",
        "img/pladur-2.jpg",
        "img/pladur-3.jpg",
        "img/pladur-4.jpg",
        "img/pladur-5.jpg"
      ]
    },
    aire: {
      title: "Aire Acondicionado",
      images: [
        "img/aire-1.jpg",
        "img/aire-2.jpg",
        "img/aire-3.jpg",
        "img/aire-4.jpg",
        "img/aire-5.jpg"
      ]
    }
  };

  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeModal = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cards = document.querySelectorAll('.gallery-card');
  const budgetForm = document.getElementById('budget-form');

  let currentCategoryImages = [];
  let currentCategoryTitle = "";
  let currentIndex = 0;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryKey = card.getAttribute('data-category');
      const data = galleryData[categoryKey];

      if (data && data.images.length > 0) {
        currentCategoryImages = data.images;
        currentCategoryTitle = data.title;
        currentIndex = 0;
        openModal(currentIndex);
      }
    });
  });

  function openModal(index) {
    if (currentCategoryImages.length === 0) return;

    modalImg.src = currentCategoryImages[index];
    modalImg.alt = `${currentCategoryTitle} - Foto ${index + 1}`;
    
    modalImg.onerror = function() {
      this.src = `https://placehold.co/800x600/004e92/FFF?text=${encodeURIComponent(currentCategoryTitle)}+(${index + 1})`;
    };

    modalCaption.textContent = `${currentCategoryTitle} - Foto ${index + 1} de ${currentCategoryImages.length}`;
    modal.classList.add('active');
  }

  function closeModalHandler() {
    modal.classList.remove('active');
  }

  function showPrev() {
    if (currentCategoryImages.length === 0) return;
    currentIndex = (currentIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
    openModal(currentIndex);
  }

  function showNext() {
    if (currentCategoryImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentCategoryImages.length;
    openModal(currentIndex);
  }

  closeModal.addEventListener('click', closeModalHandler);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModalHandler();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Gestos Swipe en móviles
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNext();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showPrev();
    }
  }

  // Envío del formulario
  budgetForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('btn-submit');
    const checkboxes = document.querySelectorAll('input[name="servicio_opcion"]:checked');
    
    if (checkboxes.length === 0) {
      alert('Por favor, selecciona al menos un servicio para solicitar tu presupuesto.');
      return;
    }

    const servicios = Array.from(checkboxes).map(cb => cb.value).join(', ');

    const payload = {
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      email: document.getElementById('email').value,
      servicios: servicios,
      detalles: document.getElementById('detalles').value,
      politica_privacidad: document.getElementById('privacy').checked ? "Aceptada" : "No aceptada"
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const response = await fetch('https://formspree.io/f/mbgrvlqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('¡Gracias! Tu solicitud de presupuesto ha sido enviada con éxito.');
        budgetForm.reset();
      } else {
        alert('Hubo un problema al procesar el envío. Revisa tus datos e inténtalo nuevamente.');
      }
    } catch (err) {
      alert('Ocurrió un error de red al intentar enviar el formulario.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Solicitud de Presupuesto';
    }
  });
});