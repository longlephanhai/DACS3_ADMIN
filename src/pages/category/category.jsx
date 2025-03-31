import { Button, Card, Space, Table } from "antd"
import { useEffect, useState } from "react"
import { getAllCategoryAPI } from "../../services/category.service"
import ModalCategory from "../../components/category/modal"

const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([])
  useEffect(() => {
    fetchApi()
  }, [])
  const fetchApi = async () => {
    const response = await getAllCategoryAPI()
    if (response && response.data) {
      setData(response.data)
    }
  }

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return (
          <>
            {(index + 1)}
          </>
        )
      }
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Tên thể loại",
      dataIndex: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button >Chi tiết</Button>
              <Button type="primary">Sửa</Button>
              <Button type="primary" danger>Xóa</Button>
            </div>
          </>
        )
      }
    }
  ]
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
          <Table
            dataSource={data}
            rowKey={"_id"}
            columns={columns}
          />
        </Card>
      </Space>
      <ModalCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}
export default CategoryPage