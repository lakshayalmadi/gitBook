const GITHUBAPI= 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search =  document.getElementById('search');

getUser('lakshayalmadi');

async function getUser(username){
    const response = await fetch(GITHUBAPI + username);
    const responseData= await response.json();

    createUserCard(responseData);
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
                    <li><strong>${user.followers}</strong></li>
                    <li><strong>${user.following}</strong></li>
                    <li><strong>${user.public_repos}</strong></li>
                </ul>
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