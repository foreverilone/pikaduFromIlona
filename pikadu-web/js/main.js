// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJtWkv9A3sqkcBgj7HPjlv0i001SM3D4w",
  authDomain: "pikadu-2d7e3.firebaseapp.com",
  databaseURL: "https://pikadu-2d7e3.firebaseio.com",
  projectId: "pikadu-2d7e3",
  storageBucket: "pikadu-2d7e3.appspot.com",
  messagingSenderId: "325152327050",
  appId: "1:325152327050:web:a585b731cf4224d37f3473",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

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
const buttonNewPost = document.querySelector(".button-new-post");
const addPostElem = document.querySelector(".add-post");

const listUsers = [
  {
    id: "01",
    email: "maks@mail.com",
    password: "123456",
    displayName: "MaksJS",
    photo: "https://st.kp.yandex.net/images/kadr/sm_3434403.jpg",
  },
  {
    id: "02",
    email: "kate@mail.com",
    password: "12344556",
    displayName: "KateJS",
    photo:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d91cf99a-63a2-432a-a72b-ae0b8c6ea1d6/360",
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
      if (handler) {
        handler();
      }
    } else {
      alert("Пользователь с такими данными не найден");
    }
  },
  logOut(handler) {
    this.user = null;
    if (handler) {
      handler();
    }
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
      if (handler) {
        handler();
      }
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

    if (handler) {
      handler();
    }
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
      author: {
        displayName: "maks",
        photo: "https://st.kp.yandex.net/images/kadr/sm_3434403.jpg",
      },
      date: "11.11.2020, 20:54:00",
      like: 65,
      coments: 20,
    },
    {
      title: "Заголовок поста 2",
      text: "Далеко-далеко за словесными горами в стране гласных и согласных",
      tags: ["доброе", "классное"],
      author: {
        displayName: "kate",
        photo:
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d91cf99a-63a2-432a-a72b-ae0b8c6ea1d6/360",
      },
      date: "10.11.2020, 20:54:00",
      like: 6,
      coments: 2,
    },
  ],
  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(",").map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      coments: 0,
    });

    if (handler) {
      handler();
    }
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
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add("visible");
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
    buttonNewPost.classList.remove("visible");
    addPostElem.classList.remove("visible");
    postsWrapper.classList.add("visible");
  }
};

const showAddPost = () => {
  addPostElem.classList.add("visible");
  postsWrapper.classList.remove("visible");
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
             
         
              ${tags
                .map((tag) => `<a href="#${tag}" class="tag">#${tag}</a>`)
                .join(" ")}
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
                <a href="#" class="author-username">${author.displayName}</a>
                <span class="post-time">${date}</span>
              </div>
              <a href="#" class="author-link"
                ><img src=${
                  author.photo || "img/avatar.jpeg"
                } alt="avatar" class="author-avatar"
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

  addPostElem.classList.remove("visible");
  postsWrapper.classList.add("visible");
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

  buttonNewPost.addEventListener("click", (event) => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener("submit", (event) => {
    event.preventDefault();

    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 6) {
      alert("Слишком короткий заголовок");
      return;
    }

    if (text.value.length < 50) {
      alert("Слишком короткий пост");
      return;
    }

    setPosts.addPost(title.value, title.value, tags.value, showAllPosts);

    addPostElem.classList.remove("visible");
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener("DOMContentLoaded", init);

/* fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));
 */
