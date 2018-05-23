import * as express from "express";
import { getAllDevelopers } from "../data-access/get-all-developers";

const app = express();

app.get("/developers", (request, response) => {
    response.send(getAllDevelopers());
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server running on port ${port}`));
