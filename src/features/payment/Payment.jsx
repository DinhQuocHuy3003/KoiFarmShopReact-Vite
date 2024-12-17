import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentPage = ({ match }) => {
    const [orderId, setOrderId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Fetch order data from the backend using OrderId from URL params
        const fetchOrderDetails = async () => {
            const { orderId } = match.params;

            const response = await fetch(`https://localhost:7049/api/Order/GetOrderDetails/${orderId}`);
            const order = await response.json();
            
            setOrderId(order.id);
            setTotalAmount(order.totalAmount);
        };

        fetchOrderDetails();
    }, [match.params]);

    return (
        <div className="payment-page">
            <h2>Complete Your Order</h2>
            <p>Total: ${totalAmount}</p>

            <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalAmount
                                }
                            }]
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            alert("Payment Successful!");
                            // Optionally, you can update the order status in your backend here.
                        });
                    }}
                    onCancel={(data) => {
                        alert("Payment Canceled!");
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PaymentPage;
