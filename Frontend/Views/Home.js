// 1. Selección de elementos del DOM
const container = document.getElementById("heroContainer");
const card = document.getElementById("adidasCard");
const imageElement = document.getElementById("carouselImage");

// 2. Lista de imágenes (Incluimos imágenes con fondos de colores potentes como tu referencia)
const adidasImages = [
  "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600", 
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600", 
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", 
  "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=600",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600" 
];

let currentIndex = 0;

// SECCIÓN A: EFECTO SEGUIMIENTO DEL MOUSE (3D PARALLAX)
container.addEventListener("mousemove", (e) => {
  // Calculamos el centro de la pantalla
  const xAxis = (window.innerWidth / 2 - e.pageX) / 20; // Controla la sensibilidad horizontal
  const yAxis = (window.innerHeight / 2 - e.pageY) / 20; // Controla la sensibilidad vertical

  // Aplicamos la rotación en tiempo real a la tarjeta
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
});

// Cuando el mouse sale de la pantalla, la tarjeta regresa suavemente al centro perfecto
container.addEventListener("mouseleave", () => {
  card.style.transition = "transform 0.5s ease";
  card.style.transform = "rotateY(0deg) rotateX(0deg)";
});

// Quitamos la transición cuando el mouse entra para que no tenga lag
container.addEventListener("mouseenter", () => {
  card.style.transition = "none";
});

// SECCIÓN B: CARRUSEL AUTOMÁTICO
function rotateImages() {
  imageElement.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % adidasImages.length;
    imageElement.src = adidasImages[currentIndex];
    imageElement.style.opacity = 1;
  }, 300); 
}

// Cambio de imagen cada 3.5 segundos
setInterval(rotateImages, 3500);