import React, { useEffect, useState } from "react";
import {
  ActivateUser,
  BrandModelAddEdit,
  BrandModelDelete,
  PageHeader,
  PageWrapper,
  PaginationContainer,
  TableLoader,
} from "../../../components";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { serialNo } from "../../../utils/functions";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import customFetch from "../../../utils/customFetch";
import {
  setDeleteBrandModel,
  setEditBrandModel,
  setListBrandModels,
} from "../../../feature/masters/brandModelSlice";
import { setTotal } from "../../../feature/commonSlice";
import { splitErrors } from "../../../utils/showErrors";
import { getBrands, unsetCatBrands } from "../../../feature/masters/brandSlice";

const BrandModels = () => {
  document.title = `List of All Make Models | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { changeCount, totalRecords, totalPages, currentPage } = useSelector(
    (store) => store.common
  );
  const { allCategories } = useSelector((store) => store.categories);
  const { catBrands } = useSelector((store) => store.brands);
  const { listBrandModels } = useSelector((store) => store.models);

  const [form, setForm] = useState({
    c: queryParams.get("c") || "",
    b: queryParams.get("b") || "",
    s: queryParams.get("s") || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCatChange = (catid) => {
    setForm({ ...form, c: catid });
    dispatch(getBrands(Number(catid)));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/masters/models`, {
        params: {
          page: queryParams.get("page") || "",
          catid: queryParams.get("c") || "",
          brid: queryParams.get("b") || "",
          search: queryParams.get("s") || "",
        },
      });
      const data = {
        totalRecords: response?.data?.meta?.totalRecords,
        totalPages: response?.data?.meta?.totalPages,
        currentPage: response?.data?.meta?.currentPage,
      };

      dispatch(setListBrandModels(response?.data?.data?.rows));
      dispatch(setTotal(data));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const resetSearch = () => {
    setForm({ ...form, c: "", b: "", s: "" });
    dispatch(unsetCatBrands());
    navigate(returnUrl);
  };

  const returnUrl = `/admin/masters/models`;
  const postTitle = `Total ${totalRecords} categories found`;

  useEffect(() => {
    fetchData();

    if (queryParams.get("c")) {
      dispatch(getBrands(Number(queryParams.get("c"))));
    }
  }, [
    queryParams.get("page"),
    queryParams.get("c"),
    queryParams.get("b"),
    queryParams.get("s"),
    changeCount,
  ]);

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader
              title={`List of All Make Models`}
              postTitle={postTitle}
            />
          </div>
        </div>
      </div>
      <PageWrapper>
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <div className="col-auto ms-auto d-print-none">
                <Form method="GET">
                  <div className="btn-list">
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <select
                          className="form-select"
                          name="c"
                          value={form.c}
                          onChange={(e) => handleCatChange(e.target.value)}
                        >
                          <option value="">Select</option>
                          {allCategories?.map((i) => {
                            if (i.has_brand) {
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
                      <div className="input-icon">
                        <select
                          className="form-select"
                          name="b"
                          value={form.b}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          {catBrands?.map((i) => {
                            return (
                              <option key={nanoid()} value={i.id}>
                                {i.brand}
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
                      <th className="bg-dark text-white">Category</th>
                      <th className="bg-dark text-white">Brand</th>
                      <th className="bg-dark text-white">Model</th>
                      <th className="bg-dark text-white">Status</th>
                      <th className="bg-dark text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6}>
                          <TableLoader />
                        </td>
                      </tr>
                    ) : listBrandModels.length > 0 ? (
                      <>
                        {listBrandModels.map((i, index) => {
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
                              <td>{i?.category?.toUpperCase()}</td>
                              <td>{i?.brand?.toUpperCase()}</td>
                              <td>{i?.model_name?.toUpperCase()}</td>
                              <td>{isActive}</td>
                              <td className="text-nowrap">
                                {i?.is_active ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-yellow btn-sm me-2"
                                      onClick={() =>
                                        dispatch(setEditBrandModel(i.id))
                                      }
                                    >
                                      <MdModeEdit size={14} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        dispatch(setDeleteBrandModel(i.id))
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
        <BrandModelAddEdit />
        <BrandModelDelete />

        <PaginationContainer
          colSpan={`col-8`}
          pageCount={totalPages}
          currentPage={currentPage}
        />
      </PageWrapper>
    </>
  );
};

export default BrandModels;
