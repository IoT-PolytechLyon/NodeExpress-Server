import Nfc from '../models/nfc.js'

async function insertNfcBadges()
{
    const nfc1 = new Nfc
    ({
        nfcId: "67 CB F0 D9"
    });

    const nfc2 = new Nfc
    ({
        nfcId: "B9 FE B0 79"
    });

    const nfc3 = new Nfc
    ({
        nfcId: "40 69 B0 79"
    });

    const nfcs = await Nfc.find();
    if(nfcs === undefined || nfcs.length == 0)
    {
        nfc1.save().then( () =>
        {
            console.log("NFC1 badge was saved.")
        });
    
        nfc2.save().then( () =>
        {
            console.log("NFC2 badge was saved.")
        });
    
        nfc3.save().then( () =>
        {
            console.log("NFC3 badge was saved.")
        });
    }
}

async function findAllNfcBadges(req, res)
{
    try
    {
        const badges = await Nfc.find();
        res.status(200).json(badges);
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
} 

export {insertNfcBadges, findAllNfcBadges}