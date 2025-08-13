// "use client";
// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// // Zod schema for password validation
// const resetPasswordSchema = z.object({
//   newPassword: z
//     .string()
//     .min(8, 'Password must be at least 8 characters long')
//     .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
//     .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
//     .regex(/\d/, 'Password must contain at least one number')
//     .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
//   confirmPassword: z.string().min(1, 'Please confirm your password')
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"]
// });

// type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// export default function ResetPasswordPage() {
//   const [showPasswords, setShowPasswords] = useState({
//     newPassword: false,
//     confirmPassword: false
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [serverError, setServerError] = useState('');
//   const [token, setToken] = useState('');
//   const [email, setEmail] = useState('');
//   const [tokenValid, setTokenValid] = useState(false);
//  type FieldName = keyof typeof setShowPasswords;
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isValid }
//   } = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(resetPasswordSchema),
//     mode: 'onChange'
//   });

//   const newPassword = watch('newPassword', '');

//   useEffect(() => {
//     // Get token and email from URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const urlToken = urlParams.get('token');
//     const urlEmail = urlParams.get('email');
    
//     if (urlToken && urlEmail) {
//       setToken(urlToken);
//       setEmail(urlEmail);
//       setTokenValid(true);
//     } else {
//       setTokenValid(false);
//     }
//   }, []);

//   const onSubmit = async (data: ResetPasswordFormData) => {
//     setIsLoading(true);
//     setServerError('');

//     try {
//       const response = await fetch('/api/auth/reset-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token,
//           email,
//           newPassword: data.newPassword
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setIsSuccess(true);
//       } else {
//         setServerError(result.message || 'Failed to reset password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Reset password error:', error);
//       setServerError('Network error. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = (field:FieldName) => {
//     setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const getPasswordStrength = (password:string) => {
//     if (password.length === 0) return { strength: 0, text: '', color: '' };
    
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[a-z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

//     if (score <= 2) return { strength: score * 20, text: 'Weak', color: 'bg-red-500' };
//     if (score <= 3) return { strength: score * 20, text: 'Fair', color: 'bg-yellow-500' };
//     if (score <= 4) return { strength: score * 20, text: 'Good', color: 'bg-blue-500' };
//     return { strength: 100, text: 'Strong', color: 'bg-green-500' };
//   };

//   const passwordStrength = getPasswordStrength(newPassword);

//   if (tokenValid === false) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <div className="text-center">
//               <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
//               <h2 className="mt-4 text-2xl font-bold text-gray-900">
//                 Invalid Reset Link
//               </h2>
//               <p className="mt-2 text-sm text-gray-600">
//                 This password reset link is invalid or has expired.
//               </p>
//               <button
//                 onClick={() => window.location.href = '/forgot-password'}
//                 className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: '#0a1f44' }}
//               >
//                 Request New Reset Link
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isSuccess) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <div className="text-center">
//               <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
//               <h2 className="mt-4 text-2xl font-bold text-gray-900">
//                 Password Reset Successful
//               </h2>
//               <p className="mt-2 text-sm text-gray-600">
//                 Your password has been successfully reset. You can now log in with your new password.
//               </p>
//               <button
//                 onClick={() => window.location.href = '/login'}
//                 className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: '#0a1f44' }}
//               >
//                 Go to Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (tokenValid === null) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <Loader2 className="mx-auto h-8 w-8 animate-spin" style={{ color: '#0a1f44' }} />
//           <p className="mt-2 text-sm text-gray-600">Validating reset link...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="text-center">
//           <Lock className="mx-auto h-12 w-12" style={{ color: '#0a1f44' }} />
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Reset Your Password
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your new password below
//           </p>
//         </div>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   {...register('newPassword')}
//                   id="newPassword"
//                   type={showPasswords.newPassword ? "text" : "password"}
//                   className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-colors ${
//                     errors.newPassword 
//                       ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 focus:border-transparent'
//                   }`}
//                   style={!errors.newPassword ? { color: '#0a1f44' } : {}}
//                   placeholder="Enter new password"
//                   disabled={isLoading}
//                   onChange={() => {
//                     if (serverError) setServerError('');
//                   }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('newPassword')}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPasswords.newPassword ? (
//                     <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               {errors.newPassword && (
//                 <p className="mt-2 text-sm text-red-600 flex items-start">
//                   <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
//                   {errors.newPassword.message}
//                 </p>
//               )}
//               {newPassword && !errors.newPassword && (
//                 <div className="mt-2">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="text-gray-600">Password strength:</span>
//                     <span className={`font-medium ${
//                       passwordStrength.text === 'Weak' ? 'text-red-600' :
//                       passwordStrength.text === 'Fair' ? 'text-yellow-600' :
//                       passwordStrength.text === 'Good' ? 'text-blue-600' :
//                       'text-green-600'
//                     }`}>
//                       {passwordStrength.text}
//                     </span>
//                   </div>
//                   <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
//                       style={{ width: `${passwordStrength.strength}%` }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   {...register('confirmPassword')}
//                   id="confirmPassword"
//                   type={showPasswords.confirmPassword ? "text" : "password"}
//                   className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-colors ${
//                     errors.confirmPassword 
//                       ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 focus:border-transparent'
//                   }`}
//                   style={!errors.confirmPassword ? { color: '#0a1f44' } : {}}
//                   placeholder="Confirm new password"
//                   disabled={isLoading}
//                   onChange={() => {
//                     if (serverError) setServerError('');
//                   }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => togglePasswordVisibility('confirmPassword')}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPasswords.confirmPassword ? (
//                     <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             {serverError && (
//               <div className="flex items-center p-4 bg-red-50 rounded-md">
//                 <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
//                 <p className="text-sm text-red-800">{serverError}</p>
//               </div>
//             )}

//             <div>
//               <button
//                 onClick={handleSubmit(onSubmit)}
//                 disabled={isLoading || !isValid}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
//                 style={{ 
//                   backgroundColor: '#0a1f44',
//                   color: '#0a1f44'
//                 }}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Resetting Password...
//                   </>
//                 ) : (
//                   'Reset Password'
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-xs text-gray-500">
//               Password must contain at least 8 characters with uppercase, lowercase, number and special character.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }