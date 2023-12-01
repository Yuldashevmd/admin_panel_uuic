import ExportJsonExcel from "js-export-excel";

const checkStatus = (status) => {
  switch (status) {
    case "will call":
      return "Позвонить";
    case "passed_first":
      return "Прошёл 1-этап";
    case "failed_first":
      return "Не прошёл 1-этап";
    case "will_come":
      return "Придёт";
    case "came":
      return "Пришел";
    case "failed_call":
      return "Не выходит на связь";
    case "cancel":
      return "Отказ";
    default:
      return "Позвонить";
  }
};

const DownloadExcel = (users = []) => {
  const data = users;
  let option = {};
  let dataTable = [];
  if (data) {
    for (let i in data) {
      if (data) {
        let obj = {
          "№": data[i]?.index,
          Фото: data[i]?.image,
          "Ф.И.О": data[i]?.name,
          "Дата рождения": data[i]?.date_was_born,
          Номер: data[i]?.phone,
          Адрес: data[i]?.address,
          Студент: data[i]?.student ? "Да" : "Нет",
          "Уровень языка":
            "RU" +
            ": " +
            data[i]?.lang_ru +
            "; " +
            "UZ" +
            ": " +
            data[i]?.lang_uz +
            "; " +
            "EN" +
            ": " +
            data[i]?.lang_en,
          "Уровень знания комп.": data[i]?.comp,
          "Опыт работы": data[i]?.experience,
          "Время создание": data[i]?.create_data,
          Резюме: data[i]?.resumePdf,
          Диктант: data[i]?.dictation_image,
          Статус: checkStatus(data[i]?.status),
          Примечание: data[i]?.comment,
        };
        dataTable.push(obj);
      }
    }
  }
  option.fileName = "Новые сотрудники";
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: "sheet",
      sheetFilter: [
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
      ],
      sheetHeader: [
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
      ],
    },
  ];

  let toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
};

export default DownloadExcel;
