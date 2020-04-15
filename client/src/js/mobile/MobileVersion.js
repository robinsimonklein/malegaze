export default class MobileVersion {

    infos = {
        iOS: {
            User_Agent: null,
            As_Reported: null,
            Major_Release: null,
            Full_Release: null,
            Major_Release_Numeric: null,
            Full_Release_Numeric: null,
        },
        android: null
    }

    constructor() {
        if (this.isIOS()) {
            this.infos.iOS.User_Agent = navigator.userAgent;
            this.infos.iOS.As_Reported = (navigator.userAgent).match(/OS (\d)?\d_\d(_\d)?/i)[0];
            this.infos.iOS.Major_Release = (navigator.userAgent).match(/OS (\d)?\d_\d(_\d)?/i)[0].split('_')[0];
            this.infos.iOS.Full_Release = (navigator.userAgent).match(/OS (\d)?\d_\d(_\d)?/i)[0].replace(/_/g, ".");
            this.infos.iOS.Major_Release_Numeric = +(navigator.userAgent).match(/OS (\d)?\d_\d(_\d)?/i)[0].split('_')[0].replace("OS ", "");
            this.infos.iOS.Full_Release_Numeric = +(navigator.userAgent).match(/OS (\d)?\d_\d(_\d)?/i)[0].replace("_", ".").replace("_", "").replace("OS ", "");   //converts versions like 4.3.3 to numeric value 4.33 for ease of numeric comparisons
        }
    }

    isIOS() {
        return !!navigator.userAgent.match(/ipad|iphone|ipod/i)
    }
}
