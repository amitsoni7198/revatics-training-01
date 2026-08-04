import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center md:py-32">
      <h1 className="text-display-mobile md:text-display font-semibold">
        Page not found
      </h1>
      <p className="text-lead-mobile md:text-lead mt-4 text-muted">
        The page you were looking for does not exist.
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
