import mongoose from "mongoose";

const TransSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    datetime: {type: Date, required: true}
});
const TransModel = mongoose.model("Transaction", TransSchema);

export default TransModel;