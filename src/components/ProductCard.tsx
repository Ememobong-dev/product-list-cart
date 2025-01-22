import Image from "next/image";
import React from "react";
import cartIcon from "../../public/assets/images/icon-add-to-cart.svg";

const ProductCard = ({ imageSrc, category, productName, productPrice  }: { imageSrc: string, category: string, productName: string, productPrice:number }) => {
  return (
    <div>
       <div className="relative">
            <span className=" relative cover w-full">
            <Image width={200} height={200}  src={imageSrc} className="object-cover rounded-xl w-full" alt={productName} />
            </span>
            <div className="flex items-center justify-center">
                <button className="absolute shadow flex gap-3 items-center rounded-full bg-white border  border-red justify-center py-2 px-5">
                <span>
                    <Image
                    src={cartIcon}
                    width={24}
                    height={24}
                    alt="cart"
                    />
                </span>
                <span className="text-rose-900 font-semibold">Add to Cart</span>
                </button>
            </div>
      </div>
      <div className="relative font-semibold py-10">
        <p className="text-rose-400"> {category} </p>
        <p className="text-rose-900 text-xl"> {productName} </p>
        <p className="text-red"> ${productPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
