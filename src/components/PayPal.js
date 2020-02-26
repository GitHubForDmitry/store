import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export const PayPal = () => {
        return (
            <PayPalButton
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: "0.01"
                            }
                        }],
                        // application_context: {
                        //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                        // }
                    });
                }}
                onApprove={(data, actions) => {
                    // Capture the funds from the transaction
                    return actions.order.capture().then(function(details) {
                        // Show a success message to your buyer
                        alert("Transaction completed by " + details.payer.name.given_name);

                        // OPTIONAL: Call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                                orderID: data.orderID
                            })
                        });
                    });
                }}
            />
        );
}