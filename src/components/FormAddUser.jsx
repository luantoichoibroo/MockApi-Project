import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function FormAddUser({ addUser }) {
  const initObjectData = {
    name: "",
    email: "",
    age: "",
    sex: "Male",
  };

  const [formData, setFormData] = useState(initObjectData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSexChange = (e) => {
    setFormData({
      ...formData,
      sex: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(
        "https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users",
        formData
      );

      addUser(response.data);

      setFormData(initObjectData);

      setLoading(false);
    } catch (error) {
      console.error("Error adding user:", error);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Họ tên</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tuổi</Form.Label>
        <Form.Control
          type="text"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Giới tính</Form.Label>
        <Form.Check
          type="radio"
          label="Nam"
          name="sex"
          value="Male"
          checked={formData.sex === "Male"}
          onChange={handleSexChange}
        />
        <Form.Check
          type="radio"
          label="Nữ"
          name="sex"
          value="Female"
          checked={formData.sex === "Female"}
          onChange={handleSexChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Đang thêm..." : "Thêm"}{" "}
      </Button>
    </Form>
  );
}
