const express =require('express')


const dotenv=require('dotenv');
const connectDB=require('./config/db')
const {notFound,errorHandler}=require('./middlewares/errorMiddleware');
const userRoutes=require('./routes/userRouter')
const adminRoutes=require('./routes/adminRouter')



const app=express();
dotenv.config()

connectDB();
app.use(express.json())

// app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("Api is running...")
})

app.get('/api/details',(req,res)=>{
    res.json(details)
})

app.use('/api/users',userRoutes)

app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on PORT ${PORT}`))
