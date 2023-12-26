import ExcelJS from "exceljs";
import { fetchAllUsers } from "src/pages/Error/Main/helper";
import { api } from "src/utils/api";

const checkStatus = (status) => {
  const statusMap = {
    will_call: "Позвонить",
    passed_first: "Прошёл 1-этап",
    failed_first: "Не прошёл 1-этап",
    will_come: "Придёт",
    came: "Пришел",
    failed_call: "Не выходит на связь",
    cancel: "Отказ",
  };
  return statusMap[status] || "Позвонить";
};

// statusCheckForSelect
const statusCheckForSelect = async (setLoading, total, status) => {
  const param = {
    name: "null",
    phone: "",
    status,
    pageSize: total,
  };
  const users = await api
    .get("/users/findByFilter/users", {
      params: param,
    })
    .then((res) => res?.data?.results);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.addRow([
    "№",
    "Фото",
    "Ф.И.О",
    "Дата рождения",
    "Номер",
    "Адрес",
    "Студент",
    "Уровень языка",
    "Уровень знания комп.",
    "Опыт работы",
    "Время создание",
    "Резюме",
    "Диктант",
    "Статус",
    "Примечание",
  ]);

  for (const dataItem of users) {
    worksheet.addRow([
      dataItem?.index,
      { formula: `HYPERLINK("${dataItem?.image}","Open Image")` },
      dataItem?.name,
      dataItem?.date_was_born,
      dataItem?.phone,
      dataItem?.address,
      dataItem?.student ? "Да" : "Нет",
      `RU: ${dataItem?.lang_ru}; UZ: ${dataItem?.lang_uz}; EN: ${dataItem?.lang_en}`,
      dataItem?.comp,
      dataItem?.experience,
      dataItem?.create_data,
      // Add a button for the resumePdf URL
      {
        formula: `HYPERLINK("${dataItem?.resumePdf}","Open Resume")`,
      },
      // Concatenate dictation_image URLs into a single cell
      {
        formula: `HYPERLINK("${dataItem?.dictation_image}","Open Resume")`,
      },
      checkStatus(dataItem?.status),
      dataItem?.comment,
    ]);
  }

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Новые сотрудники.xlsx";
    link.click();
  });
};

// GetAllUser
const GetAllUser = async (setLoading, total) => {
  const users = await fetchAllUsers(setLoading, 1, total).then(
    (res) => res?.results
  );

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.addRow([
    "№",
    "Фото",
    "Ф.И.О",
    "Дата рождения",
    "Номер",
    "Адрес",
    "Студент",
    "Уровень языка",
    "Уровень знания комп.",
    "Опыт работы",
    "Время создание",
    "Резюме",
    "Диктант",
    "Статус",
    "Примечание",
  ]);

  for (const dataItem of users) {
    worksheet.addRow([
      dataItem?.index,
      { formula: `HYPERLINK("${dataItem?.image}","Open Image")` },
      dataItem?.name,
      dataItem?.date_was_born,
      dataItem?.phone,
      dataItem?.address,
      dataItem?.student ? "Да" : "Нет",
      `RU: ${dataItem?.lang_ru}; UZ: ${dataItem?.lang_uz}; EN: ${dataItem?.lang_en}`,
      dataItem?.comp,
      dataItem?.experience,
      dataItem?.create_data,
      // Add a button for the resumePdf URL
      {
        formula: `HYPERLINK("${dataItem?.resumePdf}","Open Resume")`,
      },
      // Concatenate dictation_image URLs into a single cell
      {
        formula: `HYPERLINK("${dataItem?.dictation_image}","Open Resume")`,
      },
      checkStatus(dataItem?.status),
      dataItem?.comment,
    ]);
  }

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Новые сотрудники.xlsx";
    link.click();
  });
};

const DownloadExcel = async (setLoading, total, selectStatus) => {
  if (selectStatus === "all") {
    return GetAllUser(setLoading, total);
  }
  return statusCheckForSelect(setLoading, total, selectStatus);
};

export default DownloadExcel;
