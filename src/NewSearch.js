//GET user function

function getUserName() {
    var nameField = document.getElementById('nameField').value;
    var gitUser = ("https://api.github.com/users/"+nameField);
    fetch(gitUser)
    .then(resp => {
      if (resp.status >= 300 || resp.status < 200) {
        throw resp
      }
      return resp.json()
    })
    .then(data => {
      let view = document.getElementById("view")
      view.innerHTML = `<div>
        <img width="150" height="150" align="left" src="${data['avatar_url']}" />
        <p style="text-align:right"><font size="2" color="grey">@${data['login']}
        </font><br/><em><b>${data['name']}</b></em><br/>
        ${data['bio']}</p>
        </div>`
        // calling repoList
        repoList();
    })
    .catch(_ => {
      let view = document.getElementById("view")
      view.innerHTML = `<p class="errormessage">User ${nameField} does not exist</p>`
    })
}


//function for displaying repo list
function repoList(){
  var nameField = document.getElementById('nameField').value;
  var gitUser = ("https://api.github.com/users/"+nameField+"/repos");
  fetch(gitUser)
  .then(resp => {
    if (resp.status >= 300 || resp.status < 200) {
      throw resp
    }
    return resp.json()
  })
  .then(data => {
  const container = document.getElementById("repos");
  if (data.length > 0) {
    const repos = data.map(repo => `<li class="repolist">
      <a href="${repo.html_url}">${repo.name}</a>
      <span style="padding-left:10px;text-align:right;" class="stars">
      <img src= ./images/Octicons-star.png height="15" width="15">
      ${repo.stargazers_count}</span>
      <span class="forks"><img src= ./images/fork.svg height="15" width="15">
      ${repo.forks_count}</span>
    </li>`).join('');
    container.innerHTML = `<br></br><h2 class="repotitle">Repositories</h2>
    <ul>${repos}</ul>`;
  } else {
    container.innerHTML = "<p>This user has no repos</p>";
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
