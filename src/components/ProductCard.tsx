import Image from "next/image";
import React from "react";
import cartIcon from "../../public/assets/images/icon-add-to-cart.svg";

const ProductCard = ({ imageSrc, category, productName, productPrice  }: { imageSrc: string, category: string, productName: string, productPrice:number }) => {
  return (
    <div>
      <div className="relative">
        <span className="h-[200px] relative cover w-full">
          <Image width={200} height={200}  src={imageSrc} className="cover w-full" alt="" />
        </span>
        <button className="absolute flex items-center bg-white border  border-red justify-center py-2 px-8">
          <span>
            <Image
              src={cartIcon}
              width={48}
              height={48}
              className="h-[200px] relative cover w-full"
              alt=""
            />
          </span>
          <span>Add to Cart</span>
        </button>
      </div>
      <div>
        <p> {category} </p>
        <p> {productName} </p>
        <p> {productPrice} </p>
      </div>
    </div>
  );
};

export default ProductCard;
