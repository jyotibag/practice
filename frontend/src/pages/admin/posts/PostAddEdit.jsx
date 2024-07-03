import React, { useState } from "react";
import {
  PageHeader,
  PageWrapper,
  PostRadio,
  PostText,
} from "../../../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
  getChildCategory,
  getFormFields,
} from "../../../feature/masters/categorySlice";

const PostAddEdit = () => {
  document.title = `Add New Post | ${import.meta.env.VITE_APP_TITLE}`;
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { allCategories, childCategories, formFields } = useSelector(
    (store) => store.categories
  );

  const parents = allCategories?.filter((i) => !i.parent_id);

  const onCategoryChange = (value) => {
    setSelectedCategory(value);
    dispatch(getChildCategory(Number(value)));
  };

  const onSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
    dispatch(getFormFields(+value));
  };
  console.log(formFields);

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader title={`Add new post`} />
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <span className="d-none d-sm-inline">
                  <Link
                    className="btn btn-success d-none d-sm-inline-block me-2"
                    to={`../`}
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
        <div className="card">
          <div className="card-body">
            <div className="row row-cards">
              <div className="col-md-6">
                <label className="form-label required" htmlFor="category">
                  Select category
                </label>
                <select
                  className="form-select"
                  name="category"
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                >
                  <option value="">Select</option>
                  {parents?.map((i) => {
                    return (
                      <option key={nanoid()} value={i.id}>
                        {i.category}
                      </option>
                    );
                  })}
                </select>
              </div>

              {childCategories.length > +0 && (
                <div className="col-md-6">
                  <label className="form-label required" htmlFor="subCategory">
                    Select sub-category
                  </label>
                  <select
                    className="form-select"
                    name="subCategory"
                    id="subCategory"
                    value={selectedSubCategory}
                    onChange={(e) => onSubCategoryChange(e.target.value)}
                  >
                    <option value="">Select</option>
                    {childCategories?.map((i) => {
                      return (
                        <option key={nanoid()} value={i.id}>
                          {i.category}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>

            <div className="row row-cards">
              <div className="col-md-6">
                <label className="form-label required" htmlFor="category">
                  Enter a fitting title for your post
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label required" htmlFor="category">
                  A brief description would help the buyer
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {formFields?.map((i) => {
              return (
                <div className="row row-cards" key={nanoid()}>
                  <div className="col-md-6">
                    <label
                      className={`form-label ${
                        i.is_required ? "required" : ""
                      }`}
                      htmlFor="category"
                    >
                      {i.field_label}
                    </label>
                    {(i.field_type === "text" || i.field_type === "number") && (
                      <PostText name={i.field_name} type={i.field_type} />
                    )}

                    {i.field_type === "radio" && (
                      <PostRadio name={i.field_name} options={i.options} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default PostAddEdit;
