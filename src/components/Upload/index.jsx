import { Button, Modal } from "antd";
import { useState } from "react";
import { api } from "src/utils/api";
import { toast } from "react-toastify";
import { startTransition } from "react";

// Modal download
/**
 *
 * @param {is_open} boolean parametr for opening modal
 * @param {close_modal} boolean parametr for closing modal
 * @param {userId} string parametr comes user's unique id
 * @param {setAfterSendFile} boolean parametr this value is watched by useEffect that fetchs all users
 * @returns modal component
 */
export const DownloadModal = ({
  is_open,
  close_modal,
  userId,
  setAfterSendFile,
}) => {
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState("Файл не выбран");
  const [loading, setLoading] = useState(false);

  // getInputFileValue
  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileName = file?.name;
    startTransition(() => {
      setFile(file);
      setFileName(fileName);
    });
  };

  // closeModalFn
  const closeModal = () => {
    startTransition(() => {
      close_modal(false);
      setFile(false), setFileName("Файл не выбран");
    });
  };

  // sending file to server
  const sendFile = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userId);
      formData.append("name_file ", JSON.stringify(fileName));
      try {
        const body = formData;
        const res = await api.post("/admin/addDictation", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        res.status == 201 &&
          toast.success("Сохранено!", { position: "bottom-right" }),
          setAfterSendFile((prev) => !prev),
          setLoading(false);
      } catch (err) {
        console.log(err, "err");
        setLoading(false);
      } finally {
        closeModal();
      }
    }
  };

  return (
    <Modal
      height={306}
      width={"580px"}
      title={
        <p className="modal-header-text">
          Загрузите файлы в формате JPG или PDF
        </p>
      }
      open={is_open}
      footer={
        <div className="d-flex justify-center align-center">
          <Button
            loading={loading}
            onClick={sendFile}
            style={{ height: "40px" }}
            type="primary"
            disabled={!file ? true : false}
          >
            Загрузить диктант
          </Button>
        </div>
      }
      onCancel={closeModal}
    >
      <label
        className="custom-file-label d-flex align-center justify-between m-x-auto"
        htmlFor="CV"
      >
        <p className="d-flex align-center justify-center">Выбор файла</p>
        <span className="d-flex align-center justify-start">{fileName}</span>
      </label>
      <input
        onChange={handleChange}
        className="custom-file-input"
        type="file"
        name="file"
        id="CV"
        style={{ height: "50px" }}
      />
    </Modal>
  );
};
