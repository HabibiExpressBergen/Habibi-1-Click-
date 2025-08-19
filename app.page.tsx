/**
 * Habibi Express – Superenkel fastpris-skjema (MVP)
 *
 * Mål: Maks konvertering via ett ultraenkelt skjema (≤5 felter) uten distraksjoner.
 * Prinsipper: Rask LCP, tilgjengelighet (WCAG 2.2 AA), GDPR-vennlig, minimal JS.
 * Merk: Ingen arabisk tekst benyttes. Kontaktinfo vises med ønsket spacing i UI.
 */

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Få fast pris på flytting – på 60 sekunder
          </h1>
          <p className="mt-3 text-base sm:text-lg text-neutral-600">
            Last opp bilder, fortell oss hvor du skal – vi ringer for bekreftelse og gir en fast pris.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-neutral-100">
          <FormCard />
        </div>

        <footer className="mt-8 text-center text-sm text-neutral-600">
          <p>Ingen konto. Ingen unødvendige cookies. Vi bruker kun info for pris og å utføre oppdraget.</p>
          <p className="mt-1">
            Trenger du hjelp nå? Ring oss: <a href="tel:+4747878769" className="underline">+47 47 8787 69</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

function FormCard() {
  const PHONE_REGEX = /^\+?\d[\d\s]{5,}$/;

  return (
    <form
      className="grid gap-5"
      aria-labelledby="quote-title"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const fd = new FormData(form);
        if ((fd.get('website') as string)?.length) {
          alert('Noe gikk galt. Prøv igjen.');
          return;
        }
        const phone = (fd.get('phone') as string)?.trim();
        const from = (fd.get('from') as string)?.trim();
        const to = (fd.get('to') as string)?.trim();
        const date = (fd.get('date') as string)?.trim();
        if (!from || !to || !date || !PHONE_REGEX.test(phone)) {
          alert('Sjekk at alle felter er riktig utfylt (inkl. telefonnummer).');
          return;
        }
        const success = document.getElementById('success') as HTMLDivElement | null;
        success?.classList.remove('hidden');
        form.reset();
        success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
    >
      <h2 id="quote-title" className="text-xl font-medium">Superenkelt skjema</h2>
      <p className="text-sm text-neutral-600 -mt-2">5 felter. Det tar under ett minutt.</p>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Field label="Fra-adresse" name="from" placeholder="Eks: Kanalveien 1, Bergen" required />
      <Field label="Til-adresse" name="to" placeholder="Eks: Damsgårdsveien 2, Bergen" required />
      <Field label="Dato" name="date" type="date" required />
      <Field label="Telefon" name="phone" type="tel" placeholder="Eks: +47 47 8787 69" required />

      <div className="grid gap-2">
        <label htmlFor="photos" className="text-sm font-medium">Bilder av det som skal flyttes (valgfritt)</label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2 file:bg-neutral-900 file:text-white file:cursor-pointer file:hover:opacity-90 file:transition"
          onChange={(e) => {
            const list = document.getElementById('previews') as HTMLDivElement;
            list.innerHTML = '';
            const files = e.currentTarget.files;
            if (!files) return;
            Array.from(files).slice(0, 8).forEach((f) => {
              const url = URL.createObjectURL(f);
              const img = document.createElement('img');
              img.src = url;
              img.alt = f.name;
              img.loading = 'lazy';
              img.className = 'h-20 w-20 object-cover rounded-xl border border-neutral-200';
              list.appendChild(img);
            });
          }}
        />
        <div id="previews" className="flex flex-wrap gap-2" />
        <p className="text-xs text-neutral-500">Tips: Ta et oversiktsbilde pr. rom. Maks 8 bilder.</p>
      </div>

      <button
        type="submit"
        data-analytics="cta"
        className="mt-2 inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-white font-medium shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
        aria-label="Send inn og få fast pris"
      >
        Få fast pris nå
      </button>

      <div id="success" role="status" aria-live="polite" className="hidden mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
        Takk! Vi ringer deg snart for å bekrefte detaljer og oppgi fast pris.
      </div>

      <p className="text-xs text-neutral-500 mt-2">
        Ved innsending godtar du at vi kontakter deg for pris og planlegging. Ingen markedsføring uten samtykke.
      </p>
    </form>
  );
}

function Field({ label, name, type = 'text', placeholder, required = false }: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const id = name;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}{required ? ' *' : ''}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-neutral-900"
        inputMode={type === 'tel' ? 'tel' : undefined}
        aria-required={required}
      />
    </div>
  );
}
