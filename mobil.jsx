import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { LAYOUT_BG_COLOR } from "../../constants/themeConstants";
import BillingDetails from "../../components/billingDetails/billingDetails";
import DeliveryAddressDetails from "../../components/deliveryAddress/deliveryAddress";
import CartDetails from "../../components/cartDetails/cartDetails";
import OffersAndBenefits from "../../components/offers/offers";
import PaymentDetails from "../../components/payment/paymentDetails";
import OtherPaymentDetails from "../../components/payment/OtherPaymentDetails";
import PaymentOptionsModal from "../../components/payment/paymentModal";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useLoadUserDetails } from "../../hooks/LoadUserDetails";
import {
  GlobalStore,
  GlobalStoreContext,
  GLOBAL_DISPATCH_EVENT_TYPE,
} from "../../context/GlobalStore/store";
import {PAYMENT_METHODS, PAYMENT_METHODS_TITLE, SUBPAYMENT_METHODS} from "../../constants/applicationConstants";
import UpiPaymentMobile from "../../components/ChoosePaymentMethod/UpiPaymentMobile";
import { useEffect } from "react";
import OtherPaymentDetail from "../../components/payment/OtherPaymentDetail";
import CodPaymentMobile from "../../components/ChoosePaymentMethod/CodPaymentMobile";
import BackdropWithSpinner from "../../components/BackdropWithSpinner";

export default function MobileSummaryPage() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [paymentUPIOpen, setPaymentUPIOpen] = useState(false);
  const handlePaymentUPIClose = () => setPaymentUPIOpen(false);
  const [globalState, globalStateDispatcher] = useContext(GlobalStoreContext);
  const { deliveryAddress } = useLoadUserDetails();
  const productPrice = globalState.productPrice;
  const scrollToRef = useRef();
  const [totalPrice, setTotalPrice] = useState(globalState.billingDetails.totalPrice);
  const chosenPaymentMethod = globalState.selectedPaymentInformation.paymentMethodSelected;
  const paymentViaMethod = SUBPAYMENT_METHODS[chosenPaymentMethod];
  console.log("getting payment method",paymentViaMethod);


    //changes in lower section
  const onOtherPaymentMethodSelectedFunctionCaller = () => {
    const method = globalState.selectedPaymentInformation.paymentMethodSelected;
    console.log("globalState.selectedPaymentInformation <<", globalState.selectedPaymentInformation)
    console.log("shahaab" + method);
    switch (method) {
      case 'CARD':
      case 'NET_BANKING':
      case 'WALLET':
        loadSummaryPageSpinner();
        onOtherPaymentMethodSelected();
        break;

      case 'UPI_ID_COLLECT':
        console.log("UPI PSA LINK", method)
        console.log("GLOBAL STATE", globalState)
        console.log("Default Payment 00045b", globalState.defaultUserPaymentPreference)
        const paymentMethodDetails = globalState.defaultUserPaymentPreference.paymentMethodDetails
        onPreferredVPAMethod(paymentMethodDetails)
        break;

      case 'UPI_QR':
      case 'UPI':
      case 'UPI_PSP_LINK'://change UPI_PSP_LINK with preferred payment
        console.log("Default Payment 5645", globalState.defaultUserPaymentPreference)
        onUPIPaymentMethodSelected();
        onOtherPaymentMethodSelected("UPI_QR");
        break;           
      case 'CASH_ON_DELIVERY':
        onCODPaymentMethodSelected();
        break;
      default:
        console.error("payment selected failed");
    }
  }


  function onUPIPaymentMethodSelected() {
    globalStateDispatcher({
      type: GLOBAL_DISPATCH_EVENT_TYPE.PAYMENT_VIA_UPI,
      payload: {
        setShowUPIPage: true,
        },
    })
  }

  function onCODPaymentMethodSelected() {
    globalStateDispatcher({
      type: GLOBAL_DISPATCH_EVENT_TYPE.PAYMENT_VIA_COD,
      payload: {
        setShowCODPage: true,
        },
    })
  }

  function onPreferredPaymentMethod(method){
    console.log("On Preferred Payment", method)
    console.log("Global 7678", globalState)
    const paymentMethodDetails = globalState.defaultUserPaymentPreference.paymentMethodDetails
    switch (method){
      case PAYMENT_METHODS.UPI_VPA:
        onPreferredVPAMethod(paymentMethodDetails)
        break;
      case PAYMENT_METHODS.UPI:
        onPreferredUPIPspAppMethod()
        break;
    }
  }

  function onPreferredVPAMethod(paymentMethodDetails){
    console.log("paymentMethodDetails.customerUpiId", paymentMethodDetails.customerVpa)
    setShowSpinner(true);
    globalStateDispatcher({
      type: GLOBAL_DISPATCH_EVENT_TYPE.TRIGGER_PAYMENT,
      payload: {
        paymentMethod: PAYMENT_METHODS.UPI_VPA,
        customerUpiId: paymentMethodDetails.customerVpa,
      },
    });
  }

  function onPreferredUPIPspAppMethod(){
    globalStateDispatcher({
      type: GLOBAL_DISPATCH_EVENT_TYPE.TRIGGER_PAYMENT,
      payload: {
        paymentMethod: "UPI",
      },
    });
  }

  
  function onOtherPaymentMethodSelected(method) {
    console.log("Payment method selected while trigger - " + method);

    globalStateDispatcher({
      type: GLOBAL_DISPATCH_EVENT_TYPE.TRIGGER_PAYMENT,
      payload: {
        paymentMethod: method ? method: globalState.selectedPaymentInformation.paymentMethodSelected,
      },
    });
  }

  //changes in upper section

  // const handlePayment = () => {
  //   console.log("on click this payment method will be initiated",globalState.selectedPaymentInformation.paymentMethodSelected);
  //   globalStateDispatcher({
  //     type: GLOBAL_DISPATCH_EVENT_TYPE.TRIGGER_PAYMENT,
  //     payload: {
  //       paymentMethod: globalState.selectedPaymentInformation.paymentMethodSelected,
  //     },
  //   });

  //   // setPaymentUPIOpen(true); remove it
  // };

  function getPaymentPreferenceTitle(){
    console.log("Get Payment Preference", globalState.defaultUserPaymentPreference)
    console.log("Current Payment Preference", globalState.selectedPaymentInformation.title)
    const UPI_METHODS = ["UPI", "UPI_QR"];
    const selectedPaymentInformationTitle = globalState.selectedPaymentInformation.title;
    const defaultPayment = globalState.defaultUserPaymentPreference;
    console.log(PAYMENT_METHODS_TITLE, "Payment methods", selectedPaymentInformationTitle)
    if (selectedPaymentInformationTitle === "COD") {
      return PAYMENT_METHODS_TITLE["COD"];
    }
    if (!UPI_METHODS.includes(selectedPaymentInformationTitle) && selectedPaymentInformationTitle !== "UPI_ID_COLLECT") {
      return PAYMENT_METHODS_TITLE[selectedPaymentInformationTitle] || selectedPaymentInformationTitle;
    }

    if (defaultPayment && defaultPayment.paymentMethodDetails) {
      if (UPI_METHODS.includes(defaultPayment.paymentMethod)) {
        const pspApp = PAYMENT_METHODS_TITLE[defaultPayment.paymentMethodDetails.pspApp];
        return `UPI (${pspApp})`;
      }

      if (defaultPayment.paymentMethod === "UPI_ID_COLLECT") {
        const customerVPA = defaultPayment.paymentMethodDetails.customerVpa;
        const customerVPAItems = customerVPA.split("@");
        return `UPI (${customerVPAItems[0].slice(0, 7)}**@${customerVPAItems[1]})`;
      }
    }
    return PAYMENT_METHODS_TITLE[selectedPaymentInformationTitle] || selectedPaymentInformationTitle;
  }

  useEffect(() => {
    if(globalState.showUPIPage){
      loadSummaryPageSpinner();
    }
  },[globalState.showUPIPage]);
  
  useEffect(() => {
    if(globalState.upiPaymentPageContentLoaded){
      console.log("stop showing spinner now",globalState.upiPaymentPageContentLoaded);
      setPaymentUPIOpen(true);
      setShowSpinner(false);
    }
  }, [globalState.upiPaymentPageContentLoaded]);
  
  useEffect(() => {
    setShowSpinner(globalState.showSpinnerComponent);
    console.log(globalState.defaultUserPaymentPreference.paymentMethod)
  },[globalState.showSpinnerComponent]);
  
  if (showSpinner) {
    return <BackdropWithSpinner />;
  }

  function onPaymentClose() {
    setPaymentUPIOpen(false);
  }

  function loadSummaryPageSpinner() {
    globalStateDispatcher({
      type: GLOBAL_DISPATCH_EVENT_TYPE.SHOW_SPINNER,
      payload: {
        showSpinnerComponent: true,
        },
    })
  }

  const paymentClose = {
    onPaymentClose: onPaymentClose,
  };

  const getBillingDetails = () => {
    return (
      <BillingDetails
        props={{
          itemQuantity: globalState.billingDetails.itemCount,
          itemTotal: globalState.billingDetails.totalPrice,
          discount: globalState.billingDetails.totalDiscount,
          orderTotal: globalState.billingDetails.totalPrice,
          totalDiscounts: globalState.totalDiscounts,
          totalPrice: globalState.totalPrice,
          subTotalPrice: globalState.subTotalPrice,
          totalTax: globalState.totalTax,
          discountPayload: globalState.discountPayload,
          productPrice: globalState.productPrice,
        }}
        setTotalPrice={setTotalPrice}
      />
    );
  };

  const getDeliveryAddressDetails = () => {
    return (
      <DeliveryAddressDetails
        deliveryAddress={
          !globalState.deliveryAddress
            ? deliveryAddress
            : globalState.deliveryAddress
        }
      />
    );
  };

  //skipping preferred paymentDetails
  // const getPreferredPaymentDetails = () => {
  //   return <PaymentDetails />;
  // };

  const getCartCouponAndOtherPaymentDetails = () => {
    return (
      <>
      <OtherPaymentDetail ref={scrollToRef} />

      <CodPaymentMobile props={{ isOpen: globalState.showCODPage}} />

        <Box marginTop={1.5}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0}
            sx={{
              bgcolor: "#fff",
              borderColor: "#fff",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ display: "flex", ml: 1, mt: 1 }}
            >
              Cart Details
            </Typography>
            {globalState.cartDetails.items.map((item) => {
              return (
                <CartDetails
                props={{
                  productImage: item.productImage,
                  title: item.title,
                  quantity: item.quantity,
                  price: item.price,
                  productPrice: productPrice,
                }}
                />
                );
              })}
          </Grid>
        </Box>
        <OffersAndBenefits />
      </>
    );
  };

  const getPayFooter = () => {
    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{
          flex: 1,
          justifyContent: "flex-end",
          bgcolor: "white",
          position: "sticky",
          bottom: "0",
          width: "100%",
          zIndex: 1,
          borderTop: "1px solid #0000000f",
          boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 52%)",
          borderRadius: '1rem 1rem 0 0',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: 1,
                m: 1,
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ textAlign: "justify" }}>
                  {/* Pay via {globalState.selectedPaymentInformation.title} :  ₹ {globalState.billingDetails.totalPrice} */}
                  Pay via {getPaymentPreferenceTitle()} :  {totalPrice}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">
                  <Link underline="hover" sx={{fontWeight: "800"}} onClick={() => scrollToRef.current.scrollIntoView()}>
                    {"CHANGE"}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Divider variant="middle" />
          <Box sx={{ margin: "0 auto" }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  m: 1,
                  p: 1.5,
                  width: "90vw",
                  backgroundColor: "primary",
                  borderRadius: "2px",
                  color: "white",
                  "&:hover": { backgroundColor: "primary" },
                }}
                onClick={onOtherPaymentMethodSelectedFunctionCaller}
                // onClick={handlePayment}
              >
                Proceed to Pay
              </Button>
              <PaymentOptionsModal
                open={paymentUPIOpen}
                handleClose={handlePaymentUPIClose}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {!paymentUPIOpen &&(<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          {getBillingDetails()}
          {getDeliveryAddressDetails()}
          {/* for now skipping preferred payment method */}
          {/* {getPreferredPaymentDetails()} */} 
          {getCartCouponAndOtherPaymentDetails()}
        </Box>
        <Box>{getPayFooter()}</Box>
      </Box>)}
      {paymentUPIOpen && <UpiPaymentMobile props={paymentClose}/>}
    </>
  );
}
