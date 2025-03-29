import { Form, Image, Input, message, Modal, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { createProductAPI } from '../../services/product.service';
import { getAllCategoryAPI } from '../../services/category.service';
const ModalComponent = (props) => {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props
  const [urlImg, setUrlImg] = useState('')
  const [fileImg, setFileImg] = useState(null);
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    fetchCategoryApi()
  }, [])
  const handleChangeImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileImg(file);
      const reader = new FileReader()
      reader.onloadend = () => {
        setUrlImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleFinish = async (value) => {
    value.image = fileImg
    const response = await createProductAPI(value)
    if (response && response.data?.data) {
      setIsModalOpen(false)
      form.resetFields()
      setUrlImg('')
      setFileImg(null)
      message.success(response?.data?.message)
    } else {
      message.error(response?.data?.message)
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchCategoryApi = async () => {
    const response = await getAllCategoryAPI();
    if (response && response.data) {
      setCategoryList(response.data)
    }
  }
  return (
    <>
      <Modal title="Tạo mới sản phẩm"
        open={isModalOpen}
        okText="Tạo mới"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={handleCancel}
        cancelText="Hủy"
        maskClosable={false}
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            initialValues={{ isActive: 'true' }}
            onFinish={values => handleFinish(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="title"
          label="Tên sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input placeholder='Nhập tên sản phẩm' />
        </Form.Item>

        <Form.Item
          name="description"
          label="Miêu tả sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập miêu tả sản phẩm!' }]}
        >
          <Input.TextArea type="textarea" placeholder='Nhập miêu tả sản phẩm' />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <Input placeholder='Nhập giá sản phẩm' type="number" min={0} step={1000} suffix="₫" />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
        >
          <Input placeholder='Nhập số lượng sản phẩm' type="number" min={0} step={1} suffix="Sản phẩm" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục sản phẩm"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
        >
          <Select placeholder="Chọn danh mục sản phẩm" allowClear showSearch>
            {
              categoryList && categoryList.length > 0 && categoryList.map((item, index) => {
                return (
                  <Select.Option key={item._id} value={item._id}>{item.title}</Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập hình ảnh sản phẩm!' }]}
        >
          <Input placeholder='Chọn ảnh sản phẩm' type="file" accept="image/*" onChange={handleChangeImage} />
        </Form.Item>
        <Image
          width={100}
          src={urlImg}
        />
        <Form.Item name="isActive" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="true">Hoạt động</Radio>
            <Radio value="false">Không hoạt động</Radio>
          </Radio.Group>
        </Form.Item>
      </Modal>
    </>
  )
}
export default ModalComponent