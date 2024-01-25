import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewTransaction } from "../../services/transaction.service";
import { changeOwnerCard } from "../../services/card.service";
import { useNavigate } from "react-router-dom";

interface Props {
    card: any
    userInfo: any
}

const PayPal: React.FC<Props> = ({ card, userInfo }) => {
    // console.log(card);
    // console.log(userInfo);
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const handleApprove = async (order: any) => {
        // console.log("order: ", order);
        if (order.status === "COMPLETED") {
            const paymentInfo = {
                id: order.id,
                email: order.payer.email_address,
                name: order.payer.name,
                total: order.purchase_units[0].amount.value,
                description: order.purchase_units[0].description
            }
            // console.log("paymentInfo: ", paymentInfo);

            const params = {
                cardId: card.id,
                payer: userInfo.id,
                seller: card.owner.id,
                paymentInfo: paymentInfo
            }
            // console.log("params: ", params);
            const res = await createNewTransaction(params)
            if (res.data.status === "success") {
                const params = {
                    newOwnerId: userInfo.id
                }
                console.log(card.id);

                const res = await changeOwnerCard(card.id, params)
                if (res.data.status === "success") {
                    navigate("/success")
                }
            }
        }
    }

    if (error) {
        toast.error("Order was not successful, please try again!", {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    return (
        <PayPalButtons
            style={{
                color: "gold",
                layout: "horizontal",
                tagline: false,
                shape: "rect",
                label: "buynow"
            }}
            createOrder={(data, actions) => {
                // console.log(data);
                return actions.order.create({
                    purchase_units: [
                        {
                            description: `Thanh toán cho sản phẩm mã ${card.id}`,
                            amount: { value: `${card.price}` },
                        }
                    ]
                })
            }}

            onApprove={async (data, actions) => {
                const order = await actions.order?.capture()
                handleApprove(order)
            }}

            onError={(err: any) => {
                setError(err)
                console.error("Paypal Checkout onError: ", err);
            }}
        />
    )
}

export default PayPal