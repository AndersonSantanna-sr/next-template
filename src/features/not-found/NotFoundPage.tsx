import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center'>
      <p className='text-6xl font-bold text-muted-foreground'>404</p>
      <h1 className='text-2xl font-semibold'>Página não encontrada</h1>
      <p className='max-w-sm text-muted-foreground'>
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button nativeButton={false} render={<Link href='/'>Voltar para o início</Link>} />
    </div>
  );
}
