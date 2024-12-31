import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Role: '',
    Department: '',
  });

  // Fetch users
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/employees')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Inline styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'left',
  };

  const thTdStyle = {
    padding: '12px 15px',
    border: '1px solid #ddd',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#f4f4f4',
  };

  const evenRowStyle = {
    backgroundColor: '#f9f9f9',
  };

  // Handle edit functionality
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      Name: user.Name,
      Role: user.Role,
      Department: user.Department,
    });
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = () => {
    console.log(editingUser._id);

    axios
      .put(`http://localhost:5000/api/employees/${editingUser._id}`, formData)
      .then((res) => {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...formData } : user
          )
        );
        setEditingUser(null);
        setFormData({ Name: '', Role: '', Department: '' });
      })
      .catch((err) => {
        console.error('Error saving changes:', err);
      });
  };

  // Handle Create
  const handleCreate = () => {
console.log(formData);

    axios
      .post(`http://localhost:5000/api/employees`, formData)
      .then((res) => {
        setEditingUser(null);
        setFormData({ Name: '', Role: '', Department: '' });
      })
      .catch((err) => {
        console.error('Error saving changes:', err);
      });
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
      });
  };

  return (
    <>
      {/* create user  */}
      <h2>Create User</h2>
      {!editingUser && (
        <div style={{ marginTop: '20px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <div>
              <label>Name</label>
              <input
                type='text'
                name='Name'
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Role</label>
              <input
                type='text'
                name='Role'
                value={formData.Role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Department</label>
              <input
                type='text'
                name='Department'
                value={formData.Department}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type='submit'
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Create
            </button>
          </form>
        </div>
      )}

      <h1>Users</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Department</th>
            <th style={thStyle}>Edit</th>
            <th style={thStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} style={index % 2 === 0 ? evenRowStyle : null}>
              <td style={thTdStyle}>{user.Name}</td>
              <td style={thTdStyle}>{user.Role}</td>
              <td style={thTdStyle}>{user.Department}</td>
              <td style={thTdStyle}>
                {/* edit button  */}
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Edit
                </button>
              </td>
              <td style={thTdStyle}>
                {/* dlete button  */}
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* edit user  */}
      {editingUser && (
        <div style={{ marginTop: '20px' }}>
          <h2>Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveChanges();
            }}
          >
            <div>
              <label>Name</label>
              <input
                type='text'
                name='Name'
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Role</label>
              <input
                type='text'
                name='Role'
                value={formData.Role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Department</label>
              <input
                type='text'
                name='Department'
                value={formData.Department}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type='submit'
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
