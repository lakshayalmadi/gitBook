const GITHUBAPI = "https://api.github.com/users/";
localStorage.setItem("uiTheme", "dark");

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const toggle = document.getElementById("toggle");

toggle.addEventListener("change", (e) => {
  document.body.classList.toggle("light-mode", e.target.checked);
  localStorage.setItem(
    "uiTheme",
    localStorage.getItem("uiTheme") === "dark" ? "light" : "dark"
  );
  uiThemeHandler();
});

function uiThemeHandler() {
  const searchText = document.querySelector("#search");

  if (localStorage.getItem("uiTheme") === "light") {
    searchText.setAttribute("style", "background-color: #f2f2f2; color:#0D1117");
  } else {
    searchText.removeAttribute("style");
  }
  const cardElement = document.querySelector("#card");
  const userInfoElement = document.querySelector(".user-info");
  if (!cardElement) {
    return;
  }
  if (localStorage.getItem("uiTheme") === "light") {
    cardElement.setAttribute("style", "background-color: #F4F2F2");
    if (userInfoElement) {
      userInfoElement.setAttribute("style", "color : #0D1117");
    }
  } else {
    cardElement.removeAttribute("style");
    if (userInfoElement) {
      userInfoElement.removeAttribute("style");
    }
  }
}

async function getUser(username) {
  try {
    const response = await fetch(GITHUBAPI + username);
    const responseData = await response.json();
    if (responseData.message) {
      console.log("No user Found");
      createUserCard(responseData, true);
      return;
    }
    createUserCard(responseData);
    getRepos(username);
  } catch (err) {
    console.log("something went wrong");
  }
}

async function getRepos(username) {
  const response = await fetch(GITHUBAPI + username + "/repos");
  const responseData = await response.json();

  addReposToCard(responseData);
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
    });
}

function createUserCard(user, error = false) {
  let cardHTML;
  if (!error) {
    cardHTML = `
    <div class="card" id="card">
        <div class="image-container">
            <img class="profile-img" src="${user.avatar_url}" alt="${
      user.name
    }"/>
        </div>
        <div class="user-info">
            <h2><a href="${user.html_url}">${user.name}</a></h2>
            ${user.bio ? `<p>${user.bio}</p>` : ``}
            ${user.company ? `<p>${user.company}</p>` : ``}
            ${user.location ? `<p>${user.location}</p>` : ``}
            ${user.blog ? `<p>${user.blog}</p>` : ``}
            <ul class="info">
                <li><strong>Followers: ${user.followers}</strong></li>
                <li><strong>Following: ${user.following}</strong></li>
                <li><strong>Repos: ${user.public_repos}</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>

    `;
  } else {
    cardHTML = `
    <div class="card" id="card">
        <h2>No user Found</h2>  
    </div>
    `;
  }

  main.innerHTML = cardHTML;
  uiThemeHandler();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
