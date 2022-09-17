const mongoose=require('mongoose')

const applicantSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phone:{
            type:String,
            required:true,
        },
        companyname:{
            type:String,
            required:true
        }, 
        teamNbackground:{
            type:String,
            required:true
        } ,
        companyNproduct:{
            type:String,
            required:true
        },
        solution:{
            type:String,
            required:true
        } ,
        uniquesolution:{
            type:String,
            required:true
        }  ,
        preposition:{
            type:String,
            required:true
        },
        competitorsNadvantages:{
            type:String,
            required:true
        },
        revenue:{
            type:String,
            required:true
        },
        potentialmarketsize:{
            type:String,
            required:true
        },
        marketproductNservice:{
            type:String,
            required:true
        },
        typeincubation:{
            type:String,
            required:true
        },
        proposal:{
            type:String,
            required:true
        },
        logo:{
            type:Object,
            required:true,
            default:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },
        image:{
            type:String,
            required:true
        },
        isPending:{
         type:Boolean,
         required:true,
        },
        isUnderprocess:{
            type:Boolean,
            required:true,
        },
        isApproved:{
            type:Boolean,
            required:true,
        },
        isDeclined:{
            type:Boolean,
            required:true,
        }
      


    },
    {
        timestamps:true
    }
);




const Appform=mongoose.model('Appform',applicantSchema);
module.exports=Appform