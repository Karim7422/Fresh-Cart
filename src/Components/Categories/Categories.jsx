import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../Categories/Categories.module.css'

export default function Categories() {
  const [categories, setCategories] = useState([])

  async function getCategories() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      setCategories(res)
    } catch (error) {

    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  
  return (
    <section className='mt-5'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5'>
        {categories.data?.data?.map((el) =>
          <div key={el._id} style={{ maxHeight: "400px" }}  className="col">
            <div className={`${styles.categoriesBox}  h-100  p-1`}>
              <img className='w-100 h-100' src={el.image} alt={el.name} />
            </div>
              <h4 className='fw-bolder text-main text-center my-2'>{el.name}</h4>
          </div>
        )}
      </div>
    </section>)
}
