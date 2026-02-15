import Image from 'next/image';
import { LoginForm } from '@/src/features/auth/components/loginForm';
import { Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="bg-dark flex min-h-screen w-full overflow-hidden text-white">
        <div className="relative z-10 flex w-full flex-col p-8 lg:w-1/2 lg:p-16 xl:p-24">
          <div className="mb-16">
            <Image src="/nortus_logo.svg" alt="Nortus" width={175} height={40} />
          </div>
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center lg:mx-0">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-normal text-white">Login</h2>
              <p className="text-sm text-gray-400">
                Entre com suas credenciais para acessar a sua conta.
              </p>
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
                <span className="text-sm font-medium">Ajuda</span>
              </Button>
              <Select defaultValue="pt-br">
                <SelectTrigger className="bg-dark-surface !h-11 rounded-full border border-gray-700/50 px-4 text-white hover:bg-white/10 focus:ring-0 focus:ring-offset-0">
                  <div className="flex items-center gap-2">
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-gray-700 text-white">
                  <SelectItem value="pt-br">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/brazil_flag.svg"
                        alt="Brasil"
                        width={18}
                        height={18}
                      />
                      pt-BR
                    </div>
                  </SelectItem>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/usa_flag.svg"
                        alt="USA"
                        width={18}
                        height={18}
                      />
                      en-US
                    </div>
                  </SelectItem>
                  <SelectItem value="es">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/spain_flag.svg"
                        alt="España"
                        width={18}
                        height={18}
                      />
                      es-ES
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
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
