const feedback__form = document.querySelector(".feedback__form");
const modalForm = document.querySelector(".modal-win");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");
const modalBtn = document.querySelector(".modal-btn");

function openModal() {
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
  const formdata = new FormData(e.target);
  postResourse("/API/postForm.php", formdata).then((res) => {
    modalHeader.innerHTML = res;
    openModal();
    if (res === "Данные отправлены в базу данных!") {
      feedback__form.reset();
      feedback.style.display = "none";
    }
  });
}

feedback__form.addEventListener("submit", (e) => sendForm(e));
modalClose.addEventListener("click", closeModal);
modalBtn.addEventListener("click", closeModal);
