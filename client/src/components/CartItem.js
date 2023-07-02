import Cart from "./Cart";

function CartItem({cartItem, removeFromCart}){
    
    return (
        <li className="cart-item">
            <img src={cartItem.item_img} alt={"Item Name"} />
            <h2 className="shop-brand">{cartItem.item_brand}</h2>
            <h3 className="shop-description">{cartItem.item_description}</h3>
            <h4 className="shop-price">${cartItem.item_price}</h4>
            <button class="btn btn-dark checkout" id={cartItem.item_id} onClick={() => removeFromCart(cartItem.item_id)} >Remove From Cart</button>

        </li>
        

    )
}

export default CartItem;