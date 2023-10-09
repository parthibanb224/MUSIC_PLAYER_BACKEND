const mongoose = require('mongoose');
const {Schema} = mongoose;

const FavoriteSchema = new Schema({
    userName : {type:String},
    name : {type:String},
    images : {type:Array},
    id : {type:String},
    tracks : {type:Array},
})

module.exports = mongoose.model("FavoriteMusic",FavoriteSchema);