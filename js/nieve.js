const TOTAL_SNOWFLAKES = 20;

function createSnowflake() {
  const snowflake = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  snowflake.setAttribute("class", "snowflake");
  snowflake.setAttribute("width", "20");
  snowflake.setAttribute("height", "20");
  snowflake.setAttribute("viewBox", "0 0 24 24");

  // Posición y animación aleatorias
  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.animationDuration = Math.random() * 6 + 6 + "s";
  snowflake.style.animationDelay = Math.random() * 4 + "s";

  // Efecto de brillo variable
  const brightness = Math.random() * 0.3 + 0.7;
  snowflake.style.filter = `
                drop-shadow(0 0 2px rgba(255,255,255,${brightness}))
                brightness(${brightness})
            `;

  snowflake.style.animation = `
                fall ${Math.random() * 6 + 6}s linear,
                twinkle ${Math.random() * 2 + 1}s ease-in-out infinite
            `;

  snowflake.innerHTML = `
                <g transform="translate(12,12)">
                    <path fill="white" d="
                        M0,-10 L1,-3 L4,-4 L2,-1 L8,0 L2,1 L4,4 L1,3 L0,10
                        L-1,3 L-4,4 L-2,1 L-8,0 L-2,-1 L-4,-4 L-1,-3 Z
                    " opacity="0.9"/>
                    <path fill="white" d="
                        M0,-6 L0.5,-2 L2,-3 L1,-1 L4,0 L1,1 L2,3 L0.5,2 L0,6
                        L-0.5,2 L-2,3 L-1,1 L-4,0 L-1,-1 L-2,-3 L-0.5,-2 Z
                    " opacity="0.7"/>
                    <circle cx="0" cy="0" r="0.7" fill="white"/>
                </g>
            `;

  document.body.appendChild(snowflake);

  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
    createSnowflake();
  });
}

for (let i = 0; i < TOTAL_SNOWFLAKES; i++) {
  setTimeout(createSnowflake, i * 200);
}

// Función para crear copos adicionales periódicamente
setInterval(() => {
  if (document.querySelectorAll(".snowflake").length < TOTAL_SNOWFLAKES) {
    createSnowflake();
  }
}, 2000);

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