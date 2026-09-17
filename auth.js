/**
 * auth.js
 * Module xác thực tài khoản
 */
// Update auth logic
// Giả lập cơ sở dữ liệu người dùng
const USERS_DB = {
  admin: {
    password: "9999",
    isLocked: false,
  },
  user_locked: {
    password: "123",
    isLocked: true,
  },
};

/**
 * Hàm kiểm tra đăng nhập
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {boolean} - Trả về true nếu đăng nhập thành công, false nếu sai mật khẩu
 * @throws {Error} - Ném ra ngoại lệ nếu dữ liệu không hợp lệ hoặc tài khoản bị khóa
 */
function login(username, password) {
  // 1. Kiểm tra username rỗng, không đúng định dạng chuỗi hoặc chỉ chứa khoảng trắng
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Username không được để trống");
  }

  // 2. Kiểm tra mật khẩu rỗng, không đúng định dạng chuỗi
  if (typeof password !== "string" || password === "") {
    throw new Error("Mật khẩu không được để trống");
  }

  // 3. Kiểm tra ngoại lệ mật khẩu chứa ký tự đặc biệt (chỉ cho phép chữ cái và chữ số)
  const specialCharRegex = /[^a-zA-Z0-9]/;
  if (specialCharRegex.test(password)) {
    throw new Error("Mật khẩu không được chứa ký tự đặc biệt");
  }

  // 4. Kiểm tra tài khoản tồn tại trong hệ thống
  const user = USERS_DB[username];
  if (!user) {
    throw new Error("Tài khoản không tồn tại");
  }

  // 5. Kiểm tra tài khoản bị khóa
  if (user.isLocked) {
    throw new Error("Tài khoản đã bị khóa");
  }

  // 6. Kiểm tra mật khẩu khớp
  if (user.password !== password) {
    return false; // Sai mật khẩu
  }

  return true; // Đăng nhập thành công
}

module.exports = { login, USERS_DB };
