import fetchSchoolByTenant from '@/app/lib/actions/school-tenant.action';
import websiteContentActions, {
  WebsiteContent,
} from '@/app/lib/actions/website-content.action';
import Image from 'next/image';

type Props = {
  hostname: string;
};

function readSchoolInfo(res: unknown): { name?: string; schoolImage?: string | null } {
  if (!res || typeof res !== 'object') return {};
  const data = (res as { data?: unknown }).data;
  if (!data || typeof data !== 'object') return {};
  const d = data as Record<string, unknown>;
  return {
    name: typeof d.name === 'string' ? d.name : undefined,
    schoolImage: typeof d.schoolImage === 'string' ? d.schoolImage : undefined,
  };
}

export default async function PublicWebsiteRenderer({ hostname }: Props) {
  const [contentRes, schoolRes] = await Promise.allSettled([
    websiteContentActions.fetchPublicWebsiteContent(hostname),
    fetchSchoolByTenant(hostname),
  ]);

  const content: WebsiteContent =
    contentRes.status === 'fulfilled' ? contentRes.value.data ?? {} : {};
  const school =
    schoolRes.status === 'fulfilled' ? readSchoolInfo(schoolRes.value) : {};

  const brand = content.brand ?? {};
  const logo = brand.websiteLogo || school.schoolImage;
  const siteName = content.contact?.websiteName || school.name || hostname;

  const hasFaq = content.faq && Object.values(content.faq).some((qs) => qs.length > 0 && qs[0].title);
  const hasTestimonials = content.testimonials && content.testimonials.length > 0;
  const hasPartners = content.partnerLogos && content.partnerLogos.length > 0;

  return (
    <div className="min-h-screen bg-white text-gray1">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray4 lg:px-16">
        <div className="flex items-center gap-3">
          {logo ? (
            <Image src={logo} alt={siteName} width={40} height={40} className="rounded object-contain" />
          ) : null}
          <span className="text-lg font-semibold">{siteName}</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#about" className="hover:text-primary">About</a>
          {hasFaq && <a href="#faq" className="hover:text-primary">FAQ</a>}
          {hasTestimonials && <a href="#testimonials" className="hover:text-primary">Testimonials</a>}
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
      </header>

      <section className="relative flex flex-col items-center gap-6 px-6 py-20 text-center lg:px-16">
        {brand.heroSectionImage && (
          <div className="absolute inset-0 -z-10 opacity-10">
            <Image src={brand.heroSectionImage} alt="" fill className="object-cover" />
          </div>
        )}
        <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">
          {brand.heroTitle || `Welcome to ${siteName}`}
        </h1>
        {brand.heroSubtitle && (
          <p className="max-w-xl text-gray3">{brand.heroSubtitle}</p>
        )}
      </section>

      {brand.aboutUsText && (
        <section id="about" className="px-6 py-16 lg:px-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row">
            {brand.aboutUsImage && (
              <Image
                src={brand.aboutUsImage}
                alt="About us"
                width={400}
                height={300}
                className="rounded-xl object-cover"
              />
            )}
            <div>
              <h2 className="mb-4 text-2xl font-semibold">About Us</h2>
              <p className="text-gray3">{brand.aboutUsText}</p>
            </div>
          </div>
        </section>
      )}

      {hasPartners && (
        <section className="bg-gray7 px-6 py-12 lg:px-16">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8">
            {content.partnerLogos!.map((p, i) => (
              <Image key={i} src={p.logo} alt="Partner" width={100} height={50} className="object-contain" />
            ))}
          </div>
        </section>
      )}

      {hasFaq && (
        <section id="faq" className="px-6 py-16 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-semibold">Frequently Asked Questions</h2>
            {Object.entries(content.faq!).map(([tab, questions]) =>
              questions
                .filter((q) => q.title)
                .map((q, i) => (
                  <div key={`${tab}-${i}`} className="mb-4 border-b border-gray4 pb-4">
                    <h3 className="font-medium">{q.title}</h3>
                    <p className="mt-1 text-sm text-gray3">{q.description}</p>
                  </div>
                ))
            )}
          </div>
        </section>
      )}

      {hasTestimonials && (
        <section id="testimonials" className="bg-gray7 px-6 py-16 lg:px-16">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {content.testimonials!.map((t, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
                {t.image && (
                  <Image src={t.image} alt={t.name} width={48} height={48} className="mb-4 rounded-full object-cover" />
                )}
                <p className="mb-4 text-sm text-gray3">&ldquo;{t.testimonial}&rdquo;</p>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-gray3">{t.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer id="contact" className="border-t border-gray4 px-6 py-12 lg:px-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 text-sm text-gray3 md:flex-row md:justify-between">
          <div>
            {content.contact?.address && <p>{content.contact.address}</p>}
            {content.contact?.email && <p>{content.contact.email}</p>}
            {content.contact?.phoneNumber && <p>{content.contact.phoneNumber}</p>}
          </div>
          <div className="flex gap-4">
            {content.social?.facebook && <a href={content.social.facebook} className="hover:text-primary">Facebook</a>}
            {content.social?.twitter && <a href={content.social.twitter} className="hover:text-primary">Twitter</a>}
            {content.social?.instagram && <a href={content.social.instagram} className="hover:text-primary">Instagram</a>}
            {content.social?.linkedin && <a href={content.social.linkedin} className="hover:text-primary">LinkedIn</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
