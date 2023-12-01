const handleAddShortTraining = async (data) => {
  await addShortTraining({
    name: data.name,
    start: data.start,
    end: data.end,
    organization: data.organization,
    content: data.content,
    degree: !data?.degree ? " " : data?.degree,
    place: data.place,
  });

  setShowShortTraining(false);
  setReload(!reload);
};
async function addNewLanguage(data) {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append(key, data[key][0]);
      } else if (key === "expiredDate") {
        const date = moment(data.expiredDate);
        const formatDate = date.format("YYYY-MM");
        formData.append(key, formatDate);
      } else {
        formData.append(key, data[key].label);
      }
    });
    const [image, language, languageLevel, certificateName, expiredDate] =
      formData;
    const date = moment(data.expiredDate);
    const formatDate = date.format("YYYY-MM");
    console.log(data);
    if (image[1] == "undefined") {
      console.log("ko co anh");
      await addLanguage({
        language: language[1],
        languageLevel: languageLevel[1],
        certificateName: certificateName[1],
        expiredDate: formatDate,
      });
    } else {
      console.log(" co anh");
      await addLanguage(formData);
    }

    setReload(!reload);
  } catch (error) {
    throw error;
  }
}
