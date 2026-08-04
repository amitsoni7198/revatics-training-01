import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-8 md:py-14">
      <div className="mx-auto max-w-reading">
        <div className="h-9 w-full animate-pulse bg-surface" />
        <div className="mt-3 h-4 w-1/2 animate-pulse bg-surface" />
      </div>
      <div className="mt-6 aspect-4/3 w-full animate-pulse bg-surface md:mt-8 md:aspect-3/1" />
    </Container>
  );
}
