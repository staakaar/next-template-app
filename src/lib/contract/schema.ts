import { z } from "zod";

export const contractBasicFormSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    role: z.enum(["admin", "user", "manager"], {
        required_error: "Please select a role",
    }),
    department: z.string().min(1, { message: "Department is required" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    salary: z.string().min(1, { message: "Salary is required" }),
    comments: z.string().optional(),
});

export type ContractBasicForm = z.infer<typeof contractBasicFormSchema>;
