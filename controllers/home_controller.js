const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);

//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });

//     // populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({},function(err,users){

//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users : users
//             });
            
//         });
//     })

// }

//Instead of writing the above code, we will write a cleaner code to understand it in a simpler way using async await

module.exports.home = async function(req,res){

    //This try and catch is used to check err
    try{
        //populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({}); // The successful response will be stored in the users variable

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users : users
        }); 
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}


// module.exports.actionName = function(req, res){}