const express = require("express");
const router = express.Router();
const nbaUrl = "http://data.nba.net/10s/prod/v1/2018/players.json";
const request = require("request");

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756"
};
const dreamTeam = [];

router.get("/teams/:teamName", function(req, res) {
  const teamName = req.params.teamName;
  const id = teamToIDs[teamName];
  request(nbaUrl, function(error, result) {
    const jsonRes = JSON.parse(result.body).league.standard;
    const players = jsonRes
      .filter(r => {
        if (r.teamId === id && r.isActive) {
          return r;
        }
      })
      .map((player, i) => {
        return {
          fName: player.firstName,
          lName: player.lastName,
          jersey: player.jersey,
          position: player.pos,
          id: i
        };
      });
    players.forEach(player => {
      player.img = `https://nba-players.herokuapp.com/players/${player.lName}/${player.fName}`;
    });
    res.send(players);
  });
});

router.get("/dreamTeam", function(req, res) {
  res.send(dreamTeam);
});

router.post("/roster", function(req, res) {
  const player = req.body;

  if (dreamTeam.length < 5 && !dreamTeam.find(p => p.id == player.id)) {
    dreamTeam.push(player);
  }
  res.end();
});

router.put("/team", function(req, res) {
  const data = req.query;
  teamToIDs[data.teamName] = data.teamId;
  res.end();
});

module.exports = router;
