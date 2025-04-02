import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

let userBlog = null; // Store the user's blog data (in memory for now)

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const author = req.body["name"];
    const title = req.body["title"];
    const blog = req.body["blog"];
    userBlog = { author, title, blog }; // Store the user's blog
    res.render("blog.ejs", { content: userBlog });
});

app.get("/read-blog", (req, res) => {
    res.render("blog.ejs", { content: userBlog });
});

app.get("/edit-blog", (req, res) => {
    if (userBlog) {
        res.render("edit-blog.ejs", { content: userBlog });
    } else {
        res.redirect("/");
    }
});

app.post("/edit-blog", (req, res) => {
    const author = req.body["name"];
    const title = req.body["title"];
    const blog = req.body["blog"];
    userBlog = { author, title, blog }; // Update the user's blog
    res.render("blog.ejs", { content: userBlog });
});

app.get("/delete-blog", (req, res) => {
    userBlog = null; // Reset userBlog to null
    res.redirect("/read-blog"); // Redirect to Read Blog to show default content
});

app.get("/new-blog", (req, res) => {
    userBlog = null; // Reset userBlog to null
    res.redirect("/"); // Redirect to homepage for a fresh form
});

app.get("/about-me", (req, res) => {
    res.render("about-me.ejs");
});

app.get("/contact-me", (req, res) => {
    res.render("contact-me.ejs");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});