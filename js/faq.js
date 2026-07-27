function renderFaq() {
  const container = document.getElementById("faq-list");
  if (!container) return;

  const lang = currentLang === "gl" ? "gl" : "en";

  container.innerHTML = faqItems.map((item, i) => `
    <div class="faq-item">
      <button class="faq-question" data-index="${i}">
        <span>${item[lang].q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <p>${item[lang].a}</p>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => toggleFaq(btn.dataset.index));
  });
}

function toggleFaq(index) {
  const answer = document.getElementById("faq-answer-" + index);
  const question = document.querySelector(`.faq-question[data-index="${index}"]`);
  const isOpen = answer.classList.contains("open");

  answer.classList.toggle("open", !isOpen);
  question.classList.toggle("open", !isOpen);
}

renderFaq();