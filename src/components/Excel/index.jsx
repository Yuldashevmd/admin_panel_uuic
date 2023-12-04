import ExcelJS from "exceljs";

const checkStatus = (status) => {
  const statusMap = {
    "will call": "Позвонить",
    passed_first: "Прошёл 1-этап",
    failed_first: "Не прошёл 1-этап",
    will_come: "Придёт",
    came: "Пришел",
    failed_call: "Не выходит на связь",
    cancel: "Отказ",
  };
  return statusMap[status] || "Позвонить";
};

const DownloadExcel = async (users = []) => {
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

export default DownloadExcel;
