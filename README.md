# Mo'Gram

### Link to Live Website:
https://limitless-scrubland-26646.herokuapp.com/feed/6171c94e571a203690e81722

### Approach Taken:

Mo'Gram is a social media platform that allows users to create and view posts. Each post has a header that represents who created the post, a section for the user to include an image, and a caption section that allows to user to share their story of their post. While a user is able to create their own post, they also have the ability to communicate with other users by adding a "like" or a comment to a different user's post.

Implementing C.R.U.D., I was able to create an homepage that displays posts of users, a page that displays a single post, and pages that allows user to add and edit posts.

By using the IDs of the created comments, I was able to insert those IDs number into the array of the post Schema and link the comment to the specific post. This allows users to make a comment on a specific post and have those comments appear only when that specific post is being viewed.

### Technologies Used:

HTML  
Cascade Style Sheet  
Javascript  
Express  
MongoDB (Atlas)  
Mongoose  
Node.js  
