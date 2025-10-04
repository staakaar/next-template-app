import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load the homepage successfully', async ({ page }) => {
        await page.goto('/');

        // Check if the page loads without errors
        await expect(page).toHaveTitle(/Next Template/);

        // Check if the main content is visible
        await expect(page.locator('main')).toBeVisible();
    });

    test('should have proper navigation', async ({ page }) => {
        await page.goto('/');

        // Check if navigation elements are present
        const navigation = page.locator('nav');
        await expect(navigation).toBeVisible();
    });

    test('should be responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Check if the page is responsive
        await expect(page.locator('main')).toBeVisible();
    });
});
