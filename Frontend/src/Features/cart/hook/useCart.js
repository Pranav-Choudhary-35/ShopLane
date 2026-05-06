import { addToCart } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { addItems } from "../state/cart.slice";



export const useCart = () => {
    const dispatch=useDispatch();

   async function handleAddItem({productId,variantId}){

    const data=await addToCart({productId,variantId});

    return data;


}
return {handleAddItem};

}