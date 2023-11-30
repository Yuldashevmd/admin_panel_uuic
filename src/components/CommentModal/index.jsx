import ModalGen from "src/service/generic/modal";
// import { api } from "src/utils/api";
import { Input, Form } from "antd";

const CommentModal = ({ open, close, userId }) => {
  const [form] = Form.useForm();

  // sendComment
  const sendComment = async (values) => {
    try {
      // const res = await api.post("");
      console.log({ comment: values.comment, userId: userId });
      form.setFieldValue("comment", null);
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <ModalGen
      title={"Примечание"}
      open={open}
      close={close}
      buttonText={"Cохранить"}
      form={form}
    >
      <Form onFinish={sendComment} id={"form"} form={form}>
        <Form.Item name="comment">
          <Input.TextArea placeholder="Комментария" />
        </Form.Item>
      </Form>
    </ModalGen>
  );
};

export default CommentModal;
