export const handleLogout = () => {
  localStorage.removeItem("isLoggedin");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  window.location.reload();
};
