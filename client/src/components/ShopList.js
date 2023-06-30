import ShopItem from './ShopItem'

function ShopList ({items, addToCart}) {

    return (
        
        <>
            <ul className="shop-list">{items.map(item => {
                return <ShopItem key={item.id} item={item} addToCart={addToCart} />;
            })}
            </ul> 
        </>
    )
    
}

export default ShopList;