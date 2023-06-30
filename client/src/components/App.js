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
const [formInput, setFormInput] = useState({
  brand: "",
  description: "",
  price: 0,
  image: "",
  size: "",
})


useEffect(() => {
  fetch("http://localhost:3000/items")
  .then(resp => resp.json())
  .then(itemsData => setItems(itemsData))
},[])


function submitItem(event){
  event.preventDefault()
  fetch("http://localhost:3000/items",{
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(formInput)
  })
    .then(resp => resp.json())
    .then(newItem => setItems([...items, newItem]))
}

function addToCart(item) {
  setCart([...cart, item])
}

function removeFromCart(id) { 
 setCart(cart.filter(cartItem => {
  return cartItem.id !== id
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
          <ShopList addToCart={addToCart} key={items.id} items={items} />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
