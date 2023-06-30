import {NavLink} from "react-router-dom"

function NavBar(){

return (
    <>
    <nav className="nav-bar">
            <NavLink exact to="/">Buy</NavLink>
            <NavLink to="/sell_item">Sell</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/about">About</NavLink>
            <div className="searchbar">
            <label htmlFor="search"></label>
            <input
                type="text"
                id="search"
                placeholder="Search..."
                
            />
        </div>
    </nav>
        
        <h1 className="store-name">Thrifter</h1>


    </>
)

}

export default NavBar;


{/* <NavLink to="/add_pet" >Shop</NavLink>
            <NavLink to="/sell" >Sell</NavLink>
            <NavLink to="/cart" >Cart</NavLink> */}