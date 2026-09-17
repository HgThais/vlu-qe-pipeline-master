/**
 * auth.smoke.test.js
 * Smoke Test: Kiểm tra luồng hoạt động chính (Happy Path)
 */
const { login } = require("./auth");

describe("Smoke Test - Authentication", () => {
  test("Đăng nhập thành công với tài khoản hợp lệ (admin / 123) trả về true", () => {
    const result = login("admin", "123");
    expect(result).toBe(true);
  });
});
