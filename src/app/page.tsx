import { Col, Row } from "antd";
import data from "@/app/data.json"
import ProductCard from "@/components/ProductCard";




export default function Home() {
  return (
    <div className="px-14 py-14">
      <Row justify={'center'}>
        <Col xs={16}>
          <h2 className="text-rose-900 text-3xl font-bold">Desserts</h2>
          <Row  justify={'center'} gutter={16}>
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

        </Col>


      </Row>

    </div>
  );
}
