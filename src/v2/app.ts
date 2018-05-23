import * as express from "express";
import { getAllDevelopers } from "../data-access/get-all-developers";

const app = express();

app.get("/developers/:team", (request, response) => {

    const allDevelopers = getAllDevelopers();
    const teamDevelopers = allDevelopers.filter(d => d.team === "All" 
                                                  || d.team === request.params.team);
    response.send(teamDevelopers);
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`server running on port ${port}`));
