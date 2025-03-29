import { Form, Image, Input, message, Modal, Radio, Select } from 'antd';
import { useState } from 'react';
import { createProductAPI } from '../../services/product.service';
const ModalComponent = (props) => {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props
  const [urlImg, setUrlImg] = useState('')
  const [fileImg, setFileImg] = useState(null);
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
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Miêu tả sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập miêu tả sản phẩm!' }]}
        >
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <Input type="number" min={0} step={1000} prefix="₫" />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
        >
          <Input type="number" min={0} step={1} prefix="số lượng" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục sản phẩm"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
        >
          <Select>
            <Select.Option value="1">Danh mục 1</Select.Option>
            <Select.Option value="2">Danh mục 2</Select.Option>
            <Select.Option value="3">Danh mục 3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập hình ảnh sản phẩm!' }]}
        >
          <Input type="file" accept="image/*" onChange={handleChangeImage} />
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