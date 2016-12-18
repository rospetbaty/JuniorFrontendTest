//GET user function
function getUserName() {
    var nameField = document.getElementById('nameField').value
    var gitUser = ("https://api.github.com/users/"+nameField)
    clear()
    fetch(gitUser)
    .then(resp => {
      if (resp.status >= 300 || resp.status < 200) {
        throw resp
      }
      return resp.json()
    })
    .then(data => {
      let view = document.getElementById("view")
      let bio = data['bio'] ? data['bio'] : 'This user has no description'
      view.innerHTML = `
        <div class="userinfo">
          <div class="useravatar">
            <img width="150" height="150" align="left" src="${data['avatar_url']}" />
          </div>
          <div class="userdescription">
            <span class="userhandle">@${data['login']}</span>
            <span class="name">${data['name']}</span>
            <span class="userbio">${bio}</span>
          </div>
        </div>`
        // calling repoList
        repoList()
    })
    .catch(_ => {
      let view = document.getElementById("view")
      view.innerHTML = `<p class="errormessage">User ${nameField} does not exist</p>`
    })
}


function clear() {
  let view = document.getElementById("view")
  let repos = document.getElementById("repos")
  view.innerHTML = ""
  repos.innerHTML = ""
}

//function for displaying repo list
function repoList(){
  var nameField = document.getElementById('nameField').value;
  var gitUser = ("https://api.github.com/users/"+nameField+"/repos")
  fetch(gitUser)
  .then(resp => {
    if (resp.status >= 300 || resp.status < 200) {
      throw resp
    }
    return resp.json()
  })
  .then(data => {
  let container = document.getElementById("repos")
    if (data.length > 0) {
      let repos = data.map(repo => `<li class="repo">
        <a href="${repo.html_url}">${repo.name}</a>
        <div class="social">
          <span class="stars">
            <img src= ./images/Octicons-star.png height="15" width="15">${repo.stargazers_count}
          </span>
          <span class="forks">
            <img src= ./images/fork.svg height="15" width="15"> ${repo.forks_count}
          </span>
        </div>
      </li>`).join('');
      container.innerHTML = `<h2 class="repotitle">Repositories</h2> <ul class="reposlist">${repos}</ul>`;
    } else {
      container.innerHTML = `<h2 class="repotitle">Repositories</h2> <p>This user has no repos</p>`;
    }
  });
  };

//start search by pressing Return instead of clicking button
document.addEventListener('DOMContentLoaded', _ => {
  document.getElementById('tfnewsearch').onsubmit = function (e) {
    e.preventDefault();
    getUserName();
  }
});
