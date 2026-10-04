import React from 'react';
import storeGraphics from '../../assets/img/store-graphics.svg'
import { Link } from 'react-router-dom';


export default function GroceryShop() {

  return (
    <section className='my-5'>
            <div className="container">
                <div className="row">
                  <div className="col-12">
                      <div className="mb-4 bg-light d-lg-flex justify-content-between align-items-center rounded grocery">
                        <div className="p-5">
                            <h2 className="mb-2 fw-bold fsGrocery">One Stop Grocery Shop</h2>
                            <p className="mb-0 lead groceryp">
                              Shopping for your furry friend? Find food,
                              <br/>
                              treats, and more in one easy spot.
                            </p>
                            
                            <Link to="/products" className="btn btn-dark mt-5 btnGrocery">Get Discount on Share</Link>
                          
                        </div>
                        <div className="p-6 d-lg-block col-md-6 d-none"><img src={storeGraphics} alt="" className="img-fluid"/></div>
                      </div>
                  </div>
                </div>
            </div>
          </section>
  )
}
