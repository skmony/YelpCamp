var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=600&q=60",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Morning Trees", 
        image: "https://images.unsplash.com/photo-1430000589629-f04107b5597c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b9b4db2f3f936c369eccbd84e2a9fa2&auto=format&fit=crop&w=600&q=60",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Just Trees", 
        image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=552042ed8cfeb4a1e8e62ae2a75f661e&auto=format&fit=crop&w=600&q=60",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Star Fall", 
        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aaf08554d638e2690a4383bf1c632d93&auto=format&fit=crop&w=600&q=60",
        description: "Nunc sagittis nibh justo, non elementum lectus ullamcorper id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris elementum ut ante at porta. Nunc et arcu eu neque facilisis posuere in et lacus. Nunc posuere dictum eros, ultrices scelerisque tortor dapibus vel. Mauris finibus orci sit amet dapibus posuere. Vestibulum placerat dolor ac massa malesuada, in fringilla justo dignissim. Fusce interdum aliquam dignissim. Phasellus sit amet condimentum sapien, vel ultricies nunc. Aenean pharetra tellus ac lorem lobortis sollicitudin. Curabitur in nisl id arcu aliquet ornare. Morbi dictum consectetur odio, non semper enim lacinia vel."
    }
];
Campground.remove();
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        }); 
        
     }); 
}

module.exports = seedDB;
