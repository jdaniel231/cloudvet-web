import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimalDetailsLayout from '../../components/Animals/AnimalDetailsLayout';

const NewAppointment = () => {
  const { clientId, animalId } = useParams();
  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({
      clientId,
      animalId,
      appointmentDate,
      description,
    });
    alert('Appointment created successfully!');
    navigate(`/clients/${clientId}/animals/${animalId}`); // Navigate back to animal details
  };

  return (
    <AnimalDetailsLayout>
      <h1 className="text-2xl font-bold mb-4">New Appointment for Animal ID: {animalId}</h1>
      <form onSubmit={handleSubmit} className="bg-card shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block text-gray-700 text-sm font-bold mb-2">
            Appointment Date:
          </label>
          <input
            type="date"
            id="appointmentDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Appointment
          </button>
          <button
            type="button"
            onClick={() => navigate(`/clients/${clientId}/animals/${animalId}`)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </AnimalDetailsLayout>
  );
};

export default NewAppointment;
