import ShopList from './ShopList'
import NavBar from './NavBar'
import SellItemForm from './SellItemForm'
import Cart from './Cart'
import About from './About'

import {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom';

function App() {

const [items, setItems] = useState([])
const [cart, setCart] = useState([])
const [likeItem, setLikeItem] = useState(null)
const [formInput, setFormInput] = useState({
  brand: "",
  description: "",
  price: 0,
  image: "",
  size: "",
})


useEffect(() => {
  fetch("http://127.0.0.1:7000/items")
  .then(resp => resp.json())
  .then(itemsData => setItems(itemsData))
},[])


function submitItem(event){
  event.preventDefault()
  fetch("http://127.0.0.1:7000/items",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formInput)
  })
    .then(resp => resp.json())
    .then(newItem => setItems([...items, newItem]))
}

function patchItemLike(event, item){
  event.preventDefault()
  console.log(item)
  item.item_likes +=1

  fetch("http://127.0.0.1:7000/items/" + item.item_id,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(item)
  })
    .then(resp => resp.json())
  
}

function addToCart(item) {
  setCart([...cart, item])
}

function removeFromCart(id) { 
 setCart(cart.filter(cartItem => {
  return cartItem.item_id !== id
 }))
}

function updateFormData(event){
  if (event.target.name === "price") { 
    return setFormInput({...formInput, [event.target.name]: Number(event.target.value)
     })}
  else (setFormInput({...formInput, [event.target.name]: event.target.value}))
}





  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <Cart key={cart.id} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
        </Route>
        <Route path="/sell_item">
          <SellItemForm updateFormData={updateFormData} submitItem={submitItem} />
        </Route>
        <Route exact path="/">
          <ShopList addToCart={addToCart} items={items} setLikeItem={setLikeItem} patchItemLike={patchItemLike}/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
