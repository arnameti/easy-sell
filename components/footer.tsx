import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className="py-12 bg-gray-952 text-gray-953">
      <div
        className={cn(
          `max-w-[100rem] px-12 mx-auto flex justify-between ${className}`
        )}
      >
        <p className="text-xl">© Anky Coby Bean Inc.</p>
      </div>
    </footer>
  );
}
