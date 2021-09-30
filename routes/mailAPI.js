require("dotenv").config();

const nodemailer = require("nodemailer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const router = express.Router();

//step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.PASSWORD,
    pass: process.env.EMAIL,
  },
});
router.post("/send-text", async (req, res) => {
  // step2
  let mailOtion = {
    from: "test@noreply.com",
    to: "gawistegaw@gmail.com,youssef.dridi0612@gmail.com",
    subject: "testing",
    html: "<h2>hello world</h2>",
  };

  //step 3
  transporter
    .sendMail(mailOtion)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.json({ message: "E-mail send successfully!" });
});

router.post("/send-html", async (req, res) => {
  // step2
  let mailOtion = {
    from: "test@noreply.com",
    to: "gawistegaw@gmail.com,youssef.dridi0612@gmail.com",
    subject: "testing",
    html: "<h2>hello world</h2>",
  };

  //step 3
  transporter
    .sendMail(mailOtion)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.json({ message: "E-mail send successfully!" });
});

router.post("/send-html/:name", async (req, res) => {
  console.log(req);

  //step 2
  const template = fs.readFileSync(path.resolve("./views/", "mailTest.html"), {
    encoding: "utf-8",
  });
  const html = ejs.render(template, {
    name: req.params.name,
  });
  // step3
  let mailOtion = {
    from: "test@noreply.com",
    to: "gawistegaw@gmail.com,youssef.dridi0612@gmail.com",
    subject: "testing",
    html: html,
  };

  //step 4
  transporter
    .sendMail(mailOtion)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.json({ message: "E-mail send successfully!" });
});

router.post("/send-attachments", async (req, res) => {
  //step 2
  const template = fs.readFileSync(path.resolve("./views/", "mailTest.html"), {
    encoding: "utf-8",
  });
  const html = ejs.render(template, {
    name: req.params.name,
  });
    // step3
  let relativePath=process.cwd();
  let mailOtion = {
    from: "test@noreply.com",
    to: "gawistegaw@gmail.com,youssef.dridi0612@gmail.com",
    subject: "testing",
    html: html,
    attachments: [
      {
        // utf-8 string as an attachment
        filename: "text1.txt",
        content: "hello world!",
      },
    
      {
        // stream as an attachment
        filename: "planning.pdf",
        content: fs.createReadStream(relativePath+"/filesToAttach/planning.pdf"),
      },
    ],
  };

  //step 3
  transporter
    .sendMail(mailOtion)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.json({ message: "E-mail send successfully!" });
});

// export routes
module.exports = router;
