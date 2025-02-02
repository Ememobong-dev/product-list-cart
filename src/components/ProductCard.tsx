"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import cartIcon from "../../public/assets/images/icon-add-to-cart.svg";
import increaseIcon from "../../public/assets/images/icon-increment-quantity.svg";
import decreaseIcon from "../../public/assets/images/icon-decrement-quantity.svg";

type CartListInterface = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const ProductCard = ({
  imageSrc,
  category,
  productName,
  productPrice,
  setCarts,
}: {
  imageSrc: string;
  category: string;
  productName: string;
  productPrice: number;
  setCarts: (val: CartListInterface[]) => void;
}) => {
  const [showCounter, setShowCounter] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const cart: CartListInterface[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateQuantity(newCount);
  };

  const handleDecrease = () => {
    const newCount = count - 1;
    if (newCount > 0) {
      updateQuantity(newCount);
      setCount(newCount);
    }
  };

  const handleAddToCart = () => {
    setShowCounter(true);
    const cart: CartListInterface[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = cart.findIndex((item) => item.name === productName);

    if (existingProduct !== -1) {
      cart[existingProduct].quantity += count;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: count,
        image: imageSrc,
      });
    }

    setCarts(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateQuantity = (newCount: number) => {
    console.log(newCount, "New Count value");
    const cart: CartListInterface[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = cart.findIndex((item) => item.name === productName);

    if (existingProduct !== -1) {
      console.log("New count", newCount);
      cart[existingProduct].quantity = newCount;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    console.log(cart, "Cart value hereee");
    setCarts(cart);
  };

  useEffect( () => {
    if(!cart.length) {
      setShowCounter(false)
    }
  },[cart])

  return (
    <div>
      <div className="relative">
        <span className=" relative h-40">
          <Image
            width={200}
            height={100}
            src={imageSrc}
            className="object-cover rounded-xl w-full"
            alt={productName}
          />
        </span>
        <div className="flex items-center text-rose-900 hover:text-red cursor-pointer justify-center">
          <button
            className={`absolute cursor-pointer shadow flex justify-between items-center gap-8 rounded-full  border  border-red py-2 px-8 ${
              showCounter ? "bg-red" : "bg-white"
            }`}
            onClick={handleAddToCart}
          >
            {showCounter ? (
              <>
                <span
                  className="flex justify-center w-6 h-6 p-2 items-center rounded-full border hover:border-black border-rose-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrease();
                  }}
                >
                  <Image
                    src={decreaseIcon}
                    className="rounded-full"
                    alt="increase icon"
                    height={12}
                    width={12}
                  />
                </span>

                <span className="text-white">{count}</span>

                <span
                  className="flex justify-center p-2 items-center rounded-full border border-rose-50 hover:border-black w-6 h-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrease();
                  }}
                >
                  <Image
                    src={increaseIcon}
                    alt="increase icon"
                    height={24}
                    width={24}
                  />
                </span>
              </>
            ) : (
              <>
                <span>
                  <Image src={cartIcon} width={24} height={24} alt="cart" />
                </span>
                <span className="font-semibold">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="relative font-semibold py-10">
        <p className="text-rose-400"> {category} </p>
        <p className="text-rose-900"> {productName} </p>
        <p className="text-red"> ${productPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
