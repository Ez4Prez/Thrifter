import React, {useState} from 'react';
import LikeButton from './LikeButton';


function ShopItem({item, addToCart, setLikeItem, patchItemLike}){
    
    const [inCart, setInCart] = useState(false)

    function toggleAddToCart(){
        setInCart(inCart => !inCart)
    }
    // Map(item => item.id)
    // Map(item =>{
    //     item.id += 1
    //     return item.id
    // })

    return (
        <li className="shop-item">
            <img src={item.item_img} alt={"Item Name"} />
            <h3 className="shop-brand">{item.item_brand}</h3>
            <h4 className="shop-description">{item.item_description}</h4>
            <h4 className="shop-price">${item.item_price}</h4>
            <h4 className="shop-size">Size: {item.item_size}</h4>
            <button class="btn btn-dark" onClick={() => {
                addToCart(item)
                toggleAddToCart()
            }} >{inCart ? "In Cart" : "Add to Cart"}</button> 
            <LikeButton item={item} setLikeItem={setLikeItem} patchItemLike={patchItemLike}/>

        </li>
    )
}

export default ShopItem;