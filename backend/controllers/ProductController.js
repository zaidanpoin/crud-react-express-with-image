

import Product from '../models/ProductModels.js'
import fs from 'fs'
import path from 'path'


export const getProducts = async (req, res) => {
    try{
        const products = await Product.findAll()
        res.status(200).json(products)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }
       
}
export const getProductsById = async (req, res) => {
  const id =   req.params.id
    try{
        const products = await Product.findOne({where: {id: id}})
        res.status(200).json(products)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }
       
}




export const saveProducts = async (req, res) => {
    // Cek apakah ada file yang diupload
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
 

    const name = req.body.title;
    const file = req.files.image;
 
   
// Mengakses file yang diupload
    const fileSize = file.data.length; // Menggunakan file.size untuk mendapatkan ukuran file
    const ext = path.extname(file.name); // Mengambil ekstensi file
   // Menggunakan template literal untuk nama file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${file.md5}-${uniqueSuffix}${ext}`;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg','.webp'];

    // Validasi tipe file
    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: 'Invalid image type' });
    }

    // Validasi ukuran file
    if (fileSize > 5000000) {
        return res.status(422).json({ msg: 'File size too large' });
    }

    // Pindahkan file ke folder yang diinginkan
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }

        try {
            // Simpan informasi produk ke database
            const product = await Product.create({
                name,
                image: fileName,
                url
            });
            res.status(201).json({ msg: 'Product created', product });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    });
};

export const updateProduct = async (req, res) => {

 

    const id = req.params.id
    const product = await Product.findOne({where: {id: id}})
    if(!product){
        return res.status(404).json({message: 'Product not found'})
    }


    let fileName = ''

     if(req.files == null){
       fileName = product.image
        
    }else{

        const file = req.files.image
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        fileName = `${file.md5}-${uniqueSuffix}${ext}`
       
        const allowedTypes = ['.png', '.jpg', '.jpeg']

        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: 'Invalid image type' });
        }
    
        // Validasi ukuran file
        if (fileSize > 5000000) {
            return res.status(422).json({ msg: 'File size too large' });
        }
        console.log(product.image)

        fs.unlinkSync(`./public/images/${product.image}`)
        
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
        })

    }
 
    const name = req.body.title
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`

    try{
        await product.update({name: name, image: fileName, url: url})
        res.status(200).json({message: 'Product updated', product})
    }catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }


}

export const deleteProducts = async (req, res) => {
    try{
        const id = req.params.id
        const product = await Product.findOne({where: {id: id}})

        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }

        try{
            const filePath = `./public/images/${product.image}`
            fs.unlinkSync(filePath)
            await product.destroy({where: {id: id}})
        }catch(err){

        }

        res.status(200).json({message: 'Product deleted'})

    }catch(error){
        console.log(error.message)
        res.status(500).json({error: error})
    }

}