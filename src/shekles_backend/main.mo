import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import NFT "./nfts/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";

actor Shekles {
    public shared ({ caller }) func mint(imgData : [Nat8], name : Text) : async Principal {
        let owner : Principal = caller;

        Debug.print(debug_show ("Balance before mint: ", Cycles.balance()));
        Cycles.add<system>(100_500_000_000);

        let newNFT = await NFT.NFT(name, owner, imgData);
        Debug.print(debug_show ("Balance after mint: ", Cycles.balance()));

        let newNFTPrincipal = await newNFT.getCanisterId();
        return newNFTPrincipal;
    };
};
