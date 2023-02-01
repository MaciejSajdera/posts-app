import NextLink from "next/link";

type TMyNextLink = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

export default function MyNextLink({
  href,
  children,
  ...rest
}: TMyNextLink): JSX.Element {
  return (
    <NextLink href={href} passHref {...rest}>
      {children}
    </NextLink>
  );
}
