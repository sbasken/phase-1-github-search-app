const form = document.querySelector("#github-form")
const list = document.querySelector("#user-list")
const repos = document.querySelector("#repos-list")

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    list.innerHTML = ""
    repos.innerHTML = ""

    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
    .then(res => res.json())
    .then(usersData => usersData.items.forEach(renderUser))
})

function renderUser(userData) {
    const name = document.createElement("li")
    name.textContent = userData.login;

    const avatar = document.createElement("img")
    avatar.src = userData.avatar_url;
    avatar.alt = `${userData.login} avatar image`

    avatar.addEventListener("click", (e) => handleClick(userData))

    const profileLink = document.createElement("a")
    profileLink.href = userData.html_url;
    profileLink.textContent = "Github Profile"

    list.append(name, avatar, profileLink)
}

function handleClick(userData) {
    fetch(`https://api.github.com/users/${userData.login}/repos`)
    .then(res => res.json())
    .then(userRepos => {
        list.innerHTML = ""
        renderUser(userData)

        userRepos.forEach(renderRepos)
    })
}

function renderRepos(user) {
    const li = document.createElement("li")
    li.textContent = user.full_name

    repos.append(li)

}
