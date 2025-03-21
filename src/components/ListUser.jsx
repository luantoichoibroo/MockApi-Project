import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormAddUser from "./FormAddUser";
import FormEditUser from "./FormEditUser";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users/${id}`
    );
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>Danh sách Users</h2>
      <FormAddUser addUser={(newUser) => setUsers([...users, newUser])} />
      {editingUser && (
        <FormEditUser
          user={editingUser}
          updateUser={(updatedUser) => {
            setUsers(
              users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
            setEditingUser(null);
          }}
        />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.mssv}</td>
              <td>{user.hoten}</td>
              <td>{user.lop}</td>
              <td className="text-center">
                <img src={user.hinhanh} alt={user.hoten} height="50" />
              </td>
              <td>
                <Button variant="warning" onClick={() => setEditingUser(user)}>
                  Sửa
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
