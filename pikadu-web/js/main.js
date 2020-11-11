// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector("#menu-toggle");
// Создаем переменную, в которую положим меню
let menu = document.querySelector(".sidebar");
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener("click", function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню
  menu.classList.toggle("visible");
});

const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".login-email");
const passwordInput = document.querySelector(".login-password");
const loginSignup = document.querySelector(".login-signup");

const userElem = document.querySelector(".user");
const userNameElem = document.querySelector(".user-name");

const listUsers = [
  {
    id: "01",
    email: "maks@mail.com",
    password: "123456",
    displayName: "MaksJS",
  },
  {
    id: "02",
    email: "kate@mail.com",
    password: "12344556",
    displayName: "KateJS",
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert("Пользователь с такими данными не найден");
    }
  },
  logOut() {
    console.log("выход");
  },
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split("@")[0] };
      //const user = { email, password, displayName: email };

      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert("Пользователь был зарегистрирован");
    }
  },
  getUser(email) {
    return listUsers.find((item) => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log("user: ", user);

  if (user) {
    loginElem.style.display = "none";
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
    /*   userNameElem.textContent = user.displayName
      .split("")
      .map((elem, index) =>
        elem !== "@" ? "" : user.displayName.slice(0, index)
      )
      .join(""); */
    console.log(userNameElem.textContent);
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
  }
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
});

loginSignup.addEventListener("click", (event) => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
});

toggleAuthDom();
