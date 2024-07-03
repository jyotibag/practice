import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import customFetch from "../../utils/customFetch";
import { setListCategories } from "../../feature/masters/categorySlice";
import { splitErrors } from "../../utils/showErrors";
import CatNavImg from "../../assets/website/img/others/category.png";
import { MdBikeScooter, MdCategory, MdLaptopChromebook, MdOutlineChair } from "react-icons/md";
import { GiAmpleDress } from "react-icons/gi";
import { FaBook, FaCar, FaMobile } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const CategoryModal = ({ show, handleClose }) => {
  const { listCategories } = useSelector((store) => store.categories);
  // console.log(listCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await customFetch.get(`/website/all-categories`);
      
      dispatch(setListCategories(response?.data?.data?.rows));
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const handleModalClose = (parent, child) => {
    let navigateUrl ='';
    if(!child){
      let pSlug = ''
      
      let sitem = listCategories.map((item)=>{
       if(item.id === parent){
        pSlug = item.slug
       }
        
      })
       navigateUrl = `/${pSlug}`
    }else{
      
       let pSlug = ''
      let cSlug = ''
      let sitem = listCategories.map((item)=>{
       if(item.id === parent){
        pSlug = item.slug
       }
       
        if (item?.sub_cat?.find((i)=> +i.id === +child)?.slug){
          cSlug = item?.sub_cat?.find((i)=> +i.id === +child)?.slug
        }
      })
       navigateUrl = `/${pSlug}/${cSlug}`
    }
    
    handleClose()
    navigate(navigateUrl)
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <Modal show={show} size="xl" onHide={handleClose}>
      <div className="modal-content">
        <div className="modal-header px-5 py-4 d-flex justify-content-between items-placeholder border-bottom">
          <div>
            <h3 className="text-dark-300 fw-bold text-24">All Categories</h3>
          </div>
          <div>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#FF3838" />
                <path
                  d="M22.2188 9.77759L8.88614 23.1109"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M22.2188 23.1099L8.88614 9.77654"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="modal-body px-5 py-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                
                  {listCategories
                    .map((parentCategory) => (
                      
                      <div className="col-lg-4 mb-4" key={parentCategory.id} id={parentCategory.id}>
                        <h4 className="text-18 fw-semibold text-dark-300 mb-2">
                          {parentCategory.slug=='bikes' ?<MdBikeScooter />  : parentCategory.slug =='electronics-appliances'? <MdLaptopChromebook /> :
                          parentCategory.slug =='furniture'? <MdOutlineChair /> :
                          parentCategory.slug =='fashion'? <GiAmpleDress /> :
                          parentCategory.slug =='books-sports-hobbies'? <FaBook /> :
                          parentCategory.slug =='car'? <FaCar /> :
                          parentCategory.slug =='mobiles'? <FaMobile /> :
                          <MdCategory />}
                          <button type="button" className="btn btn-default btn-sm" onClick={() => handleModalClose(parentCategory.id)}>{parentCategory.category}</button>
                         
                        </h4>
                        <nav className="category-nav">
                          <ul>
                            {parentCategory.sub_cat
                                .map((subcategory) => (
                                 
                                  <li key={subcategory.id}>
                                    <button type="button" className="btn btn-default btn-sm" onClick={() => handleModalClose(parentCategory.id, subcategory.id)}>{subcategory.category}</button>
                                    
                                  </li>
                                  
                                ))}
                              
                              
                          </ul>
                        </nav>
                      </div>
                    ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
