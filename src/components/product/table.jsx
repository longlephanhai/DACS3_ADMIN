import { Button, Image, Table } from "antd"
import { useEffect, useState } from "react";
import { getAllProductAPI } from "../../services/product.service";

const TableProduct = () => {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    fetchApi()
  }, [current, pageSize])
  const fetchApi = async () => {
    const response = await getAllProductAPI(current, pageSize)
    if (response && response?.data) {
      setData(response.data?.result)
      setCurrent(response.data?.meta?.current)
      setPageSize(response.data?.meta?.pageSize)
      setTotal(response.data?.meta?.total)
    }
  }
  const columns = [
    {
      title: 'STT',
      render: (_, record, index) => {
        return (
          <>
            {(index + 1) + (current - 1) * pageSize}
          </>
        )
      },
    },
    {
      title: 'ID',
      dataIndex: '_id',
      render: (_, record) => {
        return (
          <>
            <a href='#' >{record._id}</a>
          </>
        )
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
    },
    {
      title: "Thể loại",
      render: (_, record) => {
        return (
          <>
            {record?.category?.title}
          </>
        )
      }
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (_, record) => {
        return (
          <>
            <Image src={import.meta.env.VITE_BACK_URL + "/images/default/" + record?.image} alt="image" style={{ width: "100px", height: "100px" }} />
          </>
        )
      }
    },
    {
      title: "Hành động",
      dataIndex: "action",
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
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current)
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize)
      }
    }
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"_id"}
        pagination={
          {
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }
        }
      />
    </>
  )
}
export default TableProduct