import React, {useEffect, useState} from "react";

import axiosInstance from './axiosInstance'
import { useNavigate } from "react-router-dom";

function formatDuration(durationString){
    if(!durationString){
        return 'Brak danych do sformatowania';
    }
    const minutes = durationString.match(/\d+/);
    return minutes ? `${minutes[0]} minut` : 'błędny format';
}


function Visit(){
    const navigate = useNavigate();
    const [visits, setVisit] = useState([]);


    useEffect(()=>{
        axiosInstance('visits')
            .then(response=>{
                console.log("Wizyta z backendu API: ", response.data);
                const sortedVisits = response.data.sort((a,b)=>new Date(a.data_wiz) - new Date(b.data_wiz));
                setVisit(sortedVisits);
            })
            .catch(error=>{
                console.log("Błąd podczas pobierania wizyt");
                alert("Błąd podczas pobierania wizyt");
            });
    },[]);

    function handleDeleteClick(id) {
        console.log("id wizyty: ", id);
        if(window.confirm("Czy na pewno chcesz anulować wizytę?")){
            axiosInstance.patch(`/visits/${id}`,{"status": "Anulowana"})
            .then(response=>{
                if(response.status ===204 || response.status === 200){
                    setVisit(prev => prev.filter(v=>v.id_wiz!==id));
                    alert("Wizyta została Anulowana");
                }else{
                    alert("Błąd podczas anulowania wizyty - bad response");
                }
            })
            .catch(err=>{
                console.log("Błąd przy usuwaniu wizyty", err);
                alert("Error: Błąd podczas usuwania wizyty");
            });
        }
    }
    return(
        <div>
            <h2>Twoje wizyty</h2>
            <ul>
                {visits.map(visit=>(
                    <li key={visit.id_wiz}>
                        <p>Opis: {visit.opis}</p>
                        <p>Status: {visit.status}</p>
                        <p>Data: {new Date(visit.data_wiz).toLocaleDateString('pl-PL',{
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: undefined  
                        })}</p>
                        <p>Czas trwania: {formatDuration(visit.czas_trwania)}</p>
                        <p>Pacjent: {visit.patient ? `${visit.patient.name} ${visit.patient.surname}` : 'Brak danych'}</p>
                        <button onClick={()=>handleDeleteClick(visit.id_wiz)} className="delete-button">Anuluj wizytę</button>
                        <button onClick={()=>navigate(`/visit/${visit.id_wiz}`)} style={{marginRight: '10px'}}>Zrealizuj</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Visit;

