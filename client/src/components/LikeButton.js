import React, {useState} from 'react';


function LikeButton({item, setLikeItem, patchItemLike}){

    const [hasLiked, setHasLiked] = useState(false)

    function likes(event){
        console.log("liked" + item.item_likes)
        setHasLiked(true)
        patchItemLike(event, item)
    }
    return (
        <div>
            {item.item_likes}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <i onClick={(event) => (!hasLiked ? likes(event) : null)}class="fa fa-thumbs-up"></i>
        </div> 
    )
}

export default LikeButton;