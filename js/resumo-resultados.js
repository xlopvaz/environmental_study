function renderResumoResultados() {
  const container = document.getElementById("resumo-list");
  if (!container) return;

  const lang = currentLang === "gl" ? "gl" : "en";

  container.innerHTML = resultadosResumoItems.map((item, i) => `
    <div class="faq-item">
      <button class="faq-question" data-resumo-index="${i}">
        <span>${item[lang].title}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" id="resumo-answer-${i}">
        <ul class="resumo-bullets">
          ${item[lang].bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => toggleResumo(btn.dataset.resumoIndex));
  });
}

function toggleResumo(index) {
  const answer = document.getElementById("resumo-answer-" + index);
  const question = document.querySelector(`.faq-question[data-resumo-index="${index}"]`);
  const isOpen = answer.classList.contains("open");

  answer.classList.toggle("open", !isOpen);
  question.classList.toggle("open", !isOpen);
}

renderResumoResultados();