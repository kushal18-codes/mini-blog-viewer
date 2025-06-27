import { AlertTriangle, Info, LoaderCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Status({
  type,
  message,
}: Readonly<{
  type: 'loading' | 'error' | 'info';
  message: string;
}>) {
  let Icon: ReactNode;
  if (type === 'loading') {
    Icon = <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />;
  } else if (type === 'info') {
    Icon = <Info className="h-8 w-8 text-blue-500" />;
  } else {
    Icon = <AlertTriangle className="h-8 w-8 text-red-600" />;
  }

  return (
    <div className="flex items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
      {Icon}
      <p className="ml-4 font-medium text-gray-700 text-lg">{message}</p>
    </div>
  );
}
