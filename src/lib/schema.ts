import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().min(8, 'Please enter a valid contact phone number (at least 8 digits)'),
  businessType: z.enum(['dealer', 'fabricator', 'contractor', 'retailer', 'end_user'], {
    message: 'Please select your business type',
  }).optional(),
  productCategory: z.string().optional(),
  saProductCode: z.string().optional(),
  estimatedQuantity: z.string().optional(),
  preferredFinish: z.string().optional(),
  deliveryLocation: z.string().optional(),
  state: z.string().optional(),
  message: z.string().optional().or(z.literal('')),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
