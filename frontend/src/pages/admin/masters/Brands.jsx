import React, { useEffect, useState } from "react";
import {
  ActivateUser,
  BrandAddEdit,
  BrandDelete,
  PageHeader,
  PageWrapper,
  PaginationContainer,
  TableLoader,
} from "../../../components";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { serialNo } from "../../../utils/functions";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import customFetch from "../../../utils/customFetch";
import {
  setDeleteBrand,
  setEditBrand,
  setListBrand,
} from "../../../feature/masters/brandSlice";
import { setTotal } from "../../../feature/commonSlice";

const Brands = () => {
  document.title = `List of All Brands | ${import.meta.env.VITE_APP_TITLE}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const { listBrands } = useSelector((store) => store.brands);
  const { allCategories } = useSelector((store) => store.categories);
  const { changeCount, totalRecords, totalPages, currentPage } = useSelector(
    (store) => store.common
  );

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    p: queryParams.get("p") || "",
    s: queryParams.get("s") || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/masters/brands`, {
        params: {
          page: queryParams.get("page") || "",
          search: queryParams.get("s") || "",
          parent: queryParams.get("p") || "",
        },
      });

      const data = {
        totalRecords: response?.data?.meta?.totalRecords,
        totalPages: response?.data?.meta?.totalPages,
        currentPage: response?.data?.meta?.currentPage,
      };

      dispatch(setListBrand(response?.data?.data?.rows));
      dispatch(setTotal(data));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const returnUrl = `/admin/masters/brands`;
  const postTitle = `Total ${totalRecords} brands found`;

  useEffect(() => {
    fetchData();
  }, [
    queryParams.get("page"),
    queryParams.get("s"),
    queryParams.get("p"),
    changeCount,
  ]);

  const resetSearch = () => {
    setForm({ ...form, p: "", s: "" });
    navigate(returnUrl);
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader title={`List of All Brands`} postTitle={postTitle} />
          </div>
        </div>
      </div>
      <PageWrapper>
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              {/* Total {totalRecords} categories found */}
              <div className="col-auto ms-auto d-print-none">
                <Form method="GET">
                  <div className="btn-list">
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <select
                          className="form-select"
                          name="p"
                          id="searchParent"
                          value={form.p}
                          onChange={handleChange}
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
                    ) : listBrands.length > 0 ? (
                      <>
                        {listBrands.map((i, index) => {
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
                              <td>{isActive}</td>
                              <td className="text-nowrap">
                                {i?.is_active ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-yellow btn-sm me-2"
                                      onClick={() =>
                                        dispatch(setEditBrand(i.id))
                                      }
                                    >
                                      <MdModeEdit size={14} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        dispatch(setDeleteBrand(i.id))
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
        <BrandAddEdit />
        <BrandDelete />

        <PaginationContainer
          colSpan={`col-8`}
          pageCount={totalPages}
          currentPage={currentPage}
        />
      </PageWrapper>
    </>
  );
};

export default Brands;
