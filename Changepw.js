import React from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePassword } from "../../services/EmployeeApi";
import HelmetComponent from "../../components/ComAndEm/Helmet/Helmet";
import { confirmAlert } from "../../helperFC/sweetAlert";

function Changepasswordpage(props, setChildStep) {
  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
      )
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(20, "Mật khẩu không được quá 20 ký tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(20, " Mật khẩu không được quá 20 ký tự")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function handleChangePassword(data) {
    try {
      await changePassword({
        oldPassword: data.password,
        newPassword: data.newPassword,
      });
    } catch (error) {
      throw error;
    }
  }
  function onHandleSubmit(data) {
    console.log(data);
    confirmAlert(
      () => handleChangePassword(data),
      "Bạn có chắc chắn muốn thay đổi mật khẩu?",
      "Thay đổi mật khẩu thành công",
      "Thay đổi mật khẩu không thành công",
      () => {
        window.location.href = "/employee/login";
      }
    );
  }

  return (
    <>
      <HelmetComponent title="Thay đổi mật khẩu" />
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div
            className="section-full browse-job p-t20 p-b20"
            style={{
              backgroundSize: "cover",
              backgroundColor: "#F5F5F5",
            }}
          >
            <div className="container">
              <div className="m-b30">
                <div
                  className="job-bx job-profile section-full bg-white p-4"
                  style={{
                    border: "1.5px solid #DCDCDC",
                    maxWidth: "550px",
                    marginInline: "auto",
                    marginBottom: "auto",
                    borderRadius: 8,
                  }}
                >
                  <div className="job-bx-title clearfix">
                    <h5
                      className="font-weight-700 pull-left text-uppercase"
                      style={{ fontWeight: "600" }}
                    >
                      Thay đổi mật khẩu
                    </h5>
                    <button
                      onClick={() => (window.location.href = "/jobs-profile")}
                      className="site-button right-arrow button-sm float-right"
                      style={{ width: "90px" }}
                    >
                      Trở về
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Mật khẩu hiện tại </label>
                          <input
                            type="password"
                            {...register("password")}
                            data-testid="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu hiện tại"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Mật khẩu mới </label>
                          <input
                            className="form-control small"
                            placeholder="Nhập mật khẩu"
                            type="password"
                            {...register("newPassword")}
                            // onChange={onChange}
                            data-testid="newPassword"
                          />
                          <div className="text-danger mt-2">
                            {errors.newPassword?.message && (
                              <div>{errors.newPassword.message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Nhập lại mật khẩu mới </label>
                          <input
                            className="form-control small"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            {...register("confirmPassword")}
                            data-testid="confirmPassword"
                          />
                          <div className="text-danger mt-2">
                            {errors.confirmPassword?.message && (
                              <div>{errors.confirmPassword.message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 m-b10">
                        <button type="submit" className="site-button">
                          Cập nhật
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Changepasswordpage;
