import { trusted } from "mongoose";
import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo{
    constructor(){
        this.model = cartsModel;
    };


  ///metodo para realizar la populacion ingresando el id del carrito ,
  ///obtiene la informacion de todos los productos del carrito
    async getCartsById(CarIId){
        try {
           
            const result = await this.model.findById(CarIId).populate("products.productId");
            
            if(!result){
                throw new Error("El carrito no existe");

            }
            return result;
        } catch (error) {
            console.log("getCartsById",error.message);
            throw new Error("No se pudo obtener el carrito");
        }
    };
//  metodo utilizar para verificar si existe el carrito
//  ee esta utilizando desde los otros metodos para obtner consulta si existe el carrito 
async getCartsByIds(CarIId){
    try {
       
        const result = await this.model.findById(CarIId);
        
        if(!result){
            throw new Error("El carrito no existe");

        }
        return result;
    } catch (error) {
        console.log("getCartsById",error.message);
        throw new Error("No se pudo obtener el carrito");
    }
};

  // metodo que te devuelve tos los carritod
    async getCarts(){
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("getCarts",error.message);
            throw new Error("No se pudo obtener el listado de carritos");
        }

    };

    // metodo para crear carrito
    async createCart(){
        try {
            const newCart={};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            console.log("createCart",error.message);
            throw new Error("No se pudo crear el carrito");
        }

    };

    /// metodo para agregar productos a los carritos con array
    async addProducts(cartId, productos){
        try {
           const cart = await this.getCartsByIds(cartId);

          for(let i=0; i< productos.length;i++){
            let productoArray=productos[i].productId;
            let QuantityArray=productos[i].quantity;
            let productIndex = cart.products.findIndex(elm=>elm.productId== productoArray);
          

            if(productIndex>=0){
           
                cart.products[productIndex].quantity= cart.products[productIndex].quantity+QuantityArray;
     
     
             }
             else {
                let newproduct={
                    productId:productoArray,
                    quantity:QuantityArray

                };
             
                cart.products.push(newproduct);
                    
             }

          }
        
       console.log("cart",cart)
                     
         const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
         return result;  
       
        } catch (error) {
         console.log("addProduct",error.message);
         throw new Error("No se pudo agregar el producto al carrito");
         
        }
 
     };


 // metodo para agregar producto a los carritos por parametros
 async addProduct(cartId,productId){
    try {
        const cart= await this.getCartsById(cartId);
        const newProductCart={
            productId:productId,
            quantity:1
        }
        console.log("cart",cart);
        cart.products.push(newProductCart);
        const result= await this.model.findByIdAndUpdate(cartId,cart,{new:true});
        return result;

    } catch (error) {
        console.log("addProduct",error.message);
        throw new Error("No se puede agregar producto al carrito");
        
    }
 }
    // actualizar la cantidad del carrito
    async updateProductCart(cartId,productId,newQuantity){
        try {
         
            const cart = await this.getCartsByIds(cartId);
       
            const productIndex = cart.products.findIndex(elm=>elm.productId == productId);
            //const productIndex = cart.products.findIndex(elm=>elm._id == productId);


            if(productIndex>=0){
                console.log("product",cart.products[productIndex]);
               // si el producto existe en el carrito
               cart.products[productIndex].quantity=newQuantity;
             
             
              const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
              return result;
            }else{
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
   
               
        }
          
            catch (error) {
            console.log("updateProductCart",error.message);
            throw new Error("No se puede actualizar el producto del carrito");
            
           }
     }

    // metodo para borrar producto de un carrito
    async deleteProduct(cartId, productId){
        try {
         const cart = await this.getCartsById(cartId);
         const productExist=cart.products.find(elm=>elm.productId._id==productId);
         if(productExist){
            // si el producto existe en el carrito
           const newProducts= cart.products.filter(elm=>elm.productId._id!=productId); // solo comparamos el dato
           cart.products=newProducts;
           const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
           return result;


         } else{
            throw new Error("El producto no se puede eliminar porque no ha sido agregado");
         }
         
       
        } catch (error) {
         console.log("deleteProduct",error.message);
         throw new Error("No se puede borrar el producto del carrito");
         
        }
 
     };
 // metodo para borrar todos los productos de una carrito
 async deleteProductAll(cartId){
    try {
     const newProducts=[];
     const cart = await this.getCartsById(cartId);
     cart.products=newProducts;
     const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
     return result;
     
     
   
    } catch (error) {
     console.log("deleteProduct",error.message);
     throw new Error("No se puede borrar el producto del carrito");
     
    }

 };

  


};