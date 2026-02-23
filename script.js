// =======================
// МОДАЛЬНОЕ ОКНО
// =======================

const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


// =======================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
// =======================

const fadeElements = document.querySelectorAll(".fade-in");

function handleScrollAnimation() {
  fadeElements.forEach((el) => {
    const position = el.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation(); // запуск при загрузке


// =======================
// УВЕДОМЛЕНИЕ
// =======================

const notification = document.getElementById("notification");
const notificationText = document.getElementById("notification-text");

function showNotification(message, isError = false) {
  if (!notification || !notificationText) return;

  notificationText.textContent = message;
  notification.classList.add("show");

  if (isError) {
    notification.classList.add("error");
  } else {
    notification.classList.remove("error");
  }

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}


// =======================
// ОТПРАВКА ФОРМЫ
// =======================

const form = document.querySelector("form");

if (form) {
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]')?.value.trim();

    if (!name || !phone) {
      showNotification("Заполните обязательные поля", true);
      return;
    }

    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, message }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification("Заявка отправлена 💅");
        form.reset();

        if (modal) {
          modal.style.display = "none";
        }

      } else {
        showNotification("Ошибка отправки", true);
      }

    } catch (error) {
      showNotification("Ошибка сервера", true);
    }

    // Разблокируем кнопку
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить";
  });
}

