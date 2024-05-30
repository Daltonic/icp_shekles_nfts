import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  // var owner : Principal = Principal.fromText("wcgdh-t6c5w-5qidx-efbic-7dzfn-6ltyn-bjofb-oydfw-vnbrb-ezqqf-lqe");
  let totalSupply : Nat = 1000000000;
  let name : Text = "Dapp Mentors Academy";
  let symbol : Text = "DMA";

  private stable var balancesTemp : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  public query func balanceOf(_owner : Principal) : async Nat {
    let balance : Nat = switch (balances.get(_owner)) {
      case null 0;
      case (?result) result;
    };

    return balance;
  };

  public shared ({ caller }) func fundWallet() : async Text {
    if (balances.get(caller) == null) {
      Debug.print(debug_show ("Caller ID: ", caller));
      let amount = 10000;
      let result = await transfer(caller, amount);
      return result;
    } else {
      return "Already claimed!";
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    let self = Principal.fromActor(Token); // Delegating the contract principal some faucet balances
    if (balances.size() < 1) { // Ensuring that this action only occurs ones
      balances.put(self, totalSupply);
    };

    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance >= amount) {
      balances.put(msg.caller, fromBalance - amount);
      let toBalance = await balanceOf(to);
      balances.put(to, toBalance + amount);
      return "Success";
    } else {
      return "Insufficient Fund!";
    };
  };

  public query func getName() : async Text {
    return name;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  system func preupgrade() {
    balancesTemp := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balancesTemp.vals(), 1, Principal.equal, Principal.hash);
    Debug.print(debug_show("Canister Upgraded!"));
  };
};
