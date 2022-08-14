// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const { model, Schema } = require("mongoose");

// manufacterer: "mersedes"
// title: "gls"
// year: "2022"
// color: "grey"
// price:"1200"

const carSchema = Schema(
  {
    manufacterer: String,
    title: String,
    year: Number,
    color: String,
    price: Number,
  },
  {timestamps:true,versionKey:false}
);

module.exports = model("car", carSchema);
