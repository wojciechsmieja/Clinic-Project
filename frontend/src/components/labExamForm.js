import React, {useState, useEffect} from "react";
import axiosInstance from "./axiosInstance";

function LabExamForm({visitId}){
    const [codes, setCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');
    const [doctorNotes, setDoctorNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        axiosInstance.get("codes/laboratory")
            .then(response=>{
                setCodes(response.data);
            })
            .catch(error =>{
                console.error("Błąd podczas poboru kodów laboratoryjnych", error);
                setError('Nie udało się załadować słownika badań laboratoryjnych');
            })
            .finally(()=>{
                setLoading(false);
            });
    },[]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!selectedCode){
            alert("Proszę wybrać badanie");
            return;
        }
        console.log('Dane do zapisu (lab): ', {
            visitId:visitId,
            code: selectedCode,
            doctorNotes: doctorNotes
        });
        const payload = {
            code: selectedCode,
            doctorNotes: doctorNotes
        }
        axiosInstance.post(`visits/${visitId}/lab-exams`, payload)
            .then(response=>{
                setSelectedCode('');
                setDoctorNotes('');
                                
            })        
            .catch(err => {
                console.error("Błąd podczas dodawania badania lab", err);
            })
    }

    if(loading){
        return <p>Ładowanie formularza badań laboratoryjnych</p>
    }

    if(error){
        return <p>{error}</p>
    }
    return(
        <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px'}}>
            <h3>Zleć badanie laboratoryjne</h3>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'15px'}}>
                    <label htmlFor="exam-code">Badania laboraotryjne</label>
                    <select id="exam-code"
                        value={selectedCode}
                        onChange={e=> setSelectedCode(e.target.value)}
                        required
                        style={{width:'100%', padding:'10px'}}>
                            <option value="" disabled>Wybierz badanie z listy...</option>
                            {codes.map(code=>(
                                <option key={code.code} value={code.code}>
                                    {code.code} ({code.name})
                                </option>
                            ))}
                        </select>
                </div>
                <div>
                    <label htmlFor="doctor-notes">Dodatkowe informacje</label>
                    <textarea
                        id="doctor-notes"
                        value={doctorNotes}
                        onChange={e=>setDoctorNotes(e.target.value)}
                        rows="4"
                        >
                        </textarea>
                </div>
                <button type="submit" style={{padding:'10px 15px'}}>Zleć badanie</button>                
            </form>
        </div>
    )

}

export default LabExamForm;