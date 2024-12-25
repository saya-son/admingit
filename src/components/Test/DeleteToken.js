const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Đã đăng xuất!');
    // Chuyển hướng về trang đăng nhập
    window.location.href = '/login';
  };
  