import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import "./VisitForm.css";

function VisitForm() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  // new state for availability logic
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);  

  const [form, setForm] = useState({
    opis: '',
    id_lek: '',
    id_pac: '',
    id_rej: 2, // Hardcoded for now
    status: 'umówiona',
    duration: '15', // Default duration in minutes
    visitDateTime: '', // This will be the final selected slot
  });

  // Fetch doctors and patients 
  useEffect(() => {
    axiosInstance('/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Błąd pobierania lekarzy:', error));

    axiosInstance('/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error("Błąd podczas pobierania listy pacjentów", error));
  }, []);

  // Patient search logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPatients([]);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredPatients(
        patients.filter(p => p.name.toLowerCase().includes(q) || p.surname.toLowerCase().includes(q))
      );
    }
  }, [searchQuery, patients]);

  useEffect(() => {
    if (form.id_lek && form.duration) {
      const now = new Date();
      fetchAvailableDays(now.getFullYear(), now.getMonth() + 1);

    }
  }, [form.id_lek, form.duration]);

  const fetchAvailableDays = (year, month) => {
    axiosInstance.get(`/doctors/${form.id_lek}/available-days`, {
      params: {
        year: year,
        month: month,
        duration: form.duration,
      }
    })
    .then(response => {
      setAvailableDays(response.data);
      setAvailableSlots([]); 
      setSelectedDay(null); 
    })
    .catch(error => {
      console.error('Błąd pobierania dostępnych dni:', error);
      setAvailableDays([]);
      setAvailableSlots([]);
    });
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    axiosInstance.get(`/doctors/${form.id_lek}/available-slots`, {
      params: {
        date: day,
        duration: form.duration,
      }
    })
    .then(response => {
      setAvailableSlots(response.data);
    })
    .catch(error => {
      console.error('Błąd pobierania dostępnych godzin:', error);
      setAvailableSlots([]);
    });
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    const dateTime = `${selectedDay}T${slot}`;
    setForm(prev => ({ ...prev, visitDateTime: dateTime }));
    alert(`Wybrano termin: ${dateTime}`);
  };


  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectPatient = (pac) => {
    setForm(prev => ({ ...prev, id_pac: pac.id }));
    setSearchQuery(`${pac.name} ${pac.surname}`);
    setFilteredPatients([]);
  };


  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}:00`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id_pac) {
      alert("Musisz wybrać pacjenta!");
      return;
    }
    if (!form.visitDateTime) {
      alert("Musisz wybrać termin wizyty!");
      return;
    }

    const postData = {
      opis: form.opis,
      data_wiz: form.visitDateTime,
      czas_trwania: formatDuration(form.duration),
      id_lek: form.id_lek,
      id_pac: form.id_pac,
      id_rej: form.id_rej,
      status: form.status,
    };

    console.log('Wysłane dane z formularza: ', postData);
    axiosInstance.post('/visits', postData)
      .then(response => {
        alert("Wizyta zapisana");
        console.log(response.data);
        // Reset form
        setForm({
          opis: '', id_lek: '', id_pac: '', id_rej: 2,
          status: 'umówiona', duration: '15', visitDateTime: '',
        });
        setSearchQuery('');
        setAvailableDays([]);
        setAvailableSlots([]);
        setSelectedDay(null);
      })
      .catch(err => {
        console.error(err);
        alert('Wystąpił błąd podczas zapisu wizyty.');
      });
  };

  return (
    <div className='visit-form'>
      <form onSubmit={handleSubmit} >
        <h2>Ustal nową wizytę</h2>
        <label>Opis:</label>
        <textarea name="opis" value={form.opis} onChange={handleChange} required />
        <label>Lekarz:</label>
        <select name="id_lek" value={form.id_lek} onChange={handleChange} required>
          <option value="">-- Wybierz lekarza --</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name} {doc.surname}</option>
          ))}
        </select>

        <label>Czas trwania wizyty:</label>
        <select name="duration" value={form.duration} onChange={handleChange} required>
          <option value="15">15 minut</option>
          <option value="20">20 minut</option>
          <option value="30">30 minut</option>
        </select>
        {form.id_lek && form.duration && (
          <div>
            <h4>Wybierz dzień</h4>
            <div className='choose-day-container'>
              {availableDays.length > 0 ? (
                availableDays.map(day => (
                  <button type="button" key={day} onClick={() => handleDaySelect(day)}
                    style={{ fontWeight: selectedDay === day ? 'bold' : 'normal' , backgroundColor: selectedDay === day ? 'green' : 'darkgrey'}}>
                    {day}
                  </button>
                ))
              ) : (
                <p>Brak dostępnych dni w tym miesiącu dla wybranych kryteriów.</p>
              )}
            </div>
          </div>
        )}

        {selectedDay && (
          <div>
            <h4>Wybierz godzinę (dla {selectedDay})</h4>
            <div className='choose-hour-container'>
              {availableSlots.length > 0 ? (
                availableSlots.map(slot => (
                  <button type="button" key={slot} onClick={() => handleSlotSelect(slot)}
                    style={{fontWeight: selectedSlot === slot ? 'bold' : 'normal', backgroundColor: selectedSlot === slot ? 'green' : 'darkgrey'}}>
                    {slot}
                  </button>
                ))
              ) : (
                <p>Brak dostępnych godzin w tym dniu.</p>
              )}
            </div>
          </div>
        )}
        <label>Pacjent:</label>
        <input type='text' placeholder='Wyszukaj pacjenta po imieniu/nazwisku'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        {filteredPatients.length > 0 && (
          <ul className='filtered-patients-ul'>
            {filteredPatients.map(pac => (
              <li key={pac.id} onClick={() => handleSelectPatient(pac)}
                style={{ cursor: 'pointer', padding: '5px' }}>
                Imię: {pac.name}<br /> Nazwisko: {pac.surname}<br /> Pesel: {pac.pesel}
              </li>
            ))}
          </ul>
        )}
        <button type="submit">Zapisz wizytę</button>
      </form>
    </div>
  );
}

export default VisitForm;
