import React from 'react';
import { Eye } from 'lucide-react';

const AppointmentCard = ({ appointment, getStatusColor }) => (
  <div className="grid grid-cols-5 gap-4 items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="col-span-1">
      <p className="font-medium text-gray-800">{appointment.patientName}</p>
    </div>
    <div className="col-span-1">
      <p className="text-sm text-gray-600">{appointment.date}</p>
    </div>
    <div className="col-span-1">
      <p className="text-sm text-gray-600">R$ {appointment.value}</p>
    </div>
    <div className="col-span-1">
      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
        {appointment.status}
      </span>
    </div>
    <div className="col-span-1 text-right">
      <button className="text-blue-600 hover:text-blue-800">
        <Eye className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default AppointmentCard;