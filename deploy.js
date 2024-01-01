const {VoyageProvider, Wallet, LogicFactory} = require('js-moi-sdk');
const todoManifest = require('./todolist.json');

const provider = new VoyageProvider('babylon');
const mnemonic = 'soccer segment any next sadness vehicle rally human fox wealth poem exotic';

const constructionWallet = async () => {
    const wallet = new Wallet(provider);
    await wallet.fromMnemonic(mnemonic, "m/44'/6174'/7020'/0/0");
    return wallet;
}

const deployLogic = async () => {
    const wallet = await constructionWallet();

    const todoLogic = new LogicFactory(todoManifest, wallet);

    const ixResponse = await todoLogic.deploy("InitOwner!").send({
        fuelLimit : 1000,
        fuelPrice : 1,
    });

    const ixRecipt = await ixResponse.wait();

    console.log(ixRecipt);
};

deployLogic();