const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRoute");

const app = express();

//Handle static assets
const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

//Handle ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//App middleware
app.use(express.urlencoded({ extended: true }));

//Router
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});