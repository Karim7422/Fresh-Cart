import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./UserContext";
export const CartContext = createContext();
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";
export default function CartContextProvider({ children }) {
    const { userToken } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState(null);
    async function addToCart(productId) {
        try {
            setLoading(true);
            const res = await axios.post(
                BASE_URL,
                { productId },
                {
                    headers: {
                        token: userToken?.token,
                    },
                }
            );
            setCart(res);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
    async function removeFromCart(productId) {
        try {
            setLoading(true);
            const res = await axios.delete(`${BASE_URL}/${productId}`, {
                headers: {
                    token: userToken?.token,
                },
            });
       
            setCart(res);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
    async function resetCart() {
        try {
            setLoading(true);
            await axios.delete(BASE_URL, {
                headers: {
                    token: userToken?.token,
                },
            });
            setCart(null);
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    }
    async function changeQuantity(productId, count) {
        try {
            setLoading(true);
            const res = await axios.put(
                `${BASE_URL}/${productId}`,
                {
                    count,
                },
                {
                    headers: {
                        token: userToken?.token,
                    },
                }
            );
            setCart(res);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
    async function payment(formData) {
        try {
            setLoading(true);
            const res = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data?.data._id}?url=http://localhost:3000`,
                { shippingAddress: formData },
                { headers: { token: userToken?.token } }
            );
            if (res.statusText === "OK")  window.location.replace(res.data.session.url);
            
            setCart(null);
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    }
    const getUserCart = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios(BASE_URL, {
                headers: {
                    token: userToken?.token,
                },
            });
            
            setCart(res);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, [userToken?.token]);
    useEffect(() => {
        (async () => {
            await getUserCart();
        })();
    }, [getUserCart]);
    return (
        <CartContext.Provider
            value={{
                addToCart,
                removeFromCart,
                changeQuantity,
                getUserCart,
                cart,
                setCart,
                resetCart,
                loading,
                payment,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
