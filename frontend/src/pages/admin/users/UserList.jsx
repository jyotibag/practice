import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { nanoid } from "nanoid";
import {
  ActivateUser,
  AddEditUser,
  DeleteUser,
  PageHeader,
  PageWrapper,
  TableLoader,
  PaginationContainer,
} from "../../../components";
import {
  dateFormatFancy,
  encParam,
  serialNo,
  switchColor,
} from "../../../utils/functions";
import customFetch from "../../../utils/customFetch";
import {
  setDeleteUser,
  setEditUser,
  setListUsers,
} from "../../../feature/userSlice";
import { setTotal } from "../../../feature/commonSlice";

const UserList = () => {
  document.title = `List of All Users | ${import.meta.env.VITE_APP_TITLE}`;

  const postTitle = `Default password: welcome123 (lower case)`;
  const textClass = `text-danger`;
  const returnUrl = `/admin/users`;

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ r: "", s: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { listUsers } = useSelector((store) => store.users);
  const { totalRecords, totalPages, currentPage } = useSelector(
    (store) => store.common
  );
  const { listRoles } = useSelector((store) => store.roles);
  const { changeCount } = useSelector((store) => store.common);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/users/all`, {
        params: {
          page: queryParams.get("page") || "",
          search: queryParams.get("s") || "",
          role: queryParams.get("r") || "",
        },
      });

      const data = {
        totalRecords: response?.data?.meta?.totalRecords,
        totalPages: response?.data?.meta?.totalPages,
        currentPage: response?.data?.meta?.currentPage,
      };

      dispatch(setListUsers(response?.data?.data?.rows));
      dispatch(setTotal(data));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  useEffect(() => {
    localStorage.removeItem("filter");
    fetchData();
  }, [
    queryParams.get("page"),
    queryParams.get("s"),
    queryParams.get("r"),
    changeCount,
  ]);

  const resetSearch = () => {
    setForm({ ...form, r: "", s: "" });
    navigate(returnUrl);
  };

  const viewUser = (id) => {
    const filter = {
      page: queryParams.get("page"),
      s: queryParams.get("s"),
      r: queryParams.get("r"),
    };
    localStorage.setItem("filter", JSON.stringify(filter));

    navigate(`/admin/users/${encParam(id)}`);
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader
              title={`List of All Users`}
              postTitle={postTitle}
              textclassName={textClass}
            />
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <span className="d-none d-sm-inline">
                  <button
                    type="submit"
                    className="btn btn-success d-none d-sm-inline-block me-2"
                    onClick={() => dispatch(setEditUser())}
                  >
                    Add new
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageWrapper>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              Total {totalRecords} users found
              <div className="col-auto ms-auto d-print-none">
                <Form method="GET">
                  <div className="btn-list">
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <select
                          className="form-select"
                          name="r"
                          id="searchRole"
                          style={{ minWidth: "200px" }}
                          value={form.r}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          {listRoles?.map((i) => {
                            return (
                              <option key={nanoid()} value={i.id}>
                                {i.role}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </span>
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <input
                          type="text"
                          name="s"
                          className="form-control"
                          placeholder="Search by name..."
                          value={form.s}
                          onChange={handleChange}
                        />
                      </div>
                    </span>
                    <span className="d-none d-sm-inline">
                      <button
                        type="submit"
                        className="btn btn-primary d-none d-sm-inline-block me-2"
                      >
                        <IoIosSearch className="fs-3" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-default d-none d-sm-inline-block"
                        onClick={resetSearch}
                      >
                        <IoReloadSharp className="fs-3" />
                      </button>
                    </span>
                  </div>
                </Form>
              </div>
            </div>

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">Role</th>
                      <th className="bg-dark text-white">Name</th>
                      <th className="bg-dark text-white">Email</th>
                      <th className="bg-dark text-white">Mobile</th>
                      <th className="bg-dark text-white">Status</th>
                      <th className="bg-dark text-white">Joined</th>
                      <th className="bg-dark text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={7}>
                          <TableLoader />
                        </td>
                      </tr>
                    ) : listUsers.length > 0 ? (
                      <>
                        {listUsers.map((i, index) => {
                          const isActive = i?.is_active ? (
                            <span className="badge bg-success-lt p-1">
                              Active
                            </span>
                          ) : (
                            <span className="badge bg-danger-lt p-1">
                              Inactive
                            </span>
                          );

                          return (
                            <tr key={nanoid()}>
                              <td>
                                {serialNo(queryParams.get("page")) + index}.
                              </td>
                              <td>
                                <span
                                  key={nanoid()}
                                  className={`badge bg-${switchColor(
                                    i.role_id
                                  )}-lt me-1 my-1 fs-6`}
                                >
                                  {i?.role?.toUpperCase()}
                                </span>
                              </td>
                              <td>{`${i?.first_name?.toUpperCase()} ${i?.last_name?.toUpperCase()}`}</td>
                              <td>{i?.email}</td>
                              <td>{i?.mobile}</td>
                              <td>{isActive}</td>
                              <td>{dateFormatFancy(i.created_at)}</td>
                              <td className="text-nowrap">
                                {i?.is_active ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm me-2"
                                      onClick={() => viewUser(i.uuid)}
                                    >
                                      <MdRemoveRedEye size={14} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-yellow btn-sm me-2"
                                      onClick={() =>
                                        dispatch(setEditUser(i.id))
                                      }
                                    >
                                      <MdModeEdit size={14} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        dispatch(setDeleteUser(i.id))
                                      }
                                    >
                                      <FaRegTrashAlt size={14} />
                                    </button>
                                  </>
                                ) : (
                                  <ActivateUser id={i?.id} />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td colSpan={8} className="text-center">
                            NO DATA FOUND
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <AddEditUser />
        <DeleteUser />

        <PaginationContainer pageCount={totalPages} currentPage={currentPage} />
      </PageWrapper>
    </>
  );
};

export default UserList;
