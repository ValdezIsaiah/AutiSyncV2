import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Students = () => {
  const navigate = useNavigate();
  
  // Sample student data
  const [students] = useState([
    {
      id: 1,
      name: 'Emma Johnson',
      age: 8,
      address: '123 Main St, Springfield, IL',
      gender: 'Female',
      joinDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Liam Smith',
      age: 7,
      address: '456 Oak Ave, Springfield, IL',
      gender: 'Male',
      joinDate: '2024-02-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sophia Davis',
      age: 9,
      address: '789 Pine Rd, Springfield, IL',
      gender: 'Female',
      joinDate: '2024-01-10',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Noah Wilson',
      age: 6,
      address: '321 Elm St, Springfield, IL',
      gender: 'Male',
      joinDate: '2024-03-05',
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Isabella Brown',
      age: 8,
      address: '654 Maple Dr, Springfield, IL',
      gender: 'Female',
      joinDate: '2024-02-15',
      status: 'Active'
    }
  ]);

  const handleBackToDashboard = () => {
    navigate('/tracking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <NavBar />   
      <div className="p-8">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Students Management</h1>
            <p className="text-gray-500">View and manage student information</p>
          </div>
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer rounded-lg flex items-center gap-2 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl">👥</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl">✅</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-2xl font-bold text-green-600">
                  {students.filter(s => s.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl">👧</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Female Students</p>
                <p className="text-2xl font-bold text-pink-600">
                  {students.filter(s => s.gender === 'Female').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl">👦</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Male Students</p>
                <p className="text-2xl font-bold text-blue-600">
                  {students.filter(s => s.gender === 'Male').length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">All Students ({students.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">ID: {student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.age} years old
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(student.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                        <button
                          onClick={() => navigate(`/tracking?studentId=${student.id}`)}
                          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                        >
                          View Tracks
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Students;
