import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { decParam } from "../../../utils/functions";
import {
  PageHeader,
  PageWrapper,
  PersonalInfo,
  UserPosts,
  UserReports,
  UserReviews,
  ViewSidebar,
} from "../../../components";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { useDispatch, useSelector } from "react-redux";
import { setViewUser } from "../../../feature/userSlice";

const UserView = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const userUuid = decParam(uuid);
  const [isLoading, setIsLoading] = useState(false);
  const { viewUser } = useSelector((store) => store.users);
  const returnUrl = `/admin/users`;
  const [activeTab, setActiveTab] = useState("personal");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/users/user/${userUuid}`);
      dispatch(setViewUser(response.data.data.rows[0]));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [userUuid]);

  document.title = `Details of ${viewUser?.first_name?.toUpperCase()} ${viewUser?.last_name?.toUpperCase()} | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader
              title={`Details of ${viewUser?.first_name?.toUpperCase()} ${viewUser?.last_name?.toUpperCase()}`}
            />
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <span className="d-none d-sm-inline">
                  <Link
                    className="btn btn-success d-none d-sm-inline-block me-2"
                    to={returnUrl}
                  >
                    Back to list
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageWrapper>
        <div className="card pe-0">
          <div className="row g-0">
            <ViewSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

            <div className="col d-flex flex-column">
              <div className="row">
                <div className="card-body">
                  {activeTab === "personal" && <PersonalInfo />}
                  {activeTab === "posts" && <UserPosts />}
                  {activeTab === "reviews" && <UserReviews />}
                  {activeTab === "reports" && <UserReports />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default UserView;
