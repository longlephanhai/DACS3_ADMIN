import { Modal } from 'antd';
const ModalComponent = (props) => {
  const { isModalOpen, setIsModalOpen } = props
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title="Tạo mới sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        okText="Tạo mới"
        onCancel={handleCancel}
        cancelText="Hủy"
        maskClosable={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
export default ModalComponent