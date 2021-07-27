const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            req.flash('success', 'You made a comment on a post !');
            res.redirect('/');
        }
    }
    catch(err){
        req.flash('error', err);
        return;
    }
}

//Now we need to delete a comment individually
module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){ // This means the comment is of the current user

            //We first have to save the postid in a variable before deleting it bcoz we further have to delete the comment
            //from the comment array of post
            let postId = comment.post;

            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});

            req.flash('success', 'You deleted a comment from a post !');
            return res.redirect('back');
        }
        else{
            req.flash('success', 'You cannot delete this comment from this Post !');
            return res.redirect('back'); 
        }
    }
    catch(err){
        req.flash('error', err);
        return;
    }
    
}
