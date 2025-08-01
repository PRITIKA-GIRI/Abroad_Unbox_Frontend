import React, {useState} from "react";
import Nav from "../Nav";
import ApplicationPortalPayment from "./ApplicationPortalPayment";
import SatPayment from "./SatPayment";

export default function ApplicationSatPayment() {

    return (
        <>
            <Nav />

            <h2 className="text-3xl font-bold w-11/12 text-center mx-auto mt-3">Make Payment for Your Portals</h2>
            <div className="flex flex-col md:flex-row gap-5 w-11/12 mx-auto mt-5 mb-3">
                <ApplicationPortalPayment />
                <SatPayment />
            </div>
        </>
    )
}