// the function which handles the input field logic

//request(user, repo, callback)
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
        <p "text-align:right"><font size="2" color="grey">@${data['login']}</font><br/><em><b>${data['name']}</b></em><br/>
        ${data['bio']}</p>
      </div>`
    })
    .catch(_ => {
      let view = document.getElementById("view")
      view.innerHTML = `<p style="background-color: #ffcccc;color:red;">User ${nameField} does not exist</p>`
    })
}



/*function populatePerson(data){
  for(var key in data){
    console.log(key);
  }
console.log(key);
  }

/*function populateRepos(data)
  for each object in data
    print ()*/
