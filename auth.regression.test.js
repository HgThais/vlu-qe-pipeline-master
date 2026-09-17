/**
 * auth.regression.test.js
 * Regression Test: Kiểm tra toàn diện các trường hợp biên và ngoại lệ
 */
const { login } = require("./auth");

describe("Regression Test - Authentication Edge Cases & Exceptions", () => {
  // 1. Kiểm tra trường hợp sai mật khẩu
  test("Đăng nhập thất bại khi mật khẩu sai -> trả về false", () => {
    const result = login("admin", "wrongpassword");
    expect(result).toBe(false);
  });

  // 2. Kiểm tra ngoại lệ khi username rỗng
  describe("Ngoại lệ Username không hợp lệ", () => {
    test("Ném lỗi khi username là chuỗi rỗng", () => {
      expect(() => login("", "123")).toThrow("Username không được để trống");
    });

    test("Ném lỗi khi username chỉ chứa khoảng trắng", () => {
      expect(() => login("   ", "123")).toThrow("Username không được để trống");
    });

    test("Ném lỗi khi username là null hoặc undefined", () => {
      expect(() => login(null, "123")).toThrow("Username không được để trống");
      expect(() => login(undefined, "123")).toThrow("Username không được để trống");
    });
  });

  // 3. Kiểm tra ngoại lệ khi password rỗng
  test("Ném lỗi khi password là chuỗi rỗng", () => {
    expect(() => login("admin", "")).toThrow("Mật khẩu không được để trống");
  });

  // 4. Kiểm tra ngoại lệ khi mật khẩu chứa ký tự đặc biệt
  test("Ném lỗi khi mật khẩu chứa ký tự đặc biệt (@, #, $, space...)", () => {
    expect(() => login("admin", "123@#$")).toThrow(
      "Mật khẩu không được chứa ký tự đặc biệt"
    );
    expect(() => login("admin", "pass word")).toThrow(
      "Mật khẩu không được chứa ký tự đặc biệt"
    );
  });

  // 5. Kiểm tra ngoại lệ khi tài khoản bị khóa
  test("Ném lỗi khi tài khoản đã bị khóa", () => {
    expect(() => login("user_locked", "123")).toThrow(
      "Tài khoản đã bị khóa"
    );
  });

  // 6. Kiểm tra ngoại lệ khi tài khoản không tồn tại
  test("Ném lỗi khi tài khoản không tồn tại trong hệ thống", () => {
    expect(() => login("unknown_user", "123")).toThrow(
      "Tài khoản không tồn tại"
    );
  });
});
