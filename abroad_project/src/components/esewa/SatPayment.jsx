import React, {useEffect, useState} from "react";
import CryptoJS from "crypto-js";
const secret_key   = import.meta.env.VITE_SECRET_KEY;
const product_code = import.meta.env.VITE_PRODUCT_CODE;

export default function SatPayment() {

    const [duration, setDuration] = useState("1"); // default 6 
    const [totalAmount, setTotalAmount] = useState(4000);
    const [signature, setSignature] = useState("");
    const [isSignatureReady, setIsSignatureReady] = useState(false);
    const [transactionUuid, setTransactionUuid] = useState("");

    const handleDurationChange = (e) => {
        const selected = e.target.value;
        setDuration(selected);
        {selected &&(
            setTotalAmount(selected * 4000)
        )}
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
        <div className="w-11/12 mx-auto mt-5">
            <div className="flex gap-5 bg-blue-300 p-2 rounded-lg items-center w-fit">
                <strong className="text-xl">SAT Portal</strong>
                {/* <input type="checkbox" /> */}
                <div className="gap-1 flex items-center">
                    <label className="font-semibold">Time:</label>
                    <select
                        name="duration"
                        className="bg-gray-400 py-1 px-2 rounded border-none"
                        value={duration}
                        onChange={handleDurationChange}
                    >
                        <option value="1">1 Month</option>
                        <option value="2">2 Month</option>
                        <option value="3">3 Month</option>
                        <option value="4">4 Month</option>
                        <option valur="5">5 Month</option>
                        <option value="6">6 Month</option>
                        <option value="7">7 Month</option>
                        <option value="8">9 Month</option>
                        <option value="9">9 Month</option>
                        <option valur="10">10 Month</option>
                        <option value="11">11 Month</option>
                        <option value="12">12 Month</option>
                    </select>
                </div>
                <div className="flex items-center gap-1">
                    <label className="font-semibold">Total Amount:</label>
                    {/* <input type="text" className="border p-1 rounded-lg max-w-fit" value={totalAmount} readOnly /> */}
                    <span className="p-1 rounded-lg max-w-fit">Rs. {totalAmount} /-</span>
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
                      className="bg-green-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-green-600 hover:shadow-lg"
                    />
                  </form>
                )}
                {/* <button className="bg-green-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-green-600 hover:shadow-lg">Pay with Esewa</button> */}
            </div>
        </div>
        </>
    )

}
