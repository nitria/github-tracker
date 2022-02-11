const usernameInput = document.getElementById("name");
const button = document.getElementById("button");
const showResults = document.querySelector(".results");
const notifications = document.querySelector(".notifications");
let username = "";

usernameInput.addEventListener("input", (e) => {
  username = e.target.value;
  return username;
});
console.log(username);
button.addEventListener("click", (e) => {
  e.preventDefault();
  const followingUrl = `https://api.github.com/users/${username}/following?page=1&per_page=1000`;
  const followersUrl = `https://api.github.com/users/${username}/followers?page=1&per_page=1000`;
  if (username !== "") {
    Promise.all([
      fetch(followersUrl).then((res) => res.json()),
      fetch(followingUrl).then((res) => res.json()),
    ])
      .then((responses) => {
        const followersResponse = responses[0];
        const followingResponse = responses[1];
        const followersResults = [];
        const followingResults = [];
        followersResponse.map((result) => {
          const avatar = result.avatar_url;
          const login = result.login;
          const id = result.id;
          followersResults.push({ id, avatar, login });
        });
        followingResponse.map((result) => {
          const avatar = result.avatar_url;
          const login = result.login;
          const id = result.id;
          followingResults.push({ id, avatar, login });
        });

        const unfollowing = followingResults.filter(
          ({ id: id2 }) => !followersResults.some(({ id: id1 }) => id2 === id1)
        );

        unfollowing.forEach((unfollow) => {
          const { avatar, login } = unfollow;
          const list = document.createElement("li");
          const template = `
      <img src=${avatar} alt=${login} />
      <h1>${login}</h1>
      `;
          list.innerHTML = template;
          return showResults.append(list);
        });
      })
      .catch((err) => console.log(err.message));
  } else if (username === "") {
    notifications.innerHTML = "Please add your github name!";
  }
});
