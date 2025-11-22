import { Hero } from '@/components/sections/hero';
import { CredibilityBar } from '@/components/sections/credibility-bar';
import { DomainTranslation } from '@/components/sections/domain-translation';
import { SelectedWork } from '@/components/sections/selected-work';
import { Philosophy } from '@/components/sections/philosophy';
import { AvailabilityCta } from '@/components/sections/availability-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <DomainTranslation />
      <SelectedWork />
      <Philosophy />
      <AvailabilityCta />
    </>
  );
}
