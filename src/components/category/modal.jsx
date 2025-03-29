import { Form, Image, Input, message, Modal, Radio } from "antd"
import { useState } from "react";
import { createCategoryAPI } from "../../services/category.service";


const ModalCategory = (props) => {
  const { isModalOpen, setIsModalOpen } = props
  const [urlImg, setUrlImg] = useState('')
  const [fileImg, setFileImg] = useState(null);
  const [form] = Form.useForm();
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFinish = async (value) => {
    value.image = fileImg
    const response = await createCategoryAPI(value)
    console.log("response", response);
    if (response && response.data) {
      setIsModalOpen(false)
      form.resetFields()
      setUrlImg('')
      setFileImg(null)
      message.success(response.message)
    } else {
      message.error(response.message)
    }
  }
  return (
    <>
      <Modal
        title="Tạo mới thể loại sản phẩm"
        open={isModalOpen}
        okText="Tạo mới"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={handleCancel}
        cancelText="Hủy bỏ"
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
          label="Tên thể loại sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập thể loại sản phẩm!' }]}
        >
          <Input placeholder='Nhập thể loại sản phẩm' />
        </Form.Item>

        <Form.Item
          name="description"
          label="Miêu tả thể loại sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập miêu tả thể loại!' }]}
        >
          <Input.TextArea type="textarea" placeholder='Nhập miêu tả thể loại' />
        </Form.Item>
        <Form.Item
          name="image"
          label="Hình ảnh thể loại sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập hình ảnh thể loại!' }]}
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
export default ModalCategory