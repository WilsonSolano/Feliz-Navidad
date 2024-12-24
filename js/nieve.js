const TOTAL_SNOWFLAKES = 10;
const snowflakesContainer = document.querySelector('.snowflakes');

function createSnowflake() {
    const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    snowflake.setAttribute("class", "snowflake");
    snowflake.setAttribute("width", "20");
    snowflake.setAttribute("height", "20");
    snowflake.setAttribute("viewBox", "0 0 24 24");

    // Posición y animación aleatorias
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    // SVG del copo de nieve
    snowflake.innerHTML = `
        <path fill="white" d="M12 2L13 8H17L14 10L15 16L12 14L9 16L10 10L7 8H11L12 2Z"/>
    `;

    snowflakesContainer.appendChild(snowflake);

    // Eliminar después de que termine la animación
    snowflake.addEventListener("animationend", () => {
        snowflake.remove();
        createSnowflake(); // Crear un nuevo copo
    });
}

// Crear copos de nieve
for (let i = 0; i < TOTAL_SNOWFLAKES; i++) {
    setTimeout(createSnowflake, i * 1000);
}


const card = document.querySelector('.card-n');

card.addEventListener('click', function() {
    // al hacer click, agrega clase css open-n al card-n
    card.classList.toggle('open-n')
});


document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('navidad');
  const playBtn = document.getElementById('playBtn');
  const seekBar = document.getElementById('seekBar');
  const currentTime = document.getElementById('currentTime');
  const duration = document.getElementById('duration');

  playBtn.addEventListener('click', () => {
      if(audio.paused) {
          audio.play();
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
          audio.pause();
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
  });

  audio.addEventListener('timeupdate', () => {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
      currentTime.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
      duration.textContent = formatTime(audio.duration);
      seekBar.value = 0;
  });

  seekBar.addEventListener('change', () => {
      audio.currentTime = (seekBar.value * audio.duration) / 100;
  });

  function formatTime(seconds) {
      let minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
});