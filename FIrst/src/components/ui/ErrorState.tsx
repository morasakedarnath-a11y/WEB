import { CircleAlert } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <div className="empty-state"><CircleAlert aria-hidden="true" /><h3>Something went wrong</h3><p>{message}</p>{onRetry && <Button onClick={onRetry}>Try again</Button>}</div>;
}
