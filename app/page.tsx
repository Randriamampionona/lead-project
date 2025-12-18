import LeadForm from "@/components/forms/lead-forms";
import UpdateIndicatorBanner from "@/components/update-indicator-banner";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center flex-col">
      <UpdateIndicatorBanner />
      <div className="relative flex items-center justify-center mb-16">
        <h1 className="text-6xl font-bold">Goodbye, M. DINIS</h1>
        <Image
          src={"/hand-wave.gif"}
          alt="hand-wave"
          width={75}
          height={75}
          unoptimized
        />
      </div>
      <LeadForm />
    </main>
  );
}
