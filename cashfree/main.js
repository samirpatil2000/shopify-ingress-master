let paymentSessionId = "session_waNY_ryMgViRVKuUEHmXKuET_jOsj6UXDAubQ0Y01iY4XJi6kiD809vgRC_pSQUednMxBaHMCCfMoWZo_5bFlUdKoHspaP1qI0L9bAaTidT5";
const paymentDom = document.getElementById("payment-form");

const success = function(data) {
    console.log("On Success")
}
let failure = function(data) {
    console.log("On Failure")
}

document.getElementById("pay-btn").addEventListener("click", () => {
    const dropConfig = {
        "components": [
            "order-details",
            "card",
            "netbanking",
            "app",
            "upi"
        ],
        "onSuccess": success,
        "onFailure": failure,
        "style": {
            "backgroundColor": "#ffffff",
            "color": "#11385b",
            "fontFamily": "Lato",
            "fontSize": "14px",
            "errorColor": "#ff0000",
            "theme": "light",
        }
    }
    const cashfree = new Cashfree(paymentSessionId);
    cashfree.drop(paymentDom, dropConfig);

})