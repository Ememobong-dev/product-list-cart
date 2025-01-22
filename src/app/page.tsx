import { Col, Row } from "antd";
import data from "@/app/data.json"
import ProductCard from "@/components/ProductCard";
import emptyCart from "../../public/assets/images/illustration-empty-cart.svg"
import Image from "next/image";



export default function Home() {
  // const [cart, setCart] = useState([]);


  return (
    <div className="p-16 ">
      <Row justify={'center'} gutter={16} >
        <Col xs={16}>
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
        <Col xs={8}>
          <div className="bg-white w-full p-6">
            <h3 className="text-2xl text-red font-bold">Your Cart (0)</h3>
            <span className="flex justify-center">
              <Image width={200} height={200} src={emptyCart} alt="empty cart" />
            </span>
            <p className="text-center text-rose-900">Your added items will appear here</p>
            
          </div>

        </Col>


      </Row>

    </div>
  );
}
