const usernameInput = document.getElementById("name");
const button = document.getElementById("button");
const unfollowersContent = document.getElementById("unfollowers");
const unfollowingContent = document.getElementById("unfollowing");
const followersContent = document.getElementById("followers");
const followingContent = document.getElementById("following");
const notifications = document.querySelector(".notifications");
const tabTitle = document.querySelectorAll(".tab-title");
const tab = document.querySelectorAll(".tab");
let username = "";

usernameInput.addEventListener("input", (e) => {
  username = e.target.value;
  return username;
});

function manageErrors(res) {
  if (!res.ok) {
    console.log(res.statusText);
    throw Error(res.statusText);
  }
  return res;
}

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
          const list = document.createElement("li");
          const template = `
      <img src=${avatar} alt=${login} />
      <h1>${login}</h1>
      `;
          if (tabTitle[0].classList.contains("followers")) {
            tabTitle[0].innerHTML = `followers (${followersResults.length})`;
          }
          list.innerHTML = template;
          return followersContent.append(list);
        });
        followingResponse.map((result) => {
          const avatar = result.avatar_url;
          const login = result.login;
          const id = result.id;
          followingResults.push({ id, avatar, login });
          const list = document.createElement("li");
          const template = `
      <img src=${avatar} alt=${login} />
      <h1>${login}</h1>
      `;
          if (tabTitle[1].classList.contains("following")) {
            tabTitle[1].innerHTML = `following (${followingResults.length})`;
          }
          list.innerHTML = template;
          return followingContent.append(list);
        });

        const unfollowers = followingResults.filter(
          ({ id: id2 }) => !followersResults.some(({ id: id1 }) => id2 === id1)
        );

        unfollowers.forEach((unfollow) => {
          const { avatar, login } = unfollow;
          const list = document.createElement("li");
          const template = `
      <img src=${avatar} alt=${login} />
      <h1>${login}</h1>
      `;
          if (tabTitle[2].classList.contains("unfollowers")) {
            tabTitle[2].innerHTML = `unfollowers (${unfollowers.length})`;
          }
          list.innerHTML = template;
          return unfollowersContent.append(list);
        });

        const unfollowing = followersResults.filter(
          ({ id: id2 }) => !followingResults.some(({ id: id1 }) => id2 === id1)
        );
        unfollowing.forEach((unfollow) => {
          const { avatar, login } = unfollow;
          const list = document.createElement("li");
          const template = `
      <img src=${avatar} alt=${login} />
      <h1>${login}</h1>
      `;
          if (tabTitle[3].classList.contains("unfollowing")) {
            tabTitle[3].innerHTML = `unfollowing (${unfollowing.length})`;
          }
          list.innerHTML = template;
          return unfollowingContent.append(list);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else if (username === "") {
    notifications.innerHTML = "Please add your github name!";
    setTimeout(() => {
      notifications.innerHTML = "";
    }, 4000);
  }
});

// HANDLE TABS//
function handleTabs(e) {
  tabTitle.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
  const dataList = e.target.dataset;
  tab.forEach((item) => {
    item.classList.remove("active");
    if (item.id === dataList.list) {
      item.classList.add("active");
    }
  });
}
