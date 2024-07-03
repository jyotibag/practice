import React from "react";

const ViewSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="col-3 d-none d-md-block border-end">
      <div className="card-body">
        <div className="list-group list-group-transparent">
          <button
            type="button"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              activeTab === "personal" ? "active" : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              activeTab === "posts" ? "active" : ""
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              activeTab === "reports" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSidebar;
