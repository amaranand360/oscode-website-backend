import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();


app.listen(process.env.PORT, () => {
  console.log(
    `Oscode website Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});




