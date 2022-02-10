const username = document.getElementById("name").value;
const button = document.getElementById("button");
const showResults = document.querySelector(".results");
const followingUrl = `https://api.github.com/users/${username}/following?page=1&per_page=1000`;
const followersUrl = `https://api.github.com/users/${username}/followers?page=1&per_page=1000`;
button.addEventListener("click", (e) => {
  e.preventDefault();
  Promise.all([
    fetch(followersUrl).then((res) => res.json()),
    fetch(followingUrl).then((res) => res.json()),
  ]).then((responses) => {
    const resone = responses[0];
    const restwo = responses[1];
    const results1 = [];
    const results2 = [];
    resone.map((result) => {
      const avatar = result.avatar_url;
      const login = result.login;
      const id = result.id;
      results1.push({ id, avatar, login });
    });
    restwo.map((result) => {
      const avatar = result.avatar_url;
      const login = result.login;
      const id = result.id;
      results2.push({ id, avatar, login });
    });

    const unfollowing = results2
      .map((result) => {
        return result.id;
      })
      .filter(
        (e) =>
          !results1
            .map((result) => {
              return result.id;
            })
            .includes(e)
      );
    console.log(unfollowing);

    // console.log(unfollowing);
    // const unfollowing = results2.filter((e) =>
    //   console.log(!results1.includes(e.id))
    // );

    // unfollowing.forEach((unfollow) => {
    //   const { avatar, login } = unfollow;
    //   const list = document.createElement("li");
    //   const template = `
    //   '<img src=${avatar} alt=${login} />'
    //   ${login}
    //   `;
    //   list.append(template);
    //   return showResults.appendChild(list);
    // });
  });
});
