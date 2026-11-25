/**
 * The GoHighLevel calendar embed — the site's single integration.
 *
 * GHL owns the booking, the payment and the contact record (P3-2: "CRM is
 * the system of record"); this component is a frame around it and stores
 * nothing. The id comes from the environment so the same build points at a
 * test calendar locally and the live one in production. If the id is absent
 * the slot renders a labelled void rather than an empty iframe, so a
 * misconfigured deploy is obvious instead of silent.
 *
 * The frame height is fixed so the embed can never shift layout. The widget
 * carries its own colours, set inside GHL to this same palette.
 */
const SRC = process.env.NEXT_PUBLIC_GHL_CALENDAR_ID;

export function Calendar() {
  if (!SRC) {
    return (
      <div
        data-slot="ghl-calendar"
        className="flex min-h-72 items-center justify-center rounded-lg border border-dashed rule bg-surface p-12"
      >
        <p className="label max-w-sm text-center">
          Calendar not configured. Set NEXT_PUBLIC_GHL_CALENDAR_ID.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border rule bg-surface">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${SRC}`}
        title="Book the Audit"
        loading="lazy"
        className="h-[46rem] w-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
