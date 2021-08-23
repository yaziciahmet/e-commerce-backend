const express = require('express');
const router = express.Router();

const commentController = require('../Controllers/commentController');

router.post('/get-comments', commentController.get_comments); 
/*
FRONTEND SENDS BACKEND
{
    product_id: "..."
}
BACKEND SENDS FRONTEND
{
    comment_array: [
        {
            username: "Ahmet Yazıcı",
            user_id: "...",
            rating: 5,
            message: "Awesome product",
            comment_id: "..."
        },
        ...
    ]
}
*/

router.post('/add-comment', commentController.add_comment);
/*
FRONTEND SENDS BACKEND
{
    user_id: "...",
    product_id: "...",
    rating: 5,
    message: "Awesome product"
}
BACKEND SENDS FRONTEND
    "Added comment."   # Sending plain string
*/
router.post('/delete-comment', commentController.delete_comment);
/*
FRONTEND SENDS BACKEND
{
    product_id: "...",
    comment_id: "..."
}
BACKEND SENDS FRONTEND
    "Deleted comment."   # Sending plain string
*/

router.post('/update-comment-status', commentController.update_comment_status);
/*  *Product Manager*
FRONTEND SENDS BACKEND
{
    user_id: "...",
    comment_id: "...",
    approved: Boolean  #if false the comment gets deleted completely, if true it becomes visible
}
BACKEND SENDS FRONTEND
If no error:
    "Comment status updated successfully."
If error:
    { error: user.role + " cannot update comment status." }
*/

router.post('/get-pending-comments', commentController.get_pending_comments);
/*  *Product Manager* -> get waiting for approval comments
FRONTEND SENDS BACKEND
{
    user_id: "..."
}
BACKEND SENDS FRONTEND
If no error:
    [
        {
            "_id": "60ab9973d4fb7e17408730ca", #comment id
            "product_id": "608332da69c6ae6155c64a80",
            "username": "Ahmet Yazıcı",
            "user_id": "60831b69a37c5337fc1d826f",
            "rating": 3,
            "message": "perfect",
            "approved": false
        }
    ]
*/

module.exports = router;