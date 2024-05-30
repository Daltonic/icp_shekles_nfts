import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import NFT "./nfts/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Float "mo:base/Float";
import Iter "mo:base/Iter";

actor Shekles {
    private type Listing = {
        itemOwner : Principal;
        itemPrice : Float;
    };

    private var collection = HashMap.HashMap<Principal, NFT.NFT>(1, Principal.equal, Principal.hash);
    private var ownerCollection = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    private var listingCollection = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    public shared ({ caller }) func mint(imgData : [Nat8], name : Text) : async Principal {
        let owner : Principal = caller;
        Debug.print(debug_show ("Balance before mint: ", Cycles.balance()));

        Cycles.add<system>(100_500_000_000);
        let newNFT = await NFT.NFT(name, owner, imgData);
        Debug.print(debug_show ("Balance after mint: ", Cycles.balance()));

        let newNFTPrincipal = await newNFT.getCanisterId();
        collection.put(newNFTPrincipal, newNFT);
        addToOwnerCollection(owner, newNFTPrincipal);

        return newNFTPrincipal;
    };

    public func addToOwnerCollection(owner : Principal, nftId : Principal) {
        var ownedNFTs : List.List<Principal> = switch (ownerCollection.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        ownerCollection.put(owner, ownedNFTs);
    };

    public query func userCollection(user : Principal) : async [Principal] {
        var userNFTs : List.List<Principal> = switch (ownerCollection.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        return List.toArray(userNFTs);
    };

    public query func allCollection() : async [Principal] {
        var ids = Iter.toArray(listingCollection.keys());
        return ids;
    };

    public shared ({ caller }) func listItem(id : Principal, price : Float) : async Text {
        var item : NFT.NFT = switch (collection.get(id)) {
            case null return "NFT not found.";
            case (?result) result;
        };

        let owner = await item.getOwner();
        if (Principal.equal(owner, caller)) {
            let newListing : Listing = {
                itemOwner = caller;
                itemPrice = price;
            };

            listingCollection.put(id, newListing);
            return "Success";
        } else {
            return "Unauthorized user.";
        };

    };

    public query func getSheklesCanisterId() : async Principal {
        return Principal.fromActor(Shekles);
    };

    public query func isListed(id : Principal) : async Bool {
        if (listingCollection.get(id) == null) {
            return false;
        } else {
            return true;
        };
    };

    public query func getOriginalOwner(id : Principal) : async Principal {
        var listing : Listing = switch (listingCollection.get(id)) {
            case null return Principal.fromActor(Shekles);
            case (?result) result;
        };

        return listing.itemOwner;
    };

    public query func getListedNFTPrice(id : Principal) : async Float {
        var listing : Listing = switch (listingCollection.get(id)) {
            case null return 0;
            case (?result) result;
        };

        return listing.itemPrice;
    };

    public func transferFrom(id : Principal, ownerId : Principal, newOwner : Principal) : async Text {
        var item : NFT.NFT = switch (collection.get(id)) {
            case null return "NFT not found.";
            case (?result) result;
        };

        let result = await item.transferOwnership(newOwner);
        if (result == "Transfer success") {
            listingCollection.delete(id);

            var userNFTs : List.List<Principal> = switch (ownerCollection.get(ownerId)) {
                case null List.nil<Principal>();
                case (?result) result;
            };

            userNFTs := List.filter(
                userNFTs,
                func(listItemId : Principal) : Bool {
                    return listItemId != id;
                },
            );

            addToOwnerCollection(newOwner, id);
            return "Success";
        } else {
            return "Failed";
        };

    };
};
