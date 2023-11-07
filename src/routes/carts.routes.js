import { Router } from "express";
import { cartsService } from "../dao/index.js";
import { productsService } from "../dao/index.js";


const router = Router();


// Endpoint devuelve  todos los carritos
router.get("/",async(req,res)=>{
    try {
        const result = await cartsService.getCarts();
        res.json({status:"success", data:result});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});
//Endpoint muestra un carrito ingresando el id

router.get("/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const result = await cartsService.getCartsById(cartId);
        res.json({status:"success", data:result});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});


// Endpoint crea carritos
router.post("/", async(req,res)=>{
    try {
        //const cartinfo = req.body;
        const result = await cartsService.createCart();
        res.json({status:"success", data:result});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});

// arreglo de productos
const productos=[
    {
        productId:'651f89dbb764263a9f5b3edc',
        quantity: 5
          
      },

{
  productId:'651e1aeeb20d481e7dc6f59a',
  quantity:  10
    
},
{
    productId:'651f8a0eb764263a9f5b3ede',
    quantity: 2
      
  }

];

// Endpoint actualiza carrito con arreglo de productos

router.put("/:cid", async(req,res)=>{

    try {
        const{cid:cartId}=req.params;
        // verificar si existe el IDcarrito
        const existCart= await cartsService.getCartsById(cartId);
        if(existCart){
            const result = await cartsService.addProducts(cartId,productos);
            res.json({status:"success", data:result});
        } else{
            throw new Error("El carrito no existe");

        }
                   
      
    } catch (error) {

        res.json({status:"error", message:error.message});

    }

});

// agrega productos  a los carritos por req.parametros
router.put("/:cid/product/:pid", async(req,res)=>{

    try {
        const{cid:cartId,pid:productId}=req.params;
        // verificar si existe el IDcarrito
        const existCart= await cartsService.getCartsById(cartId);
        if(existCart){
            const result = await cartsService.addProduct(cartId,productId);
            res.json({status:"success", data:result});
        } else{
            throw new Error("El carrito no existe");

        }
                        
      

    } catch (error) {

        res.json({status:"error", message:error.message});

    }

});

// Endpoint actualiza cantidad de un producto de un carrito....

router.put("/:cid/products/:pid",async(req,res)=>{
    try {
        const{cid:cartId,pid:productId}=req.params;
        const {newQuantity}=req.body;
         // evalua si existe el carrito

         const cart= await cartsService.getCartsById(cartId); //evaluar si el carrito existe
         if(cart){
            const result = await cartsService.updateProductCart(cartId,productId,newQuantity);
             res.json({status:"succes", data:result});

         } else{
            throw new Error("El carrito no existe");

         }
           
       
 
     } catch (error) {
 
         res.json({status:"error", message:error.message});
 
     }
 

})


// Endpoint elimina producto seleccionado de un carrito

router.delete("/:cid/products/:pid",async(req,res)=>{
    try {
        const{cid:cartId,pid:productId}=req.params;
        
 
         const cart= await cartsService.getCartsById(cartId); //evaluar si el carrito existe
         if(cart){
            const result = await cartsService.deleteProduct(cartId,productId);
 
            res.json({status:"succes", data:result});

         } else{
            throw new Error("El carrito no existe");

         }
           
       
 
     } catch (error) {
 
         res.json({status:"error", message:error.message});
 
     }
 

})

// endpoint elimina los productos de un carrito
router.delete("/:cid/",async(req,res)=>{
    try {
        const{cid:cartId}=req.params;
        
 
         const cart= await cartsService.getCartsById(cartId); //evaluar si el carrito existe
         if(cart){
            const result = await cartsService.deleteProductAll(cartId);
 
            res.json({status:"succes", data:result});

         } else{
            throw new Error("El carrito no existe");

         }
           
       
 
     } catch (error) {
 
         res.json({status:"error", message:error.message});
 
     }
 

})



export { router as cartsRouter};