import { test } from "tests/test-utils";

const { expect } = test;

test.describe("Homepage", () => {
  test("The contacts link should direct users to the contacts page.", async ({
    page,
  }) => {
    await page.goto("/");
    const link = page.getByRole("link");
    await expect(link).toHaveAttribute("href", "/contacts");
    await page.getByRole("link", { name: /go to contacts page/i }).click();
    await expect(page).toHaveURL(/\/contacts/i);
  });
});
