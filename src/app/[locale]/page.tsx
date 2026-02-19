import Image from 'next/image';
import { LoginForm } from '@/src/features/auth/components/loginForm';
import { Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/src/features/auth/components/LanguageSelector';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('login');

  return (
    <div className="mx-auto max-w-7xl">
      <div className="bg-dark flex min-h-screen w-full overflow-hidden text-white">
        <div className="relative z-10 flex w-full flex-col p-8 lg:w-1/2 lg:p-16 xl:p-24">
          <div className="mb-16">
            <Image
              src="/nortus_logo.svg"
              alt="Nortus"
              width={175}
              height={40}
            />
          </div>
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center lg:mx-0">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-normal text-white">
                {t('title')}
              </h2>
              <p className="text-sm text-gray-400">{t('subtitle')}</p>
            </div>
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden p-4 pl-0 lg:flex lg:w-1/2">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl">
            <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
              <Button
                variant="ghost"
                className="bg-dark-surface h-11 gap-2 rounded-full border border-gray-700/50 px-4 text-white hover:bg-white/10 hover:text-white"
              >
                <Headset className="h-4 w-4" />
                <span className="text-sm font-medium">{t('help')}</span>
              </Button>
              <LanguageSelector />
            </div>
            <Image
              src="/login/login_ilustration.svg"
              alt="Login Illustration"
              fill
              className="object-cover:lg object-fit"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
