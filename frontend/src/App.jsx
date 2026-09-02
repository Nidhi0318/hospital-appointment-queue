import React,{useEffect,useState} from "react";

const API="http://localhost:5000/api";

function App(){
 const [page,setPage]=useState("dashboard");
 const [doctors,setDoctors]=useState([]);
 const [appointments,setAppointments]=useState([]);
 const [message,setMessage]=useState("");
 const [name,setName]=useState("");
 const [phone,setPhone]=useState("");
 const [doctorId,setDoctorId]=useState("");
 const [date,setDate]=useState("");
 const [time,setTime]=useState("");

 useEffect(()=>{getDoctors();getAppointments();},[]);

 function getDoctors(){fetch(API+"/doctors").then(r=>r.json()).then(setDoctors).catch(()=>setMessage("Start the backend server first."));}
 function getAppointments(){fetch(API+"/appointments").then(r=>r.json()).then(setAppointments).catch(()=>setMessage("Start the backend server first."));}

 function book(){
  if(!name||!phone||!doctorId||!date||!time){setMessage("Please fill all details.");return;}
  fetch(API+"/appointments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({patientName:name,phone,doctorId,date,time})})
  .then(async r=>{let d=await r.json();if(!r.ok)throw Error(d.message);return d;})
  .then(()=>{setMessage("Appointment confirmed.");setName("");setPhone("");setDoctorId("");setDate("");setTime("");getAppointments();setPage("appointments");})
  .catch(e=>setMessage(e.message));
 }

 function token(id){
  fetch(API+"/appointments/"+id+"/token",{method:"POST"})
  .then(async r=>{let d=await r.json();if(!r.ok)throw Error(d.message);return d;})
  .then(()=>{setMessage("Token generated.");getAppointments();})
  .catch(e=>setMessage(e.message));
 }

 function cancel(id){
  fetch(API+"/appointments/"+id+"/status",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"Cancelled"})})
  .then(()=>{setMessage("Appointment cancelled.");getAppointments();});
 }

 function complete(id){
  fetch(API+"/appointments/"+id+"/status",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"Completed"})})
  .then(()=>{setMessage("Appointment completed.");getAppointments();});
 }

 function callNext(id){
  fetch(API+"/doctors/"+id+"/next",{method:"POST"})
  .then(async r=>{let d=await r.json();if(!r.ok)throw Error(d.message);return d;})
  .then(d=>{setMessage("Calling Token "+d.token+" - "+d.patientName);getAppointments();})
  .catch(e=>setMessage(e.message));
 }

 const today=new Date().toISOString().slice(0,10);
 const todayCount=appointments.filter(a=>a.date===today).length;
 const waiting=appointments.filter(a=>a.status==="Waiting");
 const completed=appointments.filter(a=>a.status==="Completed");

 function Dashboard(){
  return <div><h2>Hospital Dashboard</h2>
   <div className="cards">
    <div className="card"><h3>Today's Appointments</h3><p>{todayCount}</p></div>
    <div className="card"><h3>Waiting Patients</h3><p>{waiting.length}</p></div>
    <div className="card"><h3>Completed</h3><p>{completed.length}</p></div>
    <div className="card"><h3>Available Doctors</h3><p>{doctors.filter(d=>d.available).length}</p></div>
   </div>
   <div className="box"><h3>Appointment Flow</h3><div className="flow"><span>Book</span><b>→</b><span>Confirm</span><b>→</b><span>Token</span><b>→</b><span>Queue</span><b>→</b><span>Doctor Calls</span></div></div>
  </div>;
 }

 function Doctors(){
  return <div><h2>Doctor Availability</h2><div className="doctor-grid">
   {doctors.map(d=><div className="doctor-card" key={d.id}><h3>{d.name}</h3><p>{d.specialization}</p><p>Status: <b className={d.available?"green":"red"}>{d.available?" Available":" Not Available"}</b></p>
   <button onClick={()=>fetch(API+"/doctors/"+d.id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({available:!d.available})}).then(()=>{getDoctors();setMessage("Availability updated.");})}>Change Availability</button></div>)}
  </div></div>;
 }

 function Book(){
  return <div><h2>Book Appointment</h2><div className="form-box">
   <label>Patient Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter patient name"/>
   <label>Phone Number</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter phone number"/>
   <label>Doctor</label><select value={doctorId} onChange={e=>setDoctorId(e.target.value)}><option value="">Select Doctor</option>{doctors.map(d=><option key={d.id} value={d.id} disabled={!d.available}>{d.name} - {d.specialization}{!d.available?" (Unavailable)":""}</option>)}</select>
   <label>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
   <label>Time</label><input type="time" value={time} onChange={e=>setTime(e.target.value)}/>
   <button onClick={book}>Confirm Appointment</button>
  </div></div>;
 }

 function Appointments(){
  return <div><h2>Appointments</h2><div className="box"><table><thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Token</th><th>Status</th><th>Action</th></tr></thead><tbody>
   {appointments.map(a=><tr key={a.id}><td>{a.patientName}</td><td>{a.doctorName}</td><td>{a.date}</td><td>{a.time}</td><td>{a.token||"-"}</td><td>{a.status}</td><td>
   {a.status==="Confirmed"&&<><button onClick={()=>token(a.id)}>Generate Token</button><button className="danger" onClick={()=>cancel(a.id)}>Cancel</button></>}
   {a.status==="In Consultation"&&<button onClick={()=>complete(a.id)}>Complete</button>}
   </td></tr>)}
  </tbody></table></div></div>;
 }

 function Queue(){
  return <div><h2>Today's Queue</h2><div className="queue-number">{waiting.length} patient(s) waiting</div><div className="box"><table><thead><tr><th>Token</th><th>Patient</th><th>Doctor</th><th>Time</th><th>Status</th></tr></thead><tbody>
   {waiting.sort((a,b)=>a.token-b.token).map(a=><tr key={a.id}><td><strong className="token">{a.token}</strong></td><td>{a.patientName}</td><td>{a.doctorName}</td><td>{a.time}</td><td>Waiting</td></tr>)}
  </tbody></table></div></div>;
 }

 function DoctorDashboard(){
  return <div><h2>Doctor Dashboard</h2>{doctors.map(d=>{let q=waiting.filter(a=>a.doctorId===d.id).sort((a,b)=>a.token-b.token);return <div className="doctor-dashboard" key={d.id}><div><h3>{d.name}</h3><p>{d.specialization}</p><p>Waiting: {q.length}</p></div><button onClick={()=>callNext(d.id)}>Call Next Patient</button>{q.length>0&&<div className="next-patient">Next Token: <b>{q[0].token}</b><br/>Patient: <b>{q[0].patientName}</b></div>}</div>})}</div>;
 }

 return <div className="app">
  <header><h1>CareFlow Hospital</h1><p>Appointment & Queue Management System</p></header>
  <nav><button onClick={()=>setPage("dashboard")}>Dashboard</button><button onClick={()=>setPage("doctors")}>Doctors</button><button onClick={()=>setPage("book")}>Book Appointment</button><button onClick={()=>setPage("appointments")}>Appointments</button><button onClick={()=>setPage("queue")}>Queue</button><button onClick={()=>setPage("doctor")}>Doctor Dashboard</button></nav>
  {message&&<div className="message">{message}<button onClick={()=>setMessage("")}>×</button></div>}
  <main>{page==="dashboard"&&<Dashboard/>}{page==="doctors"&&<Doctors/>}{page==="book"&&<Book/>}{page==="appointments"&&<Appointments/>}{page==="queue"&&<Queue/>}{page==="doctor"&&<DoctorDashboard/>}</main>
 </div>;
}
export default App;