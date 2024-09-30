import express from "express"
import cookieParser from "cookie-parser"
import  authRoutes from "./Routes/auth.route.js"
import movieRoutes from "./Routes/movie.route.js"
import tvRoutes from "./Routes/tv.route.js"
import searchRoutes from "./Routes/search.route.js"
import { ENV_VARS } from "./config/envVars.js";
import { connectDb } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js"

const app=express();
const Port=ENV_VARS.PORT;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use( express.static('public'));
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes)
app.use("/api/v2/movie",protectRoute,movieRoutes)
app.use("/api/v2/tv",protectRoute,tvRoutes)
app.use("/api/v2/search",protectRoute,searchRoutes)

app.listen(Port, ()=>{
    console.log(`server started 5000`);
    connectDb();
    
})

