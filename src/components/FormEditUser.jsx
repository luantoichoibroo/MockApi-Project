import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function FormEditUser({ user, updateUser }) {
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users/${user.id}`,
        formData
      );
      updateUser(response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Họ tên</Form.Label>
        <Form.Control
          type="text"
          name="hoten"
          value={formData.hoten}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Cập nhật
      </Button>
    </Form>
  );
}
