import React from 'react'
import { useSelector } from 'react-redux';

const ProductCard = ({catCard}) => {
    const { listCategories } = useSelector((store) => store.categories);
    
    // let parentCategory = ''
    // let subcategory = ''
    // let sitem = listCategories.map((item)=>{
    // if(item.slug === catSlug.catname){
    //     parentCategory = item.category
    // }
    
    // if (item?.sub_cat?.find((i)=> i.slug === catSlug.subcat)?.category){
    //     subcategory = item?.sub_cat?.find((i)=> i.slug === catSlug.subcat)?.category
    // }
    // })

  return (
    <>
    <section>
       <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active"
              id="nav-grid"
              role="tabpanel"
              aria-labelledby="nav-grid-tab"
              tabindex="0">
              <div className="row row-cols-1 row-cols-xl-5 row-cols-lg-3 row-cols-md-2">
                {listCategories.map((parentCategory) =>(
                    
                        <article className="col mb-4">
                            <div className="service-card bg-white">
                                <div className="position-relative">
                                    <img
                                        src="assets/img/services/1.png"
                                        className="recently-view-card-img w-100"
                                        alt=""
                                    />
                                    <button className="service-card-wishlist-btn">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        >
                                        <circle cx="16" cy="16" r="16" fill="white" />
                                        <path
                                            d="M16.68 9.51314L16 10.2438L15.3199 9.51315C13.442 7.49562 10.3974 7.49562 8.5195 9.51314C6.64161 11.5307 6.64161 14.8017 8.5195 16.8192L14.6399 23.3947C15.391 24.2018 16.6089 24.2018 17.3601 23.3947L23.4804 16.8192C25.3583 14.8017 25.3583 11.5307 23.4804 9.51314C21.6026 7.49562 18.5579 7.49562 16.68 9.51314Z"
                                            stroke="currentColor"
                                            stroke-linejoin="round"
                                        />
                                        </svg>
                                    </button>
                                </div>
                                <div className="service-card-content">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                        <h3 className="service-card-price fw-bold">$15</h3>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="15"
                                                viewBox="0 0 16 15"
                                                fill="none"
                                            >
                                                <path
                                                d="M16 5.95909C15.8855 6.07153 15.7709 6.21207 15.6564 6.32451C14.4537 7.36454 13.2511 8.37646 12.0484 9.38838C11.9339 9.47271 11.9053 9.55704 11.9625 9.69758C12.3348 11.2717 12.707 12.8739 13.0793 14.448C13.1365 14.6448 13.1079 14.8134 12.9361 14.9258C12.7643 15.0383 12.5925 15.0102 12.4207 14.9258C10.989 14.0826 9.58587 13.2393 8.15415 12.396C8.03961 12.3117 7.9537 12.3117 7.83917 12.396C6.43607 13.2393 5.00435 14.0826 3.60126 14.8977C3.48672 14.9821 3.34355 15.0102 3.20038 14.9821C2.9713 14.9258 2.85676 14.701 2.91403 14.448C3.14311 13.5204 3.34355 12.5928 3.57262 11.6652C3.74443 10.9906 3.8876 10.316 4.05941 9.64136C4.08805 9.52893 4.05941 9.47271 3.97351 9.38838C2.74222 8.34835 1.53957 7.30832 0.308291 6.26829C0.251022 6.21207 0.193753 6.18396 0.165118 6.12775C0.0219457 6.01531 -0.0353233 5.87477 0.0219457 5.678C0.0792147 5.50935 0.222387 5.42502 0.394194 5.39691C0.651905 5.36881 0.909615 5.3407 1.19596 5.3407C2.36998 5.22826 3.54399 5.14393 4.74664 5.0315C4.97572 5.00339 5.20479 4.97528 5.43387 4.97528C5.54841 4.97528 5.60567 4.91906 5.63431 4.83474C6.2929 3.31685 6.92286 1.82708 7.58146 0.309198C7.66736 0.140545 7.75326 0.0281089 7.9537 0C8.18278 0.0562179 8.32595 0.140545 8.41186 0.365416C8.75547 1.15247 9.09908 1.96762 9.4427 2.75467C9.75768 3.4574 10.044 4.18823 10.359 4.89095C10.3876 4.97528 10.4449 5.0315 10.5594 5.0315C11.4757 5.11583 12.3921 5.17204 13.337 5.25637C14.0815 5.31259 14.8546 5.39691 15.5991 5.45313C15.7996 5.48124 15.9141 5.59368 16 5.76233C16 5.81855 16 5.90288 16 5.95909Z"
                                                fill="currentColor"
                                                />
                                            </svg>
                                        <span className="service-card-rating">4.8 (2k)</span>
                                        </div>
                                    </div>
                                    <h3 className="service-card-title fw-semibold">
                                        {catCard.subcat}
                                    </h3>
                                    <div className="d-flex align-items-center service-card-author">
                                    <img src={`assets/img/avatar/u-sm-1.png`} className="service-card-author-img" alt={import.meta.env.VITE_APP_TITLE}/>
                                        <a href="#" className="service-card-author-name">{catCard.catname}</a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    
                )
                )}
              </div> 
            </div>
        </div>
    </section>
    </>
  )
}

export default ProductCard
