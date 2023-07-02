import ShopItem from './ShopItem'

function ShopList ({items, addToCart, setLikeItem, patchItemLike}) {

    return (
        
        <>
            <ul className="shop-list">{items.map(item => {
                return <ShopItem key={item.item_id} item={item} addToCart={addToCart} setLikeItem={setLikeItem} patchItemLike={patchItemLike}/>;
            })}
            </ul> 
        </>
    )
    
}

export default ShopList;