import { Button, Card, Space } from 'antd';
import { useState } from 'react';
import ModalComponent from '../../components/product/modal';
const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card title="Trang quản lý sản phẩm" extra={<Button onClick={showModal} type='primary'>+ Tạo mới sản phẩm</Button>}
          style={{
            width: "80vw",
            padding: "20px",
          }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
      <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}
export default ProductPage