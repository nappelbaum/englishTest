const main__wrapper = document.querySelector(".main__wrapper");
let getArticlesArr = []; // DOM-массив загружаемых на страницу статей из таблицы promo_prices

async function getResourse(url) {
  const res = await fetch(`${url}`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("Ошибка HTTP: " + res.status);
  }

  return await res.json();
}

function getPrices() {
  getResourse("/API/getPromoPrices.php").then((res) => {
    if (Array.isArray(res)) {
      res.forEach((el) => {
        el.discount = 100 - Math.round((el.price / el.oldprice) * 100);
        el.price = new Intl.NumberFormat("ru-RU").format(el.price);
        el.oldprice = new Intl.NumberFormat("ru-RU").format(el.oldprice);
        const months = el.months < 5 ? " месяца" : " месяцев";
        el.months = el.months + months;
      });

      res.sort((a, b) => a.order - b.order);
      setArticles(res);
    } else alert("Не удалось получить список из таблицы promo_prices(((");
  });
}

window.addEventListener("DOMContentLoaded", getPrices);

function setArticles(data) {
  getArticlesArr.forEach((item) => item.remove());
  getArticlesArr.length = 0;

  for (let i = 0; i < data.length; i++) {
    getArticlesArr[i] = document.createElement("article");
    getArticlesArr[i].classList.add("article");
    getArticlesArr[i].innerHTML = `
            <h2 class="article__title">${data[i].title}</h2>
            <div class="article__cost">
            <span>
                <div class="article__discount">
                <span>-${data[i].discount}%</span>
                </div>
                ${data[i].price} ₽</span
            >
            </div>
            <span class="article__sale">${data[i].oldprice} ₽</span>
            <ul class="article__advantages">
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>${data[i].months} обучения</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Грамматическая выжимка</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Разговорный тренажёр</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Слова с ассоциациями</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Регулярные мини-задания</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Персональный куратор</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Сертификат об обучении</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Best Teachers</span>
                </li>
                <li>
                    <img src="./img/svg/Vector 15.svg" alt="" />
                    <span>Звонки от Second Teacher</span>
                </li>
            </ul>
            <div class="article__prepayment">Предоплата</div>
            <div class="article__prepayment-cost">${data[i].prepay} ₽</div>
            <a href="${data[i].link_ru}" class="article__btnrf">
                <span>внести предоплату<br />из рф</span>
            </a>
            <a href="${data[i].link_en}" class="article__btnforeign">
                <span>внести предоплату<br />из-за границы</span>
            </a>
        `;
    main__wrapper.appendChild(getArticlesArr[i]);
  }
}
