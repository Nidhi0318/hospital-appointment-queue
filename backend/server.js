const express=require("express");
const cors=require("cors");
const fs=require("fs");
const path=require("path");
const app=express();
app.use(cors());
app.use(express.json());
const dbPath=path.join(__dirname,"data","db.json");
function readDB(){return JSON.parse(fs.readFileSync(dbPath,"utf8"));}
function saveDB(db){fs.writeFileSync(dbPath,JSON.stringify(db,null,2));}

app.get("/api/doctors",(req,res)=>res.json(readDB().doctors));

app.patch("/api/doctors/:id",(req,res)=>{
 const db=readDB(); const d=db.doctors.find(x=>x.id===Number(req.params.id));
 if(!d)return res.status(404).json({message:"Doctor not found"});
 d.available=req.body.available; saveDB(db); res.json(d);
});

app.get("/api/appointments",(req,res)=>res.json(readDB().appointments));

app.post("/api/appointments",(req,res)=>{
 const db=readDB(); const {patientName,phone,doctorId,date,time}=req.body;
 const doctor=db.doctors.find(d=>d.id===Number(doctorId));
 if(!patientName||!doctor||!date||!time)return res.status(400).json({message:"Please fill all details"});
 if(!doctor.available)return res.status(400).json({message:"Doctor is not available"});
 const a={id:Date.now(),patientName,phone,doctorId:doctor.id,doctorName:doctor.name,date,time,status:"Confirmed",token:null};
 db.appointments.push(a); saveDB(db); res.json(a);
});

app.patch("/api/appointments/:id/status",(req,res)=>{
 const db=readDB(); const a=db.appointments.find(x=>x.id===Number(req.params.id));
 if(!a)return res.status(404).json({message:"Appointment not found"});
 a.status=req.body.status; saveDB(db); res.json(a);
});

app.post("/api/appointments/:id/token",(req,res)=>{
 const db=readDB(); const a=db.appointments.find(x=>x.id===Number(req.params.id));
 if(!a)return res.status(404).json({message:"Appointment not found"});
 if(a.status!=="Confirmed")return res.status(400).json({message:"Token can only be generated for confirmed appointments"});
 const today=new Date().toISOString().slice(0,10);
 const tokens=db.appointments.filter(x=>x.date===today&&x.token!==null).map(x=>Number(x.token));
 a.token=tokens.length?Math.max(...tokens)+1:1; a.status="Waiting";
 saveDB(db); res.json(a);
});

app.post("/api/doctors/:doctorId/next",(req,res)=>{
 const db=readDB(); const today=new Date().toISOString().slice(0,10);
 const list=db.appointments.filter(a=>a.doctorId===Number(req.params.doctorId)&&a.date===today&&a.status==="Waiting").sort((a,b)=>a.token-b.token);
 if(!list.length)return res.status(404).json({message:"No waiting patients"});
 list[0].status="In Consultation"; saveDB(db); res.json(list[0]);
});

app.listen(5000,()=>console.log("Hospital Queue Server: http://localhost:5000"));