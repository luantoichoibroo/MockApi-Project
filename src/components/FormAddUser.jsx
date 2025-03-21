import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function FormAddUser({ addUser }) {
  const [formData, setFormData] = useState({
    mssv: "",
    hoten: "",
    lop: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Vui lòng chọn ảnh!");
      return;
    }

    try {
      // Upload ảnh lên ImgBB
      const formDataImage = new FormData();
      formDataImage.append("image", imageFile);
      const imgResponse = await axios.post(
        "https://api.imgbb.com/1/upload?key=9ab1cbf5d0daaee3e6bcfc2fac8c889b",
        formDataImage
      );

      // Lưu user vào MockAPI với URL ảnh từ ImgBB
      const newUser = { ...formData, hinhanh: imgResponse.data.data.url };
      const response = await axios.post(
        "https://67d99e3d35c87309f52987fc.mockapi.io/api/v1/Users",
        newUser
      );

      addUser(response.data);
      setFormData({ mssv: "", hoten: "", lop: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>MSSV</Form.Label>
        <Form.Control
          type="text"
          name="mssv"
          value={formData.mssv}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Họ tên</Form.Label>
        <Form.Control
          type="text"
          name="hoten"
          value={formData.hoten}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lớp</Form.Label>
        <Form.Control
          type="text"
          name="lop"
          value={formData.lop}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Hình ảnh</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Thêm
      </Button>
    </Form>
  );
}
