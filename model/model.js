const mongose =require('mongoose');

const todoSchema = new mongose.Schema({
    task: String,
    done:{
        type: Boolean,
        default: false,
    }
})
const todoModel = mongose.model('tode', todoSchema);
module.exports = todoModel; 