import React, { useState } from 'react';


const AdminPanel = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pesel: '',
    data_ur: '',
    status: 'pracuje',
    rola: 'lekarz',
    name: '',
    surname: '',
    npwz: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

  const EmployeePayload = {
    username: formData.username,
    password: formData.password,
    pesel: formData.pesel,
    data_ur: formData.data_ur,
    status: formData.status,
    admin: formData.rola === 'admin',
    rola: formData.rola,
    name: formData.name,
    surname: formData.surname,
    npwz: formData.rola === 'lekarz' ? formData.npwz : null
  };


    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(EmployeePayload)
      });

      if (response.ok) {
        alert('Pracownik dodany!');
        setFormData({
          username: '',
          password: '',
          pesel: '',
          data_ur: '',
          status: 'pracuje',
          rola: 'lekarz',
          name: '',
          surname: '',
          npwz: ''
        });
      } else {
        alert('Błąd podczas dodawania pracownika');
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert('Błąd sieci');
    }
  };

  return (
    <div>
      <h2>Dodaj nowego pracownika</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imię:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Nazwisko:</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>
        <div>
          <label>Login:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div>
          <label>Hasło:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <label>PESEL:</label>
          <input type="text" name="pesel" value={formData.pesel} onChange={handleChange} required />
        </div>

        <div>
          <label>Data urodzenia:</label>
          <input type="date" name="data_ur" value={formData.data_ur} onChange={handleChange} required />
        </div>

        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pracuje">pracuje</option>
            <option value="zwolniony">zwolniony</option>
          </select>
        </div>

        <div>
          <label>Rola:</label>
          <select id="rola" name="rola" value={formData.rola} onChange={handleChange}>
            <option value="lekarz">Lekarz</option>
            <option value="rejestrator">Rejestrator</option>
            <option value="laborant">Laborant</option>
            <option value="kierownik">Kierownik laboratorium</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {formData.rola==='lekarz'&&(
          <div>
            <label>NPWZ</label>
            <input type="number" name="npwz" value={formData.npwz} onChange={handleChange} required></input>
          </div>
        )}
        <button type="submit">Dodaj pracownika</button>
      </form>
    </div>
  );
};

export default AdminPanel;
