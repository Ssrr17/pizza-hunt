const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", //ref tells pizza model which documents to search
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,//We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  }
);

// // get total count of comments and replies on retrieval
// PizzaSchema.virtual("commentCount").get(function () {
  PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });
//Here we're using the .reduce() method to tally up the total of every comment with its replies. In its basic form, .reduce() 
//takes two parameters, an accumulator and a currentValue. Here, the accumulator is total, and the currentValue is comment. 
//As .reduce() walks through the array, it passes the accumulating total and the current value of comment into the function, 
//with the return of the function revising the total for the next iteration through the array.

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
