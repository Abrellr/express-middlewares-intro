const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouter = require('./userRouter')
const bodyParser = require('body-parser')

// const logger = (req, res, next) => {
//   console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
//   next();
// };

// app.use(logger);

app.use(morgan("tiny"));
app.use(bodyParser.json())
app.use('/api/users', userRouter)

const secretToken = "chicken"

const authorization = (req, res, next) => {
  const { token } = req.params
  console.log('Checking user authorization...')
  console.log({token})
  if (!token || token !== secretToken) {
    return res.status(401).send('Unauthorized access!')
  } else {
    next()
  }
  next()
}

app.use('/admin/:token?', authorization)

app.get("/", (req, res) => {
  res.send("Home page");
});


app.get("/admin/:token?", (req, res) => {
  res.send("Admin page");
});

app.use((err, req, res, next) => {
  console.log('Oh  noes!')
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
