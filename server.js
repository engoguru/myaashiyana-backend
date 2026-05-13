const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5656;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://myaashiyana.org",
  "https://www.myaashiyana.org",
  "https://admin.myaashiyana.org",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    credentials: true,
  }),
);

app.options("*", cors());

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errroHandler");
const authRouter = require("./Routes/authRoute");
const uploadRouter = require("./Routes/uploadRoute");
const numcountRouter = require("./Routes/numcountRoute");
const emailRouter = require("./Routes/EmailRoute");
const phoneRouter = require("./Routes/phoneRoute");
const galleryRouter = require("./Routes/galleryRoute");
const contactFormRouter = require("./Routes/contactRoute");
const addressRouter = require("./Routes/addressRoute");
const ourteamRouter = require("./Routes/ourteamRoute");
const testimonialsRouter = require("./Routes/testimonialsRoute");
const programeRouter = require("./Routes/programeRoute");
const socialmediaRouter = require("./Routes/socialmediaRouter");
const mapRouter = require("./Routes/mapRoute");
const missionRouter = require("./Routes/missionRoute");
const visionRouter = require("./Routes/visionRoute");
const aboutRouter = require("./Routes/aboutRoute");
const serviceRouter = require("./Routes/serviceRoute");
const serviceSubRouter = require("./Routes/serviceSubRoute");
const upTeamRouter = require("./Routes/upTeamRoute");
const faqRouter = require("./Routes/faqRoute");
const rescueRouter = require("./Routes/rescueRoute");
const wishlistRouter = require("./Routes/wishListRoute");
const needsRouter = require("./Routes/needsRoute");
const productRouter = require("./Routes/productRoute");
const blogRouter = require("./Routes/blogRoute");
const donationRouter = require("./Routes/donationRoute");

connectDB();

app.use(morgan("dev"));

const donationController = require("./controller/donationCtrl");
const needController = require("./controller/needCtrl");

app.post(
  "/api/v1/needs/webhook",
  express.raw({ type: "*/*" }),
  needController.handleNeedWebhook,
);
app.get("/api/v1/needs/webhook", (req, res) =>
  res.send("Needs/Campaign Webhook is active ✅"),
);

app.post(
  "/api/v1/donation/webhook",
  express.raw({ type: "*/*" }),
  donationController.handleWebhook,
);
app.get("/api/v1/donation/webhook", (req, res) =>
  res.send("Donation Webhook is active ✅"),
);

app.get("/", (req, res) => res.send("API is Working ✅"));
app.get("/api/v1", (req, res) => res.send("API is Working ✅"));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());

// routes
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/numcount", numcountRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/phone", phoneRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/contactQuery", contactFormRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/ourteam", ourteamRouter);
app.use("/api/v1/testimonials", testimonialsRouter);
app.use("/api/v1/programe", programeRouter);
app.use("/api/v1/socialmedia", socialmediaRouter);
app.use("/api/v1/map", mapRouter);
app.use("/api/v1/mission", missionRouter);
app.use("/api/v1/vision", visionRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/subSer", serviceSubRouter);
app.use("/api/v1/upteam", upTeamRouter);
app.use("/api/v1/faq", faqRouter);
app.use("/api/v1/rescue-story", rescueRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/needs", needsRouter);
app.use("/api/v1/blog", blogRouter);
/* ✅ DONATION razorpay ROUTE */
app.use("/api/v1/donation", donationRouter);
// middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${PORT}`.bgCyan
      .white,
  );
});
