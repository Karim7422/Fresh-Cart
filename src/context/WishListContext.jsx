import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import { UserContext } from "./UserContext";
export const WishListContext = createContext();
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";
export default function WishListContextProvider({ children }) {
    const { userToken } = useContext(UserContext);
    const [wishList, setWishList] = useState(null);
    const [loading, setLoading] = useState(false)
    const getUserWishList = useCallback(async () => {
        if (!userToken?.token) return;
        try {
            setLoading(true);
            const res = await axios(BASE_URL, {
                headers: {
                    token: userToken?.token,
                },
            });
            setWishList(res);
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    }, [userToken?.token]);
    const addToWishList = useCallback(
        async (productId) => {
            if (!userToken?.token) {
                return;
            }
            try {
                setLoading(true);
                await axios.post(
                    BASE_URL,
                    {
                        productId,
                    },
                    {
                        headers: {
                            token: userToken?.token,
                        },
                    }
                );
                getUserWishList();
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        },
        [userToken?.token, getUserWishList]
    );
    const removeFromWishList = useCallback(
        async (productId) => {
            try {
                setLoading(true);
                await axios.delete(`${BASE_URL}/${productId}`, {
                    headers: {
                        token: userToken?.token,
                    },
                });
                getUserWishList();
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        },
        [userToken?.token, getUserWishList]
    );
    return (
        <WishListContext.Provider
            value={{
                addToWishList,
                removeFromWishList,
                wishList,
                loading,
                setWishList,
                getUserWishList,
            }}
        >
            {children}
        </WishListContext.Provider>
    );
}