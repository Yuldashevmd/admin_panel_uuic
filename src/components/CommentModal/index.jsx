import ModalGen from "src/service/generic/modal";
import { api } from "src/utils/api";
import { Input, Form } from "antd";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CommentModal = ({
  open,
  close,
  userId,
  getUsers,
  pagination,
  record,
  setRecord,
}) => {
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
      form.resetFields();
      close(false);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setRecord(false);
    }
  };

  // updateComment
  const updateComment = async (values) => {
    const body = {
      comment: values.comment,
    };
    try {
      const res = await api.patch(`/admin/updateComment/${record.id}`, body);
      res.status == 204 &&
        (getUsers(pagination.current, pagination.pageSize),
        toast.success("Изменено", { position: "bottom-right" }));
      form.resetFields();
      close(false);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setRecord(false);
    }
  };

  useEffect(() => {
    if (record) {
      form.setFieldValue("comment", record.Comment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  return (
    <ModalGen
      title={"Примечание"}
      open={open}
      close={close}
      buttonText={"Cохранить"}
      form={form}
      setRecord={record ? setRecord : null}
    >
      <Form
        onFinish={record ? updateComment : sendComment}
        id={"form"}
        form={form}
      >
        <Form.Item name="comment">
          <Input.TextArea placeholder="Комментария" />
        </Form.Item>
      </Form>
    </ModalGen>
  );
};

export default CommentModal;
