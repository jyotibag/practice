import React from 'react'
import { useSelector } from 'react-redux';

const CategoryHero = ({catSlug}) => {
    const { listCategories } = useSelector((store) => store.categories);
    
    let parentCategory = ''
    let subcategory = ''
    let sitem = listCategories.map((item)=>{
    if(item.slug === catSlug.catname){
        parentCategory = item.category
    }
    
    if (item?.sub_cat?.find((i)=> i.slug === catSlug.subcat)?.category){
        subcategory = item?.sub_cat?.find((i)=> i.slug === catSlug.subcat)?.category
    }
    })
   

  return (
    <>
      <section
        className="w-breadcrumb-area"
        style={{backgroundColor : 'red'}} >
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div
                className="position-relative z-2"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                <h2 className="section-title-light mb-2">{parentCategory}</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb w-breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">
                    {subcategory}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoryHero
