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
