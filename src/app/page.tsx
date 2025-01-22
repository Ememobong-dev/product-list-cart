"use client";


import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import data from "@/app/data.json"
import ProductCard from "@/components/ProductCard";
import emptyCart from "../../public/assets/images/illustration-empty-cart.svg"
import cancelIcon from "../../public/assets/images/icon-remove-item.svg"
import carbonIcon from "../../public/assets/images/icon-carbon-neutral.svg"
import Image from "next/image";







type CartListInterface = {
  name: string,
  price: number,
  quantity: number
}

export default function Home() {
  const [cart, setCart] = useState<CartListInterface[]>([]);

  useEffect ( () => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"))
  }, [cart] )

  const removeProductFromCart = (productName:string) => {
    const updatedCart = cart.filter( (item) => item.name !== productName );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }




  return (
    <div className="md:p-16 p-5">
      <Row justify={'center'} gutter={16} >
        <Col xs={24} md={16}>
          <h2 className="text-rose-900 text-3xl font-bold">Desserts</h2>
          <Row className="py-10" justify={'center'} gutter={16}>
            {
              data.map( (item) => (
                <Col key={item.name} lg={8}>
                  <ProductCard category={item.category} productName={item.name} productPrice={item.price} imageSrc={item.image.desktop} />
                </Col>
              ) )
            }
          </Row>

        </Col>
        <Col xs={24} md={8}>
          <div className="bg-white w-full p-6">
            <h3 className="text-2xl text-red font-bold">
              Your Cart ({cart.length })
            </h3>
            {
              cart.length > 0 ? cart.map( (product) => (
                <div key={product.name} >
                  <div className=" w-full my-5 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <div className="flex gap-5 items-center">
                        <span className="text-red font-bold"> {product.quantity}x </span>
                        <span className="text-rose-500"> @${product.price.toFixed(2)} </span>
                        <span className=" text-rose-300 font-bold"> @${(product.quantity * product.price).toFixed(2)} </span>
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
              ) ) 
              :
              (
                <>
                <span className="flex justify-center">
                  <Image width={200} height={200} src={emptyCart} alt="empty cart" />
                </span>
                <p className="text-center text-rose-900">Your added items will appear here</p>
                </>
              )
            }

            {
              cart.length > 0 && (
                <>
                  <div className="flex my-5 justify-between items-center">
                    <p>Order Total</p>
                    <p>$46.50</p>
                  </div>
                  <div className="flex gap-5 my-5 py-3 justify-center items-center px-2 bg-rose-100">
                    <span>
                      <Image src={carbonIcon} alt="" />
                    </span>
                    <p>This is a <span className="font-bold">carbon-neutral</span> delivery</p>
                  </div>
                  <button className="py-3 px-8 w-full bg-red hover:bg-[#722d19] text-white rounded-3xl">Confirm Order</button>
                </>
              )
            }
            
            
          </div>

        </Col>


      </Row>

    </div>
  );
}
