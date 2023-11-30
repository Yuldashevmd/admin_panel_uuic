import { Modal, Button } from "antd";

/**
 *
 * @param {boolean} open value of modal open or not
 * @param {function} close  function that changes value of modal
 * @param {string} title text for modal title
 * @param {string} buttonText for modal button text
 * @param {ReactElement} form form
 * @param {ReactNode} children content that puts inside modal
 * @returns modal component
 */

const ModalGen = ({ open, close, title, buttonText, form, children }) => {
  const closeModal = () => {
    close(false);
    form.setFieldValue("comment", null);
  };
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      footer={
        <Button type="primary" htmlType="submit" form="form">
          {buttonText}
        </Button>
      }
      title={title}
    >
      {children}
    </Modal>
  );
};

export default ModalGen;
