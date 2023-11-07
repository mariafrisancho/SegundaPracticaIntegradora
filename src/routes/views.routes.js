import { Router } from "express";


const router = Router();

 router.get("/",(req,res)=>{
         res.render("home");
  
 }); 

// endPoint registrar usuario
router.get("/signup",(req,res)=>{
    res.render("signupView");
});


// endPoint registrar logearse usuario
router.get("/login",(req,res)=>{
    res.render("loginView");
});

router.get("/profile",(req,res)=>{
    console.log("desde el profile",req.user);
    if(req.user?.email){
        const userEmail = req.user.email;
        res.render("profileView",{userEmail});
    } else {
        res.redirect("/login");
    }

  
});
export {router as viewsRouter}