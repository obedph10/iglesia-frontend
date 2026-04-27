import { Building2, CreditCard, DollarSign } from "lucide-react";
import type { DonationOption } from "../../types";

interface DonationInfoProps {
  options: DonationOption[];
}

const methodIcons: Record<string, typeof Building2> = {
  paypal: DollarSign,
  bank_transfer: Building2,
  card: CreditCard,
};

const methodColors: Record<string, string> = {
  paypal: "bg-blue-50 text-blue-700 border-blue-200",
  bank_transfer: "bg-green-50 text-green-700 border-green-200",
  card: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function DonationInfo({ options }: DonationInfoProps) {
  if (options.length === 0) {
    return (
      <div className="rounded-xl bg-gray-50 p-8 text-center">
        <p className="text-gray-500">Próximamente encontrarás aquí las opciones para donar.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => {
        const Icon = methodIcons[option.payment_method] || Building2;
        const colorClass = methodColors[option.payment_method] || "bg-gray-50 text-gray-700 border-gray-200";

        return (
          <div
            key={option.id}
            className={`rounded-xl border-2 p-6 ${colorClass}`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{option.label}</h3>
            </div>

            {option.description && (
              <p className="mb-4 text-sm opacity-80">{option.description}</p>
            )}

            {option.payment_method === "bank_transfer" && (
              <div className="space-y-2 text-sm">
                {option.bank_name && (
                  <p>
                    <span className="font-medium">Banco:</span> {option.bank_name}
                  </p>
                )}
                {option.account_type && (
                  <p>
                    <span className="font-medium">Tipo:</span> {option.account_type}
                  </p>
                )}
                {option.account_number && (
                  <p>
                    <span className="font-medium">N° Cuenta:</span>{" "}
                    <span className="font-mono font-bold">{option.account_number}</span>
                  </p>
                )}
                {option.account_holder && (
                  <p>
                    <span className="font-medium">Titular:</span> {option.account_holder}
                  </p>
                )}
                {option.identification && (
                  <p>
                    <span className="font-medium">NIT/CC:</span> {option.identification}
                  </p>
                )}
              </div>
            )}

            {option.payment_method === "paypal" && (
              <div className="mt-4">
                <a
                  href={`https://www.paypal.com/paypalme/${option.paypal_email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent w-full"
                >
                  Donar con PayPal
                </a>
              </div>
            )}

            {option.payment_method === "card" && (
              <div className="mt-4">
                <button className="btn-primary w-full">
                  Donar con Tarjeta
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
