import React, { useEffect, useState } from 'react';

function VisitForm() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    opis: '',
    data_wiz: '',
    czas_trwania: '00:30:00',
    id_lek: '',
    id_pac: '',
    id_rej: 1, // możesz ustawić dynamicznie, np. z localStorage albo hardcoded na razie
    status: 'umówiona',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(res => res.json())
      .then(setDoctors)
      .catch(err => console.error('Błąd pobierania lekarzy:', err));

    fetch('http://localhost:8080/api/patients')
      .then(res => res.json())
      .then(setPatients)
      .catch(err => console.error('Błąd pobierania pacjentów:', err));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being sent:', form); // Add this line
    fetch('http://localhost:8080/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Błąd zapisu wizyty');
        return res.json();
      })
      .then((data) => {
        alert('Wizyta zapisana!');
        console.log(data);
        setForm({
          opis: '',
          data_wiz: '',
          czas_trwania: '00:30:00',
          id_lek: '',
          id_pac: '',
          id_rej: 1,
          status: 'umówiona',
        });
      })
      .catch(err => {
        console.error(err);
        alert('Wystąpił błąd podczas zapisu wizyty.');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '40%', margin:'auto' }}>
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
       <select name="id_pac" value={form.id_pac} onChange={handleChange} required>
         <option value="">-- Wybierz pacjenta --</option>
         {patients.map(pac => (
           <option key={pac.id} value={pac.id}>
             {pac.name} {pac.surname}
           </option>
         ))}
       </select>
       <br /><br />

      <button type="submit">Zapisz wizytę</button>
    </form>
  );
}

export default VisitForm;
