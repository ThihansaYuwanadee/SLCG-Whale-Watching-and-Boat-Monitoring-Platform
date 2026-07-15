import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components/ui/icon";

interface Certification {
  id: number;
  title: string;
  certificateNumber: string;
}

interface FleetInformation {
  id: number;
  vesselName: string;
  registrationNumber: string;
  image: string;
  owner: string;
  length: string;
  beamWidth: string;
  cruisingSpeed: string;
  maximumSpeed: string;
  maximumCapacity: string;
  lifeJackets: string;
  certifications: Certification[];
}

const fleetRecords: FleetInformation[] = [
  {
    id: 1,
    vesselName: "FV Mirissa King",
    registrationNumber: "SL-WWB-2047",
    image: "/fleet-images/mirissa-king.jpg",
    owner: "Dissanayake M.",
    length: "12.8 M",
    beamWidth: "3.9 M",
    cruisingSpeed: "20 Knots",
    maximumSpeed: "28 Knots",
    maximumCapacity: "35 Passengers",
    lifeJackets: "37",
    certifications: [
      {
        id: 1,
        title: "Certificate of Registration of a Sole Proprietorship",
        certificateNumber: "1111111111111111",
      },
      {
        id: 2,
        title: "ME Certificate",
        certificateNumber: "1111111111111111",
      },
      {
        id: 3,
        title: "Certificate of Vessel",
        certificateNumber: "1111111111111111",
      },
      {
        id: 4,
        title: "Wildlife Certificate",
        certificateNumber: "1111111111111111",
      },
      {
        id: 5,
        title: "Coxswain Certificate",
        certificateNumber: "1111111111111111",
      },
      {
        id: 6,
        title: "Vessel Registration Certificate",
        certificateNumber: "1111111111111111",
      },
    ],
  },
  {
    id: 2,
    vesselName: "Blue Horizon",
    registrationNumber: "SL-WWB-2048",
    image: "/fleet-images/blue-horizon.jpg",
    owner: "Kasun Silva",
    length: "11.6 M",
    beamWidth: "3.5 M",
    cruisingSpeed: "18 Knots",
    maximumSpeed: "25 Knots",
    maximumCapacity: "30 Passengers",
    lifeJackets: "34",
    certifications: [
      {
        id: 1,
        title: "Certificate of Registration of a Sole Proprietorship",
        certificateNumber: "2222222222222222",
      },
      {
        id: 2,
        title: "ME Certificate",
        certificateNumber: "2222222222222222",
      },
      {
        id: 3,
        title: "Certificate of Vessel",
        certificateNumber: "2222222222222222",
      },
      {
        id: 4,
        title: "Wildlife Certificate",
        certificateNumber: "2222222222222222",
      },
      {
        id: 5,
        title: "Coxswain Certificate",
        certificateNumber: "2222222222222222",
      },
      {
        id: 6,
        title: "Vessel Registration Certificate",
        certificateNumber: "2222222222222222",
      },
    ],
  },
];

const FleetInfo = () => {
  const navigate = useNavigate();
  const { fleetId } = useParams<{ fleetId: string }>();

  const selectedFleet = fleetRecords.find(
    (fleet) => fleet.id === Number(fleetId),
  );

  if (!selectedFleet) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-[#F8F9FB] px-6 py-12 font-[Poppins]">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-10 text-center shadow-sm">
          <Icon name="info" size={34} className="mx-auto" />

          <h1 className="mt-5 text-xl font-semibold text-[#14223D]">
            Fleet information not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The selected vessel record does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/admin/manage-fleets")}
            className="mt-6 rounded-md bg-[#14223D] px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-[#22375F]"
          >
            Back to Fleets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F8F9FB] font-[Poppins] text-[#14223D]">
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/admin/manage-fleets")}
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-indigo-700 transition-colors hover:text-indigo-900"
        >
          Back to Fleets
        </button>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Vessel Information Card */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.14)]">
            {/* Vessel Image */}
            <div className="h-[230px] w-full overflow-hidden bg-slate-100">
              <img
                src={selectedFleet.image}
                alt={selectedFleet.vesselName}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="px-5 pb-5 pt-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-[#111827]">
                  {selectedFleet.vesselName}
                </h1>

                <Icon
                  name="info"
                  size={18}
                  className="[&_*]:stroke-[#14223D] [&_*]:stroke-[2.5]"
                />
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {selectedFleet.registrationNumber}
              </p>

              {/* Vessel Details */}
              <div className="mt-6 rounded-md bg-[#F8F9FB] px-5 py-4">
                <h2 className="mb-4 text-sm font-semibold text-[#14223D]">
                  Vessel Information
                </h2>

                <div className="space-y-2 text-xs">
                  <InformationRow
                    label="Owner"
                    value={selectedFleet.owner}
                  />

                  <InformationRow
                    label="Length"
                    value={selectedFleet.length}
                  />

                  <InformationRow
                    label="Beam (Width)"
                    value={selectedFleet.beamWidth}
                  />

                  <InformationRow
                    label="Cruising Speed"
                    value={selectedFleet.cruisingSpeed}
                  />

                  <InformationRow
                    label="Maximum Speed"
                    value={selectedFleet.maximumSpeed}
                  />

                  <InformationRow
                    label="Maximum Capacity"
                    value={selectedFleet.maximumCapacity}
                  />

                  <InformationRow
                    label="Life Jackets"
                    value={selectedFleet.lifeJackets}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Certification Section */}
          <section className="min-h-[560px] rounded-sm border-[3px] border-[#2394FF] bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <Icon
                name="document"
                size={22}
                className="[&_*]:stroke-[#14223D]"
              />

              <h2 className="text-base font-semibold text-[#14223D]">
                Certifications
              </h2>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {selectedFleet.certifications.map((certificate) => (
                <button
                  key={certificate.id}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/admin/fleet-info/${selectedFleet.id}/certificate/${certificate.id}`,
                    )
                  }
                  className="group rounded-md bg-[#F8F9FB] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#F1F5FF] hover:shadow-md"
                >
                  <h3 className="text-xs font-semibold leading-5 text-[#14223D]">
                    {certificate.title}
                  </h3>

                  <p className="mt-3 break-all text-[11px] text-indigo-900">
                    {certificate.certificateNumber}
                  </p>

                  <span className="mt-4 inline-block text-[10px] font-medium text-indigo-700 opacity-0 transition-opacity group-hover:opacity-100">
                    View certificate
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

interface InformationRowProps {
  label: string;
  value: string;
}

const InformationRow = ({
  label,
  value,
}: InformationRowProps) => {
  return (
    <div className="grid grid-cols-[135px_1fr] gap-3">
      <span className="font-semibold text-[#14223D]">
        {label}
      </span>

      <span className="text-indigo-900">{value}</span>
    </div>
  );
};

export default FleetInfo;