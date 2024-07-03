import React, { useEffect, useState } from "react";
import {
  ActivateUser,
  FieldAddEdit,
  FieldDelete,
  PageHeader,
  PageWrapper,
  PaginationContainer,
  TableLoader,
} from "../../../components";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { nanoid } from "nanoid";
import { MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  setEditFormField,
  setListFormFields,
} from "../../../feature/formFields/formFieldSlice";
import customFetch from "../../../utils/customFetch";
import { splitErrors } from "../../../utils/showErrors";
import { setTotal } from "../../../feature/commonSlice";
import { serialNo, switchColor, switchColorF } from "../../../utils/functions";

const FormFields = () => {
  document.title = `List of All Form Fields | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ p: queryParams.get("p") || "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { allCategories } = useSelector((store) => store.categories);
  const { listFormFields } = useSelector((store) => store.formFields);
  const { totalPages, totalRecords, currentPage, changeCount } = useSelector(
    (store) => store.common
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/masters/formFields`, {
        params: {
          page: queryParams.get("page") || "",
          parent: queryParams.get("p") || "",
        },
      });

      const data = {
        totalRecords: response?.data?.meta?.totalRecords,
        totalPages: response?.data?.meta?.totalPages,
        currentPage: response?.data?.meta?.currentPage,
      };

      dispatch(setListFormFields(response?.data?.data?.rows));
      dispatch(setTotal(data));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const returnUrl = `/admin/masters/form-fields`;
  const postTitle = `Note: You do not need to add fields which are already available under "Master" menu e.g. Brands, Models etc.`;

  const resetSearch = () => {
    setForm({ ...form, p: "" });
    navigate(returnUrl);
  };

  useEffect(() => {
    fetchData();
  }, [queryParams.get("page"), queryParams.get("p"), changeCount]);

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader
              title={`List of All Form Fields`}
              postTitle={postTitle}
            />
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <span className="d-none d-sm-inline">
                  <button
                    type="submit"
                    className="btn btn-success d-none d-sm-inline-block me-2"
                    onClick={() => dispatch(setEditFormField())}
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
              <div className="col-auto ms-auto d-print-none">
                <Form method="GET">
                  <div className="btn-list">
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <select
                          className="form-select"
                          name="p"
                          id="searchRole"
                          style={{ minWidth: "200px" }}
                          value={form.p}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          {allCategories?.map((i) => {
                            if (i.parent_id) {
                              return (
                                <option key={nanoid()} value={i.id}>
                                  {i.category}
                                </option>
                              );
                            }
                          })}
                        </select>
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
                      <th className="bg-dark text-white">Category</th>
                      <th className="bg-dark text-white">Field Label</th>
                      <th className="bg-dark text-white">Field Type</th>
                      <th className="bg-dark text-white">Required?</th>
                      <th className="bg-dark text-white">Options</th>
                      <th className="bg-dark text-white">Status</th>
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
                    ) : listFormFields.length > 0 ? (
                      <>
                        {listFormFields.map((i, index) => {
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
                                  {i?.category?.toUpperCase()}
                                </span>
                              </td>
                              <td>{i?.field_label?.toUpperCase()}</td>
                              <td>
                                <span
                                  key={nanoid()}
                                  className={`badge bg-${switchColorF(
                                    i.field_type
                                  )}-lt me-1 my-1 fs-6`}
                                >
                                  {i?.field_type?.toUpperCase()}
                                </span>
                              </td>
                              <td>{i?.is_required ? `YES` : `NO`}</td>
                              <td>NA</td>
                              <td>{isActive}</td>
                              <td className="text-nowrap">
                                {i?.is_active ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <MdRemoveRedEye size={14} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-yellow btn-sm me-2"
                                      onClick={() =>
                                        dispatch(setEditFormField(i.id))
                                      }
                                    >
                                      <MdModeEdit size={14} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
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
        <FieldAddEdit />
        <FieldDelete />

        <PaginationContainer pageCount={totalPages} currentPage={currentPage} />
      </PageWrapper>
    </>
  );
};

export default FormFields;
