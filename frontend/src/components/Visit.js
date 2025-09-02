import React, {useEffect, useState} from "react";

import axiosInstance from './axiosInstance'

function formatDuration(durationString){
    if(!durationString){
        return 'Brak danych do sformatowania';
    }
    const minutes = durationString.match(/\d+/);
    return minutes ? `${minutes[0]} minut` : 'błędny format';
}


function Visit(){

    const [visits, setVisit] = useState([]);

    useEffect(()=>{
        axiosInstance('visits')
            .then(response=>{
                console.log("Wizyta z backendu API: ", response.data);
                setVisit(response.data);
            })
            .catch(error=>{
                console.log("Błąd podczas pobierania wizyt");
                alert("Błąd podczas pobierania wizyt");
            });
    },[]);
    return(
        <div>
            <h2>Twoje wizyty</h2>
            <ul>
                {visits.map(visit=>(
                    <li key={visit.id}>
                        <p>Opis: {visit.opis}</p>
                        <p>Dodaj diagnozę <input type='text' value={visit.diagnoza}></input></p>
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
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Visit;

