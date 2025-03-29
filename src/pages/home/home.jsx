import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getAllUserAPI } from '../../services/auth.service';
const Home = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchDataApi()
  }, [current, pageSize])
  const fetchDataApi = async () => {
    const response = await getAllUserAPI(current, pageSize);
    if (response && response?.data) {
      setData(response.data?.result)
      setCurrent(response.data?.meta?.current)
      setPageSize(response.data?.meta?.pageSize)
      setTotal(response.data?.meta?.total)
    }
  }

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return (
          <>
            {(index + 1) + (current - 1) * pageSize}
          </>
        )
      },
    },
    {
      title: "ID",
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: "Role",
      dataIndex: "role",
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
  }
  return (
    <>
      <Table
        columns={columns}
        rowKey={"_id"}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
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
export default Home