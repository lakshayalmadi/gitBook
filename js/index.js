const GITHUBAPI= 'https://api.github.com/users/';
//localStorage.setItem('uiTheme', 'dark')

const main = document.getElementById('main');
const form = document.getElementById('form');
const search =  document.getElementById('search');

const toggle = document.getElementById("toggle");

toggle.addEventListener("change", (e) => {
    document.body.classList.toggle("light-mode", e.target.checked);
    document.getElementsByClassName('card').classList.toggle("light-mode-items", e.target.checked);
    document.getElementById('search').classList.toggle("light-mode-items", e.target.checked);
    //localStorage.setItem('uiTheme', localStorage.getItem('uiTheme')==='dark'?'light':'dark')
    //if(localStorage.getItem('uiTheme')==='dark'){
    //    document.getElementsByClassName('card').setAttribute('style', 'background-color: white');
    //}
    //else{
    //    document.getElementsByClassName('card').removeAttribute('style');
    //}
});

async function getUser(username){
    const response = await fetch(GITHUBAPI + username);
    const responseData= await response.json();

    createUserCard(responseData);
    getRepos(username);
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

function createUserCard(user){

    const cardHTML =`
        <div class="card" id="card">
            <div class="image-container">
                <img class="profile-img" src="${user.avatar_url}" alt="${user.name}"/>
            </div>
            <div class="user-info">
                <h2><a href="${user.html_url}">${user.name}</a></h2>
                <p>${user.bio}</p>
                <p>${user.company}</p>
                <p>${user.location}</p>
                <p>${user.blog}</p>    

                <ul class="info">
                    <li><strong>Followers: ${user.followers}</strong></li>
                    <li><strong>Following: ${user.following}</strong></li>
                    <li><strong>Repos: ${user.public_repos}</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>

        `;

        main.innerHTML = cardHTML;
}

form.addEventListener('submit', e =>{
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value='';
    }
    main.innerHTML = cardHTML;
    }

});