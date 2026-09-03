import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid contact phone number'),
  businessType: z.enum(['dealer', 'fabricator', 'contractor', 'retailer', 'end_user'], {
    message: 'Please select your business type',
  }).optional(),
  productCategory: z.string().min(1, 'Please select a product category'),
  saProductCode: z.string().optional(),
  estimatedQuantity: z.string().optional(),
  message: z.string().min(10, 'Please provide details on your order or project (at least 10 characters)'),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
