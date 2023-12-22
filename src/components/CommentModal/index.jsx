import ModalGen from "src/service/generic/modal";
import { api } from "src/utils/api";
import { Input, Form } from "antd";
import { toast } from "react-toastify";

const CommentModal = ({ open, close, userId, getUsers, pagination }) => {
  const [form] = Form.useForm();

  // sendComment
  const sendComment = async (values) => {
    const body = {
      user_id: userId,
      comment: values.comment,
    };
    try {
      const res = await api.post("/admin/addComment", body);
      res.status == 201 &&
        (getUsers(pagination.current, pagination.pageSize),
        toast.success("Сохранено", { position: "bottom-right" }));
      close(false);
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
