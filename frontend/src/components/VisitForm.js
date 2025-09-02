import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance'

function VisitForm() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [form, setForm] = useState({
    opis: '',
    data_wiz: '',
    czas_trwania: '00:30:00',
    id_lek: '',
    id_pac: '',
    id_rej: 2, // możesz ustawić dynamicznie, np. z localStorage albo hardcoded na razie
    status: 'umówiona',
  });

  useEffect(() => {
    axiosInstance('/doctors')
      .then(response => {
        console.log("Odpowidz z API", response.data);
        setDoctors(response.data);  
      })
      .catch(error => {
        console.error('Błąd pobierania lekarzy:');
        alert("Coś poszło nie tak podczas pobierania listy lekarzy :(");
            });

      axiosInstance('/patients')
          .then(response=>{
              console.log("Odpowidz z API", response.data);
              setPatients(response.data);})
          .catch(error=>{
              console.error("Błąd podczas pobierania listy pacjentów");
              alert("Coś poszło nie tak podczas pobierania listy pacjentów :(");
          });
  }, []);

  useEffect(()=>{
    if (searchQuery.trim()===''){
      setFilteredPatients([]);
    }else{
      const q = searchQuery.toLowerCase();
      setFilteredPatients(
        patients.filter(
          (p)=>
            p.name.toLowerCase().includes(q) || p.surname.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, patients]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id_pac){
      alert("Musisz wybrać pacjenta!");
      return;
    }
    console.log('Wysłane dane z formularza: ', form); 
    axiosInstance.post('/visits', form)
      .then(response=>{
        alert("Wizyta zapisana");
        console.log(response.data);
        setForm({
          opis: '',
          data_wiz: '',
          czas_trwania: '00:30:00',
          id_lek: '',
          id_pac: '',
          id_rej: 1,
          status: 'umówiona',
        });
        setSearchQuery('');
      })
      .catch(err => {
        console.error(err);
        alert('Wystąpił błąd podczas zapisu wizyty.');
      });
  };

  const handleSelectPatient = (pac) => {
    setForm(prev=>({...prev, id_pac:pac.id}));
    setSearchQuery(`${pac.name} ${pac.surname}`); //write selected patient to field
    setFilteredPatients([]); // hide list after selecting
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '80%', margin:'auto' }}>
      <h2>Ustal nową wizytę</h2>

      <label>Opis:</label><br />
      <textarea name="opis" value={form.opis} onChange={handleChange} required /><br /><br />

      <label>Data i godzina wizyty:</label><br />
      <input type="datetime-local" name="data_wiz" value={form.data_wiz} onChange={handleChange} required /><br /><br />

      <label>Czas trwania:</label><br />
      <input type="time" step="1" name="czas_trwania" value={form.czas_trwania} onChange={handleChange} required /><br /><br />

      <label>Lekarz:</label><br />
        <select name="id_lek" value={form.id_lek} onChange={handleChange} required>
          <option value="">-- Wybierz lekarza --</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name} {doc.surname}</option>
          ))}
        </select><br /><br />

       <label>Pacjent:</label><br />
       <input type='text' placeholder='Wyszukaj pacjenta po imieniu/nazwisku'
       value ={searchQuery}
       onChange={(e)=>setSearchQuery(e.target.value)}/>
       {filteredPatients.length >0 && (
        <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', padding: '5px' }}>
          {filteredPatients.map(pac=>(
            <li key = {pac.id} onClick={() => handleSelectPatient(pac)}
            style={{cursor:'pointer', padding:'5px'}}>Imię: {pac.name}<br/> Nazwisko: {pac.surname}<br/> Pesel: {pac.pesel}
            </li>
          ))}
        </ul>
       )}      
       <br /><br />

      <button type="submit">Zapisz wizytę</button>
    </form>
  );
}

export default VisitForm;
