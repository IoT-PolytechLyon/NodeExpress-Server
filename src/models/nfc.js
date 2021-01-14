import mongoose from 'mongoose';

/**
 * NFC collection schema
 */
var  nfcSchema = mongoose.Schema({
    nfcId: {
        type: String,
        required: true
    }
});

export default mongoose.model('Nfc', nfcSchema);

 