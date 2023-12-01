import React, { useState, useRef, useEffect, Fragment } from "react";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import NormalInput from "../../../../customComponents/NormalInput/Index.jsx";
import "../../../../css/logoDepart.css";
import "./style.css";
import { validatePhoneVn } from "../../../../helperFC/Function";
import useHookForm from "../../../../hooks/useHookForm.jsx";
import Baking from "./../../../ComAndEm/PaymentMethod/Baking/index";
import { set } from "date-fns";

const Index = ({
  addDepartment,
  setAddDepartment,
  step,
  handleSubmitStep1,
  handleBackStep,
  handleSubmitStep2,
}) => {
  const [triggerRender, setTriggerRender] = useState(true);

  const checkStepRef = useRef({
    departmentName: false,
    managerName: false,
    managerEmail: false,
    // managerPhone: false,
  });
  const inputField = [
    {
      register: "departmentName",
      placeholder: "Nhập tên phòng ban",
      title: "Tên phòng ban",
      type: "text",
      accept: "",
    },
    {
      register: "managerName",
      placeholder: "Nhập tên người quản lý ",
      title: "Người quản lý",
      type: "text",
      accept: "",
    },
    {
      register: "managerEmail",
      placeholder: "Nhập email người quản lý",
      title: "Email",
      type: "text",
      accept: "",
    },
    {
      register: "managerPhone",
      placeholder: "Nhập số điện thoại người quản lý",
      title: "Số điện thoại",
      type: "text",
      accept: "",
    },
  ];
  const checkboxField = [
    // {
    //   register: 'role1',
    //   title: 'Quyền tạo chức danh tuyển dụng',
    //   label1: 'Phòng ban',
    //   value: 'create',
    //   disabled: true,
    // },
    // {
    //   register: 'role2',
    //   title: 'Quyền đăng tuyển',
    //   label1: 'Phòng ban',
    //   value: 'select',
    //   disabled: true,

    // },
    // {
    //   register: 'role3',
    //   title: 'Quyền chọn ứng viên',
    //   label1: 'Phòng ban',
    //   value: 'recruit',
    //   disabled: true,
    // },
    // {
    //   register: 'role4',
    //   title: 'Quyền đặt lịch phỏng vấn',
    //   label1: 'Phòng ban',
    //   value: 'book',
    //   disabled: true,
    // },
    {
      register: "role",
      title: "Phân quyền",
      label1: "Phòng ban",
      value: "role",
      disabled: true,
    },
  ];
  const schema = yup.object().shape({
    departmentName: yup.string().required("Vui lòng nhập tên phòng"),
    managerName: yup.string().required("Vui lòng nhập tên"),
    managerEmail: yup
      .string()
      .required("Vui lòng nhập email")
      .email("email không hợp lệ"),
    managerPhone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .length(10, "Số điện thoại không hợp lệ"),
  });
  const schemaRoles = yup.object().shape({});

  const [register, handleSubmit, getValues, reset, , , errors] =
    useHookForm(schema);
  const [
    registerRoles,
    handleSubmitRoles,
    getValuesRoles,
    resetRoles,
    ,
    ,
    errorsRoles,
  ] = useHookForm(schemaRoles);

  function handleCheckInput(e) {
    if (e.target.dataset.testid === "departmentName") {
      if (e.target.value !== "" && !checkStepRef.current.departmentName) {
        checkStepRef.current.departmentName = true;
      }
      if (e.target.value === "" && checkStepRef.current.departmentName) {
        checkStepRef.current.departmentName = false;
      }
    }
    if (e.target.dataset.testid === "managerName") {
      if (e.target.value !== "" && !checkStepRef.current.managerName) {
        checkStepRef.current.managerName = true;
      }
      if (e.target.value === "" && checkStepRef.current.managerName) {
        checkStepRef.current.managerName = false;
      }
    }
    if (e.target.dataset.testid === "managerEmail") {
      if (e.target.value !== "" && !checkStepRef.current.managerEmail) {
        checkStepRef.current.managerEmail = true;
      }
      if (e.target.value === "" && checkStepRef.current.managerEmail) {
        checkStepRef.current.managerEmail = false;
      }
    }
    if (e.target.dataset.testid === "managerPhone") {
      if (e.target.value !== "" && !checkStepRef.current.managerPhone) {
        checkStepRef.current.managerPhone = true;
      }
      if (e.target.value === "" && checkStepRef.current.managerPhone) {
        checkStepRef.current.managerPhone = false;
      }
    }

    setTriggerRender(!triggerRender);
  }
  useEffect(() => {}, [getValuesRoles()]);
  async function handleOnSubmit(data) {
    try {
      await handleSubmitStep2(data);
      // reset({
      //   departmentName: '',
      //   managerName: '',
      //   managerEmail: '',
      //   managerPhone: '',
      // });
      // resetRoles({
      //   role1: 'create',
      //   role2: '',
      //   role3: 'recruit',
      //   role4: '',
      // });
      checkStepRef.current = {
        departmentName: false,
        managerName: false,
        managerEmail: false,
        managerPhone: false,
      };
    } catch (error) {
      console.log(error);
    }
  }

  const CheckboxItem = ({
    register,
    label,
    value,
    disabled,
    checked,
    onChange,
  }) => {
    return (
      <div className="d-flex role font-size-14 bold justify-content-center">
        <p className="mx-0 mb-0">{label}</p>
        <input
          {...register}
          disabled={disabled}
          style={{ height: 20 }}
          className="col-2"
          type="checkbox"
          checked={checked}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  const [pns, setPns] = useState(false);
  return (
    <Modal
      show={addDepartment}
      onHide={setAddDepartment}
      className=" modal fade modal-bx-info create-department-modal"
    >
      {step === 1 && (
        <form onSubmit={handleSubmit(handleSubmitStep1)}>
          <div className="modal-dialog my-0 w-100" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">Tạo phòng ban</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setAddDepartment(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body font-size-14  create-department-container">
                <div className="info-container appear">
                  {inputField.map((item, idx) => {
                    return (
                      <Fragment key={idx}>
                        <NormalInput
                          className="der-pri"
                          accept={item.accept}
                          isFilled={checkStepRef.current[item.register]}
                          name={item.register}
                          title={item.title}
                          placeholder={item.placeholder}
                          type={item.type}
                          register={{ ...register(item.register) }}
                          errors={errors}
                          onBlur={handleCheckInput}
                        />
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAddDepartment(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitRoles(handleOnSubmit)}>
          <div className="modal-dialog my-0 w-100" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">Tạo phòng ban</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setAddDepartment(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body  create-department-container">
                <div className="roles-container appear">
                  {checkboxField.map((item, idx) => {
                    return (
                      <div className="mb-1" key={idx}>
                        <p className="text-center font-size-14">
                          {item.title} <span className="asterisk"></span>
                        </p>
                        <div className="d-flex justify-content-center font-size-14 ">
                          <CheckboxItem
                            name={item.register}
                            label={
                              getValues("departmentName")
                                ? getValues("departmentName")
                                : item.label1
                            }
                            // checked={item.check1}
                            register={{ ...registerRoles(item.register) }}
                            value={item.value}
                            checked={true}
                            disabled={true}
                          />
                          <CheckboxItem
                            name={"Phòng nhân sự"}
                            // disabled={true}
                            label={"Phòng nhân sự"}
                            register={{ ...registerRoles("Phòng nhân sự") }}
                            value={"123"}
                            checked={pns}
                            onChange={(e) => {
                              e.stopPropagation();

                              console.log(pns);
                              setPns(e.target.checked);
                            }}
                          />
                        </div>
                        <div className="row">
                          <div className="col-6 ">
                            <div className=" justify-content-center  pl-3 lessbold">
                              <ul type="1">
                                Các quyền phòng ban:
                                <li>1.Tạo chức danh</li>
                                <li>2.Gửi yêu cầu tuyển dụng</li>
                                <li>3.Đánh giá ứng viên</li>
                              </ul>
                            </div>
                          </div>
                          {pns && (
                            <div className="col-6">
                              <div className="d-flex justify-content-center lessbold pl-4">
                                <p>Phòng nhân sự có quyền như phong ban</p>
                              </div>
                            </div>
                          )}
                          <div className="text-danger">
                            {errorsRoles[item.register]?.message && (
                              <div>{errorsRoles[item.register].message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBackStep();
                  }}
                >
                  Trở lại
                </button>

                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default Index;
