import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import FormAddUser from "./FormAddUser";

export const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users"
        );
        setUsers(res.data);
        setColumns(Object.keys(res.data[0]));
        setLoading(false);
      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
      }
    };
    fetchUser();
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users/${id}`
      );
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users/${editingUser.id}`,
        editingUser
      );

      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  if (loading) {
    return <h1>Đang tải..........</h1>;
  }

  return (
    <>
      <FormAddUser addUser={addUser} />

      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>{user.id}</td>
              <td>
                <Button variant="danger" onClick={() => deleteUser(user.id)}>
                  Xóa
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>
                  Sửa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editingUser && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sửa thông tin người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Tuổi</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={editingUser.age}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Nam"
                    name="sex"
                    value="Male"
                    checked={editingUser.sex === "Male"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Nữ"
                    name="sex"
                    value="Female"
                    checked={editingUser.sex === "Female"}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Button variant="primary" onClick={handleSave}>
                Lưu
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
