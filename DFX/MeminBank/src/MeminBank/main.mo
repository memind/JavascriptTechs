import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor MeminBank {
  stable var currentValue: Float = 300;
  currentValue := 300;

  stable var startTime = Time.now();
  
  let id = 12312312312;

  public func receiveDollar(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdrawDollar(amount : Float) {
    let tempValue : Float = currentValue - amount;

    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("You CAN'T!!!");
    };
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound(): async Float {
    let currentTime = Time.now();
    let timeElapsedNanoSecond = currentTime - startTime;
    let timeElapsedSecond = timeElapsedNanoSecond / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedSecond));
    return currentValue;
  }
};
