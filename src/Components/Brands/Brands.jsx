import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../Brands/Brands.module.css'

export default function Brands() {
  const [bands, setBrands] = useState([])

  async function getBrands() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      setBrands(res)
    } catch (error) {
    }
  }
  useEffect(() => {
    getBrands()
  }, [])
  
  return (
    <section className='mt-5'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-5'>
        {bands.data?.data?.map((el) =>
          <div key={el._id}   className={` col`}>
            <div className={`${styles.brandsBox}  h-100  p-1`}>
              <img className='w-100 h-100' src={el.image} alt={el.name} />
            </div>
              <h4 className='fw-bolder text-main text-center my-2'>{el.name}</h4>
          </div>
        )}
      </div>
    </section>)
}
