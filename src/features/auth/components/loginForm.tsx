'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLogin } from '../hooks/useLogin';
import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function LoginForm() {
  const t = useTranslations('login');
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormValues) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-gray-300">{t('userLabel')}</label>
        <Input
          {...register('email')}
          type="text"
          placeholder={t('userPlaceholder')}
          className="focus-visible:ring-blue h-12 rounded-xl border-gray-600/50 bg-transparent text-white placeholder:text-gray-500"
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-300">{t('passwordLabel')}</label>
        <div className="relative">
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="focus-visible:ring-blue h-12 rounded-xl border-gray-600/50 bg-transparent pr-10 text-white placeholder:text-gray-500"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 h-full px-3 py-2 text-gray-400 hover:bg-transparent hover:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
            <span className="sr-only">{t('togglePassword')}</span>
          </Button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) =>
              setValue('rememberMe', checked === true)
            }
            className="data-[state=checked]:border-blue data-[state=checked]:bg-blue border-gray-500"
          />
          <label
            htmlFor="rememberMe"
            className="cursor-pointer text-sm font-normal text-gray-300"
          >
            {t('rememberMe')}
          </label>
        </div>
        <Button
          variant="link"
          className="text-blue h-auto px-0 text-sm font-normal"
          type="button"
        >
          {t('forgotPassword')}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="text-md bg-blue hover:bg-blue/90 h-12 w-full rounded-xl font-medium text-white disabled:opacity-60"
      >
        {isLoading ? t('loggingIn') : t('loginButton')}
      </Button>
    </form>
  );
}
