import ShopItem from './ShopItem'

function ShopList({ items, addToCart }) {

    return (

        <>
            <div id="home">
                <ul className="shop-list">{items.map(item => {
                    return <ShopItem key={item.item_id} item={item} addToCart={addToCart} />;
                })}
                </ul>
            </div>
        </>
    )

}

export default ShopList;