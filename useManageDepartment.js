import React, { useState, useEffect } from "react";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getMyCompany,
} from "../services/CompanyApi";
import { getListDepartment } from "../services/DepartmentApi";
import { toast } from "react-hot-toast";
import { confirmAlert } from "../helperFC/sweetAlert";
import { useDispatch } from "react-redux";
import { chooseJobAction } from "../store/actions/AssessResumeActions";

const useManageDepartment = (props) => {
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState({});
  const [reload, setReload] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [company, setCompany] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [listDepartment, setListDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [step, setStep] = useState(1);
  const [dataStep1, setDataStep1] = useState();
  function handleNavigateToDepartment() {
    dispatch(chooseJobAction({}));
  }

  function handleSelectDepartment(department) {
    setSelectedDepartment(department);
    setCompany(true);
  }

  async function handleAddDepartment(data) {
    try {
      await createDepartment(data);
      setStep(1);
      setReload(true);
    } catch (error) {
      throw error;
    }
  }
  async function handleEditDepartment(data) {
    const { id, ...bodyData } = data;
    try {
      if (bodyData.role === false) {
        const newData = {
          departmentName: bodyData.departmentName,
          managerEmail: bodyData.managerEmail,
          managerName: bodyData.managerName,
          managerPhone: bodyData.managerPhone,
          roles: bodyData.roles,
        };

        await editDepartment(id, newData);
        setCompany(false);
        setReload(!reload);
        toast.success("Sửa thông tin phòng ban thành công");
      } else if (data.role === "123") {
        const newData = {
          departmentName: bodyData.departmentName,
          managerEmail: companyInfo.email,
          managerName: companyInfo.name,
          managerPhone: companyInfo.phone,
          roles: bodyData.roles,
        };
        await editDepartment(id, newData);
        setCompany(false);
        setReload(!reload);
      } else {
        await editDepartment(id, bodyData);
        setCompany(false);
        setReload(!reload);
        toast.success("Sửa thông tin phòng ban thành công");
      }
    } catch (error) {
      console.log(error);

      toast.error("Vui lòng thử lại");
      throw error;
    }
  }
  async function deleteDepartmentFunc(id) {
    await deleteDepartment(id);
    setReload((prev) => !prev);
  }
  async function handleDeleteDepartment(id) {
    confirmAlert(
      () => deleteDepartmentFunc(id),
      "Xác nhận xóa phòng ban",
      "Xóa thành công",
      "Xóa thất bại"
    );
  }

  function handleSubmitStep1(data) {
    setDataStep1(data);
    setStep(2);
  }
  function handleBackStep() {
    setStep(1);
  }
  async function handleSubmitStep2(data) {
    console.log("🚀 ~ file: useManageDepartment.js:77 ~ data:", data);
    const roles = Object.values(data).filter((role) => role !== false);
    console.log("🚀 ~ file: useManageDepartment.js:78 ~ roles:", roles);

    // for (let key in data) {
    //   roles.unshift(data[key]);
    // }
    // roles = roles.filter((item) => item !== '123');
    const roless = ["create", "select", "recruit", "book"];
    let body = { ...dataStep1, roles: roless };
    const dateNotRoles = {
      departmentName: dataStep1.departmentName,
      managerEmail: companyInfo.email,
      managerName: companyInfo.name,
      managerPhone: companyInfo.phone,
      roles: ["create", "select", "recruit", "book"],
    };
    setAddDepartment(false);
    try {
      if (roles[1] == "123") {
        console.log("Không rolés");
        console.log(dateNotRoles);
        confirmAlert(
          () => handleAddDepartment(dateNotRoles),
          "Xác nhận tạo phòng ban",
          "Tạo thành công",
          "Tạo thất bại"
        );
      } else {
        console.log("có Roles");
        console.log(body);
        confirmAlert(
          () => handleAddDepartment(body),
          "Xác nhận tạo phòng ban",
          "Tạo thành công",
          "Tạo thất bại"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      let { data } = await getListDepartment();
      const isRecruiting = [];
      const isNotRecruiting = [];
      const isNotRecruitingYet = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].canDelete) {
          isNotRecruitingYet.push(data[i]);
        } else if (data[i].numberPositionActive === 0) {
          isNotRecruiting.push(data[i]);
        } else {
          isRecruiting.push(data[i]);
        }
      }
      data = [...isRecruiting, ...isNotRecruiting, ...isNotRecruitingYet];
      setListDepartment(data);
      setIsLoading(false);
    }
    fetchData();
    window.addEventListener("resize", () => setInnerWidth(window.innerWidth));
    setReload(false);
  }, [reload]);
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history);
      setCompanyInfo(myCompany);
    }
    fetchData();
    window.addEventListener("resize", () => setInnerWidth(window.innerWidth));
    setReload(false);
    // setIsLoading(false);
  }, []);

  return {
    innerWidth,
    companyInfo,
    company,
    addDepartment,
    listDepartment,
    isLoading,
    selectedDepartment,
    handleSelectDepartment,
    handleEditDepartment,
    handleDeleteDepartment,
    setAddDepartment,
    setCompany,
    handleSubmitStep1,
    handleBackStep,
    handleSubmitStep2,
    step,
    handleNavigateToDepartment,
  };
};

export default useManageDepartment;
