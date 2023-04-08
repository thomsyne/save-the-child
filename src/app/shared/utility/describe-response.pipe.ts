import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "describeResponse",
})
export class DescribeResponsePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case "00":
        return "Approved or completed successfully";
      case "01":
        return "Refer to card issuer";
      case "02":
        return "Refer to card issuer, special condition";
      case "03":
        return "Invalid merchant";
      case "04":
        return "Pick-up card";
      case "05":
        return "Do not honor";
      case "06":
        return "Error";
      case "07":
        return "Pick-up card, special condition";
      case "08":
        return "Honor with identification";
      case "09":
        return "Request in progress";
      case "10":
        return "Approved, partial";
      case "11":
        return "Approved, VIP";
      case "12":
        return "Invalid transaction";
      case "13":
        return "Invalid amount";
      case "14":
        return "Invalid card number";
      case "15":
        return "No such issuer";
      case "16":
        return "Approved, update track 3";
      case "17":
        return "Customer cancellation";
      case "18":
        return "Customer dispute";
      case "19":
        return "Re-enter transaction";
      case "20":
        return "Invalid response";
      case "21":
        return "No action taken";
      case "22":
        return "Suspected malfunction";
      case "23":
        return "Unacceptable transaction fee";
      case "24":
        return "File update not supported";
      case "25":
        return "Unable to locate record";
      case "26":
        return "Duplicate record";
      case "27":
        return "File update edit error";
      case "28":
        return "File update file locked";
      case "29":
        return "File update failed";
      case "30":
        return "Format error";
      case "31":
        return "Bank not supported";
      case "32":
        return "Completed partially";
      case "33":
        return "Expired card, pick-up";
      case "34":
        return "Suspected fraud, pick-up";
      case "35":
        return "Contact acquirer, pick-up";
      case "36":
        return "Restricted card, pick-up";
      case "37":
        return "Call acquirer security, pick-up";
      case "38":
        return "PIN tries exceeded, pick-up";
      case "39":
        return "No credit account";
      case "40":
        return "Function not supported";
      case "41":
        return "Lost card";
      case "42":
        return "No universal account";
      case "43":
        return "Stolen card";
      case "44":
        return "No investment account";
      case "51":
        return "Not sufficient funds";
      case "52":
        return "No check account";
      case "53":
        return "No savings account";
      case "54":
        return "Expired card";
      case "55":
        return "Incorrect PIN";
      case "56":
        return "No card record";
      case "57":
        return "Transaction not permitted to cardholder";
      case "58":
        return "Transaction not permitted on terminal";
      case "59":
        return "Suspected fraud";
      case "60":
        return "Contact acquirer";
      case "61":
        return "Exceeds withdrawal limit";
      case "62":
        return "Restricted card";
      case "63":
        return "Security violation";
      case "64":
        return "Original amount incorrect";
      case "65":
        return "Exceeds withdrawal frequency";
      case "66":
        return "Call acquirer security";
      case "67":
        return "Hard capture";
      case "68":
        return "Response received too late";
      case "75":
        return "PIN tries exceeded";
      case "77":
        return "Intervene, bank approval required";
      case "78":
        return "Intervene, bank approval required for partial amount";
      case "90":
        return "Cut-off in progress";
      case "91":
        return "Issuer or switch inoperative";
      case "92":
        return "Routing error";
      case "93":
        return "Violation of law";
      case "94":
        return "Duplicate transaction";
      case "95":
        return "Reconcile error";
      case "96":
        return "System malfunction";
      case "98":
        return "Exceeds cash limit";
      default:
        return "";
    }
  }
}
