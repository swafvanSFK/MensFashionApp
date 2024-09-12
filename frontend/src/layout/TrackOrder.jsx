import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { PiPackageThin } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useOpenTrackOrder } from "../store/generalStore";

const TrackOrder = () => {
  const { openTrackOrder, setOpenTrackOrder } = useOpenTrackOrder();

  const steps = [
    { label: "Packed", icon: <PiPackageThin /> },
    {
      label: "Shipped",
      icon: (
        <MdOutlineLocalShipping className="bg-green-500 text-4xl p-1 text-white rounded-full" />
      ),
    },
    { label: "Delivered", icon: <IoHomeOutline /> },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <React.Fragment>
      <Dialog
        open={openTrackOrder}
        keepMounted
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Order Tracking</DialogTitle>
        <DialogContent>
          <Box className="container mx-auto p-8">
            {/* Header Section */}
            <Box className="bg-secondary-color text-white p-4 rounded-md flex justify-between items-center">
              <Box>
                <Typography variant="h6">ORDER PLACED</Typography>
                <Typography variant="subtitle1">14 Jan.</Typography>
              </Box>
              <Box>
                <Typography variant="h6">TOTAL</Typography>
                <Typography variant="subtitle1">85.99 €</Typography>
              </Box>
              <Box>
                <Typography variant="h6">SHIP TO</Typography>
                <Typography variant="subtitle1">Emily Morgan</Typography>
              </Box>
              <Box>
                <Typography variant="h6">ORDER #1008</Typography>
              </Box>
            </Box>

            {/* Order Status Section */}
            <Box className="my-8">
              <Typography
                variant="h5"
                className="text-center text-green-600 !mb-1"
              >
                Order Status: Shipped
              </Typography>
              <Typography variant="subtitle1" className="text-center !mb-5">
                Estimated Delivery Date: 17 Jan. - 19 Jan.
              </Typography>
              <Stepper alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel icon={step.icon}>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Shipping Information Section */}
            <Box className="my-8 flex flex-col items-center">
              <Typography variant="h6" className="mb-2">
                SHIPPING INFORMATION
              </Typography>
              <Typography variant="body1">Emily Morgan</Typography>
              <Typography variant="body1">1234 Example St.</Typography>
              <Typography variant="body1">New York, NY 10001</Typography>
              <Typography variant="body1">Courier: USPS</Typography>
              <Typography variant="body1">
                Tracking Link:{" "}
                <a href="#" className="text-blue-500 underline">
                  USPS Tracking
                </a>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={setOpenTrackOrder}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    // <div className="container mx-auto p-8">
    //   <h1 className="text-3xl font-bold mb-8 text-center">Order Tracking</h1>

    //   {/* Header Section */}
    //   <Box className="bg-secondary-color text-white p-4 rounded-md flex justify-between items-center">
    //     <Box>
    //       <Typography variant="h6">ORDER PLACED</Typography>
    //       <Typography variant="subtitle1">14 Jan.</Typography>
    //     </Box>
    //     <Box>
    //       <Typography variant="h6">TOTAL</Typography>
    //       <Typography variant="subtitle1">85.99 €</Typography>
    //     </Box>
    //     <Box>
    //       <Typography variant="h6">SHIP TO</Typography>
    //       <Typography variant="subtitle1">Emily Morgan</Typography>
    //     </Box>
    //     <Box>
    //       <Typography variant="h6">ORDER #1008</Typography>
    //     </Box>
    //   </Box>

    //   {/* Order Status Section */}
    //   <Box className="my-8">
    //     <Typography variant="h5" className="text-center text-green-600 !mb-1">Order Status: Shipped</Typography>
    //     <Typography variant="subtitle1" className="text-center !mb-5">Estimated Delivery Date: 17 Jan. - 19 Jan.</Typography>
    //     <Stepper alternativeLabel>
    //       {steps.map((step, index) => (
    //         <Step key={index}>
    //           <StepLabel icon={step.icon}>{step.label}</StepLabel>
    //         </Step>
    //       ))}
    //     </Stepper>
    //   </Box>

    //   {/* Shipping Information Section */}
    //   <Box className="my-8 flex flex-col items-center">
    //     <Typography variant="h6" className="mb-2">SHIPPING INFORMATION</Typography>
    //     <Typography variant="body1">Emily Morgan</Typography>
    //     <Typography variant="body1">1234 Example St.</Typography>
    //     <Typography variant="body1">New York, NY 10001</Typography>
    //     <Typography variant="body1">Courier: USPS</Typography>
    //     <Typography variant="body1">Tracking Link: <a href="#" className="text-blue-500 underline">USPS Tracking</a></Typography>
    //   </Box>
    // </div>
  );
};

export default TrackOrder;
