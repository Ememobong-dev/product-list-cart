"use client";

import { useEffect, useState } from "react";
import { Col, Modal, Row } from "antd";
import data from "@/app/data.json";
import ProductCard from "@/components/ProductCard";
import emptyCart from "../../public/assets/images/illustration-empty-cart.svg";
import cancelIcon from "../../public/assets/images/icon-remove-item.svg";
import carbonIcon from "../../public/assets/images/icon-carbon-neutral.svg";
import orderConfirmedIcon from "../../public/assets/images/icon-order-confirmed.svg";
import Image from "next/image";

type CartListInterface = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function Home() {
  const [cart, setCart] = useState<CartListInterface[]>([]);
  const [confirmOrder, setConfirmOrder] = useState(false);

  useEffect(() => {
    console.log("Got triggeredd heree");
    // setCart([]);
    const cartsValue: CartListInterface[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(cartsValue);
  }, []);

  const removeProductFromCart = (productName: string) => {
    const updatedCart = cart.filter((item) => item.name !== productName);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((accumulator, product) => {
    return (accumulator += product.price * product.quantity);
  }, 0);

  const handleOrderModal = () => {
    setConfirmOrder(true);
  };

  const completeOrder = () => {
    localStorage.removeItem("cart");
    setConfirmOrder(false);
    setCart([])
  };

  return (
    <div className="md:p-16 p-5">
      <Row justify={"center"} gutter={16}>
        <Col xs={24} md={16}>
          <h2 className="text-rose-900 text-3xl font-bold">Desserts</h2>
          <Row className="py-10" justify={"center"} gutter={16}>
            {data.map((item) => (
              <Col key={item.name} lg={8}>
                <ProductCard
                  category={item.category}
                  productName={item.name}
                  productPrice={item.price}
                  imageSrc={item.image.desktop}
                  setCarts={setCart}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} md={8}>
          <div className="bg-white w-full p-6">
            <h3 className="text-2xl text-red font-bold">
              Your Cart ({cart.length})
            </h3>
            {cart.length > 0 ? (
              cart.map((product) => (
                <div key={product.name}>
                  <div className=" w-full my-5 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <div className="flex gap-5 items-center">
                        <span className="text-red font-bold">
                          {" "}
                          {product.quantity}x{" "}
                        </span>
                        <span className="text-rose-500">
                          {" "}
                          @${product.price.toFixed(2)}{" "}
                        </span>
                        <span className=" text-rose-300 font-bold">
                          {" "}
                          @${(product.quantity * product.price).toFixed(2)}{" "}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => removeProductFromCart(product.name)}>
                      <Image
                        src={cancelIcon}
                        className="object-cover rounded-full border border-rose-400 hover:border-black"
                        width={16}
                        alt="cancel icon"
                      />
                    </button>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <>
                <span className="flex justify-center">
                  <Image
                    width={200}
                    height={200}
                    src={emptyCart}
                    alt="empty cart"
                  />
                </span>
                <p className="text-center text-rose-900">
                  Your added items will appear here
                </p>
              </>
            )}

            {cart.length > 0 && (
              <>
                <div className="flex my-5 justify-between items-center">
                  <p className="text-gray-800 ">Order Total</p>
                  <p className="font-bold text-rose-900  text-3xl">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-5 my-5 py-3 justify-center items-center px-2 bg-rose-100">
                  <span>
                    <Image src={carbonIcon} alt="" />
                  </span>
                  <p>
                    This is a <span className="font-bold">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>
                <button
                  onClick={handleOrderModal}
                  className="py-3 px-8 w-full bg-red hover:bg-[#722d19] text-white rounded-3xl"
                >
                  Confirm Order
                </button>
              </>
            )}

            <Modal
              footer={null}
              onCancel={() => setConfirmOrder(false)}
              open={confirmOrder}
            >
              <div className="p-5">
                <span>
                  <Image
                    src={orderConfirmedIcon}
                    width={28}
                    height={28}
                    alt="order confirmed"
                  />
                </span>
                <h2>Order Confirmed</h2>
                <p>We hope you enjoy your food!</p>

                {/* Product list */}

                <div className="py-2 px-4 my-5 bg-rose-100">
                  {cart.length > 0 &&
                    cart.map((product) => (
                      <div key={product.name}>
                        <div className=" w-full my-3 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <span>
                              <Image
                                className="object-cover rounded-xl"
                                src={product.image}
                                width={48}
                                height={48}
                                alt={product.name}
                              />
                            </span>
                            <div>
                              <p className="font-bold">{product.name}</p>
                              <div className="flex gap-5 items-center">
                                <span className="text-red font-bold">
                                  {" "}
                                  {product.quantity}x{" "}
                                </span>
                                <span className="text-rose-500">
                                  {" "}
                                  @${product.price.toFixed(2)}{" "}
                                </span>
                              </div>
                            </div>
                          </div>

                          <span className=" text-rose-900 font-bold">
                            {" "}
                            ${(product.quantity * product.price).toFixed(
                              2
                            )}{" "}
                          </span>
                        </div>
                        <hr />
                      </div>
                    ))}
                  <div className="flex my-5 justify-between items-center">
                    <p className="text-gray-800 ">Order Total</p>
                    <p className="font-bold text-rose-900 text-2xl">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={completeOrder}
                  className="py-3 px-8 w-full bg-red hover:bg-[#722d19] text-white rounded-3xl"
                >
                  Start New Order
                </button>
              </div>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
}
