import {
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/ui/icon";

type CrewRole = "Driver" | "Life Saver";
type CertificationStatus = "Certified" | "Expired" | "Pending";

type SortOption =
  | "role"
  | "name-asc"
  | "name-desc"
  | "driver-first"
  | "life-saver-first"
  | "certified-first"
  | "expired-first"
  | "newest"
  | "oldest";

interface BoatCrewMember {
  id: number;
  username: string;
  phoneNumber: string;
  role: CrewRole;
  certificationStatus: CertificationStatus;
  email: string;
  createdAt: string;
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

const initialCrewMembers: BoatCrewMember[] = [
  {
    id: 1,
    username: "Kasun Silva",
    phoneNumber: "077 123 1234",
    role: "Driver",
    certificationStatus: "Certified",
    email: "kasun.silva@gmail.com",
    createdAt: "2026-07-14T08:30:00",
  },
  {
    id: 2,
    username: "Nimal Perera",
    phoneNumber: "071 456 7890",
    role: "Driver",
    certificationStatus: "Certified",
    email: "nimal.perera@gmail.com",
    createdAt: "2026-07-13T09:15:00",
  },
  {
    id: 3,
    username: "Amal Fernando",
    phoneNumber: "076 987 6543",
    role: "Life Saver",
    certificationStatus: "Certified",
    email: "amal.fernando@gmail.com",
    createdAt: "2026-07-12T10:45:00",
  },
  {
    id: 4,
    username: "Dilan Kumara",
    phoneNumber: "075 345 6789",
    role: "Life Saver",
    certificationStatus: "Certified",
    email: "dilan.kumara@gmail.com",
    createdAt: "2026-07-11T12:20:00",
  },
  {
    id: 5,
    username: "Ruwan Jayasinghe",
    phoneNumber: "077 555 2345",
    role: "Driver",
    certificationStatus: "Certified",
    email: "ruwan.jayasinghe@gmail.com",
    createdAt: "2026-07-10T14:00:00",
  },
  {
    id: 6,
    username: "Chaminda Silva",
    phoneNumber: "071 222 4567",
    role: "Life Saver",
    certificationStatus: "Pending",
    email: "chaminda.silva@gmail.com",
    createdAt: "2026-07-09T15:10:00",
  },
  {
    id: 7,
    username: "Tharindu Fernando",
    phoneNumber: "076 334 5566",
    role: "Driver",
    certificationStatus: "Expired",
    email: "tharindu.fernando@gmail.com",
    createdAt: "2026-07-08T11:35:00",
  },
  {
    id: 8,
    username: "Kamal Perera",
    phoneNumber: "072 678 4567",
    role: "Life Saver",
    certificationStatus: "Certified",
    email: "kamal.perera@gmail.com",
    createdAt: "2026-07-07T08:50:00",
  },
  {
    id: 9,
    username: "Sunil Kumara",
    phoneNumber: "075 889 3344",
    role: "Driver",
    certificationStatus: "Certified",
    email: "sunil.kumara@gmail.com",
    createdAt: "2026-07-06T13:40:00",
  },
  {
    id: 10,
    username: "Nuwan Silva",
    phoneNumber: "077 990 1122",
    role: "Life Saver",
    certificationStatus: "Pending",
    email: "nuwan.silva@gmail.com",
    createdAt: "2026-07-05T16:25:00",
  },
];

const ITEMS_PER_PAGE = 5;

const ManageBoatCrew = () => {
  const navigate = useNavigate();

  const [crewMembers, setCrewMembers] =
    useState<BoatCrewMember[]>(initialCrewMembers);

  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] =
    useState<SortOption>("role");
  const [currentPage, setCurrentPage] = useState(1);
  const [isListening, setIsListening] = useState(false);

  const filteredAndSortedCrew = useMemo(() => {
    const searchTerm = searchValue.trim().toLowerCase();

    const filteredCrew = crewMembers.filter((member) => {
      return (
        member.username.toLowerCase().includes(searchTerm) ||
        member.phoneNumber.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm) ||
        member.certificationStatus
          .toLowerCase()
          .includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm)
      );
    });

    return [...filteredCrew].sort((firstMember, secondMember) => {
      switch (sortOption) {
        case "name-asc":
          return firstMember.username.localeCompare(
            secondMember.username,
          );

        case "name-desc":
          return secondMember.username.localeCompare(
            firstMember.username,
          );

        case "driver-first":
          return firstMember.role === secondMember.role
            ? firstMember.username.localeCompare(secondMember.username)
            : firstMember.role === "Driver"
              ? -1
              : 1;

        case "life-saver-first":
          return firstMember.role === secondMember.role
            ? firstMember.username.localeCompare(secondMember.username)
            : firstMember.role === "Life Saver"
              ? -1
              : 1;

        case "certified-first":
          return firstMember.certificationStatus ===
            secondMember.certificationStatus
            ? firstMember.username.localeCompare(secondMember.username)
            : firstMember.certificationStatus === "Certified"
              ? -1
              : 1;

        case "expired-first":
          return firstMember.certificationStatus ===
            secondMember.certificationStatus
            ? firstMember.username.localeCompare(secondMember.username)
            : firstMember.certificationStatus === "Expired"
              ? -1
              : 1;

        case "newest":
          return (
            new Date(secondMember.createdAt).getTime() -
            new Date(firstMember.createdAt).getTime()
          );

        case "oldest":
          return (
            new Date(firstMember.createdAt).getTime() -
            new Date(secondMember.createdAt).getTime()
          );

        case "role":
        default:
          return (
            firstMember.role.localeCompare(secondMember.role) ||
            firstMember.username.localeCompare(secondMember.username)
          );
      }
    });
  }, [crewMembers, searchValue, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedCrew.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleCrewMembers = filteredAndSortedCrew.slice(
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
        "Voice search is not supported in this browser. Please use Chrome or Edge.",
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

    recognition.onresult = (
      event: SpeechRecognitionEvent,
    ) => {
      const spokenText = event.results[0][0].transcript;

      setSearchValue(spokenText);
      setCurrentPage(1);
    };

    recognition.start();
  };

  const handleCrewInfo = (crewId: number): void => {
    navigate(`/admin/boat-crew-info/${crewId}`);
  };

  const handleDeleteCrew = (crewId: number): void => {
    const selectedCrewMember = crewMembers.find(
      (member) => member.id === crewId,
    );

    if (!selectedCrewMember) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedCrewMember.username}"?`,
    );

    if (!confirmed) {
      return;
    }

    setCrewMembers((previousCrewMembers) =>
      previousCrewMembers.filter(
        (member) => member.id !== crewId,
      ),
    );
  };

  const getCertificationClassName = (
    status: CertificationStatus,
  ): string => {
    switch (status) {
      case "Certified":
        return "text-green-500";
      case "Expired":
        return "text-[#FF0000]";
      case "Pending":
        return "text-amber-500";
      default:
        return "text-slate-500";
    }
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
        <section className="rounded-md bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-lg font-semibold text-[#14223d]">
              Boat Crew
            </h1>

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
                  placeholder="Search"
                  aria-label="Search boat crew"
                  className="h-11 w-full rounded-md border border-slate-100 bg-[#F9FBFF] pl-10 pr-12 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  aria-label="Search using microphone"
                  title={
                    isListening
                      ? "Listening..."
                      : "Search using microphone"
                  }
                  className={`absolute inset-y-0 right-3 flex items-center transition-colors ${
                    isListening
                      ? "text-[#FF0000]"
                      : "text-slate-500 hover:text-indigo-700"
                  }`}
                >
                  <Icon name="mic" size={17} />
                </button>
              </div>

              {/* Sort */}
              <div className="flex h-11 min-w-[190px] items-center rounded-md bg-[#F9FBFF] px-4">
                <span className="whitespace-nowrap text-xs text-slate-500">
                  Sort by:
                </span>

                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  aria-label="Sort boat crew"
                  className="w-full cursor-pointer border-none bg-[#F9FBFF] pl-2 pr-6 text-xs font-semibold text-[#14223d] outline-none"
                >
                  <option value="role">Role</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                  <option value="driver-first">
                    Driver first
                  </option>
                  <option value="life-saver-first">
                    Life Saver first
                  </option>
                  <option value="certified-first">
                    Certified first
                  </option>
                  <option value="expired-first">
                    Expired first
                  </option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="mt-8 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-500">
                  <th className="w-[55px] px-4 py-4">User</th>
                  <th className="px-4 py-4">Username</th>
                  <th className="px-4 py-4">Phone Number</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Certification</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleCrewMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-slate-100 text-xs transition-colors hover:bg-[#F9FBFF]"
                  >
                    <td className="px-4 py-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                        <Icon name="user" size={19} />
                      </div>
                    </td>

                    <td className="px-4 py-5 font-medium text-[#14223d]">
                      {member.username}
                    </td>

                    <td className="px-4 py-5 text-slate-600">
                      {member.phoneNumber}
                    </td>

                    <td className="px-4 py-5 text-slate-600">
                      {member.role}
                    </td>

                    <td
                      className={`px-4 py-5 font-medium ${getCertificationClassName(
                        member.certificationStatus,
                      )}`}
                    >
                      {member.certificationStatus}
                    </td>

                    <td className="px-4 py-5 text-slate-600">
                      {member.email}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleCrewInfo(member.id)
                          }
                          aria-label={`View ${member.username} information`}
                          title="View boat crew information"
                          className="flex h-9 w-9 items-center justify-center text-[#14223d] transition-transform duration-200 hover:scale-110"
                        >
                          <Icon
                            name="info"
                            size={23}
                            className="[&_*]:stroke-[#14223d] [&_*]:stroke-[2.7]"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteCrew(member.id)
                          }
                          aria-label={`Delete ${member.username}`}
                          title="Delete crew member"
                          className="flex h-9 w-9 items-center justify-center text-[#FF0000] transition-transform duration-200 hover:scale-110"
                        >
                          <Icon
                            name="delete"
                            size={19}
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

          {/* Mobile cards */}
          <div className="mt-8 grid gap-4 md:hidden">
            {visibleCrewMembers.map((member) => (
              <article
                key={member.id}
                className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                    <Icon name="user" size={22} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      {member.username}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <p>
                    <span className="font-medium">Phone: </span>
                    {member.phoneNumber}
                  </p>

                  <p>
                    <span className="font-medium">Role: </span>
                    {member.role}
                  </p>

                  <p>
                    <span className="font-medium">
                      Certification:{" "}
                    </span>

                    <span
                      className={getCertificationClassName(
                        member.certificationStatus,
                      )}
                    >
                      {member.certificationStatus}
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleCrewInfo(member.id)
                    }
                    className="flex items-center gap-2 rounded-md border border-indigo-200 px-4 py-2 text-xs font-medium text-indigo-700"
                  >
                    <Icon name="info" size={17} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteCrew(member.id)
                    }
                    className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-xs font-medium text-[#FF0000]"
                  >
                    <Icon
                      name="delete"
                      size={16}
                      className="[&_*]:stroke-[#FF0000] [&_*]:fill-[#FF0000]"
                    />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {visibleCrewMembers.length === 0 && (
            <div className="py-16 text-center">
              <Icon name="search" size={30} className="mx-auto" />

              <h2 className="mt-4 text-sm font-semibold">
                No boat crew members found
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Try searching by name, phone number, role,
                certification status, or email.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((previousPage) =>
                    Math.max(previousPage - 1, 1),
                  )
                }
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-100 bg-[#F4F5F7] text-sm text-slate-500 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>

              {getPaginationItems().map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-8 min-w-6 items-center justify-center text-xs font-semibold"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    aria-label={`Go to page ${item}`}
                    aria-current={
                      currentPage === item
                        ? "page"
                        : undefined
                    }
                    className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs transition-colors ${
                      currentPage === item
                        ? "border-[#14223d] bg-[#14223d] font-semibold text-white"
                        : "border-slate-100 bg-[#F4F5F7] text-slate-600 hover:bg-slate-200"
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
                  setCurrentPage((previousPage) =>
                    Math.min(
                      previousPage + 1,
                      totalPages,
                    ),
                  )
                }
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-100 bg-[#F4F5F7] text-sm text-slate-500 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageBoatCrew;