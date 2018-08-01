import * as express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/developers/:team", async (request, response) => {
    const devResponse = await fetch(`http://${process.env.DATA_ACCESS_SERVICE_HOST}/developers`);
    const allDevelopers = await devResponse.json();
    const teamDevelopers = allDevelopers.filter((d: { team: string }) => d.team === "All" 
                                                  || d.team === request.params.team);
    response.send(teamDevelopers);
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`server running on port ${port}`));
