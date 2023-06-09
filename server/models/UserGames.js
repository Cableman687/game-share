const  { Schema, model } = require ('mongoose');

const UserGamesSchema = new Schema({
    isBorrowedBy: {
        // type: Boolean,
        // required: true,
        // default: false
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // isListed: {
    //     type: Boolean,
    //     required: true,
    //     default: true
    // },
   gameDetails: [
    {   
        type: Schema.Types.ObjectId,
        ref: 'gamelibrary'
    }
   ],
   platform: {
        type: String,

   }
},
{ 
    timestamps: true 
});


const UserGames = model('usergames', UserGamesSchema)



module.exports = UserGames;
