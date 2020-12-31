import mongoose from 'mongoose';


var  nfcSchema = mongoose.Schema({
    nfcId: {
        type: String,
        required: true
    }
});

export default mongoose.model('Nfc', nfcSchema);

 