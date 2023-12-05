import { expect, test } from "@playwright/test";
import { createContact } from "tests/mocks/contacts";

// TODO: remove the `serial` mode to make tests isolated.
test.describe.serial("Contacts page", () => {
  test("Show contacts when page loaded.", async ({ page }) => {
    await page.goto("/contacts");
    const contactsList = page.getByRole("main").getByRole("list");
    await expect(contactsList).toBeVisible();
  });

  test("Add a new contact", async ({ page }) => {
    const newContact = createContact();
    await page.goto("/contacts");

    await page.getByRole("button", { name: /add contact/i }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: /add new contact/i }),
    ).toBeVisible();
    // fill in the form
    await dialog
      .getByRole("textbox", { name: /first name/i })
      .fill(newContact.first_name);
    await dialog
      .getByRole("textbox", { name: /last name/i })
      .fill(newContact.last_name);
    await dialog.getByRole("textbox", { name: /job/i }).fill(newContact.job);
    await dialog
      .getByRole("textbox", { name: /description/i })
      .fill(newContact.description);
    await dialog.getByRole("button", { name: /save/i }).click();

    // toast
    await expect(page.getByRole("region").getByRole("status")).toContainText(
      /new user added/i,
    );

    await expect(page.getByRole("dialog")).not.toBeVisible();
    const contactsList = page.getByRole("main").getByRole("list");

    await expect(contactsList.getByText(newContact.first_name)).toBeVisible();
    await expect(contactsList.getByText(newContact.last_name)).toBeVisible();
    await expect(contactsList.getByText(newContact.job)).toBeVisible();
    await expect(contactsList.getByText(newContact.description)).toBeVisible();
  });

  test("Edit a contact", async ({ page }) => {
    await page.goto("/contacts");
    const contactsList = page.getByRole("main").getByRole("list");
    const firstContact = contactsList.getByRole("listitem").first();

    await firstContact.getByRole("button", { name: /edit/i }).click();

    const contactData = createContact();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: /edit contact/i }),
    ).toBeVisible();
    // fill in the form
    await dialog
      .getByRole("textbox", { name: /first name/i })
      .fill(contactData.first_name);
    await dialog.getByRole("button", { name: /save/i }).click();

    // toast
    await expect(page.getByRole("region").getByRole("status")).toContainText(
      /edited/i,
    );
    await expect(firstContact).toContainText(contactData.first_name);
  });

  test("Delete a contact", async ({ page }) => {
    await page.goto("/contacts");
    const contactsList = page.getByRole("main").getByRole("list");
    const firstContact = contactsList.getByRole("listitem").first();

    const contactsCount = await contactsList.getByRole("listitem").count();

    await firstContact.getByRole("button", { name: /delete/i }).click();

    const alertDialog = page.getByRole("alertdialog");
    await expect(alertDialog).toBeVisible();
    await expect(
      alertDialog.getByRole("heading", { name: /are you absolutely sure/i }),
    ).toBeVisible();

    await alertDialog.getByRole("button", { name: /delete/i }).click();

    // toast
    await expect(page.getByRole("region").getByRole("status")).toContainText(
      /deleted/i,
    );

    await expect(contactsList.getByRole("listitem")).toHaveCount(
      contactsCount - 1,
    );
  });
});
