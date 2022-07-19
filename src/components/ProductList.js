import React,{useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


const Productlist = () => {
    //membuat state baru products
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        getProducts();
    },[]);

    //membuat function yang ambil data dari backend
    const getProducts = async()=>{
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }

    const deleteProduct = async(productId) =>{
      try {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        getProducts();
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success">Add New</Link> 
        <br></br>
        <div className="columns is-multiline">
            {products.map((product)=>(
                 <div className="column is-one-quarter" key={product.id}>
                   <div class="card">
                              <div class="card-image">
                                <figure className="image is-4by3">
                                  <img 
                                  src={product.url}
                                   alt="Image"
                                   />
                                </figure>
                              </div>
                              <div class="card-content">
                                <div class="media">
                                  <div class="media-content">
                                    <p class="title is-4">{product.name}</p>
                                  </div>
                                </div>
                              </div>
            
                            <footer className='card-footer'>
                                <Link to={`edit/${product.id}`} className='card-footer-item'>Edit</Link>
                                <a onClick={()=> deleteProduct(product.id)} className='card-footer-item'>Delete</a>
                            </footer>
                            </div>
                        </div>
            ))}

        </div>
    </div>
  )
}

export default Productlist