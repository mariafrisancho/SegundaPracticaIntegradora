import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { usersManagerMongo } from "./mongo/usersManagerMongo.js";
export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const usersService=new usersManagerMongo();