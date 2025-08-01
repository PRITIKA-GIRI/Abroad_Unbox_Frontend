import React, {useEffect, useState} from "react";
import CryptoJS from "crypto-js";
const secret_key   = import.meta.env.VITE_SECRET_KEY;
const product_code = import.meta.env.VITE_PRODUCT_CODE;

import esewa from "../../assets/svg/esewa_logo.png";

export default function ApplicationPortalPayment() {

    const [duration, setDuration] = useState("6"); // default 6 
    const [totalAmount, setTotalAmount] = useState(12000);
    const [signature, setSignature] = useState("");
    const [isSignatureReady, setIsSignatureReady] = useState(false);
    const [transactionUuid, setTransactionUuid] = useState("");

    const handleDurationChange = (e) => {
        const selected = e.target.value;
        setDuration(selected);
        if (selected === "6") {
            setTotalAmount(12000);
        } else if (selected === "12") {
            setTotalAmount(15000);
        }
    };
 
    const generateRandomString = () => {
        const strings =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        let length = 25;
        for (let i = 0; i < length; i++) {
          code += strings[Math.floor(Math.random() * strings.length)];
        }
        return code;
      };

    useEffect(() => {
        const generateEsewaSignature = () => {
            const secret = secret_key;
            const uuid = generateRandomString();
            const totalAmt = totalAmount;
            const productCode = product_code;
            const message = `total_amount=${totalAmt},transaction_uuid=${uuid},product_code=${productCode}`;
            console.log("Message to sign:", message); // Debug log
            const hash = CryptoJS.HmacSHA256(message, secret);
            const signature = CryptoJS.enc.Base64.stringify(hash);
            console.log("Generated signature:", signature); // Debug log
            setTransactionUuid(uuid);
            setSignature(signature);
            setIsSignatureReady(true);
        };
      
          generateEsewaSignature();
        }, [totalAmount]);

    return (
        <>
        {/* <div className="w-full mt-5"> */}
            <div className="w-full flex flex-col gap-5 bg-blue-300 p-4 rounded-xl items-center hover:scale-102 transition-transform duration-200 hover:shadow-2xl">

                <div className="flex flex-col gap-3 items-center">
                    <span className="font-bold text-2xl">Application Portal</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio impedit dolorem alias enim deserunt reprehenderit est tempora minus doloremque quibusdam aliquam odio nostrum, natus magni ipsa illo dolor repudiandae fuga?</p>
                    <div className="flex gap-2 ">
                        <span className="text-lg font-semibold">Duration:</span>
                        <select
                            name="duration"
                            className="bg-green-700 text-white py-1 px-2 rounded border-none"
                            value={duration}
                            onChange={handleDurationChange}
                        >
                            <option value="6">6 Month</option>
                            <option value="12">12 Month</option>
                        </select>
                    </div>
                    <div>
                        {/* <span>Total Amount:</span> */}
                        <span className="font-semibold text-xl  "> Rs. {totalAmount} /-</span>
                    </div>
                </div>


                {isSignatureReady && (
                    <form
                    action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                    target="_blank"
                    method="POST"
                  >
                    <input type="hidden" name="amount" value={totalAmount} />
                    <input type="hidden" name="tax_amount" value="0" />
                    <input type="hidden" name="total_amount" value={totalAmount} />
                    <input
                      type="hidden"
                      name="transaction_uuid"
                      value={transactionUuid}
                    />
                    <input type="hidden" name="product_code" value={product_code} />
                    <input
                      type="hidden"
                      name="product_service_charge"
                      value="0"
                    />
                    <input
                      type="hidden"
                      name="product_delivery_charge"
                      value="0"
                    />
                    <input
                      type="hidden"
                      name="success_url"
                      value="http://localhost:5173/application-payment-success/"
                    />
                    <input
                      type="hidden"
                      name="failure_url"
                      value="http://localhost:5173/esewa-fail/"
                    />
                    <input
                      type="hidden"
                      name="signed_field_names"
                      value="total_amount,transaction_uuid,product_code"
                    />
                    <input type="hidden" name="signature" value={signature} />
                    <input
                      value="Pay with Esewa"
                      type="submit"
                      className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer hover:bg-green-700 hover:shadow-lg"
                    />
                  </form>
                )}
            </div>
        {/* </div> */}
        </>
    )

}
