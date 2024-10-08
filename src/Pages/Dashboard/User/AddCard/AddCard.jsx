import { useState } from "react";
import useAddCards from "../../../../Components/Hooks/useAddCards";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import { MdDelete, MdLocationPin, MdOutlineHomeWork } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


const AddCard = () => {
     const [cards, refetch, loading] = useAddCards()
     const [value, setValue] = useState()
      
     const axiosPublic = useAxiosPublic()
     console.log(value);
 
     const handleSearch = (e) => {
          e.preventDefault()
          setValue(e.target.search.value)
     }

     const newProperties = value ? (cards.filter(p => p.title === value)) : cards;
     const handleDelete = async (id) => {
          try {
               Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
               }).then((result) => {
                    if (result.isConfirmed) {
                         axiosPublic.delete(`/addCard/${id}`)
                              .then(res => {
                                   if (res.data.deletedCount > 0) {
                                        refetch()
                                        Swal.fire({
                                             title: "Deleted!",
                                             text: "Your file has been deleted.",
                                             icon: "success"
                                        });
                                   }

                              })

                    }
               });
          }
          catch (error) {
               console.log(error);
               Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again.",
               });
          }
     }
     if (loading) {
          return <div className="flex flex-row justify-center space-x-4">
               <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-cyan-500 border-t-transparent"></div>

               <div className="w-12 h-12 rounded-full animate-spin border-2 border-dashed border-indigo-500 border-t-transparent"></div>

               <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-pink-500 border-t-transparent"></div>

               <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent">
               </div>
          </div>;
     }
     return (
          <div className='lg:ml-8  text-gray-200'>
               <div className='mb-9'>
                    <h1 className='text-4xl text-[#703bf7] font-bold text-center'> Added Properties  </h1>
               </div>
               <div className='mb-4 flex flex-col lg:flex-row lg:justify-evenly gap-3 lg:gap-0 lg:items-center '>
                    <div className='flex-1'>
                         <div className=" flex  w-full ">
                              <div>
                                   <form className="flex relative rounded-md w-full  max-w-xl" onSubmit={handleSearch} action="">
                                        <input
                                             type="text"
                                             name="search"
                                             id="query"
                                             placeholder="search title"
                                             className="w-full p-3 rounded-l-md border-2 border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:border-none"
                                        />
                                        <button className="inline-flex items-center gap-2 bg-violet-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
                                             <span>Search</span>
                                             <span className="hidden md:block">
                                                  <svg
                                                       className="text-gray-200 h-5 w-5 p-0 fill-current"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       viewBox="0 0 56.966 56.966"
                                                       width="512px"
                                                       height="512px"
                                                  >
                                                       <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                  </svg>
                                             </span>
                                        </button>

                                   </form>
                              </div>
                         </div>

                    </div>
                 
               </div>
               <div className='grid grid-cols-1 lg:grid-cols-3 gap-1'>
                    {newProperties.length > 0 ? newProperties?.map(property => <div key={property._id}>
                        
                         <div className='   border-4 border-base-100'>
                              <img src={property.image} alt={property.title} className='w-full shadow-lg  transition-all duration-100 hover:scale-110  p-5 h-64 object-cover' />
                              <div className='p-4'>
                                   <h3 className='text-2xl font-bold'>{property.title}  </h3>
                                   <p className='text-[12px] flex items-center gap-2  p-1 mt-2 mb-2 bg-[#141414]'> <MdLocationPin className='text-xl text-yellow-600'></MdLocationPin>  {property.location} </p>
                                   <h1> {property.description.slice(0, 70)}... </h1>


                                   <div className=" flex lg:flex-row flex-col gap-1 mt-4 mb-4 ">

                                        <p className="btn rounded-3xl"> <FaBed className="text-xl"></FaBed> {property.bedrooms} -Beds  </p>
                                        <p className="btn rounded-3xl"> <FaBath className="text-lg"></FaBath> {property.bathrooms} -Bathrooms  </p>
                                        <p className="btn rounded-3xl"> <MdOutlineHomeWork className="text-xl"></MdOutlineHomeWork> villa </p>


                                   </div>


                                   <div className="flex justify-between">
                                        <div>
                                             <p> Price </p>
                                             <p className='text-gray-100 text-lg'>${property.price.toLocaleString()}</p>
                                        </div>

                                        <NavLink to={`/propertyDetails/${property.id}`}><button className='btn  mt-2 text-white bg-[#703bf7] btn-primary'>View Details</button> </NavLink>
                                   </div>
                                   <div className='flex justify-around mt-4'>
                                        <button onClick={() => handleDelete(property._id)} className='btn  text-white'> <MdDelete className='text-red-700 text-xl'></MdDelete> delete </button>
                                        <NavLink to={`/dashboard/payment/${property._id}`}><button className="btn btn-error text-white animate-bounce"> Buy Now </button></NavLink>
                                        
                                   </div>
                              </div>
                         </div>
                    </div>) : <div className="lg:ml-6  lg:col-span-4 ">
                         <section className="  px-5 bg-white  dark:bg-[#191919]">
                              <div className="">
                                   <div className=" text-center">
                                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 uppercase">
                                             DATA Not found
                                        </h1>
                                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                             Something's missing.
                                        </p>
                                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                             Sorry, we can't find that Data. You'll find lots to explore on the page.
                                        </p>
                                        <a href='/dashboard/addCard'

                                             className="inline-flex btn btn-info text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                                        >
                                             Back to page
                                        </a>
                                   </div>
                              </div>
                         </section>
                    </div>}
               </div>
          </div>
     );
};

export default AddCard;