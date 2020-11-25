import express from 'express';
const app = express();


export default app.listen(8080, () =>
{
    console.log("server is running");
});