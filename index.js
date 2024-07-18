const express = require('express')
const app= express()
const port=3000
const bodyParser=require('body-parser')
const db = require("./connection.js")
const response = require("./response.js")

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    const sql="SELECT * FROM mahasiswa"
    db.query(sql,(error,result)=>{
        //hasil data 
        response(200,"API V1 READY TO GO ..","SUCCES",res)
    })
    
})

app.get("/mahasiswa",(req,res)=>{
    const sql="SELECT * FROM mahasiswa"
    db.query(sql,(error,result)=>{
        if (error) throw error
        response(200,result,"Get all data from mahasiswa",res)
    })
})

app.get("/mahasiswa/:nim",(req,res)=>{
    const nim= req.params.nim
    const sql=`SELECT * FROM mahasiswa  WHERE nim=${nim}`
    db.query(sql,(error,result)=>{
       
        response(200,result,"Get data from specific nim",res) 
    })
})

app.post("/mahasiswa",(req,res)=>{
    const {nama,nim,kelas,alamat} = req.body
    const sql= `INSERT into mahasiswa (nama,nim,kelas,alamat) VALUES ('${nama}','${nim}','${kelas}','${alamat}')`
    db.query(sql,(error,result)=>{
        if (error) response(500,"invalid","Error",res)
        if (result?.affectedRows==1) {
            console.log("data masuk")
            const data ={
                "isSucces": result.affectedRows,
                "id": result.insertId
            }
            response(200,data,"Data added succesfully",res) 
        }
        else{
            console.log("data tidak masuk")
        }
        console.log(result)
    })
})

app.post('/login',(req,res)=>{
    console.log({requestFromOutside: req.body})
    res.send("Login Berhasil")
})

app.put('/mahasiswa',(req,res)=>{
   const {nama,nim,kelas,alamat}= req.body
   const sql = `UPDATE mahasiswa SET nama ='${nama}',kelas ='${kelas}',alamat='${alamat}' WHERE nim= ${nim}`
   db.query(sql,(error,result)=>{
    if (error) response(500,"invalid","error",res)
    if (result?.affectedRows){
        const data ={
            "isSucces": result.affectedRows,
            "messege": result.message
            
        }
            response(200,data,"Data updated",res)
    }else{
        response(404,"User Not Found","error",res)
    }
   
   })
})

app.delete('/mahasiswa',(req,res)=>{
    const {nim}= req.body
    const sql= `DELETE FROM mahasiswa where nim = ${nim}`
    db.query(sql,(error,result)=>{
        if (error) response(500,"invalid","error",res)
        if (result?.affectedRows){
            const data ={
                "isDeleted": result.affectedRows,
                
            }
            response(200,data,"Data deleted ",res)
        }else{
            response(404,"User Not Found","error",res)
        }
        
    })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
})