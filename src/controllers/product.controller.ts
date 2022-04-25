import {Request, Response} from "Express";
import { createProductInput, deleteProductInput, findProductInput, updateProductInput } from "../schemas/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../services/product.service";
import logger from '../utils/logger';

export async function createProductHandler(req:Request<{},{}, createProductInput["body"]>, res:Response){
    const userId = res.locals.user._id;
    const body = req.body;

    try{
        const product = await createProduct({...body, user: userId});
        return res.send(product);
    }catch(e){
        logger.error("Error in creating a product [createProductHandler]", e);
        return res.status(500).send("Server Error: 500");
    }

    
}

export async function findProductHandler(req:Request<findProductInput["params"]>, res:Response){

    const productId = req.params.productId;
    const product = await findProduct({productId});

    if(!product) return res.sendStatus(404);

    try{
        const product = await findProduct({productId});
        return res.send(product);
    }catch(e){
        logger.error("Error while getting a product [findProductHandler]", e)
        return res.status(500).send("Server Error: 500");
    }

}

export async function updateProductHandler(req:Request<updateProductInput["params"], {}, updateProductInput["body"]>, res:Response){
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({productId});
    if(!product) return res.sendStatus(404);

    if(product.user !== userId) return res.sendStatus(403);

    try{
        const updatedProduct = await findAndUpdateProduct({productId}, update, {new: true});
        return res.send(updatedProduct);
    }catch(e){
        logger.error("Error while updating a product [updateProductHandler]", e)
        return res.status(500).send("Server Error: 500");
    }

    
}

export async function deleteProductHandler(req:Request<deleteProductInput["params"]>, res:Response){

    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({productId});
    if(!product) return res.sendStatus(404);

    if(product.user !== userId) return res.sendStatus(403);

    try{
        await deleteProduct({productId});
        return res.sendStatus(200);
    }catch(e){
        logger.error("Error while deleting a product [deleteProductHandler]", e)
        return res.status(500).send("Server Error: 500");
    }
    
}