import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";

actor class NFT(_name : Text, _owner : Principal, _asset : [Nat8]) = this {
    let name = _name;
    let owner = _owner;
    let asset = _asset;

    public query func getName() : async Text {
        return name;
    };

    public query func getOwner() : async Principal {
        return owner;
    };

    public query func getAsset() : async [Nat8] {
        return asset;
    };

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };
};
