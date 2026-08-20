import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <Container className="py-6 md:py-14">
      <div className="bg-surface h-9 w-2/3 animate-pulse" />
      <div className="bg-surface mt-4 h-4 w-1/3 animate-pulse" />
      <div className="bg-surface mt-4 aspect-4/3 w-full animate-pulse md:mt-6 md:aspect-3/1" />
    </Container>
  );
}
