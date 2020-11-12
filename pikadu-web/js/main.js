// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector("#menu-toggle");
// Создаем переменную, в которую положим меню
let menu = document.querySelector(".sidebar");

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".login-email");
const passwordInput = document.querySelector(".login-password");
const loginSignup = document.querySelector(".login-signup");

const userElem = document.querySelector(".user");
const userNameElem = document.querySelector(".user-name");

const exitElem = document.querySelector(".exit");
const editElem = document.querySelector(".edit");
const editContainer = document.querySelector(".edit-container");

const editUsername = document.querySelector(".edit-username");
const editPhotoURL = document.querySelector(".edit-photo");
const userAvatarElem = document.querySelector(".user-avatar");

const postsWrapper = document.querySelector(".posts");

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
    if (!regExpValidEmail.test(email)) {
      return alert("email не валиден");
    }

    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert("Пользователь с такими данными не найден");
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      return alert("email не валиден");
    }

    if (!email.trim() || !password.trim()) {
      alert("Введите данные");
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split("@")[0] };
      //const user = { email, password, displayName: email };
      //displayName: email.substring{0, email.indexOf('@');
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert("Пользователь был зарегистрирован");
    }
  },

  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userName) {
      this.user.photo = userPhoto;
    }

    handler();
  },

  getUser(email) {
    return listUsers.find((item) => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  },
};

const setPosts = {
  allPosts: [
    {
      title: "Заголовок поста",
      text: "Далеко-далеко за словесными горами в стране гласных и согласных",
      tags: ["свежее", "новое", "горячее", "мое", "случайность"],
      author: "maks@mail.com",
      date: "11.11.2020, 20:54:00",
      like: 65,
      coments: 20,
    },
    {
      title: "Заголовок поста 2",
      text: "Далеко-далеко за словесными горами в стране гласных и согласных",
      tags: ["доброе", "классное"],
      author: "kate@mail.com",
      date: "10.11.2020, 20:54:00",
      like: 6,
      coments: 2,
    },
  ],
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
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
  }
};

const showAllPosts = () => {
  let postHTML = "";

  setPosts.allPosts.forEach(
    ({ title, text, date, like, coments, author, tags }) => {
      postHTML += `
  <section class="post">
          <div class="post-body">
            <h2 class="post-title">${title}</h2>
            <p class="post-text">${text}</p>
            <div class="tags">
             
         
              ${tags.map((tag) => "#" + tag).join(" ")}
            </div>
            <!-- /.tags -->
          </div>
          <!-- /.post-body -->
          <div class="post-footer">
            <div class="post-buttons">
              <button class="post-button likes">
                <svg width="19" height="20" class="icon icon-like">
                  <use xlink:href="img/icons.svg#like"></use>
                </svg>
                <span class="likes-counter">${like}</span>
              </button>
              <button class="post-button comments">
                <svg width="21" height="21" class="icon icon-comment">
                  <use xlink:href="img/icons.svg#comment"></use>
                </svg>
                <span class="comments-counter">${coments}</span>
              </button>
              <button class="post-button save">
                <svg width="19" height="19" class="icon icon-save">
                  <use xlink:href="img/icons.svg#save"></use>
                </svg>
              </button>
              <button class="post-button share">
                <svg width="17" height="19" class="icon icon-share">
                  <use xlink:href="img/icons.svg#share"></use>
                </svg>
              </button>
            </div>
            <!-- /.post-buttons -->
            <div class="post-author">
              <div class="author-about">
                <a href="#" class="author-username">${author}</a>
                <span class="post-time">${date}</span>
              </div>
              <a href="#" class="author-link"
                ><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"
              /></a>
            </div>
            <!-- /.post-author -->
          </div>
          <!-- /.post-footer -->
        </section>
`;
    }
  );

  postsWrapper.innerHTML = postHTML;
};

const init = () => {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);

    //loginForm.reset();
  });

  loginSignup.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);

    loginForm.reset();
  });

  exitElem.addEventListener("click", (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener("click", (event) => {
    event.preventDefault();
    editContainer.classList.toggle("visible");

    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove("visible");
  });

  // отслеживаем клик по кнопке меню и запускаем функцию
  menuToggle.addEventListener("click", function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню
    menu.classList.toggle("visible");
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener("DOMContentLoaded", init);
