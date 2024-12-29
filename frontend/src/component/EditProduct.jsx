import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'




const EditProduct = () => {

    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')
    const [preview, setPreview] = useState('')
    const { id } = useParams()

    const navigate = useNavigate()


    useEffect(() => {
        getProductById()
    }, [])

    const getProductById = async () => {

        const response = await axios.get(`http://localhost:3000/products/${id}`)

        setTitle(response.data.name)
        setFile(response.data.image)
        setPreview(response.data.url)

    }



    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
        console.log(preview)

    }

    const updateProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('image', file)

        try {
            const response = await axios.patch(`http://localhost:3000/product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate("/")
        } catch (err) {
            console.log(err)


        }



    }

    return (
        <div className='w-4/6 mx-auto mt-12'>

            <form onSubmit={updateProduct}>

                <div class="mb-6">
                    <label for="large-input" className="block mb-2 text-xl font-medium text-gray-900 ">Product Name</label>

                    <input className="h-19 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="title" name='title' value={title} onChange={(e) => setTitle(e.target.value)} ></input>


                </div>

                <div class="mb-6">
                    <label for="large-input" className="block mb-2 text-xl font-medium text-gray-900 ">Image</label>
                    <input
                        className='file-input'
                        type='file'
                        onChange={loadImage}
                        name="image"


                    />


                </div>

                {preview ? (
                    <div className="mb-6">
                        <figure className='h-70 w-64'>
                            <img src={preview} alt='preview' className='h-full w-full object-cover' />
                        </figure>
                    </div>
                ) : ("")}

                <div class="mb-6 gap-2 flex">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 w-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  >save</button>

                    <a href='/' className="bg-red-500 hover:bg-red-700 w-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>cancel</a>

                </div>

            </form>
        </div>
    )
}

export default EditProduct
