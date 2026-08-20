import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <Container className="py-8 md:py-14">
      <div className="max-w-reading mx-auto">
        <div className="bg-surface h-9 w-full animate-pulse" />
        <div className="bg-surface mt-3 h-4 w-1/2 animate-pulse" />
      </div>
      <div className="bg-surface mt-6 aspect-4/3 w-full animate-pulse md:mt-8 md:aspect-3/1" />
    </Container>
  );
}
