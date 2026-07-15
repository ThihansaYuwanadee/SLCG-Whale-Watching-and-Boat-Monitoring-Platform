import {
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/ui/icon";

type ApprovalStatus = "Cleared" | "Pending" | "Outdated";

type SortOption =
  | "vessel-asc"
  | "vessel-desc"
  | "owner-asc"
  | "owner-desc"
  | "registration-asc"
  | "registration-desc"
  | "approval-cleared"
  | "approval-pending"
  | "approval-outdated"
  | "expiry-soonest"
  | "expiry-latest"
  | "recently-added"
  | "oldest-added";

interface Fleet {
  id: number;
  vesselName: string;
  owner: string;
  registrationNumber: string;
  approval: ApprovalStatus;
  certificationExpiry: string;
  createdAt: string;
}

interface NewFleetForm {
  vesselName: string;
  owner: string;
  registrationNumber: string;
  approval: ApprovalStatus;
  certificationExpiry: string;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  0: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

const initialFleets: Fleet[] = [
  {
    id: 1,
    vesselName: "Ocean Explorer",
    owner: "Nimal Perera",
    registrationNumber: "SL-WW-2047",
    approval: "Cleared",
    certificationExpiry: "2027-01-15",
    createdAt: "2026-07-01",
  },
  {
    id: 2,
    vesselName: "Blue Horizon",
    owner: "Kasun Silva",
    registrationNumber: "SL-WW-2048",
    approval: "Cleared",
    certificationExpiry: "2026-12-20",
    createdAt: "2026-07-02",
  },
  {
    id: 3,
    vesselName: "Sea Pearl",
    owner: "Amal Fernando",
    registrationNumber: "SL-WW-2049",
    approval: "Outdated",
    certificationExpiry: "2026-06-10",
    createdAt: "2026-07-03",
  },
  {
    id: 4,
    vesselName: "Marine Star",
    owner: "Dilan Kumara",
    registrationNumber: "SL-WW-2050",
    approval: "Cleared",
    certificationExpiry: "2027-02-01",
    createdAt: "2026-07-04",
  },
  {
    id: 5,
    vesselName: "Whale Seeker",
    owner: "Ruwan Jayasinghe",
    registrationNumber: "SL-WW-2051",
    approval: "Pending",
    certificationExpiry: "2026-11-18",
    createdAt: "2026-07-05",
  },
  {
    id: 6,
    vesselName: "Southern Wave",
    owner: "Chaminda Silva",
    registrationNumber: "SL-WW-2052",
    approval: "Cleared",
    certificationExpiry: "2027-03-12",
    createdAt: "2026-07-06",
  },
  {
    id: 7,
    vesselName: "Ocean Pearl",
    owner: "Tharindu Fernando",
    registrationNumber: "SL-WW-2053",
    approval: "Pending",
    certificationExpiry: "2026-10-30",
    createdAt: "2026-07-07",
  },
  {
    id: 8,
    vesselName: "Sea Breeze",
    owner: "Kamal Perera",
    registrationNumber: "SL-WW-2054",
    approval: "Cleared",
    certificationExpiry: "2027-04-25",
    createdAt: "2026-07-08",
  },
  {
    id: 9,
    vesselName: "Blue Whale",
    owner: "Sunil Kumara",
    registrationNumber: "SL-WW-2055",
    approval: "Outdated",
    certificationExpiry: "2026-05-12",
    createdAt: "2026-07-09",
  },
  {
    id: 10,
    vesselName: "Island Explorer",
    owner: "Ruwan Silva",
    registrationNumber: "SL-WW-2056",
    approval: "Cleared",
    certificationExpiry: "2027-05-09",
    createdAt: "2026-07-10",
  },
];

const emptyFleetForm: NewFleetForm = {
  vesselName: "",
  owner: "",
  registrationNumber: "",
  approval: "Pending",
  certificationExpiry: "",
};

const ITEMS_PER_PAGE = 4;

const approvalPriority: Record<ApprovalStatus, number> = {
  Cleared: 1,
  Pending: 2,
  Outdated: 3,
};

const ManageFleets = () => {
  const navigate = useNavigate();

  const [fleets, setFleets] = useState<Fleet[]>(initialFleets);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortOption, setSortOption] =
    useState<SortOption>("vessel-asc");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const [newFleet, setNewFleet] =
    useState<NewFleetForm>(emptyFleetForm);

  const filteredAndSortedFleets = useMemo(() => {
    const searchTerm = searchValue.trim().toLowerCase();

    const filteredFleets = fleets.filter((fleet) => {
      return (
        fleet.vesselName.toLowerCase().includes(searchTerm) ||
        fleet.owner.toLowerCase().includes(searchTerm) ||
        fleet.registrationNumber.toLowerCase().includes(searchTerm) ||
        fleet.approval.toLowerCase().includes(searchTerm) ||
        fleet.certificationExpiry.includes(searchTerm)
      );
    });

    return [...filteredFleets].sort((firstFleet, secondFleet) => {
      switch (sortOption) {
        case "vessel-desc":
          return secondFleet.vesselName.localeCompare(
            firstFleet.vesselName,
          );

        case "owner-asc":
          return firstFleet.owner.localeCompare(secondFleet.owner);

        case "owner-desc":
          return secondFleet.owner.localeCompare(firstFleet.owner);

        case "registration-asc":
          return firstFleet.registrationNumber.localeCompare(
            secondFleet.registrationNumber,
          );

        case "registration-desc":
          return secondFleet.registrationNumber.localeCompare(
            firstFleet.registrationNumber,
          );

        case "approval-cleared":
          return (
            approvalPriority[firstFleet.approval] -
            approvalPriority[secondFleet.approval]
          );

        case "approval-pending": {
          const pendingPriority: Record<ApprovalStatus, number> = {
            Pending: 1,
            Cleared: 2,
            Outdated: 3,
          };

          return (
            pendingPriority[firstFleet.approval] -
            pendingPriority[secondFleet.approval]
          );
        }

        case "approval-outdated": {
          const outdatedPriority: Record<ApprovalStatus, number> = {
            Outdated: 1,
            Pending: 2,
            Cleared: 3,
          };

          return (
            outdatedPriority[firstFleet.approval] -
            outdatedPriority[secondFleet.approval]
          );
        }

        case "expiry-soonest":
          return (
            new Date(firstFleet.certificationExpiry).getTime() -
            new Date(secondFleet.certificationExpiry).getTime()
          );

        case "expiry-latest":
          return (
            new Date(secondFleet.certificationExpiry).getTime() -
            new Date(firstFleet.certificationExpiry).getTime()
          );

        case "recently-added":
          return (
            new Date(secondFleet.createdAt).getTime() -
            new Date(firstFleet.createdAt).getTime()
          );

        case "oldest-added":
          return (
            new Date(firstFleet.createdAt).getTime() -
            new Date(secondFleet.createdAt).getTime()
          );

        case "vessel-asc":
        default:
          return firstFleet.vesselName.localeCompare(
            secondFleet.vesselName,
          );
      }
    });
  }, [fleets, searchValue, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedFleets.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleFleets = filteredAndSortedFleets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSortOption(event.target.value as SortOption);
    setCurrentPage(1);
  };

  const handleVoiceSearch = (): void => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      window.alert(
        "Voice search is not supported by this browser. Please use Chrome or Edge.",
      );
      return;
    }

    const recognition = new SpeechRecognitionAPI();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);

      window.alert(
        "Voice recognition was unsuccessful. Please try again.",
      );
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript;

      setSearchValue(spokenText);
      setCurrentPage(1);
    };

    recognition.start();
  };

  const handleFleetInfo = (fleetId: number): void => {
    navigate(`/admin/fleet-info/${fleetId}`);
  };

  const handleDeleteFleet = (fleetId: number): void => {
    const selectedFleet = fleets.find(
      (fleet) => fleet.id === fleetId,
    );

    if (!selectedFleet) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedFleet.vesselName}"?`,
    );

    if (!confirmed) {
      return;
    }

    setFleets((previousFleets) =>
      previousFleets.filter((fleet) => fleet.id !== fleetId),
    );
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;

    setNewFleet((previousFleet) => ({
      ...previousFleet,
      [name]: value,
    }));

    setFormError("");
  };

  const handleAddFleet = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    const vesselName = newFleet.vesselName.trim();
    const owner = newFleet.owner.trim();
    const registrationNumber =
      newFleet.registrationNumber.trim();

    if (
      !vesselName ||
      !owner ||
      !registrationNumber ||
      !newFleet.certificationExpiry
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    const registrationExists = fleets.some(
      (fleet) =>
        fleet.registrationNumber.toLowerCase() ===
        registrationNumber.toLowerCase(),
    );

    if (registrationExists) {
      setFormError(
        "A vessel with this registration number already exists.",
      );
      return;
    }

    const createdFleet: Fleet = {
      id: Date.now(),
      vesselName,
      owner,
      registrationNumber,
      approval: newFleet.approval,
      certificationExpiry: newFleet.certificationExpiry,
      createdAt: new Date().toISOString(),
    };

    setFleets((previousFleets) => [
      createdFleet,
      ...previousFleets,
    ]);

    setNewFleet(emptyFleetForm);
    setFormError("");
    setSearchValue("");
    setSortOption("recently-added");
    setCurrentPage(1);
    setIsModalOpen(false);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setNewFleet(emptyFleetForm);
    setFormError("");
  };

  const getApprovalColour = (
    approval: ApprovalStatus,
  ): string => {
    switch (approval) {
      case "Cleared":
        return "text-green-500";

      case "Outdated":
        return "text-[#FF0000]";

      case "Pending":
        return "text-amber-500";

      default:
        return "text-slate-500";
    }
  };

  const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const getPaginationItems = (): Array<number | "..."> => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-[Poppins] text-[#14223d]">
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <section className="rounded-md bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-10">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-xl font-semibold">Fleets</h1>

            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-[320px]">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Icon name="search" size={16} />
                </div>

                <input
                  type="search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search fleets"
                  className="h-11 w-full rounded-md border border-slate-100 bg-[#F9FBFF] pl-10 pr-12 text-xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  aria-label="Search using microphone"
                  className={`absolute inset-y-0 right-3 flex items-center ${
                    isListening
                      ? "text-[#FF0000]"
                      : "text-slate-500 hover:text-indigo-700"
                  }`}
                >
                  <Icon name="mic" size={17} />
                </button>
              </div>

              {/* Correct Sort Dropdown */}
              <div className="flex h-11 min-w-[230px] items-center rounded-md bg-[#F9FBFF] px-4">
                <span className="whitespace-nowrap text-xs text-slate-500">
                  Sort by:
                </span>

                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-full cursor-pointer border-none bg-[#F9FBFF] pl-2 pr-6 text-xs font-bold text-[#14223d] outline-none"
                >
                  <option value="vessel-asc">
                    Vessel name: A–Z
                  </option>

                  <option value="vessel-desc">
                    Vessel name: Z–A
                  </option>

                  <option value="owner-asc">
                    Owner name: A–Z
                  </option>

                  <option value="owner-desc">
                    Owner name: Z–A
                  </option>

                  <option value="registration-asc">
                    Registration: Ascending
                  </option>

                  <option value="registration-desc">
                    Registration: Descending
                  </option>

                  <option value="approval-cleared">
                    Approval: Cleared first
                  </option>

                  <option value="approval-pending">
                    Approval: Pending first
                  </option>

                  <option value="approval-outdated">
                    Approval: Outdated first
                  </option>

                  <option value="expiry-soonest">
                    Certification: Expiring soon
                  </option>

                  <option value="expiry-latest">
                    Certification: Latest expiry
                  </option>

                  <option value="recently-added">
                    Recently added
                  </option>

                  <option value="oldest-added">
                    Oldest added
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] text-slate-500">
                  <th className="px-4 py-4">Vessel</th>
                  <th className="px-4 py-4">Owner</th>
                  <th className="px-4 py-4">Registration No.</th>
                  <th className="px-4 py-4">Certification Expiry</th>
                  <th className="px-4 py-4">Approval</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleFleets.map((fleet) => (
                  <tr
                    key={fleet.id}
                    className="border-b border-slate-100 text-xs hover:bg-[#F9FBFF]"
                  >
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                          <Icon name="vessel" size={17} />
                        </div>

                        <span className="font-medium">
                          {fleet.vesselName}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-5 text-slate-600">
                      {fleet.owner}
                    </td>

                    <td className="px-4 py-5 font-medium">
                      {fleet.registrationNumber}
                    </td>

                    <td className="px-4 py-5 text-slate-600">
                      {formatDate(fleet.certificationExpiry)}
                    </td>

                    <td
                      className={`px-4 py-5 font-medium ${getApprovalColour(
                        fleet.approval,
                      )}`}
                    >
                      {fleet.approval}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleFleetInfo(fleet.id)
                          }
                          className="flex h-9 w-9 items-center justify-center text-[#14223d] transition-transform hover:scale-110"
                        >
                          <Icon
                            name="info"
                            size={24}
                            className="[&_*]:stroke-[#14223d] [&_*]:stroke-[2.7]"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteFleet(fleet.id)
                          }
                          className="flex h-9 w-9 items-center justify-center text-[#FF0000] transition-transform hover:scale-110"
                        >
                          <Icon
                            name="delete"
                            size={20}
                            className="text-[#FF0000] [&_*]:stroke-[#FF0000] [&_*]:fill-[#FF0000]"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visibleFleets.length === 0 && (
            <div className="py-16 text-center">
              <Icon name="search" size={30} className="mx-auto" />

              <h2 className="mt-4 text-sm font-semibold">
                No fleets found
              </h2>
            </div>
          )}

          {/* Bottom Area */}
          <div className="mt-8 flex flex-col gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-[#14223d] px-7 py-3 text-xs font-medium text-white hover:bg-[#22375f]"
            >
              Add new
            </button>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1),
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F4F5F7] disabled:opacity-40"
              >
                ‹
              </button>

              {getPaginationItems().map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 items-center justify-center px-1"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-sm ${
                      currentPage === item
                        ? "bg-[#14223d] font-semibold text-white"
                        : "bg-[#F4F5F7] text-slate-600"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages),
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F4F5F7] disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Add Fleet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-7 shadow-2xl">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Add New Fleet
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter vessel and certification details.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="text-xs text-slate-500"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleAddFleet}
              className="mt-7 space-y-5"
            >
              <input
                name="vesselName"
                value={newFleet.vesselName}
                onChange={handleFormChange}
                placeholder="Vessel name"
                className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm"
              />

              <input
                name="owner"
                value={newFleet.owner}
                onChange={handleFormChange}
                placeholder="Owner name"
                className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm"
              />

              <input
                name="registrationNumber"
                value={newFleet.registrationNumber}
                onChange={handleFormChange}
                placeholder="Registration number"
                className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm"
              />

              <div>
                <label className="mb-2 block text-xs text-slate-600">
                  Certification expiry date
                </label>

                <input
                  type="date"
                  name="certificationExpiry"
                  value={newFleet.certificationExpiry}
                  onChange={handleFormChange}
                  className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm"
                />
              </div>

              <select
                name="approval"
                value={newFleet.approval}
                onChange={handleFormChange}
                className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Cleared">Cleared</option>
                <option value="Outdated">Outdated</option>
              </select>

              {formError && (
                <p className="rounded-md bg-red-50 px-4 py-3 text-xs text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md border border-slate-200 px-6 py-3 text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-[#14223d] px-6 py-3 text-xs text-white"
                >
                  Add fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFleets;