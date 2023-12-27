const feedback__form = document.querySelector(".feedback__form");
const modalForm = document.querySelector(".modal-win");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");
const modalBtn = document.querySelector(".modal-btn");
const loader = document.querySelector(".feedback__loader");

function openModal() {
  document.body.classList.add("lock");
  modalForm.hidden = false;
  overlay.hidden = false;
  modalForm.style.top = `${
    window.innerHeight / 2 - modalForm.offsetHeight / 2
  }px`;
  modalForm.style.left = `${
    window.innerWidth / 2 - modalForm.offsetWidth / 2
  }px`;
  modalForm.classList.remove("animated-rev");
  modalForm.classList.add("animated");
  overlay.style.opacity = "0.9";
}

function closeModal() {
  document.body.classList.remove("lock");
  modalForm.classList.remove("animated");
  modalForm.classList.add("animated-rev");
  overlay.style.opacity = "0";

  setTimeout(() => {
    modalForm.hidden = true;
    overlay.hidden = true;
  }, 700);
}

async function postResourse(url, data) {
  const res = await fetch(`${url}`, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    alert("Ошибка HTTP: " + res.status);
  }

  return await res.text();
}

function sendForm(e) {
  e.preventDefault();

  loader.classList.remove("visually-hidden");
  loader.classList.add("loader-vis");
  document.body.classList.add("lock");

  const formdata = new FormData(e.target);
  postResourse("/API/postForm.php", formdata)
    .then((res) => {
      modalHeader.innerHTML = res;
      openModal();

      loader.classList.add("visually-hidden");
      loader.classList.remove("loader-vis");

      if (res === "Данные отправлены в базу данных!") {
        feedback__form.reset();
        feedback.style.display = "none";
      }
    })
    .catch(() => document.body.classList.remove("lock"));
}

feedback__form.addEventListener("submit", (e) => sendForm(e));
modalClose.addEventListener("click", closeModal);
modalBtn.addEventListener("click", closeModal);
