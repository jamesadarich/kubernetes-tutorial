import * as express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/env", (r, rs) => {
    rs.send(process.env);
});

app.get("/developers", async (request, response) => {
    const devResponse = await fetch(`http://${process.env.DATA_ACCESS_SERVICE_HOST}:${process.env.DATA_ACCESS_SERVICE_PORT}/developers`);
    response.send(await devResponse.json());
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server running on port ${port}`));
