import React, { useState } from 'react';


function ShopItem({ item, addToCart }) {

  const [inCart, setInCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(item.item_favorite);


  function toggleAddToCart() {
    setInCart(inCart => !inCart)
  }
  // Map(item => item.id)
  // Map(item =>{
  //     item.id += 1
  //     return item.id
  // })

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    fetch(`http://127.0.0.1:7000/items/${item.item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_favorite: !isFavorite }),
    })
      .then((resp) => resp.json())
      .then((updatedItem) => {
        // Handle the response if needed
        console.log(updatedItem);
      })
      .catch((error) => {
        // Handle the error if any
        console.error("Error updating item favorite:", error);
        // Revert the local state change on error
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      });

  };




  return (
    <li className="shop-item">
      <div className="card" id="shop-card" > 

        <img className="card-img-top" src={item.item_img} alt={"Item Name"} />
        <h3 className="shop-brand">{item.item_brand}</h3>
        <h4 className="shop-description">{item.item_description}</h4>
        <h4 className="shop-price">${item.item_price}</h4>
        <h4 className="shop-size">Size: {item.item_size}</h4>
        <h4 className="shop-condition">Condition:{item.item_condition}</h4>
        <div className="list-btn-wrap">
          <button id="add2cart-btn" className="btn" onClick={() => {
            addToCart(item)
            toggleAddToCart()
          }} >{inCart ? "Remove" : "Add to Cart"}
          </button>
          <button className="add2fave-btn" onClick={toggleFavorite}>
            {isFavorite ? "♡" : "♥️"}
          </button>
        </div>

        </div>

    </li>
  )
}

export default ShopItem;