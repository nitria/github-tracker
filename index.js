const PORT = 3000;
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var username = req.body.name;
  const followingUrl = axios.get(
    `https://api.github.com/users/${username}/following?page=1&per_page=1000`
  );

  const followersUrl = axios.get(
    `https://api.github.com/users/${username}/followers?page=1&per_page=1000`
  );

  axios.all([followersUrl, followingUrl]).then((responses) => {
    const resone = responses[0].data;
    const restwo = responses[1].data;
    const results1 = [];
    const results2 = [];
    resone.map((result) => {
      results1.push(`${result.id} ${result.login}`);
    });
    restwo.map((result) => {
      results2.push(`${result.id} ${result.login}`);
    });

    const unfollowing = results2.filter((e) => !results1.includes(e));
    res.json(unfollowing);
  });
});

app.listen(PORT, () => console.log(`Port: ${PORT}`));
