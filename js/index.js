const GITHUBAPI= 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search =  document.getElementById('search');


async function getUser(username){
    const response = await fetch(GITHUBAPI + username);
    const responseData= await response.json();

    createUserCard(responseData);
    getRepos(username);
}

async function getRepos(username) {
    //const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repo_count}&sort=${this.repo_sort}`);
       
    
    const response = await fetch(GITHUBAPI + username + "/repos");
    const responseData = await response.json();

    addReposToCard(responseData);
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.created_at- a.created_at)
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
        <div class="card">
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

});