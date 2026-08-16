import Link from 'next/link';

type SectionHeaderProps = {
  label: string;
  href?: string;
  linkLabel?: string;
  light?: boolean;
};

export function SectionHeader({ label, href, linkLabel, light = false }: SectionHeaderProps) {
  const link =
    href && linkLabel ? (
      href.includes('#') ? (
        <a href={href} className="section-link">
          {linkLabel}
        </a>
      ) : (
        <Link href={href} className="section-link">
          {linkLabel}
        </Link>
      )
    ) : null;

  return (
    <div className="section-header">
      <span className={`section-label${light ? ' light' : ''}`}>{label}</span>
      {link}
    </div>
  );
}
