import React, {useState} from "react";
import Nav from "../Nav";
import ApplicationPortalPayment from "./ApplicationPoratalPayment";
import SatPayment from "./SatPayment";

export default function ApplicationSatPayment() {

    return (
        <>
            <Nav />

            <h2 className="text-xl font-bold w-11/12 mx-auto mt-3">Payment Details</h2>
            <ApplicationPortalPayment />
            <SatPayment />
        </>
    )
}