import React, {useState} from 'react';

function SellItemForm({updateFormData, submitItem}){

const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        
        <div className="sell-item-form">
            {formSubmitted ? <h1 className="sold-message" >Thank you for your submission! Your item is now for sale on our store.</h1> 
            : 
            <form className="sell-form" onSubmit={(event) => {
                submitItem(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }} >
                <input onChange={updateFormData} class="form-control" type="text" name="brand" placeholder="Brand" required />
                <input onChange={updateFormData} class="form-control" type="text" name="description" placeholder="Description" required />
                <input onChange={updateFormData} class="form-control" type="text" name="price" placeholder="Asking Price" required />
                <input onChange={updateFormData} class="form-control" type="text" name="image" placeholder="Image" required />
                <input onChange={updateFormData} class="form-control" type="text" name="size" placeholder="Size" required />
                
                <button class="btn btn-dark" type="submit">Sell My Item</button>
            </form>}
        </div>
    )

}

export default SellItemForm;


                // <input type="text" name="size" placeholder="Size" required />
                // <input type="text" name="price" placeholder="Price" required />
                // <input type="text" name="condition" placeholder="Condition" required />