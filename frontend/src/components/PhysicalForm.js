import React, {useState, useEffect} from "react";
import axiosInstance from "./axiosInstance";

function PhysicalExamForm ({visitId}){
    const [codes, setCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');
    const [ result, setResult] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axiosInstance.get('codes/physical')
            .then(response => {
                setCodes(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas poboru kodów fizykalnych");
                setError('Nie udało się załadować słownika badań fizykalnych');
            })
            .finally(()=>{
                setLoading(false);
            });
    },[]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!selectedCode || !result){
            alert('Proszę wybrać badanie i wpisać wynik');
            return;
        }
        console.log('Dane do zapisu: ', {
            visitId:visitId,
            code: selectedCode,
            result: result
        });
        const payload = {
            code: selectedCode,
            result: result
        };
        axiosInstance.post(`visits/${visitId}/physical-exams`, payload)
            .then(response=>{
                setSelectedCode('');
                setResult('');
                
            })
            .catch(err=>{
                console.error("Błąd podczas dodawania badania", err);
            })
        
    }

    if(loading){
        return <p>Ładowanie formularza badań</p>

    }
    if(error){
        return <p>{error}</p>
    }
    return(
        <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px'}}>
            <h3>Dodaj badanie fizykalne</h3>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'15px'}}>
                    <label htmlFor="exam-code">Badanie</label>
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
                    <label htmlFor="exam-result">Wynik</label>
                    <textarea
                        id="exam-result"
                        value={result}
                        onChange={e=>setResult(e.target.value)}
                        required
                        rows="4"
                        >
                        </textarea>
                </div>
                <button type="submit" style={{padding:'10px 15px'}}>Dodaj badanie</button>
            </form>
        </div>
    );
}

export default PhysicalExamForm;
