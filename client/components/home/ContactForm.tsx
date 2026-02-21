import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@site/components/ui/input';
import { Textarea } from '@site/components/ui/textarea';
import { Button } from '@site/components/ui/button';
import { toast } from 'sonner';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  honeypot: z.string().max(0, 'Bot detected'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { honeypot: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      toast.success('Thank you! We will contact you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-7">
      <h3 className="font-outfit font-bold text-lg text-gray-900 mb-5">
        Get a Free Consultation
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <Input
            {...register('firstName')}
            type="text"
            placeholder="First Name *"
            className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue"
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Input
            {...register('lastName')}
            type="text"
            placeholder="Last Name *"
            className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue"
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email Address *"
            className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            {...register('phone')}
            type="tel"
            placeholder="Phone Number"
            className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue"
          />
        </div>

        {/* Message */}
        <div>
          <Textarea
            {...register('message')}
            placeholder="Message *"
            className="bg-gray-50 border-gray-200 text-gray-900 min-h-[120px] text-sm placeholder:text-gray-400 resize-y focus-visible:ring-neo-blue focus-visible:border-neo-blue"
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Honeypot */}
        <div className="absolute invisible" aria-hidden="true">
          <label htmlFor="honeypot">
            If you are a human seeing this field, please leave it empty.
            <Input
              {...register('honeypot')}
              type="text"
              id="honeypot"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-neo-blue hover:bg-neo-blue-dark text-white font-outfit font-semibold h-11 text-sm transition-colors duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
