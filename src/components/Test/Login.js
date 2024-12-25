import React, { useState } from 'react';
import axios from '../../Api/userApi'; // Đảm bảo bạn đã định nghĩa đúng trong userApi.js
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Gửi yêu cầu đăng nhập
      const response = await axios.post('/auth/login', { username, password });
      
      // Lấy dữ liệu từ phản hồi
      const data = response.data;
      console.log('Dữ liệu trả về từ server:', data);

      if (response.status === 200) { // Kiểm tra mã trạng thái HTTP
        // Lưu accessToken vào localStorage
        localStorage.setItem('token', data.accessToken);
        alert('Đăng nhập thành công!');
        navigate('/'); // Điều hướng đến trang quản lý user
      } else {
        alert(data.message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đăng nhập thất bại! Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

export default Login;
