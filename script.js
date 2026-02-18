  const openBtn = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  const elements = document.querySelectorAll('.fade-in');

  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      const position = el.getBoundingClientRect().top;
      if (position < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  });

const form = document.querySelector("form");
const status = document.querySelector(".form-status");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  status.textContent = "Отправка...";
  
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.textContent = "Спасибо! Заявка отправлена ✨";
      form.reset();
    } else {
      status.textContent = "Ошибка отправки. Попробуйте позже.";
    }
  } catch (error) {
    status.textContent = "Произошла ошибка. Проверьте соединение.";
  }
});

//telegram
const TOKEN = "8178195101:AAHs3gcHCFBOAEgrnJh8HBPpwPsFU_d7tKM";
const CHAT_ID = "8573441422";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = form.elements.name.value;
  const phone = form.elements.phone.value;
  const message = form.elements.message.value;

  const text = `
Новая заявка ✨
Имя: ${name}
Телефон: ${phone}
Комментарий: ${message || "Нет"}
`;

  status.textContent = "Отправка...";

  try {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    if (!response.ok) {
      throw new Error("Ошибка ответа сервера");
    }

    status.textContent = "Заявка отправлена 🚀";
    form.reset();

  } catch (error) {
    status.textContent = "Ошибка отправки. Попробуйте позже.";
    console.error(error);
  }
});
