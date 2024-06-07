import { NavLink } from "react-router-dom"

function NavBar({ updateSearchText }) {

    return (
        <>
            <nav className="nav-bar">
                <div className="nav-links-group">
                    <NavLink exact to="/">Buy</NavLink>
                    <NavLink to="/sell_item">Sell</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
    
                
                    <label htmlFor="search"></label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search..."
                        onChange={updateSearchText}
                    />
                
                
            </nav>

            <h1 className="store-name">Thrifter</h1>


        </>
    )

}

export default NavBar;


{/* <NavLink to="/add_pet" >Shop</NavLink>
            <NavLink to="/sell" >Sell</NavLink>
            <NavLink to="/cart" >Cart</NavLink> */}