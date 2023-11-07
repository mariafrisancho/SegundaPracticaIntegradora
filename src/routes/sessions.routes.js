import { Router } from "express";

import { config } from "../config/config.js";

import passport from "passport";

const router =Router();

//Ruta de solicitud registro con github

router.get("/signup-github", passport.authenticate("signupGithubStrategy"));

//ruta del callback con github

router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{

    failureRedirect:"/api/sessions/fail-signup"

}), (req,res)=>{

    res.redirect("/profile");

});

// ruta para el registro de usuario

router.post("/signup",passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
}),async(req,res)=>{
    res.render("loginView",{message: "usuario registrado correctamente"});

});

router.get("/fail-signup",(req,res)=>{
    res.render("signupView",{error:"No se pudo registar el usuario"});
}

);

// ruta para login de usuario
router.post("/login",passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}), async(req,res)=>{
  
        res.redirect("/profile");
        
    
});

router.get("/fail-login",(req,res)=>{
    res.render("loginView",{error:"No se puede iniciar session para este usuario"});
});




router.get("/logout",async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err)return res.render("profileView",{error:"No se pudo cerrrar la session"});
            res.redirect("/");
        })
       
        
    } catch (error) {
        res.render("logout",{error:"No se pudo cerrar sesion para este usuario"});
    }
});


export {router as sesionsRouter};