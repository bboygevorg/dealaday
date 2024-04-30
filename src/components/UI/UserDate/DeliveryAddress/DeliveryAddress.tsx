import React, { useEffect, useRef, useState } from "react";
import classes from "./deliveryAddress.module.scss";
import Button from "../../Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../../../helper/env";
import { useAppSelector, useAppDisptach } from "../../../../redux/store/hook";
import { getUserData } from "../../../../redux/userSlice/userSlice";

interface Active {
  active: boolean;
}

const DeliveryAddress: React.FC<Active> = ({ active }) => {
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [activeDefaultIndex, setActiveDefaultIndex] = useState<number | null>(
    null
  );

  const inputFocus = useRef<HTMLInputElement>(null);

  let authToken = localStorage.getItem("Authorization");

  const { address } = useAppSelector((state) => state.userSlice.getUser);
  const dispatch = useAppDisptach();

  useEffect(() => {
    if (active && inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [active]);

  useEffect(() => {
    const storeIndex = localStorage.getItem("activeDefaultIndex");
    if (storeIndex !== null) {
      setActiveDefaultIndex(parseInt(storeIndex));
    }
  }, []);

  useEffect(() => {
    if (address.length <= 0) {
      localStorage.removeItem("activeDefaultIndex");
    }
  }, [address]);

  const handleActiveDefault = (index: number) => {
    const numberAddress = index + 1;
    localStorage.setItem("activeDefaultIndex", numberAddress.toString());
    setActiveDefaultIndex(numberAddress);
  };

  const handleAddAddress = async () => {
    try {
      if (!deliveryAddress) {
        toast.error("please fill in your address", {
          autoClose: 900,
          theme: "colored",
        });
      } else if (deliveryAddress.length < 10) {
        toast.error("Please enter name with more than 10 characters", {
          autoClose: 900,
          theme: "colored",
        });
      } else {
        const { data } = await axios.post(
          `${apiUrl}/user/auth/addaddress`,
          {
            address: deliveryAddress,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        if (data.success === true) {
          toast.success("add Address Successfuly", {
            autoClose: 900,
            theme: "colored",
          });
          dispatch(getUserData());
        } else {
          toast.error("Something went wrong", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error: any) {
      toast.error(error.response.data, { autoClose: 900, theme: "colored" });
    }
  };

  const handleDeleteAddress = async (index: number) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/user/auth/deleteaddress`,
        { index },
        { headers: { Authorization: authToken } }
      );
      console.log(data);
      if (data.success === true) {
        toast.success("Address removed successfully", {
          autoClose: 900,
          theme: "colored",
        });
        dispatch(getUserData());
      }
    } catch (error: any) {
      toast.error(error.response.data, { autoClose: 900, theme: "colored" });
    }
  };

  return (
    <div className={classes.delivery_container}>
      {active && address.length > 0 ? (
        <div className={classes.delivery_container_add}>
          <p>Address</p>
          <input
            type="text"
            placeholder="Address"
            ref={inputFocus}
            name="address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          <div className={classes.delivery_container_add_send}>
            <div>
              <Button
                backgroundButton="#3598cc"
                padding="0.9rem 1.2rem"
                color="#ffffff"
                hover="blue"
                buttonFunction={handleAddAddress}
              >
                Save
              </Button>
            </div>
            <span onClick={() => setDeliveryAddress("")}>Cancel</span>
          </div>
        </div>
      ) : (
        ""
      )}

      {address.length > 0 ? (
        <div className={classes.delivery_content}>
          {address.map((item, index) => (
            <div
              key={index}
              className={`${classes.item} ${
                activeDefaultIndex === index + 1
                  ? classes.item_active
                  : classes.item_standart
              }`}
            >
              <div className={classes.item_left}>
                <span className={classes.item_index}>{index + 1}</span>
                <span className={classes.item_text}>{item}</span>
              </div>

              <div className={classes.item_right}>
                <div onClick={() => handleActiveDefault(index)}>
                  {activeDefaultIndex === index + 1 ? (
                    <span className={classes.default}>Default</span>
                  ) : (
                    <>
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.16536 4.16664H4.9987C4.55667 4.16664 4.13275 4.34223 3.82019 4.65479C3.50763 4.96736 3.33203 5.39128 3.33203 5.83331V15C3.33203 15.442 3.50763 15.8659 3.82019 16.1785C4.13275 16.491 4.55667 16.6666 4.9987 16.6666H14.1654C14.6074 16.6666 15.0313 16.491 15.3439 16.1785C15.6564 15.8659 15.832 15.442 15.832 15V10.8333M14.6537 2.98831C14.8074 2.82912 14.9913 2.70215 15.1947 2.6148C15.398 2.52746 15.6167 2.48148 15.838 2.47956C16.0593 2.47763 16.2788 2.5198 16.4836 2.6036C16.6884 2.6874 16.8745 2.81116 17.031 2.96765C17.1875 3.12414 17.3113 3.31022 17.3951 3.51505C17.4789 3.71988 17.521 3.93934 17.5191 4.16064C17.5172 4.38194 17.4712 4.60064 17.3839 4.80398C17.2965 5.00732 17.1695 5.19123 17.0104 5.34497L9.85536 12.5H7.4987V10.1433L14.6537 2.98831Z"
                            stroke="#3598CC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span> Make It Default</span>
                    </>
                  )}
                </div>
                <div onClick={() => handleDeleteAddress(index + 1)}>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M3.3335 5.83333H16.6668M15.8335 5.83333L15.111 15.9517C15.0811 16.3722 14.8929 16.7657 14.5844 17.053C14.2759 17.3403 13.87 17.5 13.4485 17.5H6.55183C6.13028 17.5 5.72438 17.3403 5.4159 17.053C5.10742 16.7657 4.91926 16.3722 4.88933 15.9517L4.16683 5.83333H15.8335ZM12.5002 5.83333V3.33333C12.5002 3.11232 12.4124 2.90036 12.2561 2.74408C12.0998 2.5878 11.8878 2.5 11.6668 2.5H8.3335C8.11248 2.5 7.90052 2.5878 7.74424 2.74408C7.58796 2.90036 7.50016 3.11232 7.50016 3.33333V5.83333H12.5002Z"
                        stroke="#3598CC"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span> Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {active ? (
            <div className={classes.delivery_container_add}>
              <p>Address</p>
              <input
                type="text"
                ref={inputFocus}
                placeholder="Address"
                name="address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              <div className={classes.delivery_container_add_send}>
                <div>
                  <Button
                    backgroundButton="#3598cc"
                    padding="0.9rem 1.2rem"
                    color="#ffffff"
                    hover="blue"
                    buttonFunction={handleAddAddress}
                  >
                    Save
                  </Button>
                </div>
                <span onClick={() => setDeliveryAddress("")}>Cancel</span>
              </div>
            </div>
          ) : (
            <span>You currently don't have any addresses.</span>
          )}
        </>
      )}
    </div>
  );
};

export default DeliveryAddress;
