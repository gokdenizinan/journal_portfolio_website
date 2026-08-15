import Link from 'next/link';

type SectionHeaderProps = {
  label: string;
  href?: string;
  linkLabel?: string;
  light?: boolean;
};

export function SectionHeader({ label, href, linkLabel, light = false }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className={`section-label${light ? ' light' : ''}`}>{label}</span>
      {href && linkLabel ? (
        <Link href={href} className="section-link">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
