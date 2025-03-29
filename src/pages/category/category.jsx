import { Button, Card, Space } from "antd"
import { useEffect, useState } from "react"
import { getAllCategoryAPI } from "../../services/category.service"
import ModalCategory from "../../components/category/modal"

const CategoryPage = () => {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchApi()
  }, [])
  const fetchApi = async () => {
    const response = await getAllCategoryAPI()
    if (response && response.data) {
      // setData(response.data)
      console.log(response);
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Space direction="vertical" size={16}>
        <Card title="Trang quản lý thể loại sản phẩm" extra={<Button type="primary" onClick={showModal}>+ Tạo mới thể loại sản phẩm</Button>}
          style={{
            width: "80vw",
            padding: "20px",
          }}>

        </Card>
      </Space>
      <ModalCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}
export default CategoryPage